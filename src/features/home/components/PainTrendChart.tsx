import { useState } from 'react';
import {
  LayoutChangeEvent,
  Text,
  View,
} from 'react-native';

import type { PainTrendPoint } from './InsightCard.data';
import { styles } from './PainTrendChart.styles';

type PainTrendChartProps = {
  data: PainTrendPoint[];
};

const BASELINE_Y = 72;
const TOP_Y = 22;

const AREA_SLICES = 40;
const GRADIENT_BANDS = 10;

const CHART_HORIZONTAL_PADDING = 12;

function interpolateColor(
  start: [number, number, number],
  end: [number, number, number],
  amount: number,
) {
  const value = Math.min(
    1,
    Math.max(0, amount),
  );

  const red = Math.round(
    start[0] +
      (end[0] - start[0]) * value,
  );

  const green = Math.round(
    start[1] +
      (end[1] - start[1]) * value,
  );

  const blue = Math.round(
    start[2] +
      (end[2] - start[2]) * value,
  );

  return `rgb(${red}, ${green}, ${blue})`;
}

function getPainRatio(
  pain: number,
  minimumPain: number,
  maximumPain: number,
) {
  if (maximumPain === minimumPain) {
    return 0;
  }

  return (
    (pain - minimumPain) /
    (maximumPain - minimumPain)
  );
}

function getPainColor(
  pain: number,
  minimumPain: number,
  maximumPain: number,
) {
  const ratio = getPainRatio(
    pain,
    minimumPain,
    maximumPain,
  );

  return interpolateColor(
    [190, 161, 255],
    [62, 20, 190],
    ratio,
  );
}

export default function PainTrendChart({
  data,
}: PainTrendChartProps) {
  const [chartWidth, setChartWidth] =
    useState(0);

  if (data.length === 0) {
    return null;
  }

  const painValues = data.map(
    (point) => point.averagePain,
  );

  const minimumPain = Math.min(
    ...painValues,
  );

  const maximumPain = Math.max(
    ...painValues,
  );

  const handleLayout = (
    event: LayoutChangeEvent,
  ) => {
    setChartWidth(
      event.nativeEvent.layout.width,
    );
  };

  const getX = (index: number) => {
    if (chartWidth === 0) {
      return 0;
    }

    if (data.length === 1) {
      return chartWidth / 2;
    }

    const availableWidth =
      chartWidth -
      CHART_HORIZONTAL_PADDING * 2;

    const spacing =
      availableWidth /
      (data.length - 1);

    return (
      CHART_HORIZONTAL_PADDING +
      index * spacing
    );
  };

  const getY = (pain: number) => {
    if (maximumPain === minimumPain) {
      return BASELINE_Y;
    }

    const ratio =
      (pain - minimumPain) /
      (maximumPain - minimumPain);

    return (
      BASELINE_Y -
      ratio * (BASELINE_Y - TOP_Y)
    );
  };

  return (
    <View style={styles.container}>
      <View
        onLayout={handleLayout}
        style={styles.plotArea}
      >
        {chartWidth > 0
          ? data.map((point, index) => {
              const x = getX(index);

              const y = getY(
                point.averagePain,
              );

              const pointColor =
                getPainColor(
                  point.averagePain,
                  minimumPain,
                  maximumPain,
                );

              const nextPoint =
                data[index + 1];

              const showValue =
                index === 0 ||
                index === data.length - 1;

              return (
                <View
                  key={`${point.date}-${index}`}
                >
                  {/* Area + line */}
                  {nextPoint
                    ? (() => {
                        const nextX =
                          getX(index + 1);

                        const nextY =
                          getY(
                            nextPoint.averagePain,
                          );

                        const deltaX =
                          nextX - x;

                        const deltaY =
                          nextY - y;

                        const lineLength =
                          Math.sqrt(
                            deltaX ** 2 +
                              deltaY ** 2,
                          );

                        const lineAngle =
                          Math.atan2(
                            deltaY,
                            deltaX,
                          ) *
                          (180 / Math.PI);

                        const averagePain =
                          (point.averagePain +
                            nextPoint.averagePain) /
                          2;

                        const lineColor =
                          getPainColor(
                            averagePain,
                            minimumPain,
                            maximumPain,
                          );

                        return (
                          <>
                            {/* Gradient area underneath trend */}
                            {Array.from({
                              length:
                                AREA_SLICES,
                            }).map(
                              (
                                _,
                                sliceIndex,
                              ) => {
                                const progress =
                                  (sliceIndex +
                                    0.5) /
                                  AREA_SLICES;

                                const sliceX =
                                  x +
                                  deltaX *
                                    progress;

                                const sliceY =
                                  y +
                                  deltaY *
                                    progress;

                                const slicePain =
                                  point.averagePain +
                                  (nextPoint.averagePain -
                                    point.averagePain) *
                                    progress;

                                const sliceColor =
                                  getPainColor(
                                    slicePain,
                                    minimumPain,
                                    maximumPain,
                                  );

                                const painRatio =
                                  getPainRatio(
                                    slicePain,
                                    minimumPain,
                                    maximumPain,
                                  );

                                const shadowHeight =
                                  BASELINE_Y -
                                  sliceY;

                                if (
                                  shadowHeight <=
                                  0
                                ) {
                                  return null;
                                }

                                const sliceWidth =
                                  deltaX /
                                  AREA_SLICES;

                                return (
                                  <View
                                    key={`area-${index}-${sliceIndex}`}
                                    pointerEvents="none"
                                    style={[
                                      styles.areaStrip,
                                      {
                                        height:
                                          shadowHeight,

                                        left:
                                          sliceX -
                                          sliceWidth /
                                            2,

                                        top:
                                          sliceY,

                                        width:
                                          sliceWidth +
                                          1,
                                      },
                                    ]}
                                  >
                                    {Array.from({
                                      length:
                                        GRADIENT_BANDS,
                                    }).map(
                                      (
                                        __,
                                        bandIndex,
                                      ) => {
                                        const fade =
                                          1 -
                                          bandIndex /
                                            GRADIENT_BANDS;

                                        const opacity =
                                          (0.08 +
                                            painRatio *
                                              0.15) *
                                          fade;

                                        return (
                                          <View
                                            key={`band-${bandIndex}`}
                                            style={{
                                              backgroundColor:
                                                sliceColor,

                                              flex: 1,

                                              opacity,
                                            }}
                                          />
                                        );
                                      },
                                    )}
                                  </View>
                                );
                              },
                            )}

                            {/* Trend line */}
                            <View
                              style={[
                                styles.line,
                                {
                                  backgroundColor:
                                    lineColor,

                                  left:
                                    (x +
                                      nextX) /
                                      2 -
                                    lineLength /
                                      2,

                                  top:
                                    (y +
                                      nextY) /
                                      2 -
                                    1.5,

                                  width:
                                    lineLength,

                                  transform: [
                                    {
                                      rotate: `${lineAngle}deg`,
                                    },
                                  ],
                                },
                              ]}
                            />
                          </>
                        );
                      })()
                    : null}

                  {/* Only first and last pain values */}
                  {showValue ? (
                    <Text
                      style={[
                        styles.valueLabel,
                        {
                          left: x - 20,
                          top: y - 24,
                        },
                      ]}
                    >
                      {point.averagePain}
                    </Text>
                  ) : null}

                  {/* Pain point */}
                  <View
                    style={[
                      styles.point,
                      {
                        backgroundColor:
                          pointColor,

                        left: x - 5,
                        top: y - 5,
                      },
                    ]}
                  />
                </View>
              );
            })
          : null}

        {/* Dates stay on one fixed horizontal baseline */}
        {chartWidth > 0
          ? data.map((point, index) => {
              const x = getX(index);

              return (
                <View
                  key={`${point.date}-date-${index}`}
                  style={[
                    styles.dateContainer,
                    {
                      left: x - 30,
                      top:
                        BASELINE_Y +
                        8,
                      width: 60,
                    },
                  ]}
                >
                  <Text
                    style={
                      styles.dateText
                    }
                  >
                    {point.date}
                  </Text>
                </View>
              );
            })
          : null}
      </View>
    </View>
  );
}
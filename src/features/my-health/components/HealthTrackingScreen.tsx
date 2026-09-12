import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { useMyHealth } from '../MyHealthContext';
import { assessmentLabels, formatWeek, myHealthCopy, painMetrics } from '../MyHealth.data';
import { painLocations } from '../HealthRecord.data';
import { healthReportHtml, painChartSvg, trackingReportSections } from '../HealthReport.data';
import type { PainMetric } from '../MyHealth.types';
import HealthExportActions from './HealthExportActions';
import HealthScreen from './HealthScreen';
import HealthSelect from './HealthSelect';
import { styles } from './MyHealthScreen.styles';

type HealthTrackingScreenProps = {
  onBack: () => void;
  onRecord: (id: string) => void;
  onAssessment: () => void;
};

export default function HealthTrackingScreen({ onBack, onRecord, onAssessment }: HealthTrackingScreenProps) {
  const { records } = useMyHealth();
  const [tab, setTab] = useState<'Chart' | 'History'>('Chart');
  const [metric, setMetric] = useState<PainMetric>('averagePain');
  const [location, setLocation] = useState('All locations');
  const [visibleCount, setVisibleCount] = useState(5);
  const [expandedWeek, setExpandedWeek] = useState<string | null>(records[0]?.weekStart ?? null);
  const [notification, setNotification] = useState('');
  const painRecords = records.filter((record) => record.pain);
  const locations = ['All locations', ...new Set(painRecords.flatMap((record) => painLocations(record.pain!)))];
  const filtered = painRecords.filter((record) => location === 'All locations' || painLocations(record.pain!).includes(location));
  const visibleRecords = filtered.slice(0, visibleCount);
  const weeks = [...new Set(records.map((record) => record.weekStart))].sort().reverse();
  const chart = painChartSvg(visibleRecords, metric);
  const metricLabel = painMetrics.find((item) => item.key === metric)!.label;

  useEffect(() => {
    if (!notification) return;
    const timeout = setTimeout(() => setNotification(''), 5000);
    return () => clearTimeout(timeout);
  }, [notification, visibleCount]);

  const showMore = () => {
    const count = Math.min(5, filtered.length - visibleCount);
    setVisibleCount((current) => current + count);
    setNotification(`Successfully loaded ${count} more ${count === 1 ? 'record' : 'records'}`);
  };

  return (
    <HealthScreen title={myHealthCopy.trackingTitle} onBack={onBack}>
      <View accessibilityRole="tablist" style={styles.tabs}>
        {(['Chart', 'History'] as const).map((item) => (
          <Pressable key={item} accessibilityRole="tab" accessibilityState={{ selected: tab === item }} onPress={() => setTab(item)} style={[styles.tab, tab === item && styles.activeTab]}><Text style={[styles.tabText, tab === item && styles.activeTabText]}>{item}</Text></Pressable>
        ))}
      </View>
      {tab === 'Chart' ? painRecords.length ? (
        <>
          <Text style={styles.cardTitle}>Pain intensity</Text>
          <HealthSelect label="Pain location" options={locations} value={location} onChange={(value) => { setLocation(value); setVisibleCount(5); setNotification(''); }} />
          <ScrollView horizontal accessibilityLabel={`${metricLabel} pain intensity chart, scale 0 to 10`}>
            <SvgXml xml={chart.xml} width={chart.width} height={260} />
          </ScrollView>
          <View accessibilityRole="tablist" style={styles.metricTabs}>
            {painMetrics.map((item) => (
              <Pressable accessibilityRole="tab" accessibilityState={{ selected: metric === item.key }} key={item.key} onPress={() => setMetric(item.key)} style={[styles.metricTab, metric === item.key && styles.metricSelected]}><Text style={styles.label}>{item.label}</Text></Pressable>
            ))}
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}><Text style={styles.tableDate}>Week</Text>{painMetrics.map((item) => <Text key={item.key} style={styles.tableCell}>{item.label}</Text>)}</View>
            {visibleRecords.map((record) => (
              <View key={record.id} style={styles.tableRow}>
                <Text style={styles.tableDate}>{formatWeek(record.weekStart)}</Text>
                {painMetrics.map((item) => <Text key={item.key} style={styles.tableCell}>{record.pain?.[item.key] ?? '—'}</Text>)}
              </View>
            ))}
          </View>
          {visibleCount < filtered.length ? <Pressable accessibilityRole="button" onPress={showMore} style={styles.secondaryButton}><Text style={styles.secondaryText}>See more records</Text></Pressable> : null}
          {notification ? <View style={styles.toast}><Text accessibilityLiveRegion="polite" style={styles.label}>{notification}</Text></View> : null}
          <Text style={styles.muted}>Each point uses the overall pain score recorded for that assessment.</Text>
          <HealthExportActions html={healthReportHtml(`${metricLabel} pain · ${location}`, trackingReportSections(visibleRecords), chart.xml)} />
        </>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>{myHealthCopy.trackingEmpty}</Text>
          <Text style={[styles.subtitle, styles.centered]}>{myHealthCopy.trackingDescription}</Text>
          <Pressable accessibilityRole="button" onPress={onAssessment} style={styles.primaryButton}><Text style={styles.primaryText}>Record My Pain</Text></Pressable>
        </View>
      ) : weeks.length ? weeks.map((week) => (
        <View key={week}>
          <Pressable accessibilityRole="button" accessibilityLabel={formatWeek(week)} accessibilityState={{ expanded: expandedWeek === week }} onPress={() => setExpandedWeek(expandedWeek === week ? null : week)} style={styles.weekButton}>
            <Text style={styles.cardTitle}>{formatWeek(week)}</Text><Ionicons name={expandedWeek === week ? 'chevron-up' : 'chevron-down'} size={20} color="#51465F" />
          </Pressable>
          {expandedWeek === week ? Object.entries(assessmentLabels).map(([type, label]) => {
            const record = records.find((item) => item.weekStart === week && item.type === type);
            return record ? <Pressable accessibilityRole="button" accessibilityLabel={label} key={type} onPress={() => onRecord(record.id)} style={styles.historyRow}><Text style={styles.value}>{label}</Text><Ionicons name="chevron-forward" size={18} color="#51465F" /></Pressable> : null;
          }) : null}
        </View>
      )) : <View style={styles.empty}><Text style={styles.emptyTitle}>No assessment history yet</Text><Text style={[styles.subtitle, styles.centered]}>Your completed weekly assessments will appear here.</Text></View>}
      <Text style={styles.sessionNote}>{myHealthCopy.sessionNote}</Text>
    </HealthScreen>
  );
}

import { formatWeek, myHealthCopy } from './MyHealth.data';
import type { AssessmentRecord, HealthSection, PainMetric } from './MyHealth.types';

export function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export function painChartSvg(records: AssessmentRecord[], metric: PainMetric) {
  const chronological = [...records].reverse();
  const width = Math.max(320, records.length * 48 + 40);
  const points = chronological.flatMap((record, index) => {
    const value = record.pain?.[metric];
    if (value === undefined || value === null) return [];
    return [{
      x: records.length === 1 ? width / 2 : 32 + index * (width - 52) / (records.length - 1),
      y: 224 - value * 20,
      value,
      date: `${record.weekStart.slice(8, 10)}/${record.weekStart.slice(5, 7)}`,
    }];
  });
  const path = points.map((point) => `${point.x},${point.y}`).join(' ');
  const grid = Array.from({ length: 11 }, (_, value) => {
    const y = 224 - value * 20;
    return `<line x1="28" x2="${width - 12}" y1="${y}" y2="${y}" stroke="#D8D1DE" stroke-dasharray="2 3"/><text x="20" y="${y + 4}" text-anchor="end" font-size="10" fill="#716979">${value}</text>`;
  }).join('');
  const area = points.length > 1 ? `<polygon points="${points[0].x},224 ${path} ${points.at(-1)!.x},224" fill="#EEE5FF"/>` : '';
  const labels = points.map((point) => `<circle cx="${point.x}" cy="${point.y}" r="3.5" fill="#7554B8"/><text x="${point.x}" y="${point.y - 9}" text-anchor="middle" font-size="11" fill="#4D3A67">${point.value}</text><text x="${point.x}" y="245" text-anchor="middle" font-size="10" fill="#4F4B55">${point.date}</text>`).join('');
  return { width, xml: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 260" width="${width}" height="260">${area}${grid}<polyline points="${path}" fill="none" stroke="#7554B8" stroke-width="2"/>${labels}</svg>` };
}

export function healthReportHtml(title: string, sections: HealthSection[], chart = '') {
  const content = sections.map((section) => `<section><h2>${escapeHtml(section.title)}</h2>${section.items.map((item) => `<div class="item"><strong>${escapeHtml(item.label)}</strong><p>${escapeHtml(item.value)}</p></div>`).join('')}</section>`).join('');
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>${escapeHtml(title)}</title><style>
    @page { size: A4; margin: 18mm; } * { box-sizing: border-box; }
    body { font: 14px/1.5 Arial, sans-serif; color: #17151B; margin: 24px auto; max-width: 760px; padding: 0 16px; }
    h1 { font-size: 25px; } h2 { font-size: 18px; margin: 0 0 16px; }
    section { background: #F4F2F8; border-radius: 12px; padding: 18px; margin: 18px 0; }
    .item { break-inside: avoid; margin: 12px 0; overflow-wrap: anywhere; } p { margin: 3px 0 10px; white-space: pre-wrap; }
    svg { width: 100%; height: auto; } .note { font-size: 11px; color: #716979; }
    button { padding: 12px 20px; border: 0; border-radius: 20px; background: #6850A1; color: white; cursor: pointer; }
    @media print { body { margin: 0; padding: 0; } button { display: none; } h2 { break-after: avoid; } }
  </style></head><body><h1>${escapeHtml(title)}</h1><p class="note">MPOWERED · Generated ${escapeHtml(new Date().toLocaleDateString('en-AU'))}</p>${chart}${content}<p class="note">${escapeHtml(myHealthCopy.sessionNote)}</p></body></html>`;
}

export function trackingReportSections(records: AssessmentRecord[]): HealthSection[] {
  return records.map((record) => ({
    title: formatWeek(record.weekStart),
    items: [
      { label: 'Average pain', value: `${record.pain?.averagePain ?? 'Not recorded'}` },
      { label: 'Worst pain', value: `${record.pain?.worstPain ?? 'Not recorded'}` },
      { label: 'Mildest pain', value: `${record.pain?.mildestPain ?? 'Not recorded'}` },
    ],
  }));
}

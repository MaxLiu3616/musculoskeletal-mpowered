export async function exportHealthReport(html: string, _share: boolean) {
  const report = window.open('', '_blank');
  if (!report) throw new Error('Allow pop-ups to open your PDF print preview.');
  report.opener = null;
  report.document.open();
  report.document.write(html);
  report.document.close();
  const printButton = report.document.createElement('button');
  printButton.textContent = 'Print / Save as PDF';
  printButton.onclick = () => report.print();
  report.document.body.prepend(printButton);
}

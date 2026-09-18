import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const renderTable = typeof autoTable === 'function' ? autoTable : autoTable.default;

/**
 * Generates and downloads a clean, professional PDF report of the analysis.
 * @param {object} analysis - The structured analysis object
 * @param {object} meta - Metadata including fileName and analyzedAt
 */
export function generatePDFReport(analysis, meta = {}) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryColor = [12, 142, 233]; // Brand blue
  const darkColor = [30, 41, 59]; // Slate 800
  const successColor = [16, 185, 129]; // Emerald
  const warningColor = [245, 158, 11]; // Amber

  // Page setup
  const pageWidth = doc.internal.pageSize.getWidth();
  let currentY = 18;

  // Header Banner
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('CareerLens — AI Resume & Job Match Report', 14, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Actionable ATS Alignment & Technical Interview Preparation', 14, 18);

  currentY = 32;

  // Overview Table
  const analyzedDate = meta.analyzedAt
    ? new Date(meta.analyzedAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : new Date().toLocaleDateString();

  renderTable(doc, {
    startY: currentY,
    theme: 'grid',
    head: [['Resume Document', 'Target Match Score', 'Match Level', 'Generated Date']],
    body: [
      [
        meta.fileName || 'Uploaded_Resume.pdf',
        `${analysis.matchScore}%`,
        analysis.matchLevel || 'Good Match',
        analyzedDate,
      ],
    ],
    headStyles: {
      fillColor: darkColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [51, 65, 85],
    },
    columnStyles: {
      1: { fontStyle: 'bold', textColor: primaryColor },
    },
  });

  currentY = doc.lastAutoTable.finalY + 8;

  // Executive Summary
  doc.setTextColor(...darkColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Executive Assessment Summary', 14, currentY);

  currentY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);

  const splitSummary = doc.splitTextToSize(analysis.summary || 'No summary available.', pageWidth - 28);
  doc.text(splitSummary, 14, currentY);
  currentY += splitSummary.length * 4.5 + 6;

  // Skills Alignment Table
  const maxSkillsRows = Math.max(
    analysis.matchingSkills?.length || 0,
    analysis.missingSkills?.length || 0
  );

  const skillsRows = [];
  for (let i = 0; i < maxSkillsRows; i++) {
    const match = analysis.matchingSkills?.[i] ? `[OK] ${analysis.matchingSkills[i]}` : '';
    const gap = analysis.missingSkills?.[i] ? `[GAP] ${analysis.missingSkills[i]}` : '';
    skillsRows.push([match, gap]);
  }

  renderTable(doc, {
    startY: currentY,
    theme: 'striped',
    head: [['Skills Found in Resume (Strengths)', 'Skills Missing / Required (Gaps)']],
    body: skillsRows.length > 0 ? skillsRows : [['No skills matched', 'None detected']],
    headStyles: {
      fillColor: [241, 245, 249],
      textColor: darkColor,
      fontStyle: 'bold',
      fontSize: 9,
    },
    columnStyles: {
      0: { textColor: [22, 101, 52], fontSize: 8.5 },
      1: { textColor: [180, 83, 9], fontSize: 8.5 },
    },
  });

  currentY = doc.lastAutoTable.finalY + 8;

  // Strengths & Weaknesses
  if (currentY > 230) {
    doc.addPage();
    currentY = 20;
  }

  doc.setTextColor(...darkColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Key Strengths & Growth Areas', 14, currentY);
  currentY += 6;

  const strengthsBody = (analysis.strengths || []).map((s, idx) => [`${idx + 1}.`, s]);
  renderTable(doc, {
    startY: currentY,
    theme: 'plain',
    head: [['#', 'Demonstrated Strengths']],
    body: strengthsBody,
    headStyles: { fillColor: [248, 250, 252], textColor: darkColor, fontStyle: 'bold', fontSize: 9 },
    columnStyles: { 0: { cellWidth: 8, fontStyle: 'bold' }, 1: { fontSize: 8.5, textColor: [51, 65, 85] } },
  });

  currentY = doc.lastAutoTable.finalY + 5;

  if (currentY > 230) {
    doc.addPage();
    currentY = 20;
  }

  const weaknessesBody = (analysis.weaknesses || []).map((w, idx) => [`${idx + 1}.`, w]);
  renderTable(doc, {
    startY: currentY,
    theme: 'plain',
    head: [['#', 'Areas for Enhancement / Weaknesses']],
    body: weaknessesBody,
    headStyles: { fillColor: [248, 250, 252], textColor: darkColor, fontStyle: 'bold', fontSize: 9 },
    columnStyles: { 0: { cellWidth: 8, fontStyle: 'bold' }, 1: { fontSize: 8.5, textColor: [51, 65, 85] } },
  });

  currentY = doc.lastAutoTable.finalY + 8;

  // Recommendations
  if (currentY > 220) {
    doc.addPage();
    currentY = 20;
  }

  doc.setTextColor(...darkColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Actionable Recommendations for Improvement', 14, currentY);
  currentY += 6;

  const recsBody = (analysis.recommendations || []).map((r, idx) => [`${idx + 1}.`, r]);
  renderTable(doc, {
    startY: currentY,
    theme: 'plain',
    body: recsBody,
    columnStyles: { 0: { cellWidth: 8, fontStyle: 'bold', textColor: primaryColor }, 1: { fontSize: 8.5, textColor: [51, 65, 85] } },
  });

  currentY = doc.lastAutoTable.finalY + 8;

  // Interview Questions (Always on new page for clean printable study sheet)
  doc.addPage();
  currentY = 20;

  doc.setTextColor(...darkColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Tailored Interview Preparation Questions', 14, currentY);

  currentY += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Curated based on your resume projects, technical stack, and target job requirements.', 14, currentY);
  currentY += 6;

  const questionsBody = (analysis.interviewQuestions || []).map((q, idx) => [
    `${idx + 1}`,
    q.category || 'Technical',
    q.question,
  ]);

  renderTable(doc, {
    startY: currentY,
    theme: 'striped',
    head: [['#', 'Category', 'Targeted Interview Question']],
    body: questionsBody,
    headStyles: {
      fillColor: darkColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8.5,
    },
    columnStyles: {
      0: { cellWidth: 8, fontStyle: 'bold', halign: 'center' },
      1: { cellWidth: 26, fontStyle: 'bold', textColor: primaryColor, fontSize: 8 },
      2: { fontSize: 8.5, textColor: [51, 65, 85] },
    },
  });

  // Add page numbers in footer
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `CareerLens Assessment Report  |  Page ${i} of ${totalPages}`,
      pageWidth / 2,
      288,
      { align: 'center' }
    );
  }

  // Trigger download
  const safeName = (meta.fileName || 'CareerLens_Analysis')
    .replace(/\.pdf$/i, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`${safeName}_CareerLens_Report.pdf`);
  return doc;
}

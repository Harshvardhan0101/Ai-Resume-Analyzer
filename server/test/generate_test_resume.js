import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const doc = new jsPDF();

doc.setFont('helvetica', 'bold');
doc.setFontSize(18);
doc.text('Alex Johnson', 20, 20);

doc.setFont('helvetica', 'normal');
doc.setFontSize(10);
doc.text('Email: alex.johnson@email.com | Phone: +1 555-0199 | Location: San Francisco, CA', 20, 28);
doc.text('LinkedIn: linkedin.com/in/alexjohnson | GitHub: github.com/alexjohnson', 20, 34);

doc.setFont('helvetica', 'bold');
doc.setFontSize(13);
doc.text('Education', 20, 44);
doc.setFont('helvetica', 'normal');
doc.setFontSize(10);
doc.text('B.Tech in Information Technology - GPA: 3.8/4.0', 20, 50);

doc.setFont('helvetica', 'bold');
doc.setFontSize(13);
doc.text('Technical Skills', 20, 60);
doc.setFont('helvetica', 'normal');
doc.setFontSize(10);
doc.text('Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3, Python', 20, 66);
doc.text('Frontend & Frameworks: React.js, Next.js, Tailwind CSS, Redux Toolkit', 20, 72);
doc.text('Backend & Databases: Node.js, Express.js, REST APIs, PostgreSQL, MongoDB', 20, 78);
doc.text('Developer Tools: Git, GitHub, Docker, Postman, VS Code, Linux', 20, 84);

doc.setFont('helvetica', 'bold');
doc.setFontSize(13);
doc.text('Projects', 20, 94);
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.text('CampusMart - Student E-Commerce Platform (React, Node.js, Express, MongoDB)', 20, 102);
doc.setFont('helvetica', 'normal');
doc.setFontSize(10);
doc.text('- Architected a responsive web store using React.js and Tailwind CSS with shopping cart state.', 20, 108);
doc.text('- Implemented RESTful API endpoints for product catalogs, order processing, and user auth.', 20, 114);

doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.text('DevPulse - Developer Portfolio & Blog Generator (React, Tailwind CSS, Git API)', 20, 126);
doc.setFont('helvetica', 'normal');
doc.setFontSize(10);
doc.text('- Built a dynamic developer dashboard integrating GitHub REST API to showcase repositories.', 20, 132);
doc.text('- Implemented responsive dark mode layout and client-side markdown rendering.', 20, 138);

const pdfOutput = doc.output('arraybuffer');
const outputPath = path.join(__dirname, 'sample_resume.pdf');
fs.writeFileSync(outputPath, Buffer.from(pdfOutput));

console.log('Sample resume PDF generated successfully at:', outputPath);

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit'); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to store the report data in UserData.json
app.route('/api/storeReport')
  .get((req, res) => {
    // Read existing data from UserData.json (if any)
    const userDataFile = './UserData.json';
    let existingData = [];

    try {
      const userData = fs.readFileSync(userDataFile);
      existingData = JSON.parse(userData);
    } catch (error) {
      console.error('Error reading UserData.json:', error);
    }

    // Respond with the stored report data as an array in JSON format
    res.status(200).json(existingData);
  })
  .post((req, res) => {
    const reportData = req.body;

    // Assuming you want to store the report data in an array in UserData.json
    const userDataFile = './UserData.json';

    // Read existing data from UserData.json (if any)
    let existingData = [];
    try {
      existingData = JSON.parse(fs.readFileSync(userDataFile));
    } catch (error) {
      console.error('Error reading UserData.json:', error);
    }

    // Append the new report data to the existing data
    existingData.push(reportData);

    // Write the updated data back to UserData.json
    fs.writeFile(userDataFile, JSON.stringify(existingData, null, 2), (err) => {
      if (err) {
        console.error('Error writing to UserData.json:', err);
        return res.status(500).json({ error: 'Error storing report data' });
      }

      console.log('Report data stored successfully');
      return res.status(200).json({ message: 'Report data stored successfully' });
    });
  });

// Endpoint to generate a PDF report
app.post('/api/generatePDFReport', (req, res) => {
  const reportData = req.body;
  const pdfDoc = new PDFDocument();

  // Set the response headers for PDF download
  res.setHeader('Content-Disposition', 'attachment; filename="tourist_report.pdf"');
  res.setHeader('Content-Type', 'application/pdf');

  // Pipe the PDF document to the response
  pdfDoc.pipe(res);

  // Write the report data to the PDF document
  pdfDoc.fontSize(16).text('Tourist Report', { align: 'center' });
  pdfDoc.fontSize(12).text(JSON.stringify(reportData, null, 2));

  // End and finalize the PDF document
  pdfDoc.end();
});

app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});

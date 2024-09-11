const express = require('express');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const docx = require('docx'); // Word document library
const { Document, Packer, Paragraph, TextRun } = docx;
const app = express();
const port = 3000;
const hostname='0.0.0.0';

app.use(bodyParser.urlencoded({ extended: true }));

// Store user details between form submissions for all pages
let userDetails = {};

app.use(express.static('public'));

// Page 1 Form Submission (User Details)
app.post('/next-details-p1', (req, res) => {
    userDetails.name1 = req.body.name1;
    userDetails.age1 = req.body.age1;
    userDetails.email1 = req.body.email1;

    // Redirect to the second form (town details for Page 1)
    res.sendFile(__dirname + '/public/page1-1.html');
});

// Page 1 Town Details and File Generation
app.post('/submit-details-p1', (req, res) => {
    userDetails.town1 = req.body.town1;

    // Generate the PDF for Page 1
    const pdfFilePathP1 = path.join(__dirname, `./public/user_details_page1_${Date.now()}.pdf`);
    const docP1 = new PDFDocument();
    const pdfStreamP1 = fs.createWriteStream(pdfFilePathP1);

    docP1.pipe(pdfStreamP1);
    docP1.fontSize(18).text('User Details (Page 1)', { align: 'center' });
    docP1.moveDown();
    docP1.fontSize(14).text(`Name: ${userDetails.name1}`);
    docP1.text(`Age: ${userDetails.age1}`);
    docP1.text(`Email: ${userDetails.email1}`);
    docP1.text(`Town: ${userDetails.town1}`);
    docP1.end();

    // Generate the Word document for Page 1
    const wordFilePathP1 = path.join(__dirname, `./public/user_details_page1_${Date.now()}.docx`);
    const docxContentP1 = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "User Details (Page 1)",
                                bold: true,
                                size: 32,
                            }),
                        ],
                        alignment: docx.AlignmentType.CENTER,
                    }),
                    new Paragraph({ children: [new TextRun(`Name: ${userDetails.name1}`)] }),
                    new Paragraph({ children: [new TextRun(`Age: ${userDetails.age1}`)] }),
                    new Paragraph({ children: [new TextRun(`Email: ${userDetails.email1}`)] }),
                    new Paragraph({ children: [new TextRun(`Town: ${userDetails.town1}`)] }),
                ],
            },
        ],
    });

    Packer.toBuffer(docxContentP1).then((buffer) => {
        fs.writeFileSync(wordFilePathP1, buffer);
    });

    // Provide download links
    pdfStreamP1.on('finish', () => {
        res.send(`
            <h1>User Details for Page 1 Submitted!</h1>
            <p>Name: ${userDetails.name1}</p>
            <p>Age: ${userDetails.age1}</p>
            <p>Email: ${userDetails.email1}</p>
            <p>Town: ${userDetails.town1}</p>
            <a href="/download-pdf?path=${pdfFilePathP1}">Download PDF</a><br>
            <a href="/download-word?path=${wordFilePathP1}">Download Word Document</a>
        `);
    });
});

// Repeat similar steps for Page 2 and Page 3

// Page 2 Form Submission
app.post('/next-details-p2', (req, res) => {
    userDetails.name2 = req.body.name2;
    userDetails.age2 = req.body.age2;
    userDetails.email2 = req.body.email2;

    // Redirect to the second form (town details for Page 2)
    res.sendFile(__dirname + '/public/page2-1.html');
});

app.post('/submit-details-p2', (req, res) => {
    userDetails.town2 = req.body.town2;

    const pdfFilePathP2 = path.join(__dirname, `./public/user_details_page2_${Date.now()}.pdf`);
    const docP2 = new PDFDocument();
    const pdfStreamP2 = fs.createWriteStream(pdfFilePathP2);

    docP2.pipe(pdfStreamP2);
    docP2.fontSize(18).text('User Details (Page 2)', { align: 'center' });
    docP2.moveDown();
    docP2.fontSize(14).text(`Name: ${userDetails.name2}`);
    docP2.text(`Age: ${userDetails.age2}`);
    docP2.text(`Email: ${userDetails.email2}`);
    docP2.text(`Town: ${userDetails.town2}`);
    docP2.end();

    const wordFilePathP2 = path.join(__dirname, `./public/user_details_page2_${Date.now()}.docx`);
    const docxContentP2 = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "User Details (Page 2)",
                                bold: true,
                                size: 32,
                            }),
                        ],
                        alignment: docx.AlignmentType.CENTER,
                    }),
                    new Paragraph({ children: [new TextRun(`Name: ${userDetails.name2}`)] }),
                    new Paragraph({ children: [new TextRun(`Age: ${userDetails.age2}`)] }),
                    new Paragraph({ children: [new TextRun(`Email: ${userDetails.email2}`)] }),
                    new Paragraph({ children: [new TextRun(`Town: ${userDetails.town2}`)] }),
                ],
            },
        ],
    });

    Packer.toBuffer(docxContentP2).then((buffer) => {
        fs.writeFileSync(wordFilePathP2, buffer);
    });

    pdfStreamP2.on('finish', () => {
        res.send(`
            <h1>User Details for Page 2 Submitted!</h1>
            <p>Name: ${userDetails.name2}</p>
            <p>Age: ${userDetails.age2}</p>
            <p>Email: ${userDetails.email2}</p>
            <p>Town: ${userDetails.town2}</p>
            <a href="/download-pdf?path=${pdfFilePathP2}">Download PDF</a><br>
            <a href="/download-word?path=${wordFilePathP2}">Download Word Document</a>
        `);
    });
});

// Page 3 Form Submission
app.post('/next-details-p3', (req, res) => {
    userDetails.name3 = req.body.name3;
    userDetails.age3 = req.body.age3;
    userDetails.email3 = req.body.email3;

    // Redirect to the second form (town details for Page 3)
    res.sendFile(__dirname + '/public/page3-1.html');
});

app.post('/submit-details-p3', (req, res) => {
    userDetails.town3 = req.body.town3;

    const pdfFilePathP3 = path.join(__dirname, `./public/user_details_page3_${Date.now()}.pdf`);
    const docP3 = new PDFDocument();
    const pdfStreamP3 = fs.createWriteStream(pdfFilePathP3);

    docP3.pipe(pdfStreamP3);
    docP3.fontSize(18).text('User Details (Page 3)', { align: 'center' });
    docP3.moveDown();
    docP3.fontSize(14).text(`Name: ${userDetails.name3}`);
    docP3.text(`Age: ${userDetails.age3}`);
    docP3.text(`Email: ${userDetails.email3}`);
    docP3.text(`Town: ${userDetails.town3}`);
    docP3.end();

    const wordFilePathP3 = path.join(__dirname, `./public/user_details_page3_${Date.now()}.docx`);
    const docxContentP3 = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "User Details (Page 3)",
                                bold: true,
                                size: 32,
                            }),
                        ],
                        alignment: docx.AlignmentType.CENTER,
                    }),
                    new Paragraph({ children: [new TextRun(`Name: ${userDetails.name3}`)] }),
                    new Paragraph({ children: [new TextRun(`Age: ${userDetails.age3}`)] }),
                    new Paragraph({ children: [new TextRun(`Email: ${userDetails.email3}`)] }),
                    new Paragraph({ children: [new TextRun(`Town: ${userDetails.town3}`)] }),
                ],
            },
        ],
    });

    Packer.toBuffer(docxContentP3).then((buffer) => {
        fs.writeFileSync(wordFilePathP3, buffer);
    });

    pdfStreamP3.on('finish', () => {
        res.send(`
            <h1>User Details for Page 3 Submitted!</h1>
            <p>Name: ${userDetails.name3}</p>
            <p>Age: ${userDetails.age3}</p>
            <p>Email: ${userDetails.email3}</p>
            <p>Town: ${userDetails.town3}</p>
            <a href="/download-pdf?path=${pdfFilePathP3}">Download PDF</a><br>
            <a href="/download-word?path=${wordFilePathP3}">Download Word Document</a>
        `);
    });
});
app.post('/next-details', (req, res) => {
    userDetails.name = req.body.name;
    userDetails.age = req.body.age;
    userDetails.email = req.body.email;

    // Redirect to second form (town details page)
    res.sendFile(__dirname + '/public/evaluationsddff2.html');
});

// Handle second form submission (town) and generate the PDF and Word document
app.post('/submit-details', (req, res) => {
    userDetails.town = req.body.town;

    // Generate the PDF
    const pdfFilePath = path.join(__dirname, `./public/user_details_${Date.now()}.pdf`);
    const doc = new PDFDocument();
    const pdfStream = fs.createWriteStream(pdfFilePath);

    doc.pipe(pdfStream);
    doc.fontSize(18).text('User Details', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Name: ${userDetails.name}`);
    doc.text(`Age: ${userDetails.age}`);
    doc.text(`Email: ${userDetails.email}`);
    doc.text(`Town: ${userDetails.town}`);
    doc.end();

    // Generate the Word document
    const wordFilePath = path.join(__dirname, `./public/user_details_${Date.now()}.docx`);
    const docxContent = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "User Details",
                                bold: true,
                                size: 32,
                            }),
                        ],
                        alignment: docx.AlignmentType.CENTER,
                    }),
                    new Paragraph({ children: [new TextRun(`Name: ${userDetails.name}`)] }),
                    new Paragraph({ children: [new TextRun(`Age: ${userDetails.age}`)] }),
                    new Paragraph({ children: [new TextRun(`Email: ${userDetails.email}`)] }),
                    new Paragraph({ children: [new TextRun(`Town: ${userDetails.town}`)] }),
                ],
            },
        ],
    });

    Packer.toBuffer(docxContent).then((buffer) => {
        fs.writeFileSync(wordFilePath, buffer);
    });

    // After both files are generated, provide download links
    pdfStream.on('finish', () => {
        res.send(`
            <h1>User Details Submitted!</h1>
            <p>Name: ${userDetails.name}</p>
            <p>Age: ${userDetails.age}</p>
            <p>Email: ${userDetails.email}</p>
            <p>Town: ${userDetails.town}</p>
            <a href="/download-pdf?path=${pdfFilePath}">Download PDF</a><br>
            <a href="/download-word?path=${wordFilePath}">Download Word Document</a>
        `);
    });
});

// Download PDF or Word file
app.get('/download-pdf', (req, res) => {
    const filePath = req.query.path;
    res.download(filePath, (err) => {
        if (err) {
            res.status(500).send('Error downloading the PDF');
        }
    });
});

app.get('/download-word', (req, res) => {
    const filePath = req.query.path;
    res.download(filePath, (err) => {
        if (err) {
            res.status(500).send('Error downloading the Word document');
        }
    });
});

app.listen(port, () => {
    console.log(`App running at http://${hostname}:, ${port}/`);
});

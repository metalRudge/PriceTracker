const cors = require('cors'); 

const express = require('express');
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = process.env.PORT || 3000;
// Import the cors middleware

app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Set SendGrid API key
sgMail.setApiKey('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');

// Endpoint to handle email sending
app.post('/send-email', (req, res) => {
    // Extract data from the request body
    const { to, subject, body } = req.body;

    // Create the email message
    const msg = {
        to, // Recipient email address
        from: 'stefankh69@gmail.com', // Sender email address (must be verified in SendGrid)
        subject,
        text: body
    };

    // Send the email
    sgMail.send(msg)
        .then(() => {
            console.log('Email sent successfully');
            res.send('Email sent successfully'); // Send response back to the client
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email'); // Send error response back to the client
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
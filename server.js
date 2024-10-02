const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rute untuk mengirim email
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Konfigurasi transporter nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Anda bisa menggunakan penyedia email lain
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: 'nwekoder@gmail.com', // Ganti dengan email Anda
      pass: 'ryvd hsgm qdzl vitb' // Ganti dengan password email Anda
    }
  });

  const mailOptions = {
    from: email,
    to: 'jokiofficialyt@gmail.com', // Ganti dengan email Anda
    subject: `New message from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

// Mulai server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Agenda } from 'agenda';
import nodemailer from 'nodemailer';
import path from "path";
const __dirname = path.resolve();
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Setup Agenda
const agenda = new Agenda({
  db: { address: process.env.MONGODB_URI },
});

// Setup Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Define Agenda job
agenda.define('send email', async (job) => {
  const { to, subject, body } = job.attrs.data;
  
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    html: body,
  });
});

// Start Agenda
await agenda.start();

// API Endpoints
// app.post('/api/schedule-email', async (req, res) => {
//   try {
//     const { to, subject, body, delay } = req.body;
//     console.log(`--Scheduling email to ${to} with delay ${delay} hours`);
//     // Schedule email with specified delay (in hours)
//     await agenda.schedule(`in ${delay} minutes`, 'send email', {
//       to,
//       subject,
//       body,
//     });
    
//     res.json({ message: 'Email scheduled successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.post('/api/save-flow', async (req, res) => {
  try {
    const { nodes, edges, totalDelay } = req.body;
    
    // Process flow and schedule emails
    for (const node of nodes) {
      if (node.data.type === 'email' && node.data.config) {
        const { email, subject, body } = node.data.config;
        
        // Schedule email with accumulated delay
      //  console.log(`Scheduling email to ${email} with delay ${totalDelay} min`);
        await agenda.schedule(`in ${totalDelay} minutes`, 'send email', {
          to: email,
          subject,
          body,
        });
      }
    }
    
    res.json({ message: 'Flow saved and emails scheduled' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
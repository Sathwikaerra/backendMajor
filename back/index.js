import express  from 'express'
import mongoose from 'mongoose';
import dotenv from "dotenv"
import userRouter from './routes/userRoute.js';
import adminRouter from './routes/adminRouter.js';
import movieRouter from './routes/movieRoute.js';
import bookingRouter from './routes/bookingRouter.js';
import cors from 'cors'
import path from 'path'
import fetch from 'node-fetch';
import ticketRouter from './routes/ticketRouter.js';
import reviewRouter from './routes/reviewRouter.js'
import timingRouter from './routes/timingRouter.js';
// import PaypalRouter from './routes/paypalRouter.js';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';



// import {fileURLToPath} from 'url'

// const __filename=fileURLToPath(import.meta.url)
// const __dirname=path.dirname(__filename);
// console.log(__dirname)
const __dirname=path.resolve();



dotenv.config()

const app=express();

app.use(cors())

app.use(express.json())

app.use(bodyParser.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "Gmail", // Or your email provider
  auth: {
    user: "sathwiktheprince143@gmail.com", // Replace with your email
    pass: "zfwa shtf itcw zegh", // Replace with your password or app-specific password
  },
});

app.post("/send-email", (req, res) => {
  console.log(res.body)
  const { email, pdfBase64 ,emailParams} = req.body;

  const mailOptions = {
    from: "sathwiktheprince143@gmail.com",
    to: email,
    subject: "Your Movie Ticket",
    text: "Please find your movie ticket attached.",
    html: `
    <h2>Your Movie Ticket Confirmation</h2>
    <p>Dear ${emailParams.username},</p>
    <p>Thank you for booking your movie ticket. Here are the details of your booking:</p>
    <ul>
      <li><strong>Movie:</strong> ${emailParams.name}</li>
      <li><strong>Date & Time:</strong> ${emailParams.timing}</li>
      <li><strong>Seats:</strong> ${emailParams.seats}</li>
      <li><strong>Total Price:</strong> $${emailParams.price}</li>
    </ul>
    <p>Please find your ticket attached to this email. Enjoy the show!</p>
    <p>Best regards,<br>The Movie Team</p>
  `,
    attachments: [
      {
        filename: "ticket.pdf",
        content: pdfBase64,
        encoding: "base64",
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Failed to send email.");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully!");
    }
  });
});



app.use('/user',userRouter)
app.use('/admin',adminRouter)
app.use('/movie',movieRouter)
app.use('/booking',bookingRouter)
app.use('/ticket',ticketRouter)
app.use('/review',reviewRouter)
app.use('/timing',timingRouter)
// app.use(express.static(path.join(__dirname,'/front/build')));

// app.get('*',(req,res)=>{

//     res.sendFile(path.join(__dirname,'front','build','index.html'));

// })

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use('/api/hello',(req,res,next)=>{
res.send("hiii")
})
app.use((req,res,next)=>{
  res.setHeader("Cross-Origin-Opener-Policy","same-origin-allow-popups");
  next();
})

async function getAccessToken() {
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString('base64');
  
    const response = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });
  
    if (!response.ok) {
      throw new Error(`PayPal token error: ${await response.text()}`);
    }
  
    return await response.json();
  }
  
  app.post('/api/create-order', async (req, res) => {
    try {
      const { access_token } = await getAccessToken();
      const order = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: '100.00',
              },
            },
          ],
        }),
      });
  
      if (!order.ok) {
        throw new Error(`PayPal order creation error: ${await order.text()}`);
      }
  
      const orderData = await order.json();
      res.json(orderData);
    } catch (err) {
      console.error('Error creating PayPal order:', err);
      res.status(500).json({ error: err.message });
    }
  });


























try {
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        app.listen(3000,()=>{
            console.log(" db running 3000")
        })
    }).catch((error)=>{
        console.log(error)
    })
    
} catch (error) {
    console.log('error in connecting')
    
}
  




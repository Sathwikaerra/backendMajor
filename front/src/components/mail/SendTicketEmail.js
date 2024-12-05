import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { getMovie } from "../api/apis";
import { jsPDF } from "jspdf";
import axios from "axios";
import logo from  './logo.jpg'




const SendTicketEmail = () => {
  const navigate=useNavigate()

  const [searchParams] = useSearchParams(); 
  const movieId=searchParams.get("movieId");

  useEffect(()=>{
    getMovie(movieId).then((res)=>{
      console.log(res)
      setMovie(res.movie.title)
    })

  },[movieId])

  
  
  // Access query parameters
  const [movie,setMovie]=useState(null);

    const time=searchParams.get("time")
    const cost=searchParams.get("cost")
    const date=searchParams.get("date");

    const { currentUser } = useSelector((state) => state.user);
    const username=currentUser.newuser.name;
    const useremail=currentUser.newuser.email;
    const selectedSeats=JSON.parse(localStorage.getItem("SelectedSeats"))

    

    console.log(username,time,selectedSeats,cost,movie);




  const sendEmail = async(e) => {
    e.preventDefault();

    const doc = new jsPDF();

    doc.setTextColor("#333"); // Set text color
    doc.setFillColor("#f5f5f5"); // Background color for sections
    doc.setFont("helvetica", "bold"); // Font style

    doc.setFontSize(18);
    doc.text("🎬 Movie Ticket 🎟️", 105, 20, { align: "center" });

    doc.setFillColor("#0074D9"); // Blue header
    doc.rect(0, 10, 210, 15, "F"); // Full width of the page
    doc.setTextColor("#ffffff");
    doc.text("Your Movie Ticket", 105, 18, { align: "center" });

    // Reset text color for main content
    doc.setTextColor("#333");

    // doc.text("Movie Ticket", 105, 20, { align: "center" });
    doc.text(`Movie: ${movie}`, 20, 40);
    doc.text(`Date & Time: ${date}-${time}`, 20, 50);
    doc.text(`Seats: ${selectedSeats.join(", ")}`, 20, 60);
    doc.text(`Price: $${cost}`, 20, 70);
    doc.line(10, 80, 200, 80);
    doc.text("Enjoy the show!", 105, 90, { align: "center" });
    doc.setFillColor("#0074D9"); // Footer background
    doc.rect(0, 280, 210, 10, "F"); // Footer rectangle
    doc.setTextColor("#ffffff");
    doc.setFontSize(10);
    doc.text("Thank you for booking with us!", 105, 285, { align: "center" });


    // Convert the PDF to Base64 string
    const pdfBase64 = doc.output('datauristring').split(",")[1];
    // console.log(pdfBase64);

    // Prepare email parameters
    const emailParams = {
      username: username,
      timing:time,
      price:cost,
      name:movie,
      seats: selectedSeats.join(", "), // Convert seats array to a string
      user_email:useremail,
      attachment: pdfBase64, // Base64-encoded PDF
      attachment_filename: "movie_ticket.pdf" // Send to this user's email
    };

    // Replace with your actual EmailJS credentials
    // emailjs
    //   .send("service_370mtps", "template_witfj4m", emailParams, "lycLcuU53NYS9HA3x")
    //   .then(
    //     (response) => {
    //       toast.success(`Mail Sent Successfully to ${username}`, {theme:"colored", position: 'top-center' });
    //       // setEmailStatus("Email sent successfully to the user!");
    //     },
    //     (error) => {
    //       toast.error(`Sorry ${username} Mail not sent due to Technical Reasons ${error}`, {theme:"colored", position: 'top-center' });
    //       // setEmailStatus("Failed to send email.");
    //     }
    //   );
  const res= await axios.post("/send-email", {
        email:useremail, // Recipient email
        pdfBase64:pdfBase64,
        emailParams // Base64 encoded PDF
      })
      if(res.status!=200)
      {
           toast.error(`Sorry ${username} Mail not sent due to Technical Reasons`, {theme:"colored", position: 'top-center' });
 
      }
      else
      {
        toast.success(`Mail Sent Successfully to ${username}`, {theme:"colored", position: 'top-center' });
          navigate('/');

      }


     
  };

  return (
    <div>
      <h2>Send Movie Ticket</h2>
      <button onClick={sendEmail} className="bg-slate-700 text-yellow-100 p-3 active:bg-gray-400 " >Send Email</button>
      {/* {emailStatus && <p>{emailStatus}</p>} */}
    </div>
  );
};

export default SendTicketEmail;

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';


const Paypal = () => {
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  useEffect(() => {
    // Check if PayPal script has been loaded before attempting to render the button
    if (window.paypal && !paypalLoaded) {
      window.paypal.Buttons({
        createOrder: async () => {
          try {
            const response = await fetch("http://localhost:3000/api/create-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const order = await response.json();
            return order.id; // Return PayPal order ID
          } catch (err) {
            console.error("Error creating order:", err);
            throw err;
          }
        },
        onApprove: (data) => {
          toast.success(`Payment successful! Order ID: ${data.orderID}`, {theme:"colored", position: 'top-center' });

          
        },
        onError: (err) => {
          toast.error(`PayPal Button Error`, {theme:"colored", position: 'top-center' });

          
        },
      }).render("#paypal-button-container");

      setPaypalLoaded(true); // Mark PayPal button as rendered
    }
  }, [paypalLoaded]); // Only run the effect once

  return (
    <div className="mt-[250px] font-bold flex flex-col justify-center items-center">
      <h1>PayPal Integration</h1>
      <div id="paypal-button-container"></div>
    </div>
  );
};

export default Paypal;

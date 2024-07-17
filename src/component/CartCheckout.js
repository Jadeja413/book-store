import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Button, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';

const StripeCheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (amount > 0) {
      axios.post('http://localhost:9000/cart/payment', { amount })
        .then(res => {
          console.log('Received clientSecret:', res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch(error => console.error('Error fetching client secret:', error));
    }
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error('Card Element not found');
      return;
    }

    if (!clientSecret) {
      console.error('No client secret available');
      return;
    }

    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (methodError) {
      console.error('Error creating payment method:', methodError);
      toast.error("Invalid Card Details!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500
      });
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (error) {
      console.error('Error confirming card payment:', error);
      toast.error("Payment Failed!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500
      });
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded:', paymentIntent);
      toast.success("Payment Successful!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Box mt={2}>
        <Button type="submit" variant="contained" disabled={!stripe || !clientSecret}>
          Pay Now
        </Button>
      </Box>
    </form>
  );
};

export default StripeCheckoutForm;

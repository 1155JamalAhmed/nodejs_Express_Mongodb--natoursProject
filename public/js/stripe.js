import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51LEWevJhVrCXvhB4Mtb6Xqfu5MqUoXcQcIZBhiVMkdUyCtgc9qj9dbBaUPEDZvXEg2vo9GFxjD3fLD2t700TNVxA00YM8ujjXf'
  );

  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) Create a checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};

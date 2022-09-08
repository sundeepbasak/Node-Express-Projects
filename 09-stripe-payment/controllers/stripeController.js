const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const stripeController = async (req, res) => {
  // console.log(req.body);
  const { purchase, total_amount, shipping_fee } = req.body;

  const calculateOrderAmount = () => {
    return total_amount + shipping_fee;
  };

  //create a payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "inr",
  });
  //console.log(paymentIntent);

  res.json({
    clientSecret: paymentIntent.client_secret,
  });
};

module.exports = stripeController;

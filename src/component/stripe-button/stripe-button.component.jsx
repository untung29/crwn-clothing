import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51J8FOIAkvVWgani6Jww1ahrXHo9gLvGRCXrZnwUmVFQjhADfr9rtriVhMSBtZ2QEtvPJK91ti5K1eRUUNKe8v7MX00ccKPybFp";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      amount={priceForStripe}
      stripeKey={publishableKey}
      label="Pay Now"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total price is ${price}`}
      panelLabel="Pay Now"
      token={onToken}
    />
  );
};

export default StripeCheckoutButton;

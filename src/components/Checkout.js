import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Checkout.css"; // Import CSS file for styles

const Checkout = () => {
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({ name: "", address: "" });

  const handlePayment = () => {
    // Validation logic
    if (!shippingInfo.name.trim()) {
      Swal.fire("Error!", "Please enter your name.", "error");
      return;
    }

    if (!shippingInfo.address.trim()) {
      Swal.fire("Error!", "Please enter your address.", "error");
      return;
    }

    if (shippingInfo.name.length < 3) {
      Swal.fire("Error!", "Name must be at least 3 characters long.", "error");
      return;
    }

    if (shippingInfo.address.length < 5) {
      Swal.fire(
        "Error!",
        "Address must be at least 5 characters long.",
        "error"
      );
      return;
    }

    // Success case
    Swal.fire("Success!", "Your order has been placed.", "success").then(() => {
      navigate("/"); // Redirect to home after success
    });
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      <form className="checkout-form">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={shippingInfo.name}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, name: e.target.value })
          }
        />
        <input
          type="text"
          className="form-control"
          placeholder="Address"
          value={shippingInfo.address}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, address: e.target.value })
          }
        />
        <button
          type="button"
          className="btn btn-primary checkout-btn"
          onClick={handlePayment}
        >
          Complete Payment
        </button>
      </form>
    </div>
  );
};

export default Checkout;

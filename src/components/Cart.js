import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";
import "../styles/Cart.css";

const Cart = ({ cartItems: initialCartItems = [] }) => {
  const [cartItems, setCartItems] = useState(
    initialCartItems.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }))
  );
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    upi: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    address: "",
    username: "",
    home: "",
    city: "",
    state: "",
    location: "",
    pincode: "",
  });

  const handleIncrement = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
  };

  const handleDecrement = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
    } else {
      handleRemove(index);
    }
  };

  const handleRemove = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePayment = () => {
    if (paymentMethod === "upi" && paymentDetails.upi.trim() === "") {
      Swal.fire("Error", "Please enter a valid UPI ID.", "error");
    } else if (
      paymentMethod === "creditCard" &&
      (!paymentDetails.cardNumber.trim() ||
        !paymentDetails.expiryDate.trim() ||
        !paymentDetails.cvv.trim())
    ) {
      Swal.fire("Error", "Please enter all credit card details.", "error");
    } else if (
      paymentMethod === "cod" &&
      (!paymentDetails.username.trim() ||
        !paymentDetails.home.trim() ||
        !paymentDetails.city.trim() ||
        !paymentDetails.state.trim() ||
        !paymentDetails.location.trim() ||
        !paymentDetails.pincode.trim())
    ) {
      Swal.fire(
        "Error",
        "Please fill all address fields for Cash on Delivery.",
        "error"
      );
    } else {
      Swal.fire(
        "Payment Successful",
        `Your payment via ${paymentMethod} has been processed.`,
        "success"
      );
      setCartItems([]); // Clear cart after payment
    }
  };

  return (
    <div className="cart">
      <FaShoppingCart className="cart-logo" />
      <h1 className="cart-heading">Cart</h1>
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                {/* <p>Total: ${(item.price * item.quantity).toFixed(2)}</p> */}
                <div className="cart-item-controls">
                  <button
                    className="btn btn-decrement"
                    onClick={() => handleDecrement(index)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn btn-increment"
                    onClick={() => handleIncrement(index)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-remove"
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="cart-payment">
          <h3>Total Price: ${calculateTotalPrice().toFixed(2)}</h3>
          <h4>Choose Payment Method:</h4>
          <div className="payment-methods">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              UPI
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
          </div>

          {/* Payment Details Form */}
          {paymentMethod === "upi" && (
            <div className="payment-details">
              <input
                type="text"
                placeholder="Enter your UPI ID"
                value={paymentDetails.upi}
                onChange={(e) =>
                  setPaymentDetails({ ...paymentDetails, upi: e.target.value })
                }
              />
            </div>
          )}
          {paymentMethod === "creditCard" && (
            <div className="payment-details">
              <input
                type="text"
                placeholder="Card Number"
                value={paymentDetails.cardNumber}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    cardNumber: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                value={paymentDetails.expiryDate}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    expiryDate: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="CVV"
                value={paymentDetails.cvv}
                onChange={(e) =>
                  setPaymentDetails({ ...paymentDetails, cvv: e.target.value })
                }
              />
            </div>
          )}
          {paymentMethod === "cod" && (
            <div className="payment-details">
              <input
                type="text"
                placeholder="Full Name"
                value={paymentDetails.username}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    username: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Home/Flat No."
                value={paymentDetails.home}
                onChange={(e) =>
                  setPaymentDetails({ ...paymentDetails, home: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="City"
                value={paymentDetails.city}
                onChange={(e) =>
                  setPaymentDetails({ ...paymentDetails, city: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="State"
                value={paymentDetails.state}
                onChange={(e) =>
                  setPaymentDetails({ ...paymentDetails, state: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Location"
                value={paymentDetails.location}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    location: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Pincode"
                value={paymentDetails.pincode}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    pincode: e.target.value,
                  })
                }
              />
            </div>
          )}
          <button className="btn btn-primary checkout-btn" onClick={handlePayment} >
            Confirm Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

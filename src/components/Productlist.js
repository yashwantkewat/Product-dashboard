import React from "react";
import Swal from "sweetalert2"; // Import SweetAlert
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "../styles/ProductList.css";


const ProductList = ({ products, handleAddToCart, handleBuyNow }) => {
  const navigate = useNavigate(); // Use useNavigate to handle navigation

  // Function to determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "status-in-stock";
      case "Low Stock":
        return "status-low-stock";
      case "Out of Stock":
        return "status-out-stock";
      default:
        return "";
    }
  };

  // Function to handle Buy Now (add to cart and go to checkout)
  const handleBuyNowClick = (product) => {
    // Add product to cart first (could be a global state or context)
    handleAddToCart(product);

    // Navigate to the checkout page
    navigate("/checkout"); // Use navigate instead of history.push
  };

  // Function to show SweetAlert confirmation on adding to cart
  const showAddToCartConfirmation = (product) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${product.title} will be added to your cart.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Add to Cart",
      cancelButtonText: "No, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleAddToCart(product); // Add product to cart if confirmed
        Swal.fire("Added!", `${product.title} has been added to your cart.`, "success");
      }
    });
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-card"
          tabIndex={0} // Makes the card focusable for accessibility
        >
          <div className="product-image-container">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
           
          </div>

          <div className="product-info">
            <h3 className="product-name">{product.title}</h3>
            <div className="price-tag">${product.price.toFixed(2)}</div>
            <p className="product-category">
              <span className="label">Category: {product.category}</span> 
            </p>
            <p className="product-description">{product.description}</p>
            <div className={`product-status ${getStatusColor(product.status)}`}>
              {product.status}
            </div>
            <div className="product-actions">
              <button
                className="add-to-cart-btn"
                onClick={() => showAddToCartConfirmation(product)} // Trigger confirmation popup
              >
                Add to Cart
              </button>
              <button
                className="buy-now-btn"
                onClick={() => handleBuyNowClick(product)} // Handle Buy Now functionality
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

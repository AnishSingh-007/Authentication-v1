// RelatedProducts.js

import React from 'react';
import './RelatedProducts.css';

const RelatedProducts = () => {
  return (
    <div className="related-products">
      <h2>Related Products</h2>
      <div className="product-card">
        <img src="image-url" alt="Product" />
        <h3>Product Name</h3>
        <p>Product Description</p>
        <span>$99.99</span>
        <button>Add to Cart</button>
      </div>
      {/* Add more product cards as needed */}
    </div>
  );
};

export default RelatedProducts;

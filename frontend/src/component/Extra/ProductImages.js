// ProductImages.js

import React from 'react';
import './ProductImages.css';

const ProductImages = () => {
  return (
    <div className="product-images">
      <div className="main-image">
        <img src="/main-image.jpg" alt="Product" />
      </div>
      <div className="thumbnail-images">
        <img src="/thumbnail1.jpg" alt="Thumbnail 1" />
        <img src="/thumbnail2.jpg" alt="Thumbnail 2" />
        <img src="/thumbnail3.jpg" alt="Thumbnail 3" />
        {/* Add more thumbnail images as needed */}
      </div>
    </div>
  );
};

export default ProductImages;

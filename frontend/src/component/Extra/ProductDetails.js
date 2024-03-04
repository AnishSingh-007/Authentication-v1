import React, { useState , useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';
import ProductReviews from './ProductReviews';
import RelatedProducts from './RelatedProducts';
import Footer from './Footer';
import './ProductDetails.css';

const ProductDetails = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [selectedExams, setSelectedExams] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMode, setSelectedMode] = useState([]);
       
  useEffect(() => {
    console.log(selectedExams);
  }, [selectedExams]);

  return (
    <div className="main-page">
      <Header />
      <div className="content-testseries">
        <Sidebar onFilterChange={(filters) => {
            setSelectedExams(filters.exam);     
            setSelectedCategories(filters.categories);
            setSelectedMode(filters.modes);
          }} />
        <div className="product-details">
          <ProductImages />
          <ProductInfo selectedExams={selectedExams} selectedCategories={selectedCategories} selectedModes={selectedMode} />
          <ProductReviews />
          <RelatedProducts data={filteredData} /> {/* Pass filtered data */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;

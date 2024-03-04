import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ onFilterChange }) => {
  const [selectedExams, setSelectedExams] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedModes, setSelectedModes] = useState([]);

  console.log(selectedExams)

  const exams = [
    { id: 'SSC', name: 'SSC' },
    { id: 'Railway', name: 'Railway' },
    { id: 'Delhi Police', name: 'Delhi Police' },
    // Add more exams as needed
  ];

  const mode = [
    { id: '1', name: 'Full Test' },
    { id: '2', name: 'Subject Test' },
    { id: '3', name: 'Chapter Test' },
    { id: '4', name: 'Previous Test' },
  ];
              
  const categories = {   
    SSC: [
      { id: '2', name: 'SSC CGL Tier 1' },
      { id: '3', name: 'SSC CGL Tier 2' },
    ],
    Railway: [
      { id: '4', name: 'Railway Exam' },
    ],
    'delhi-police': [
      // Add Delhi Police categories here
    ],
    // Add more exam-category mappings as needed
  };  

  const handleModeChange = (event) => {    
    var selectedMode = event.target.value;
    
    // Toggle the selected exam   
    if (selectedModes.includes(selectedMode)) {
      setSelectedModes(selectedModes.filter((mode) => mode !== selectedMode));
      onFilterChange({ exam: selectedExams, categories: [], modes: selectedModes.filter((mode) => mode !== selectedMode)});
      //setSelectedExams([...selectedExams, selectedExam]);
    } else {
      setSelectedModes([...selectedModes, selectedMode]); 
      onFilterChange({ exam: selectedExams, categories: [], modes: [...selectedModes, selectedMode] });
    }  
         
    // Clear selected categories
    //setSelectedCategories([]);
    //setSelectedModes([])

    // Pass the updated selected exams and cleared categories to the parent component
    // if(event.target.checked === true){
    
    // }else{  
    //   selectedExam = ''
    // }  
  
  
  }; 
  
  
  const handleExamChange = (event) => {    
    var selectedExam = event.target.value;
    
    // Toggle the selected exam   
    if (selectedExams.includes(selectedExam)) {
      setSelectedExams(selectedExams.filter((exam) => exam !== selectedExam));
      onFilterChange({ exam: selectedExams.filter((exam) => exam !== selectedExam), categories: [], modes: selectedModes });
      //setSelectedExams([...selectedExams, selectedExam]);
    } else {
      setSelectedExams([...selectedExams, selectedExam]); 
      onFilterChange({ exam: [...selectedExams, selectedExam], categories: [], modes: selectedModes });
    }  
         
    // Clear selected categories
    //setSelectedCategories([]);
  
    // Pass the updated selected exams and cleared categories to the parent component
    // if(event.target.checked === true){
    
    // }else{  
    //   selectedExam = ''
    // }  
  
  
  }; 
      
  const handleCategoryChange = async (event) => {
    const selectedCategory = event.target.value;
    console.log(selectedCategory)
    
    if (selectedCategories.includes(selectedCategory)) {
      setSelectedCategories(selectedCategories.filter(category => category !== selectedCategory));
      onFilterChange({ exam: selectedExams, categories: selectedCategories.filter(category => category !== selectedCategory), modes: selectedModes });
    } else {
      setSelectedCategories([...selectedCategories, selectedCategory]);
      onFilterChange({ exam: selectedExams, categories: [...selectedCategories, selectedCategory], modes: selectedModes });
    }
             
  };
          
  const getCategoriesForSelectedExam = () => {
    // Assuming categories is an object where keys are exam names
    const selectedCategories = selectedExams.map((exam) => categories[exam]).flat().filter(Boolean);
    console.log('Selected categories:', selectedCategories);
    return selectedCategories;
  };
                            
  return (
    <div className="sidebar-testseries">
      <h2 className="filter-section-h2">Filters</h2>
      <div className="filter-section">
        <h3 className="filter-section-h3">Exams</h3>
        {exams.map(exam => (
          <div className="filter-section-div" key={exam.id}>
            <input
              type="checkbox"
              className="filter-section-input"
              id={exam.id}
              value={exam.id}
              checked={selectedExams.includes(exam.id)} 
              onChange={handleExamChange}
            />
            <label className="filter-section-label" htmlFor={exam.id}>{exam.name}</label>
          </div>
        ))}
      </div>
      <div className="filter-section">
        <h3 className="filter-section-h3">Categories</h3>
        {getCategoriesForSelectedExam().map(category => (
          <div className="filter-section-div" key={category.id}>
            <input
              type="checkbox"
              className="filter-section-input"
              id={category.id}
              value={category.id}
              checked={selectedCategories.includes(category.id)}
              onChange={handleCategoryChange}
            />
            <label className="filter-section-label" htmlFor={category.id}>{category.name}</label>
          </div>
        ))}
      </div>
      <div className="filter-section">
        <h3 className="filter-section-h3">Paper Types</h3>
        {mode.map(modes => (
          <div className="filter-section-div" key={modes.id}>
            <input
              type="checkbox"
              className="filter-section-input"
              id={modes.id}
              value={modes.id}
              checked={selectedModes.includes(modes.id)} 
              onChange={handleModeChange}
            />   
            <label className="filter-section-label" htmlFor={modes.id}>{modes.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

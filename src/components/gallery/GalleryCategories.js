import React from 'react';

function GalleryCategories({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="gallery-categories">
      {categories.map(category => (
        <button
          key={category.id}
          className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default GalleryCategories; 
import React from 'react';

function GalleryGrid({ images, onImageClick }) {
  if (images.length === 0) {
    return (
      <div className="empty-gallery">
        <p>No images in this category yet. Add some memories!</p>
      </div>
    );
  }

  return (
    <div className="gallery-grid">
      {images.map((image) => (
        <div
          key={image.id}
          className="gallery-item"
          onClick={() => onImageClick(image)}
        >
          <img src={image.src} alt={image.alt} />
          <div className="gallery-caption">
            <span>{image.caption}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GalleryGrid; 
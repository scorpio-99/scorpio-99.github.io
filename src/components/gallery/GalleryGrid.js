import React, { useState } from 'react';

function GalleryGrid({ images, onImageClick }) {
  const [loadedImages, setLoadedImages] = useState({});

  if (images.length === 0) {
    return (
      <div className="empty-gallery">
        <p>No images in this category yet. Add some memories!</p>
      </div>
    );
  }

  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  const handleImageError = (id) => {
    console.error(`Failed to load image ${id}`);
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="gallery-grid">
      {images.map((image) => (
        <div
          key={image.id}
          className="gallery-item"
          onClick={() => onImageClick(image)}
        >
          <div className="image-container">
            {!loadedImages[image.id] && (
              <div className="loading-placeholder">
                <div className="loading-spinner"></div>
              </div>
            )}
            <img 
              src={image.src.replace('assets/gallery/', 'assets/gallery/converted/').replace('.PNG', '.webp')}
              alt={image.caption}
              loading="lazy"
              onLoad={() => handleImageLoad(image.id)}
              onError={() => handleImageError(image.id)}
              className={loadedImages[image.id] ? 'loaded' : ''}
            />
          </div>
          <div className="gallery-caption">
            <span>{image.caption}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GalleryGrid; 
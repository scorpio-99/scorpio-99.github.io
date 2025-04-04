import React from 'react';

function Lightbox({ image, onClose, onNavigate }) {
  if (!image) return null;

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="nav-button prev" onClick={(e) => {
        e.stopPropagation();
        onNavigate(-1);
      }}>
        ❮
      </button>

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={image.src} alt={image.alt} />
        <div className="lightbox-caption">{image.caption}</div>
      </div>

      <button className="nav-button next" onClick={(e) => {
        e.stopPropagation();
        onNavigate(1);
      }}>
        ❯
      </button>
    </div>
  );
}

export default Lightbox; 
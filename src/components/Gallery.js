import React, {useEffect, useState} from 'react';
import Card from './common/Card';
import '../css/components/gallery.css';

function Gallery() {
    const [activeImage, setActiveImage] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const [images, setImages] = useState([]);

    // Categories for the gallery
    const categories = [
        {id: 'all', name: 'All Memories'},
        {id: 'dates', name: 'Our Dates'},
        {id: 'trips', name: 'Our Trips'},
        {id: 'special', name: 'Special Moments'}
    ];

    useEffect(() => {
        const galleryImages = [
            {
                id: 1,
                src: 'assets/gallery/airport-selfie.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'trips'
            },
            {
                id: 2,
                src: 'assets/gallery/bavaria-selfie.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'trips'
            },
            {
                id: 3,
                src: 'assets/gallery/christmas-selfie.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'special'
            },
            {
                id: 4,
                src: 'assets/gallery/christmas-selfie-hats.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'special'
            },
            {
                id: 5,
                src: 'assets/gallery/cologne-balloon-museum.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'dates'
            },
            {
                id: 6,
                src: 'assets/gallery/cologne-gondola-selfie.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'dates'
            },
            {
                id: 7,
                src: 'assets/gallery/cologne-holding-hands.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'dates'
            },
            {
                id: 8,
                src: 'assets/gallery/disneyland-bnb-selfie.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'trips'
            },
            {
                id: 9,
                src: 'assets/gallery/disneyland-selfie.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'trips'
            },
            {
                id: 10,
                src: 'assets/gallery/frankfurt-concert-travis.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'special'
            },
            {
                id: 11,
                src: 'assets/gallery/garage-selfie.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'special'
            },
            {
                id: 12,
                src: 'assets/gallery/home-birthday.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'special'
            },
            {
                id: 13,
                src: 'assets/gallery/munich-concert-adele.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'special'
            },
            {
                id: 14,
                src: 'assets/gallery/paris-eiffeltower.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'trips'
            },
            {
                id: 15,
                src: 'assets/gallery/paris-eiffeltower-selfie.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'trips'
            },
            {
                id: 16,
                src: 'assets/gallery/paris-selfie.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'trips'
            },
            {
                id: 17,
                src: 'assets/gallery/rovaniemi-reindeer.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'trips'
            },
            {
                id: 18,
                src: 'assets/gallery/rovaniemi-river.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'trips'
            },
            {
                id: 19,
                src: 'assets/gallery/rovaniemi-selfie.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'trips'
            },
            {
                id: 20,
                src: 'assets/gallery/leverkusen-face-hand.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'special'
            },
            {
                id: 21,
                src: 'assets/gallery/duesseldorf-fair-heart.PNG',
                alt: 'tbd',
                caption: 'tbd',
                category: 'date'
            },
        ];

        setImages(galleryImages);
    }, []);

    const openLightbox = (image) => {
        setActiveImage(image);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setActiveImage(null);
        document.body.style.overflow = 'auto';
    };

    const navigateImage = (direction) => {
        const currentIndex = images.findIndex(img => img.id === activeImage.id);
        const filteredImages = activeCategory === 'all'
            ? images
            : images.filter(img => img.category === activeCategory);

        let newIndex;
        if (activeCategory === 'all') {
            newIndex = (currentIndex + direction + images.length) % images.length;
            setActiveImage(images[newIndex]);
        } else {
            const categoryIndex = filteredImages.findIndex(img => img.id === activeImage.id);
            newIndex = (categoryIndex + direction + filteredImages.length) % filteredImages.length;
            setActiveImage(filteredImages[newIndex]);
        }
    };

    const handleKeyDown = (e) => {
        if (!activeImage) return;

        if (e.key === 'ArrowRight') navigateImage(1);
        if (e.key === 'ArrowLeft') navigateImage(-1);
        if (e.key === 'Escape') closeLightbox();
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeImage, images, activeCategory]);

    const filteredImages = activeCategory === 'all'
        ? images
        : images.filter(img => img.category === activeCategory);

    return (
        <Card title="Our Memories" className="gallery-container">
            <div className="gallery-categories">
                {categories.map(category => (
                    <button
                        key={category.id}
                        className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <div className="gallery-grid">
                {filteredImages.map((image) => (
                    <div
                        key={image.id}
                        className="gallery-item"
                        onClick={() => openLightbox(image)}
                    >
                        <img src={image.src} alt={image.alt}/>
                        <div className="gallery-caption">
                            <span>{image.caption}</span>
                        </div>
                    </div>
                ))}
            </div>

            {filteredImages.length === 0 && (
                <div className="empty-gallery">
                    <p>No images in this category yet. Add some memories!</p>
                </div>
            )}

            {activeImage && (
                <div className="lightbox" onClick={closeLightbox}>
                    <span className="close-button">&times;</span>

                    <button className="nav-button prev" onClick={(e) => {
                        e.stopPropagation();
                        navigateImage(-1);
                    }}>
                        ❮
                    </button>

                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img src={activeImage.src} alt={activeImage.alt}/>
                        <div className="lightbox-caption">{activeImage.caption}</div>
                    </div>

                    <button className="nav-button next" onClick={(e) => {
                        e.stopPropagation();
                        navigateImage(1);
                    }}>
                        ❯
                    </button>
                </div>
            )}
        </Card>
    );
}

export default Gallery; 
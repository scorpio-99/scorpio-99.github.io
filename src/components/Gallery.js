import React, {useEffect, useState} from 'react';
import Section from './common/Section';
import GalleryCategories from './gallery/GalleryCategories';
import GalleryGrid from './gallery/GalleryGrid';
import Lightbox from './gallery/Lightbox';
import data from '../data/data.json';

function Gallery() {
    const [activeImage, setActiveImage] = useState(null);
    const [activeCategory, setActiveCategory] = useState('dates');
    const [images, setImages] = useState([]);

    // Categories for the gallery
    const categories = [
        {id: 'dates', name: 'Our Dates'},
        {id: 'trips', name: 'Our Trips'},
        {id: 'special', name: 'Special Moments'}
    ];

    useEffect(() => {
        setImages(data.galleryImages);
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
        const filteredImages = images.filter(img => img.category === activeCategory).reverse();
        if (filteredImages.length === 0) return;

        const categoryIndex = filteredImages.findIndex(img => img.id === activeImage.id);
        const newIndex = (categoryIndex + direction + filteredImages.length) % filteredImages.length;
        setActiveImage(filteredImages[newIndex]);
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

    const filteredImages = images.filter(img => img.category === activeCategory).reverse();

    return (
        <Section card title="Our Memories" className="gallery-container">
            <GalleryCategories 
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />

            <GalleryGrid 
                images={filteredImages}
                onImageClick={openLightbox}
            />

            <Lightbox 
                image={activeImage}
                onClose={closeLightbox}
                onNavigate={navigateImage}
            />
        </Section>
    );
}

export default Gallery; 
import React, {useEffect, useState} from 'react';
import Section from './common/Section';
import GalleryCategories from './gallery/GalleryCategories';
import GalleryGrid from './gallery/GalleryGrid';
import Lightbox from './gallery/Lightbox';
import data from '../data/data.json';
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
        const filteredImages = activeCategory === 'all'
            ? images
            : images.filter(img => img.category === activeCategory);

        if (filteredImages.length === 0) return;

        let newIndex;
        if (activeCategory === 'all') {
            const currentIndex = images.findIndex(img => img.id === activeImage.id);
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
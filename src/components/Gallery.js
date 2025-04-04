import React, {useEffect, useState} from 'react';
import Section from './common/Section';
import GalleryCategories from './gallery/GalleryCategories';
import GalleryGrid from './gallery/GalleryGrid';
import Lightbox from './gallery/Lightbox';
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
                category: 'dates'
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
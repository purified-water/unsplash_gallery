import { useEffect, useState, useRef } from 'react';
import api from '../utils/API';
import PhotoItem from './PhotoItem';
import '../App.css';

const GalleryGrid = () => {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // Tracks if more photos are available
    const observerRef = useRef(); // Reference for the observer

    // Retrieve photos from the API when the page number changes
    useEffect(() => {
        const fetchPhotos = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/photos`, {
                    params: { page, per_page: 10 }
                });

                if (response.data.length === 0) {
                    setHasMore(false); // No more photos available
                } else {
                    setPhotos((prev) => [...prev, ...response.data]);
                }
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };

        // Only continue fetching photos if more are available
        if (hasMore) {
            fetchPhotos();
        }
    }, [page, hasMore]);

    const loadMore = () => {
        setPage((prev) => prev + 1);
    };

    // Implement IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMore();
                }
            },
            { threshold: 0.8 } // Adjust threshold as needed (1.0 means fully in view)
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [loading, hasMore]);

    return (
        <div className="photo-grid">
            {photos.map((photo) => (
                <PhotoItem key={photo.id} photo={photo} />
            ))}
            {loading && <p className='notification'>Loading more photos...</p>}
            {!hasMore && <p className='notification'>No more photos to display.</p>}
            <div ref={observerRef} className="load-more-trigger" />
        </div>
    );
};

export default GalleryGrid;

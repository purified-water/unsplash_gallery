import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../utils/API';
import '../App.css';

const PhotoDetail = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const response = await api.get(`/photos/${id}`);
        setPhoto(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotoDetails();
  }, [id]);

  if (loading) return <p className='notification'>Loading...</p>;
  if (!photo) return <p className='notification'>Photo not found.</p>;

  return (
    <div className="photo-detail">
      <h1>{photo.current_user_collections.title || "No collection title"}</h1>
      <h2>{photo.description || 'No Description'}</h2>
      <p>By {photo.user.name || 'Author unknown'}</p>
      <img src={photo.urls.full} alt={photo.alt_description} />
    </div>
  );
};

export default PhotoDetail;

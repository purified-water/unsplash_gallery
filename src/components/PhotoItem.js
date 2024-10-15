import { Link } from 'react-router-dom';
import '../App.css';

const PhotoItem = ({ photo }) => (
  <div className="photo-item">
    <Link to={`/photos/${photo.id}`}>
      <img src={photo.urls.thumb} alt={photo.alt_description} />
      <p>{photo.user.name}</p>
    </Link>
  </div>
);

export default PhotoItem;

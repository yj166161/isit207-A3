
import { useState, useEffect } from 'react';
import './pages.css';


const CAT_API_KEY = 'live_84yje74FSvTBbXUtOQEtoIvSQxGC0BbbA4gRDoCeDQzlenNpBmIHmPNw2oqd4bK7';

// 5 popular cat breeds
const catBreeds = [
  {label: 'All Breeds', value: 'all'},
  {label: 'Siamese', value: 'siam'},
  {label: 'Bengal', value: 'beng'},
  {label: 'Ragdoll', value: 'ragd'},
  {label: 'Persian', value: 'pers'},
  {label: 'Maine Coon', value: 'mcoo'}
];

// 5 popular dog breeds
const dogBreeds = [
  {label: 'All Breeds', value: 'all'},
  {label: 'Beagle', value: 'beagle'},
  {label: 'Golden Retriever', value: 'retriever/golden'},
  {label: 'Labrador', value: 'labrador'},
  {label: 'Poodle', value: 'poodle'},
  {label: 'Shiba Inu', value: 'shiba'}
];

const Gallery = () => {
  const [animalType, setAnimalType] = useState('cats');
  const [selectedBreed, setSelectedBreed] = useState('all');

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get photos whenever animal type or breed changes
  useEffect(() => {

    const fetchImages = async () => {
      setLoading(true);
      setError('');
      setImages([]);

      try {
        let url = '';

        // Fetch cat photos
        if (animalType === 'cats') {

          url = 'https://api.thecatapi.com/v1/images/search?limit=15';

          if (selectedBreed !== 'all') {
            url += `&breed_ids=${selectedBreed}`;
          }

          const response = await fetch(url, {
            headers: {'x-api-key': CAT_API_KEY}
        });;

          if (!response.ok) {
            throw new Error('Unable to load cat photos.');
          }

          const data = await response.json();
          setImages(data);

        }

        // Fetch dog photos
        else {

          if (selectedBreed === 'all') {
            url = 'https://dog.ceo/api/breeds/image/random/15';
          } else {
            url = `https://dog.ceo/api/breed/${selectedBreed}/images/random/15`;
          }

          const response = await fetch(url);

          if (!response.ok) {
            throw new Error('Unable to load dog photos.');
          }

          const data = await response.json();

          setImages(
            data.message.map((imageUrl) => ({
              url: imageUrl
            }))
          );
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();

  }, [animalType, selectedBreed]);


  // Change animal type and reset breed
  const handleAnimalChange = (e) => {
    setAnimalType(e.target.value);
    setSelectedBreed('all');
  };


  return (
    <div className="gallery-page">

      {/* Gallery heading */}
      <div className="gallery-heading">
        <h1>Pet Gallery</h1>
        <p>
          Explore different cat and dog breeds
          and discover your favourite furry friends!
        </p>
      </div>


      {/* Dropdown filters */}
      <div className="gallery-filters">

        <div className="gallery-filter">
          <label htmlFor="animalType">Animal Type</label>

          <select
            id="animalType"
            value={animalType}
            onChange={handleAnimalChange}
          >
            <option value="cats">Cats</option>
            <option value="dogs">Dogs</option>
          </select>
        </div>


        <div className="gallery-filter">
          <label htmlFor="breed">Breed</label>

          <select
            id="breed"
            value={selectedBreed}
            onChange={(e) => setSelectedBreed(e.target.value)}
          >

            {(animalType === 'cats' ? catBreeds : dogBreeds).map((breed) => (
              <option key={breed.value} value={breed.value}>
                {breed.label}
              </option>
            ))}

          </select>
        </div>

      </div>


      {/* Photo gallery */}
      <div className="gallery-results">

        {loading && <p>Fetching...</p>}

        {error && <p className="gallery-error">{error}</p>}

        {!loading && !error && images.length > 0 && (

          <div className="gallery-grid">

            {images.map((image, index) => (

              <div className="gallery-card stagger-reveal" key={image.id || image.url || index}
                  style={{transitionDelay: `${(index % 5) * 0.1}s` }}>

                <img
                  src={image.url}
                  alt={`${animalType === 'cats' ? 'Cat' : 'Dog'} photo`}
                  loading="lazy"
                />

              </div>

            ))}

          </div>

        )}

        {!loading && !error && images.length === 0 && (
          <p>No photos found. Try selecting another breed.</p>
        )}

      </div>

    </div>
  );
};


export default Gallery;

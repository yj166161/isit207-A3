import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';
import useScrollReveal from './useScrollReveal.js'


{/* pet info */}
const pets = [
  {
    id: 1,
    name: 'Max',
    type: 'dog',
    breed: 'Golden Retriever',
    age: '2 years old',
    ageGroup: 'adult',
    gender: 'Male',
    image: '/images/adopt-max.jpg',
    description: 'Max is a friendly and playful dog who loves going on walks and spending time with people.',
    personality: 'Friendly, energetic and affectionate',
    health: 'Vaccinated and in good health.'
  },

  {
    id: 2,
    name: 'Teddy',
    type: 'dog',
    breed: 'Beagle',
    age: '6 months old', 
    ageGroup: 'young',
    gender: 'Male',
    image: '/images/adopt-teddy.jpg',
    description: 'Teddy is a sweet and curious Beagle puppy who loves exploring outdoors and cuddling up with people.',
    personality: 'Curious, affectionate, and playful',
    health: 'Vaccinated and in good health'
  },

    {
    id: 3,
    name: 'Luna',
    type: 'cat',
    breed: 'Domestic Shorthair',
    age: '2 years old', 
    ageGroup: 'adult',
    gender: 'Female',
    image: '/images/adopt-luna.jpg',
    description: 'Luna is a calm and affectionate cat who loves sunny windowsills and gentle head scratches.',
    personality: 'Calm, gentle, and loving',
    health: 'Spayed, vaccinated, and microchipped'
  },

    {
    id: 4,
    name: 'Cooper',
    type: 'dog',
    breed: 'Golden Retriver',
    age: '4 Years Old', 
    ageGroup: 'adult',
    gender: 'Male',
    image: '/images/adopt-cooper.jpg',
    description: 'Cooper is a loyal and gentle dog who enjoys playing fetch and relaxing by your feet.',
    personality: 'Loyal, friendly, and easygoing',
    health: 'Neutered and in great health'
  },

    {
    id: 5,
    name: 'Bella',
    type: 'dog',
    breed: 'French Bulldog',
    age: '11 Years Old', 
    ageGroup: 'senior',
    gender: 'Female',
    image: '/images/adopt-bella.jpg',
    description: 'Bella is a sweet senior pup who loves short neighborhood strolls and afternoon naps on the couch.',
    personality: 'Sweet, relaxed, and affectionate',
    health: 'Spayed and regularly vet-checked'
  },

    {
    id: 6,
    name: 'Tom',
    type: 'cat',
    breed: 'Tabby',
    age: '5 Months Old', 
    ageGroup: 'young',
    gender: 'Male',
    image: '/images/adopt-tom.jpg',
    description: 'Tom is a playful and energetic kitten who loves chasing feather toys and purring loudly.',
    personality: 'Playful, curious, and energetic',
    health: 'Vaccinated and dewormed'
  },

    {
    id: 7,
    name: 'Daisy',
    type: 'dog',
    breed: 'Labrador Mix',
    age: '1 Year Old', 
    ageGroup: 'young',
    gender: 'Female',
    image: '/images/adopt-daisy.jpg',
    description: 'Daisy is a cheerful and energetic dog who loves running in the park and greeting everyone with a wagging tail.',
    personality: 'Cheerful, active, and friendly',
    health: 'Spayed, vaccinated, and microchipped'
  },

    {
    id: 8,
    name: 'Oliver',
    type: 'cat',
    breed: 'Maine Coon',
    age: '11 Years Old', 
    ageGroup: 'senior',
    gender: 'Male',
    image: '/images/adopt-oliver.jpg',
    description: 'Oliver is a gentle senior cat who loves quiet afternoons, soft blankets, and curling up beside his favorite person.',
    personality: 'Gentle, calm, and affectionate',
    health: 'Neutered and in good senior health'
  },

    {
    id: 9,
    name: 'Coco',
    type: 'cat',
    breed: 'Siamese Mix',
    age: '11 Months Old', 
    ageGroup: 'young',
    gender: 'Female',
    image: '/images/adopt-coco.jpg',
    description: 'Coco is a sweet and talkative cat who loves following her humans around and curling up in warm laps.',
    personality: 'Affectionate, curious, and vocal',
    health: 'Spayed, vaccinated, and microchipped'
  },


  
];

const Adopt = ({ user }) => {
  const pageRef = useScrollReveal();
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');

  
  const filteredPets = pets.filter((pet) => {
    const matchesType =
      selectedType === 'all' || pet.type === selectedType;

    const matchesAge =
      selectedAge === 'all' || pet.ageGroup === selectedAge;

    return matchesType && matchesAge;
  });

 
  const handleApply = (pet) => {
    if (!user) {
      navigate('/login', {
        state: {
          from: {
            pathname: '/adopt-form',
            state: { pet },
          },
        },
      });
      return;
    }

    navigate('/adopt-form', {
      state: { pet: pet }
    });
  };

  return (
    <div className="adopt-page"  ref={pageRef}>
      
      {/* page heading*/}
      <section className="adopt-banner">
        <div className="adopt-banner-overlay">
          <div className="adopt-banner-content">
            <h1>Find Your New Best Friend</h1>
            <p>
              Every pet deserves a loving home. Browse our adorable pets
              and find the perfect companion for your family.
            </p>
            </div>
        </div>
      </section>

      {/* Pet Directory */}
      <section className="pet-directory">
        
        {/* Pet Filters */}
        <div className="pet-filter-section">

          <div className="pet-filter">
            <label htmlFor="pet-type">Pet Type</label>
            <select id="pet-type" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="all">All Pets</option>
              <option value="cat">Cats</option>
              <option value="dog">Dogs</option>
            </select>
          </div>

          <div className="pet-filter">
            <label htmlFor="age-group">Age Group</label>
            <select id="age-group" value={selectedAge} onChange={(e) => setSelectedAge(e.target.value)}>
              <option value="all">All Ages</option>
              <option value="young">Puppies & Kittens</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
            </select>
          </div>
        
        <p className="pet-results-count">
          Showing {filteredPets.length} pets
        </p>

        </div>

  {/* Pet Cards */}
  <div className="pet-grid">

    {filteredPets.map((pet, index) => (
      <div className="pet-card stagger-reveal" key={`${selectedType}-${selectedAge}-${pet.id}`} style={{transitionDelay: `${index * 0.15}s`}}>

        <img
          src={pet.image}
          alt={pet.name}
          className="pet-card-image"
        />

        <div className="pet-card-content">

          <h2>{pet.name}</h2>

          <p className="pet-breed">{pet.breed}</p>

          <div className="pet-basic-info">
            <span>{pet.age}</span>
            <span>{pet.gender}</span>
          </div>

          <p className="pet-description">
            {pet.description}
          </p>

          <p className="pet-personality">
            <strong>Personality:</strong> {pet.personality}
          </p>

          <p className="pet-health">
            <strong>Health:</strong> {pet.health}
          </p>

          <button
            className="pet-apply-btn"
            onClick={() => handleApply(pet)}
          >
            Apply to Adopt
          </button>

        </div>
      </div>
    ))}

  </div>






      </section>


    </div>





  );
};


export default Adopt;
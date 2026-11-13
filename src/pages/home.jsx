import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './pages.css'
import useScrollReveal from './useScrollReveal.js';

const images = [
  '/images/hero-cat2.jpg',
  '/images/hero-dog.jpg',
  '/images/hero-dogcat.jpeg'
];

const Home = () => {
  const [currentImage, setCurrentImage]= useState(0);
  const [feedback, setFeedback] = useState(() =>
    JSON.parse(localStorage.getItem('memberFeedback') || '[]')
  );
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackRating, setFeedbackRating] = useState('');
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const pageRef = useScrollReveal();

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();

    const name = feedbackName.trim();
    const comment = feedbackComment.trim();

    if (!name || !comment) {
      setFeedbackMessage('Please enter your name and feedback.');
      return;
    }

    const newFeedback = {
      id: Date.now(),
      name,
      rating: Number(feedbackRating),
      comment,
    };
    const updatedFeedback = [...feedback, newFeedback];

    localStorage.setItem('memberFeedback', JSON.stringify(updatedFeedback));
    setFeedback(updatedFeedback);
    setFeedbackName('');
    setFeedbackRating('');
    setFeedbackComment('');
    setFeedbackMessage('Thank you for sharing your feedback!');
  };

  //Images automatically change every 5secs
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((previousImage) =>
        (previousImage + 1) % images.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

 


  return (
    <div className="home-page"  ref={pageRef}>
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url("${images[currentImage]}")` }}>
        <div className="hero-content reveal"> 
          <h1>Find Your New Best Friend!</h1>
            <p>
              Adopt a furry friend today!
            </p>

          <Link to="/adopt" className= "btn-primary">
            Adopt a Pet
          </Link>     
        </div>
      </section>

      {/* 'what we do' Section */}
      <section className="services-section reveal">
        <div className="services-content">
          <h2>What We Do</h2>
            <p>Making a difference, one paw at a time.</p>
        </div>
          <div className="services-card">
            <img src="/images/hero-cat.jpg" alt="Image of cat" />
            <h3>Adopt a Pet</h3>
            <p>Give an animal a loving forever home.</p>
            <Link to="/adopt" className= "btn-primary">Explore Adoption</Link>
          </div>

          <div className="services-card">
            <img src="/images/hero-pet.jpg" alt="A person caring for a dog and cat" />
          <h3>Release a pet</h3>
            <p>Find a responsible new home for your pet.</p>
            <Link to="/release" className= "btn-primary">Explore Release Options</Link>
          </div>
          
          <div className="services-card">
            <img src="/images/pet-care.jpg" alt="Image of dog getting a bath" />
            <h3>Pet Care</h3>
            <p>Discover tips for keeping pets happy and healthy.</p>
            <Link to="/petcare" className= "btn-primary">Learn More</Link>          
          </div>
      </section>




      {/* Adoption stories section */}
      <section className="stories-section reveal">
        <div className="stories-content">
          <h2>Happy Tails, Happy Homes</h2>
            <p>Every adoption creates a new beginning. Here are some of our happy endings!</p>
        </div>
          <div className="stories-card">
          <img src="/images/stories1.jpg" alt="Image of cat" />
          <h3>Milo's Happy Home</h3>
            <p>Milo went from a shy little cat to the centre of his new owner's world.</p>
          </div>

          <div className="stories-card">
          <img src="/images/stories2.jpg" alt="Image of family playing with dog" />
          <h3>Rosie's New Beginning </h3>
            <p>Rosie went from a hesitant shelter dog to the playful heart of a busy, loving household.</p>
          </div>

          <div className="stories-card">
          <img src="/images/stories3.jpg" alt="Image of cat on couch" />
          <h3>Luna's Second Chance</h3>
            <p> Luna went from a nervous street stray to the undisputed queen of her new family's sofa.</p>
          </div>
      </section>

      {/* Reviews section */}
      <section className="reviews-section reveal">
        <div className="reviews-content">
          <h2>What Our Adopters Say</h2> 
            <p>Hear from families who found their new best friends through PetHeaven!</p>
        </div>
        <div className="reviews-container">

          <div className="reviews-card">
            <div className="review-stars">★★★★★</div>
            <p>
              "The adoption process was smooth and the team was
              incredibly helpful throughout the entire journey!"
            </p>
            <h3>Sarah L.</h3>
          </div>

          <div className="reviews-card">
            <div className="review-stars">★★★★★</div>
            <p>
              "I'm so happy to have found my new best friend.
              Milo has brought so much joy into my life!"
            </p>
            <h3>James T.</h3>
          </div>

          <div className="reviews-card">
            <div className="review-stars">★★★★★</div>
            <p>
              "PetHeaven made everything easy and stress-free.
              I would definitely recommend adopting here!"
            </p>
            <h3>Emily R.</h3>
          </div>

        </div>
      </section>

      {/* Feedback form */}
      <section className="feedback-section reveal">
        <div className="feedback-content">
          <h2>Share Your Feedback</h2>
          <p>Tell us about your experience with PetHeaven.</p>
        </div>
        <div className="feedback-form">
          <form onSubmit={handleFeedbackSubmit}>
            <div className="feedback-field">
              <label htmlFor="feedback-name">Your name</label>
              <input
                id="feedback-name"
                type="text"
                value={feedbackName}
                onChange={(e) => setFeedbackName(e.target.value)}
                maxLength={50}
                required
              />
            </div>

            <div className="feedback-field">
              <label htmlFor="feedback-rating">Rating</label>
              <select
                id="feedback-rating"
                value={feedbackRating}
                onChange={(e) => setFeedbackRating(e.target.value)}
                required
              > 
                <option value="" selected disabled hidden>Select rating...</option>
                <option value="5">★★★★★— Excellent </option>
                <option value="4">★★★★— Very good</option>
                <option value="3">★★★— Good</option>
                <option value="2">★★— Fair</option>
                <option value="1">★— Poor</option>
              </select>
            </div>

            <div className="feedback-field">
              <label htmlFor="feedback-comment">Your feedback</label>
              <textarea style={{ resize: 'none' }}
                id="feedback-comment"
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                rows={4}
                maxLength={500}
                required
              />
            </div>

            <button type="submit" className="feedback-submit-btn">
              Submit Feedback
            </button>
            <p className="feedback-message" role="status" aria-live="polite">
              {feedbackMessage}
            </p>
          </form>
        </div>

      </section>



    </div>
  );
}

export default Home;
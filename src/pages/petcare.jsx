import { useState } from 'react';
import './pages.css';
import useScrollReveal from './useScrollReveal.js';

const quizQuestions = [
  {
    question: 'Which habit best supports a pet’s health?',
    options: [
      'Regular vet checkups and a balanced diet',
      'Only giving treats and no exercise',
      'Ignoring changes in behaviour',
      'Skipping water bowls entirely',
    ],
    correctAnswer: 0,
    explanation: 'Regular vet visits and balanced nutrition help pets stay healthy and strong.',
  },
  {
    question: 'Why is daily exercise important for pets?',
    options: [
      'It helps with physical and mental wellbeing',
      'It makes pets less social',
      'It replaces the need for food',
      'It is only needed once a month',
    ],
    correctAnswer: 0,
    explanation: 'Exercise supports both physical fitness and mental stimulation for pets.',
  },
  {
    question: 'What should you do if your pet suddenly seems weak or has trouble breathing?',
    options: [
      'Book a routine appointment next week',
      'Seek immediate veterinary attention',
      'Wait and see if it improves',
      'Give extra treats and rest',
    ],
    correctAnswer: 1,
    explanation: 'Difficulty breathing or sudden weakness can be an emergency and needs urgent veterinary care.',
  },
  {
    question: 'Which is the best way to help a new pet settle in?',
    options: [
      'Give them time, routine, and a safe space',
      'Keep them isolated from everyone',
      'Introduce them to loud noise right away',
      'Change their food every day',
    ],
    correctAnswer: 0,
    explanation: 'A calm routine and a safe resting area help pets adjust to a new home.',
  },
  {
    question: 'Why is grooming important?',
    options: [
      'It helps keep pets clean, comfortable, and healthy',
      'It is only needed for puppies',
      'It replaces veterinary care',
      'It has no health benefits',
    ],
    correctAnswer: 0,
    explanation: 'Regular grooming supports cleanliness, coat health, and comfort.',
  },
];

const PetCare = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Check the selected answer
  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    setShowFeedback(true);
  };

  // Move to the next question
  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  // Restart the quiz
  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setIsFinished(false);
  };

  const pageRef = useScrollReveal();
  return (
    <div className="petcare-page" ref={pageRef}>
      
      {/* Intro section */}
      <section className="petcare-intro">
        <div className="petcare-intro-content">
          <h1>Caring For Your Furry Friends</h1>
          <p>
            Every pet deserves a happy and healthy life.
            Discover simple tips and helpful advice to keep
            your furry companions healthy, comfortable and loved.            
          </p>
        </div>
      </section>

      {/* Pet Care Essentials section */}
      <section className="petcare-essentials reveal">
        <div className="petcare-heading">
          <h2>Pet Care Essentials</h2>
          <p>
            Good pet care starts with understanding their everyday needs.
          </p>
        </div>

        <div className="petcare-grid">
          
          <div className="petcare-card">
            <img src="/images/care-nutrition.jpg" alt="Pet eating from a food bowl" />
            <div className="card-info">
              <h3>Nutrition</h3>
              <p>
                Provide balanced meals, fresh drinking water and
                suitable portion sizes to support your pet's health.
              </p>
            </div>
          </div>
        
        
          <div className="petcare-card">
            <img src="/images/care-exercise.jpg" alt="Dog walking" />
            <div className="card-info">
              <h3>Exercise</h3>
              <p>
                Keep your pets active with daily walks, playtime
                and activities that provide mental stimulation.
              </p>
            </div>
          </div>  
        

        
          <div className="petcare-card">
            <img src="/images/care-groom.jpg" alt="cat being brushed" />
            <div className="card-info">
              <h3>Grooming</h3>
              <p>
                Regular brushing, nail trimming and appropriate
                bathing help keep your pet clean and comfortable.
              </p>
            </div>
          </div>  
        

          <div className="petcare-card">
            <img src="/images/care-checkup.jpg" alt="dog in a vet clinic" />
            <div className="card-info">
              <h3>Health & Wellness</h3>
              <p>
                Arrange regular veterinary check-ups and keep
                vaccinations and preventive care up to date.
              </p>
            </div>
          </div>  
        </div>
      </section>


      {/* Dog Vs Cat Care */}
      <section className="petcare-compare reveal">
        <div className="petcare-heading">
          <h2>Different Pets, Different Needs</h2>
          <p>
            Dogs and cats have different habits and care requirements.
          </p>
        </div>

        <div className="compare-content">

          <div className="compare-card">
            <img src="/images/care-dog.jpg" alt="Happy dog sitting outdoors" />
            <div className="card-info">
              <h3>Dog Care</h3>
              <ul>
                <li>Provide regular walks and exercise.</li>
                <li>Use positive reinforcement for training</li>
                <li>Keep your dog on a leash in public</li>
                <li>Provide regular grooming and social interaction</li>
              </ul>
            </div>
          </div>

          <div className="compare-card">
            <img src="/images/care-cat.jpg" alt="Happy cat" />
            <div className="card-info">
              <h3>Cat Care</h3>
              <ul>
                <li>Keep the litte box clean.</li>
                <li>Provide scratching posts and toys.</li>
                <li>Create comfortable resting spaces</li>
                <li>Provide opportunities for indoor play and enrichment.</li>
              </ul>
            </div>
          </div>          
        </div>
      </section>

      {/* New Pet Owner Tips */}
      <section className="petcare-tips reveal">
        <div className="petcare-tips-image">
          <img src="/images/care-new-owner.jpeg" alt="Pet owner bonding with a puppy at home" />
        </div>

        <div className="petcare-tips-content">
          <h2>Welcoming a New Pet Home</h2>
          <p>
            Bringing home a new pet is exciting! Help your new
            companion settle in with a little preparation and patience.
          </p>
          <ul>
            <li>Prepare a comfortable sleeping area.</li>
            <li>Provide suitable food, water and essential supplies.</li>
            <li>Give your pet time to adjust to its new environment.</li>
            <li>Introduce family members and other pets gradually.</li>
            <li>Establish a consistent daily routine.</li>
          </ul>

        </div>
      </section>



      {/* Vet Advice */}
      <section className="petcare-vet reveal">

        <div className="petcare-heading">
          
          <h2>When Should You Visit a Veterinarian?</h2>
          <p>
            Pay attention to changes in your pet's behaviour and health.
            Knowing the warning signs can help you take action early.
          </p>
        </div>

        <div className="petcare-warning-grid">

          <div className="petcare-warning">
            <div className="warning-icon">🍽️</div>
            <h3>Changes in Appetite</h3>
            <p>
              Refusing food or water, or sudden changes in
              eating habits.
            </p>
          </div>

          <div className="petcare-warning">
            <div className="warning-icon">🐾</div>
            <h3>Unusual Behaviour</h3>
            <p>
              Unusual tiredness, hiding or noticeable changes
              in your pet's behaviour.
            </p>
          </div>

          <div className="petcare-warning">
            <div className="warning-icon">🩺</div>
            <h3>Signs of Illness</h3>
            <p>
              Persistent vomiting, diarrhoea or other
              concerning symptoms.
            </p>
          </div>

        </div>

        <div className="petcare-emergency">
          <span>!</span>
          <p>
            <strong>Important:</strong> Difficulty breathing, collapse
            or other severe symptoms require immediate veterinary attention.
          </p>
        </div>
      </section>

      {/* Pet Care Quiz */}
      <section className="petcare-quiz-section reveal">

        <div className="petcare-quiz-heading">
          
          <h2>How Well Do You Know Pet Care?</h2>
          <p>
            Think you know how to care for your furry friends?
            Try this quick quiz and find out!
          </p>
        </div>

        <div className="petcare-quiz-card">

          {!isFinished ? (
            <>
              <div className="quiz-progress">
                <span>
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
              </div>

              <div className="quiz-progress-bar">
                <div
                  className="quiz-progress-fill"
                  style={{
                    width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`
                  }}
                ></div>
              </div>

              <h3>{quizQuestions[currentQuestion].question}</h3>

              <div className="quiz-options">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`quiz-option ${
                      selectedAnswer === index ? 'selected' : ''
                    } ${
                      showFeedback &&
                      index === quizQuestions[currentQuestion].correctAnswer
                        ? 'correct'
                        : ''
                    } ${
                      showFeedback &&
                      selectedAnswer === index &&
                      selectedAnswer !== quizQuestions[currentQuestion].correctAnswer
                        ? 'incorrect'
                        : ''
                    }`}
                    onClick={() => setSelectedAnswer(index)}
                    disabled={showFeedback}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showFeedback && (
                <div className="quiz-feedback">
                  <h4>
                    {selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                      ? 'Correct! Well done!'
                      : 'Not quite!'}
                  </h4>

                  <p>{quizQuestions[currentQuestion].explanation}</p>
                </div>
              )}

              {!showFeedback ? (
                <button
                  className="quiz-action-btn"
                  onClick={handleCheckAnswer}
                  disabled={selectedAnswer === null}
                >
                  Check Answer
                </button>
              ) : (
                <button
                  className="quiz-action-btn"
                  onClick={handleNextQuestion}
                >
                  {currentQuestion === quizQuestions.length - 1
                    ? 'See My Results'
                    : 'Next Question'}
                </button>
              )}
            </>
          ) : (
            <div className="quiz-results">
              <h3>Quiz Completed!</h3>

              <div className="quiz-score">
                {score}/{quizQuestions.length}
              </div>

              <p>
                {score === 5
                  ? "Excellent! You're a pet care expert!"
                  : score >= 3
                  ? "Great effort! You know quite a bit about pet care."
                  : "Good try! Keep learning how to care for your furry friends."}
              </p>

              <button className="quiz-action-btn" onClick={handleRetry}>
                Try Again
              </button>
            </div>
          )}

        </div>
      </section>
      



    </div>
  );
}

export default PetCare;
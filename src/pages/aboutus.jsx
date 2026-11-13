import './pages.css'
import useScrollReveal from './useScrollReveal.js';

const AboutUs = () => {
  const pageRef = useScrollReveal();
  return (
    <div className="about-page" ref={pageRef}>
  
      {/* About PetHeaven Section */}
      <section className="about-banner">
        <div className="about-banner-overlay">
          <div className="about-banner-content">
            <h1>About PetHeaven</h1>
            <h2>Every Paw Deserves A Loving Home</h2>
            <p>
              Dedicated to helping dogs and cats find loving,
              permanent homes through responsible adoption
              and compassionate care.
            </p>
          </div>
        </div>
      </section>
      {/* Mission Section */}
      <section className="mission-section reveal">
        <div className="about-section-heading">
          <h2>Our Mission & Vision</h2>
          <p>What drives us to make a difference.</p>
        </div>

        <div className="mission-content">

          <div className="mission-card">
            <h3>Our Mission</h3>
            <p>
              Our mission is to connect animals in need with
              responsible and caring owners. We aim to promote
              responsible adoption, encourage proper pet care
              and help animals find safe and loving homes.
            </p>
          </div>

          <div className="mission-card">
            <h3>Our Vision</h3>
            <p>
            We envision a future where no pet is forgotten 
            and every companion is guarded by human compassion
            </p>
          </div>
        </div>
      </section>


      {/* Our Facilities */}
      <section className="facilities-section reveal">
        <div className="about-section-heading">
          <h2>Our Facilities</h2>
          <p>
            Providing a safe, comfortable and caring
            environment for every animal.
          </p>
        </div>

        <div className="facilities-content">

          <div className="facility-card">
            <img
              src="/images/facility-shelter.jpg"
              alt="Clean and comfortable animal shelter"
            />
            <div className="card-info">
              <h3>Comfortable Shelter</h3>
              <p>
                Safe and comfortable living spaces where
                rescued pets can rest and feel at home.
              </p>
            </div>
          </div>

          <div className="facility-card">
            <img
              src="/images/facility-vet.jpg"
              alt="Veterinarian examining a dog"
            />
            <div className="card-info">
              <h3>Veterinary Care</h3>
              <p>
                Health checks and medical attention to
                support the health and well-being of our pets.
              </p>
            </div>
          </div>

          <div className="facility-card">
            <img
              src="/images/facility-grooming.jpg"
              alt="Pet receiving grooming care"
            />
            <div className="card-info">
              <h3>Grooming Area</h3>
              <p>
                Dedicated spaces to maintain the cleanliness
                and comfort of the animals.
              </p>
            </div>
          </div>

          <div className="facility-card">
            <img
              src="/images/facility-playing.jpg"
              alt="Dogs playing in an outdoor area"
            />
            <div className="card-info">
              <h3>Play Areas</h3>
              <p>
                Open spaces where pets can exercise,
                play and socialise with other animals.
              </p>
            </div>
          </div>

        </div>
      </section>










      {/* Why Choose Section */}        
      <section className="why-section reveal">
        <div className="about-section-heading">
          <h2>Why Choose PetHeaven?</h2>
          <p>Making a difference, one paw at a time.</p>
        </div>
        
        <div className="why-content">

          <div className="why-card">
            <img src="/images/why-img1.jpg" alt="A content cat with owner"/>
            <div className="card-info">
              <h3>Responsible Adoption</h3>
              <p>
                Helping pets find suitable and caring owners
                who can provide a loving forever home.
              </p>
            </div>
          </div>

          <div className="why-card">
            <img src="/images/why-img2.jpg" alt="image 2"/>    
            <div className="card-info">
              <h3>Second Chances</h3>
              <p>
                Giving animals another opportunity to experience
                love and happiness
              </p>
            </div>
          </div>
          <div className="why-card">
            <img src="/images/why-img3.jpg" alt="image 3"/>    
            <div className="card-info">
              <h3>Supporting Animals</h3>
              <p>
                Encouraging kindness, compassion and
                responsible treatment towards animals.
              </p>
            </div>
          </div>

          <div className="why-card">
            <img src="/images/why-img4.jpg" alt="image 4"/>    
            <div className="card-info">
              <h3>Pet Care Awareness</h3>
              <p>
                Sharing useful information to help owners
                keep their pets happy and healthy.
              </p>
            </div>
          </div>         
        </div>
      </section>


      {/* Location */}
      <section className="location-section reveal">
        <div className="about-section-heading">
          <h2>Visit Us</h2>
          <p>We would love to have you here!</p>
        </div>

        <div className="location-container">

          <div className="location-info">
            <h3>Get in Touch</h3>
            <p>
              <strong>Visit Us:</strong> 50 Sungei Tengah Rd, Singapore 699012
            </p>
            <p>
              <strong>Call Us:</strong> 61234567
            </p>
            <p>
              <strong>Email Us:</strong> hello@petheaven.com
            </p>
            <p>
              <strong>Operating Hours:</strong>
              <br />
              Monday - Friday: 9am - 6pm
              <br />
              Saturday - Sunday: 10am - 3pm
            </p>
          </div>

          <div className="location-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.660291627037!2d103.72957747567942!3d1.3804835614751574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da11dee35b8c6f%3A0x9e2b72be36ed8e52!2s50%20Sungei%20Tengah%20Rd%2C%20Singapore%20699012!5e0!3m2!1sen!2ssg!4v1794290962826!5m2!1sen!2ssg"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="PetHeaven Location"
            ></iframe>
          </div>

        </div>
      </section>

    </div>
  );
};


      




    



export default AboutUs;
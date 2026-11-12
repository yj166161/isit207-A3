import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './pages.css';


const AdoptForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pet = location.state?.pet;


  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [homeType, setHomeType] = useState('');
  const [experience, setExperience] = useState('');
  const [reason, setReason] = useState('');



    const handleSubmit = (e) => {
    e.preventDefault();

        const newApplication = {
            id: Date.now(),
            type: 'Adoption',
            petName: pet.name,
            breed: pet.breed,
            image: pet.image,
            username: localStorage.getItem('username'),
            fullName: fullName,
            email: email,
            contact: contact,
            homeType: homeType,
            experience: experience,
            reason: reason,
            date: new Date().toLocaleDateString(),
            status: 'Pending Review'
        };

        const applications = JSON.parse(localStorage.getItem('applications')) || [];
        
        applications.push(newApplication);

        localStorage.setItem('applications', JSON.stringify(applications));

        alert('Thank You For Your Application!');

        navigate('/my-applications')
    
    };

  {/*IF Without pet selected */}
    if (!pet) {
    return (
        <div className="adopt-form-page">
        <h2>No Pet Selected</h2>
        <p>Please select a pet before submitting an adoption application.</p>
        <button onClick={() => navigate('/adopt')}>
          Browse Pets
        </button>
      </div>
    );
  }

    return (
        <div className="adopt-form-page">

            <div className="adopt-form-heading">
                <h1>Adoption Application</h1>
                <p>Take the first step towards welcoming a new family member!</p>
            </div>

            <div className="adopt-form-content">
                {/* Selected Pet Information */}
                <div className="selected-pet">
                    <img src={pet.image} alt={pet.name} />
                </div>
                <div>
                    <h2>{pet.name}</h2>
                    <p>{pet.breed}</p>
                    <p>{pet.age} · {pet.gender}</p>
                </div>
            
        
                {/*Application form page */}
                <form onSubmit={handleSubmit}>
                    <h2>Your Information</h2>

                    <div className="form-details">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text"
                            id="fullname"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required />
                    </div>

                    <div className="form-details">
                        <label htmlFor="contact">Contact Number</label>
                        <input type="tel"
                            id="contact"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required />                    
                    </div>

                    <div className="form-details">
                        <label htmlFor="email">Email Address</label>
                        <input type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />                    
                    </div>

                    <div className="form-details">
                        <label htmlFor="homeType">Type of Home</label>
                        <select id="homeType"
                            value={homeType}
                            onChange={(e) => setHomeType(e.target.value)}
                            required>   
                            <option value="">Select your home type</option>
                            <option value="HDB">HDB</option>
                            <option value="Condominium">Condominium</option>
                            <option value="Landed Property">Landed Property</option>
                            <option value="Other">Other</option>          
                        </select>        
                    </div>

                    <div className="form-details">
                        <label htmlFor="experience">Any Experience Owning Pets?</label>
                        <select id="experience"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                required
                        >
                                <option value="">Select an option</option>
                                <option value="no-exp">No Experience Owning Pets</option>
                                <option value="previously-owned">Previously Owned Pets</option>
                                <option value="currently-own">Currently Own Pets</option>
                        </select>
                    </div>

                    <div className="form-details">
                        <label htmlFor="reason">Why would you like to adopt this pet?</label>
                        <textarea id="reason" style={{ resize: 'none' }} rows={5}
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="e.g., Hoping to find a gentle indoor cat for our quiet apartment..."
                                required>
                        </textarea>
                    </div>

                    <button type="submit" className="adopt-submit-btn">
                        Submit Application
                    </button>

                </form>
            </div>
        </div>
    );

};

export default AdoptForm;

















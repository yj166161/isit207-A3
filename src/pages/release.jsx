
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './pages.css';

const Release = ({ username, pendingRelease, onPendingReleaseChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const resumedSubmission = useRef(false);

  const [formData, setFormData] = useState({
    petName: '',
    petType: '',
    breed: '',
    age: '',
    gender: '',
    reason: '',
    personality: '',
    health: '',
    ownerName: '',
    email: '',
    contact: '',
    petImage: '',
    imageName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Please choose an image smaller than 5MB.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        petImage: reader.result,
        imageName: file.name
      });
    };

    reader.readAsDataURL(file);
  };

  const submitApplication = useCallback((data, submittedBy) => {
    if (!data.petImage) {
      alert('Please upload a photo of your pet.');
      return;
    }

    const newApplication = {
      id: Date.now(),
      type: 'Pet Release',
      ...data,
      username: submittedBy,
      date: new Date().toLocaleDateString(),
      status: 'Submitted'
    };

    const applications =
      JSON.parse(localStorage.getItem('applications')) || [];

    applications.push(newApplication);

    localStorage.setItem('applications', JSON.stringify(applications));

    onPendingReleaseChange(null);

    navigate('/my-applications', { state: { message: 'Your release application has been submitted successfully! Our staff will contact you for more information.'}});
  }, [navigate, onPendingReleaseChange]);

  useEffect(() => {
    if (
      !location.state?.resumeReleaseSubmission ||
      !username ||
      !pendingRelease ||
      resumedSubmission.current
    ) {
      return;
    }

    resumedSubmission.current = true;
    submitApplication(pendingRelease, username);
  }, [location.state, pendingRelease, submitApplication, username]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      onPendingReleaseChange(formData);
      alert('Please log in before submitting your application.');
      navigate('/login', {
        state: {
          from: {
            pathname: '/release',
            state: { resumeReleaseSubmission: true },
          },
        },
      });
      return;
    }

    submitApplication(formData, username);
  };

  return (
    <div className="release-page">

      {/* Page Heading */}
      <section className="release-heading">
        <h1>Release a Pet</h1>
        <p>
          We understand that rehoming a pet can be difficult.
          PawPals is here to help you find a loving new home for your pet.
        </p>
      </section>

      {/* Release Form */}
      <div className="release-form-container">

        <form onSubmit={handleSubmit}>

          {/* Pet Information */}
          <h2>Pet Information</h2>

          <div className="release-form-group">
            <label htmlFor="petName">Pet's Name</label>
            <input
              type="text"
              id="petName"
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="release-form-row">

            <div className="release-form-group">
              <label htmlFor="petType">Pet Type</label>
              <select
                id="petType"
                name="petType"
                value={formData.petType}
                onChange={handleChange}
                required
              >
                <option value="">Select pet type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="release-form-group">
              <label htmlFor="breed">Breed</label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                placeholder="e.g. Golden Retriever"
                required
              />
            </div>

          </div>

          <div className="release-form-row">

            <div className="release-form-group">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g. 2 years old"
                required
              />
            </div>

            <div className="release-form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

          </div>

          {/* Upload Pet Photo */}
          <div className="release-form-group">
            <label htmlFor="petImage">Upload Pet Photo</label>

            <div className="release-upload-area">
              <input
                type="file"
                id="petImage"
                accept="image/*"
                onChange={handleImageChange}
                required
              />

              <p>Choose a clear photo of your pet.</p>
              <small>
                Accepted formats: JPG, PNG, GIF. Maximum size: 5MB.
              </small>

              {formData.petImage && (
                <div className="release-image-preview">
                  <img
                    src={formData.petImage}
                    alt="Pet preview"
                  />
                  <p>{formData.imageName}</p>
                </div>
              )}
            </div>
          </div>

          <div className="release-form-group">
            <label htmlFor="personality">Pet's Personality</label>
            <textarea style={{ resize: 'none' }} rows={3}
              id="personality"
              name="personality"             
              value={formData.personality}
              onChange={handleChange}
              placeholder="Describe your pet's personality and behaviour..."
              required
            />
          </div>

          <div className="release-form-group">
            <label htmlFor="health">Health Information</label>
            <textarea style={{ resize: 'none' }} rows={3}
              id="health"
              name="health"             
              value={formData.health}
              onChange={handleChange}
              placeholder="Mention any medical conditions, vaccinations, etc."
              required
            />
          </div>

          <div className="release-form-group">
            <label htmlFor="reason">Reason for Rehoming</label>
            <textarea style={{ resize: 'none' }} rows={4}
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Please share why you need to rehome your pet..."
              required
            />
          </div>

          <hr />

          {/* Owner Information */}
          <h2>Owner's Information</h2>

          <div className="release-form-group">
            <label htmlFor="ownerName">Full Name</label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="release-form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="release-form-group">
            <label htmlFor="contact">Contact Number</label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="release-submit-btn">
            Submit Release Application
          </button>

        </form>
      </div>
    </div>
  );
};

export default Release;

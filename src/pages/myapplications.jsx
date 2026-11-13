
import { useState } from 'react';
import './pages.css';
import { useLocation } from 'react-router-dom';

const parseApplicationDate = (dateString) => {
  if (!dateString) return Number.NEGATIVE_INFINITY;

  const trimmedDate = String(dateString).trim();

  if (!trimmedDate) return Number.NEGATIVE_INFINITY;

  const [month, day, year] = trimmedDate.split('/');

  if (month && day && year) {
    const parsedSlashDate = new Date(Number(year), Number(month) - 1, Number(day));
    if (!Number.isNaN(parsedSlashDate.getTime())) {
      return parsedSlashDate.getTime();
    }
  }

  const parsedDate = new Date(trimmedDate);
  return Number.isNaN(parsedDate.getTime()) ? Number.NEGATIVE_INFINITY : parsedDate.getTime();
};

const MyApplications = () => {
  const location = useLocation();
  const message = location.state?.message;
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filter, setFilter] = useState('All');
  const [applications] = useState(() => {
    const savedApplications = JSON.parse(
      localStorage.getItem('applications') || '[]'
    );
    const username = localStorage.getItem('username');

    const userApplications = savedApplications.filter(
      (application) => application.username === username
    );

    return [{
      id: 'sample-approved-adoption',
      type: 'Adoption',
      petName: 'Max',
      breed: 'Golden Retriever',
      image: '/images/adopt-max.jpg',
      username,
      fullName: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      contact: '555-0100',
      homeType: 'House',
      experience: 'Experienced pet owner',
      reason: 'I can provide Max with a safe, loving home.',
      date: '10/15/2026',
      status: 'Approved',
    }, ...userApplications]
      .map((application) => ({
        ...application,
        type: application.type === 'Release' ? 'Pet Release' : application.type,
      }))
      .sort((a, b) => parseApplicationDate(b.date) - parseApplicationDate(a.date));
  });

  const filteredApplications = applications
    .filter((application) => filter === 'All' || application.type === filter)
    .sort((a, b) => parseApplicationDate(b.date) - parseApplicationDate(a.date));

  const totalApplications = applications.length;

  const pendingApplications = applications.filter(
    (application) => application.status === 'Pending Review'
  ).length;

  const approvedApplications = applications.filter(
    (application) => application.status === 'Approved' ||
                     application.status === 'Completed'
  ).length;

  return (
    <div className="applications-page">

      {message && (
        <div className="application-success">
          <h3>Application Submitted!</h3>
          <p>{message}</p>
        </div>
      )}
      

      {/* Page Heading */}
      <div className="applications-heading">
        <h1>My Applications</h1>
        <p>Keep track of your adoption and pet release applications.</p>
      </div>

      {/* Summary Cards */}
      <div className="application-summary">

        <div className="summary-card">
          <span>Total Applications</span>
          <h2>{totalApplications}</h2>
        </div>

        <div className="summary-card">
          <span>Pending Review</span>
          <h2>{pendingApplications}</h2>
        </div>

        <div className="summary-card">
          <span>Approved / Completed</span>
          <h2>{approvedApplications}</h2>
        </div>

      </div>

      {/* Application List */}
      <section className="application-list-section">

        <div className="application-list-heading">
          <div>
            <h2>Your Applications</h2>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Applications</option>
            <option value="Adoption">Adoption</option>
            <option value="Pet Release">Pet Release</option>
          </select>
        </div>

        <div className="application-list">

          {filteredApplications.length === 0 ? (
            <div className="application-empty">
              <h3>No Applications Found</h3>
            </div>
          ) : (

            filteredApplications.map((application) => (

              <div className="application-card" key={application.id}>

                <img
                  src={application.petImage || application.image}
                  alt={application.petName}
                />

                <div className="application-info">

                  <span className="application-type">
                    {application.type}
                  </span>

                  <h3>{application.petName}</h3>

                  <p>{application.breed}</p>

                  <p className="application-date">
                    Submitted: {application.date}
                  </p>

                </div>

                <div className="application-actions">

                  <span className={`application-status ${
                    application.status === 'Pending Review' ||
                    application.status === 'Submitted'
                      ? 'status-pending'
                      : application.status === 'Approved'
                        ? 'status-approved'
                        : application.status === 'Completed'
                          ? 'status-completed'
                          : 'status-rejected'
                  }`}>
                    {application.status}
                  </span>

                  <button
                    className="application-view-btn"
                    onClick={() => setSelectedApplication(application)}
                  >
                    View Details
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </section>

      {/* Application Details Modal */}
      {selectedApplication && (

        <div
          className="application-modal-overlay"
          onClick={() => setSelectedApplication(null)}
        >
          <div
            className="application-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="application-modal-close"
              onClick={() => setSelectedApplication(null)}
            >
              &times;
            </button>

            <img
              src={selectedApplication.petImage || selectedApplication.image}
              alt={selectedApplication.petName}
            />

            <h2>{selectedApplication.petName}</h2>

            <p><strong>Application Type:</strong> {selectedApplication.type}</p>
            <p><strong>Breed:</strong> {selectedApplication.breed}</p>
            <p><strong>Submitted:</strong> {selectedApplication.date}</p>
            <p><strong>Status:</strong> {selectedApplication.status}</p>

            <p className="application-modal-description">
              {selectedApplication.description || selectedApplication.reason}
            </p>

            <button className="application-view-btn" onClick={() => setSelectedApplication(null)}>
              Close
            </button>

          </div>
        </div>

      )}

    </div>
  );
};

export default MyApplications;

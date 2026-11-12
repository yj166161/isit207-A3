import { useEffect , useRef , useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/home';
import Adopt from './pages/adopt';
import Release from './pages/release';
import Gallery from './pages/gallery';
import PetCare from './pages/petcare';
import AboutUs from './pages/aboutus';
import Login from './pages/login';
import SignUp from './pages/signup';
import MyApplications from './pages/myapplications';
import AdoptForm from './pages/adopt-form';


const AdoptFormRoute = ({ user }) => {
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: {
            pathname: location.pathname,
            state: location.state,
          },
        }}
      />
    );
  }

  return <AdoptForm />;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return null;
};



function App() {

  const [user, setUser] = useState(
    localStorage.getItem('username')
  );
  const [pendingRelease, setPendingRelease] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem('username', username);
  };

  const handleSignup = (username) => {
    setUser(username);
    localStorage.setItem('username', username);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('username');
  };

  return (
    <Router>
      <ScrollToTop />
      <Navbar
        isLoggedIn={user !== null}
        onLogout={handleLogout}
      />
      

      <div style={{ padding: 0 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adopt" element={<Adopt user={user} />} />
          <Route
            path="/release"
            element={
              <Release
                username={user}
                pendingRelease={pendingRelease}
                onPendingReleaseChange={setPendingRelease}
              />
            }
          />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/petcare" element={<PetCare />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp onSignup={handleSignup} />} />
          <Route path="/account" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/my-applications" element={ user ? <MyApplications/> : <Navigate to="/account" />}/>
          <Route path="/adopt-form" element={<AdoptFormRoute user={user} />} />

        </Routes>
      </div>

      <Footer />

    </Router>
  );
}

export default App;
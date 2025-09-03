import Header from './components/Header';
import RegistrationForm from './components/RegistrationForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewRegistrations from './components/ViewRegistrations';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/view_registrations" element={<ViewRegistrations />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar'; // .tsx — no .js extension
import Home from './pages/Home';
import EntertainersPage from './pages/EntertainerPage';
import AddPage from './pages/AddPage';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entertainers" element={<EntertainersPage />} />
        <Route path="/add" element={<AddPage />} />
      </Routes>
    </Router>
  );
};

export default App;

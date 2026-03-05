import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import EcoAnalyzer from './EcoAnalyzer';
import EcoResult from './EcoResult';
import './App.css';

function App() {
  return (
    // 1. Change <Router> to <BrowserRouter>
    <BrowserRouter>
      <nav>
        {/* 2. Use 'to' instead of 'path' and remove 'element' */}
        <Link style={{ marginRight: '10px' }} to="/">Home</Link>
        <Link to="/results">Results</Link>
      </nav>

      <Routes>
        <Route path="/" element={<EcoAnalyzer />} />
        <Route path="/results" element={<EcoResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
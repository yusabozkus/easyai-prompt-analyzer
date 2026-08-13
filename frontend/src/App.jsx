import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EcoAnalyzer from './EcoAnalyzer';
import EcoResult from './EcoResult';
import Metrics from './Metrics';
import About from './About';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EcoAnalyzer />} />
        <Route path="/results" element={<EcoResult />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

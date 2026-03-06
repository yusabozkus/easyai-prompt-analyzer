import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EcoAnalyzer from './EcoAnalyzer';
import EcoResult from './EcoResult';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EcoAnalyzer />} />
        <Route path="/results" element={<EcoResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
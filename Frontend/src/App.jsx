import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UrlShortener from './components/UrlShortener';
import AdminPanel from './components/AdminPanel';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<UrlShortener />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

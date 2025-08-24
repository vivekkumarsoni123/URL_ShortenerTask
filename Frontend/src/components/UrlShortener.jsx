import { useState } from 'react';
import axios from 'axios';
import './UrlShortener.css';

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:5000/api/shorten', {
        originalUrl
      });

      setShortUrl(response.data.shortUrl);
      setSuccess(true);
      setOriginalUrl('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      alert('URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="url-shortener">
      <div className="hero-section">
        <h1>Shorten Your URLs</h1>
        <p>Transform long URLs into short, shareable links instantly</p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="url-form">
          <div className="input-group">
            <input
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter your long URL here..."
              required
              className="url-input"
            />
            <button 
              type="submit" 
              disabled={loading || !originalUrl}
              className="submit-btn"
            >
              {loading ? 'Shortening...' : 'Shorten URL'}
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && shortUrl && (
          <div className="result-container">
            <h3>Your shortened URL:</h3>
            <div className="short-url-display">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="short-url-input"
              />
              <button 
                onClick={copyToClipboard}
                className="copy-btn"
              >
                Copy
              </button>
            </div>
            <p className="success-message">
              ✅ URL shortened successfully! Click the copy button to copy the link.
            </p>
          </div>
        )}
      </div>

      <div className="features">
        <div className="feature">
          <h3>🚀 Fast & Reliable</h3>
          <p>Get your shortened URLs instantly with our lightning-fast service</p>
        </div>
        <div className="feature">
          <h3>📊 Track Clicks</h3>
          <p>Monitor how many times your shortened URLs are visited</p>
        </div>
        <div className="feature">
          <h3>🔒 Secure</h3>
          <p>Your URLs are safe and secure with our trusted platform</p>
        </div>
      </div>
    </div>
  );
};

export default UrlShortener;

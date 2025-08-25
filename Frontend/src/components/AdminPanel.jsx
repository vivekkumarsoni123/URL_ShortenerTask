import { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://url-shortenertask.onrender.com/api/urls');
      setUrls(response.data);
    } catch (err) {
      setError('Failed to fetch URLs');
      console.error('Error fetching URLs:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (loading) {
    return (
      <div className="admin-panel">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-panel">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>📊 Admin Dashboard</h1>
        <p>Monitor all shortened URLs and their performance</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total URLs</h3>
          <p className="stat-number">{urls.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Clicks</h3>
          <p className="stat-number">{urls.reduce((sum, url) => sum + url.clicks, 0)}</p>
        </div>
        <div className="stat-card">
          <h3>Average Clicks</h3>
          <p className="stat-number">
            {urls.length > 0 ? Math.round(urls.reduce((sum, url) => sum + url.clicks, 0) / urls.length) : 0}
          </p>
        </div>
      </div>

      <div className="urls-table-container">
        <h2>All Shortened URLs</h2>
        {urls.length === 0 ? (
          <div className="no-urls">
            <p>No URLs have been shortened yet.</p>
          </div>
        ) : (
          <div className="urls-table">
            <div className="table-header">
              <div className="header-cell">Original URL</div>
              <div className="header-cell">Short URL</div>
              <div className="header-cell">Clicks</div>
              <div className="header-cell">Created</div>
              <div className="header-cell">Actions</div>
            </div>
            {urls.map((url) => (
              <div key={url._id} className="table-row">
                <div className="table-cell original-url">
                  <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                    {url.originalUrl.length > 50 
                      ? url.originalUrl.substring(0, 50) + '...' 
                      : url.originalUrl}
                  </a>
                </div>
                <div className="table-cell short-url">
                  <a href={`https://url-shortenertask.onrender.com/${url.shortCode}`} target="_blank" rel="noopener noreferrer">
                    {`https://url-shortenertask.onrender.com/${url.shortCode}`}
                  </a>
                </div>
                <div className="table-cell clicks">
                  <span className="click-count">{url.clicks}</span>
                </div>
                <div className="table-cell created">
                  {formatDate(url.createdAt)}
                </div>
                <div className="table-cell actions">
                  <button 
                    onClick={() => copyToClipboard(`https://url-shortenertask.onrender.com/${url.shortCode}`)}
                    className="copy-btn"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

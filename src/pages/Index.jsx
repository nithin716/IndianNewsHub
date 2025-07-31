import React, { useState, useEffect, useCallback } from 'react';
import { newsService } from '../services/newsApi';
import NewsCard from '../components/NewsCard';
import SearchFilters from '../components/SearchFilters';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

const Index = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('latest');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch latest Indian news on component mount
  const fetchLatestNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await newsService.getLatestIndianNews();
      setArticles(data.results || []);
      setCurrentFilter('latest');
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle search
  const handleSearch = async (keyword) => {
    try {
      setLoading(true);
      setError(null);
      const data = await newsService.searchNews(keyword);
      setArticles(data.results || []);
      setCurrentFilter(`search: ${keyword}`);
    } catch (err) {
      setError('Failed to search news. Please try again.');
      console.error('Error searching news:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle state filter
  const handleStateFilter = async (stateName) => {
    try {
      setLoading(true);
      setError(null);
      const data = await newsService.getNewsByState(stateName);
      setArticles(data.results || []);
      setCurrentFilter(`state: ${stateName}`);
    } catch (err) {
      setError('Failed to filter by state. Please try again.');
      console.error('Error filtering by state:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle category filter
  const handleCategoryFilter = async (category) => {
    try {
      setLoading(true);
      setError(null);
      const data = await newsService.getNewsByCategory(category);
      setArticles(data.results || []);
      setCurrentFilter(`category: ${category}`);
    } catch (err) {
      setError('Failed to filter by category. Please try again.');
      console.error('Error filtering by category:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchLatestNews();
    setIsRefreshing(false);
  };

  // Drag to refresh functionality
  const handleTouchStart = (e) => {
    const startY = e.touches[0].clientY;
    window.startY = startY;
  };

  const handleTouchMove = (e) => {
    const currentY = e.touches[0].clientY;
    const startY = window.startY || 0;
    const diffY = currentY - startY;
    
    if (diffY > 100 && window.scrollY === 0) {
      e.preventDefault();
      const refreshElement = document.querySelector('.drag-refresh');
      if (refreshElement) {
        refreshElement.style.opacity = '1';
      }
    }
  };

  const handleTouchEnd = (e) => {
    const currentY = e.changedTouches[0].clientY;
    const startY = window.startY || 0;
    const diffY = currentY - startY;
    
    if (diffY > 100 && window.scrollY === 0) {
      handleRefresh();
    }
    
    const refreshElement = document.querySelector('.drag-refresh');
    if (refreshElement) {
      refreshElement.style.opacity = '0';
    }
    window.startY = null;
  };

  // Initial data fetch
  useEffect(() => {
    fetchLatestNews();
  }, [fetchLatestNews]);

  // Add touch event listeners for drag-to-refresh
  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="min-vh-100">
      {/* Header */}
      <header className="news-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="mb-0 fw-bold">
                <i className="fas fa-newspaper me-2"></i>
                Indian News Hub
              </h1>
              <p className="mb-0 opacity-75">Stay updated with the latest news from India</p>
            </div>
            <div className="col-auto">
              {isRefreshing && (
                <div className="spinner-border spinner-border-sm text-light" role="status">
                  <span className="visually-hidden">Refreshing...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Drag to refresh indicator */}
      <div className="drag-refresh" style={{ opacity: 0, transition: 'opacity 0.3s ease' }}>
        <i className="fas fa-arrow-down me-2"></i>
        Pull down to refresh
      </div>

      {/* Main Content */}
      <main className="container mt-4">
        {/* Search and Filters */}
        <SearchFilters
          onSearch={handleSearch}
          onStateFilter={handleStateFilter}
          onCategoryFilter={handleCategoryFilter}
          onRefresh={handleRefresh}
        />

        {/* Current Filter Display */}
        <div className="mb-3">
          <small className="text-muted">
            <i className="fas fa-filter me-1"></i>
            Currently showing: <span className="fw-bold">{currentFilter}</span>
          </small>
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
            <button 
              className="btn btn-outline-danger btn-sm ms-3" 
              onClick={handleRefresh}
            >
              Try Again
            </button>
          </div>
        )}

        {/* News Articles */}
        {!loading && !error && (
          <>
            {articles.length > 0 ? (
              <div className="row">
                {articles.map((article, index) => (
                  <NewsCard key={`${article.article_id || index}`} article={article} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 mt-5" style={{ backgroundColor: 'var(--news-accent-2)' }}>
        <div className="container">
          <p className="mb-0 text-muted">
            <small>
              <h4>Developed By Nithin Reddaboina</h4> <br />
                   nithin561@gmail.com <br />
              Powered by NewsData.io | Built with React & Bootstrap

            </small>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
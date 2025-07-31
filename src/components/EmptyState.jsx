import React from 'react';

const EmptyState = ({ message = "No news articles found", subMessage = "Try different search terms or filters" }) => {
  return (
    <div className="empty-state">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <i className="fas fa-newspaper" style={{ fontSize: '4rem', color: 'var(--news-accent-1)', marginBottom: '1rem' }}></i>
            <h3>{message}</h3>
            <p className="lead">{subMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
import React from 'react';

const NewsCard = ({ article }) => {
  const {
    title,
    description,
    image_url,
    link,
    pubDate,
    source_id,
  } = article;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCardClick = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="news-card h-100" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        {image_url && (
          <img
            src={image_url}
            alt={title}
            className="card-img-top"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="news-card-title">{title}</h5>
          {description && (
            <p className="news-card-description flex-grow-1">
              {description.length > 150 
                ? `${description.substring(0, 150)}...` 
                : description
              }
            </p>
          )}
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                {source_id && <span className="fw-bold">{source_id}</span>}
              </small>
              <small className="text-muted">
                {pubDate && formatDate(pubDate)}
              </small>
            </div>
            <button className="btn btn-news-primary btn-sm mt-2 w-100">
              Read Full Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
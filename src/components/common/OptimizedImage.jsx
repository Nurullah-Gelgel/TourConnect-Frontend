import React from 'react';

const OptimizedImage = ({ src, alt, className }) => {
    return (
        <img 
            src={src} 
            alt={alt}
            loading="lazy"
            className={className}
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/fallback-image.png';
            }}
        />
    );
};

export default OptimizedImage; 
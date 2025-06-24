import React from 'react';

export default function ListingImages({ images }) {
  if (!images || images.length === 0) return null;
  const firstImg = images[0].startsWith('/uploads')
    ? `http://localhost:4000${images[0]}`
    : images[0];

  return (
    <div className="d-flex align-items-start mb-3">
      {/* Big main image */}
      <img
        src={firstImg}
        alt="Main"
        style={{
          width: 300,
          height: 220,
          objectFit: 'cover',
          borderRadius: 12,
          marginRight: 10,
          border: '2px solid #e5e5e5'
        }}
      />
      {/* Thumbnails, horizontally beside the main image */}
      <div className="d-flex flex-column">
        {images.slice(1).map((img, idx) => {
          const src = img.startsWith('/uploads')
            ? `http://localhost:4000${img}`
            : img;
          return (
            <img
              key={idx}
              src={src}
              alt={`thumb-${idx + 1}`}
              style={{
                width: 70,
                height: 50,
                objectFit: 'cover',
                borderRadius: 6,
                marginBottom: 8,
                border: '1px solid #ddd'
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
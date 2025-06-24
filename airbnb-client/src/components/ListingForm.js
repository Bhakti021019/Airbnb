import React, { useState } from 'react';

function ListingForm({ onSubmit, initialData = {} }) {
  const [form, setForm] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    propertyType: initialData.propertyType || '',
    location: initialData.location || '',
    price: initialData.price || '',
    amenities: initialData.amenities ? initialData.amenities.join(', ') : '',
    availabilityStart: initialData.availability?.start?.slice(0, 10) || '',
    availabilityEnd: initialData.availability?.end?.slice(0, 10) || '',
    imageLinks: initialData.images
      ? initialData.images.filter(i => i.startsWith('http')).join('\n')
      : '',
    images: [],
  });

  // Removed useEffect to prevent reset-on-type issue!

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setForm(f => ({ ...f, images: files }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const imageLinksArr = form.imageLinks
      ? form.imageLinks.split('\n').map(l => l.trim()).filter(Boolean)
      : [];
    onSubmit({
      ...form,
      price: Number(form.price),
      amenities: form.amenities.split(',').map(a => a.trim()).filter(Boolean),
      availability: {
        start: form.availabilityStart,
        end: form.availabilityEnd,
      },
      imageLinks: imageLinksArr,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Property Type</label>
        <input
          className="form-control"
          name="propertyType"
          value={form.propertyType}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Location</label>
        <input
          className="form-control"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Price</label>
        <input
          className="form-control"
          name="price"
          type="number"
          min="0"
          value={form.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Amenities (comma separated)</label>
        <input
          className="form-control"
          name="amenities"
          value={form.amenities}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Available From</label>
        <input
          className="form-control"
          type="date"
          name="availabilityStart"
          value={form.availabilityStart}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Available To</label>
        <input
          className="form-control"
          type="date"
          name="availabilityEnd"
          value={form.availabilityEnd}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Image Upload (local, multiple allowed)</label>
        <input
          className="form-control"
          type="file"
          name="images"
          onChange={handleChange}
          accept="image/*"
          multiple
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Image Links (one per line)</label>
        <textarea
          className="form-control"
          name="imageLinks"
          value={form.imageLinks}
          onChange={handleChange}
          placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
          rows={3}
        />
      </div>
      <button className="btn btn-primary" type="submit">Save Listing</button>
    </form>
  );
}

export default ListingForm;
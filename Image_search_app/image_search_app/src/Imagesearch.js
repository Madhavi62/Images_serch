import React, { useState } from 'react';
import axios from 'axios';

const Imagesearch = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
    
  const client_id = "PTUsOEWytU4_dReplurvel988FMUICyqeTjmsT52KmQ";
  const searchImages = async (e) => {
    e.preventDefault();

    const response = await axios.get(`https://api.unsplash.com/photos/?client_id=${client_id}&query=${query}`);
    setImages(response.data);
  };

  const handle = (id) => {
    const image = images.find((image) => image.id === id);
    if (image) {
      setBookmarks([...bookmarks, image]);
    }
  };

  return (
    <div>
    <center>
      <h1>Image Search App</h1>
      <form onSubmit={searchImages}>
        <input
          type="text"
          placeholder="Search for images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {images.map((image) => (
          <div key={image.id}>
            <img src={image.urls.regular} alt={image.alt_description} width="50px" height="50px"/>
            <button onClick={() => handle(image.id)}>Bookmark</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Bookmarks</h2>
        {bookmarks.map((image) => (
          <div key={image.id}>
            <img src={image.urls.regular} alt={image.alt_description} width="50px" height="50px"/>
          </div>
        ))}
      </div>
      </center>
    </div>
  );
};

export default Imagesearch;
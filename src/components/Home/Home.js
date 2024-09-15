import React, { useEffect, useState } from 'react';
import MovieCard from './Moviecard';
import SearchIcon from '@mui/icons-material/Search';
import { useRef } from 'react';
import './Moviecard.css';
import { Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('kannada');
  const [genre, setGenre] = useState('all');
  const [showCompanyInfo, setShowCompanyInfo] = useState(false); 
  const [showSearchModal, setShowSearchModal] = useState(false);
  const modalRef = useRef(null);
  const fetchMovies = () => {
    
    setLoading(true);
    fetch('https://hoblist.com/api/movieList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category: 'movies',
        language: language,
        genre: genre,
        sort: 'voting',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setMovies(data.result);
          console.log(data.result)
        } else {
          setError('No movies found.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch movies.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, [language, genre]);

  const navigate=useNavigate();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowSearchModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearchIconClick = () => {
    setShowSearchModal(true); 
  };

  const closeSearchModal = () => {
    setShowSearchModal(false); 
  };
 const handlelogout=(e)=>{
  e.preventDefault();
  localStorage.removeItem('isloggedin');
  navigate("/");
  
 }
  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
   <>
      <div
        className="border-bottom py-3"
        style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '100vw' }}
      >
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          <div className="mx-3">
            <h1 className="h4 mb-0 text-white">Movie Wizz</h1>
          </div>
          <div className="d-flex mx-1 mx-md-5 justify-content-center align-items-center">
            <div className="mx-1 mx-md-5 d-none d-md-block">
            
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ borderRadius: '20px 0 0 20px', border: '1px solid #e3e3e3' }}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="submit"
                  style={{ borderRadius: '0 20px 20px 0', border: '1px solid #e3e3e3' }}
                >
                  <SearchIcon />
                </button>
              </div>
            </div>
            <div className="d-block d-md-none mx-1 mx-md-3">
             
              <button
                className="btn"
                onClick={handleSearchIconClick}
                style={{ borderRadius: '15px', border: '1px solid #e3e3e3' }}
              >
                <SearchIcon style={{color:"white"}} />
              </button>
            </div>
            <div className=" company">
              <button
                className="btn btn-link text-white "
                onClick={() => setShowCompanyInfo(true)}
                style={{ textDecoration: 'none' }}
              >
                Company Info
              </button>
              <Tooltip title="Logout">
              <LogoutIcon onClick={handlelogout} style={{cursor:"pointer"}}/>
              </Tooltip>
              
            </div>
          </div>
        </div>
      </div>

     
      {showSearchModal && (
        <div className="search-modal">
          <div className="search-modal-content" ref={modalRef}>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderRadius: '20px 0px 0px 20px', border: '2px solid #e3e3e3' }}
            />
            <button
                  className="btn btn-outline-secondary"
                  type="submit"
                  onClick={closeSearchModal}
                  style={{ borderRadius: '0 20px 20px 0', border: '1px solid #e3e3e3' }}
                >
                  <SearchIcon />
                </button>
          </div>
        </div>
      )}



     
      {showCompanyInfo && (
        <div className="company-info-modal">
          <div className="company-info-content m-5">
            <h2>Company Info</h2>
            <p>
              <strong>Company:</strong> Geeksynergy Technologies Pvt Ltd
            </p>
            <p>
              <strong>Address:</strong> Sanjayanagar, Bengaluru-56
            </p>
            <p>
              <strong>Phone:</strong> XXXXXXXXX09
            </p>
            <p>
              <strong>Email:</strong> XXXXXX@gmail.com
            </p>
            <button className="company btn " style={{color:"red",border:"solid 1px red"}} onClick={() => setShowCompanyInfo(false)}>
              Close
            </button>
          </div>
        </div>
      )}

<div className="d-flex flex-wrap flex-md-row align-items-center justify-content-between py-3">
  <h2 className="py-3 px-3">Movie List</h2>
  <div className="d-flex gap-3 px-3">
    <div className="form-group">
      <label htmlFor="languageSelect" className="form-label">Language:</label>
      <select
        id="languageSelect"
        className="form-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="kannada">Kannada</option>
        <option value="telugu">Telugu</option>
        <option value="hindi">Hindi</option>
        <option value="english">English</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="genreSelect" className="form-label">Genre:</label>
      <select
        id="genreSelect"
        className="form-select"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        <option value="all">All</option>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
        <option value="thriller">Thriller</option>
        <option value="romance">Romance</option>
      </select>
    </div>
  </div>
</div>


        <div className="d-flex justify-content-center align-items-center flex-wrap">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie, index) => <MovieCard key={index} movie={movie} />)
          ) : (
            <p>No movies found for your selection.</p>
          )}
        </div>
      
    </>
  );
};

export default Home;

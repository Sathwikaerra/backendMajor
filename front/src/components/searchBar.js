import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { FaMicrophoneAlt } from "react-icons/fa"; 
import { FaSearch } from "react-icons/fa";  
import './header.css'


const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error('Your browser does not support voice recognition.', { position: 'top-center' });
      return;
    }
  
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    recognition.onstart = () => {
      toast.info('Listening...', { position: 'top-center' });
    };
  
    recognition.onresult = (event) => {
      if (event.results.length > 0) {
        const transcript = event.results[0][0].transcript;
        toast.success(`You said: "${transcript}"`, { position: 'top-center' });
      }
    };
  
    recognition.onerror = (event) => {
      if (event.error === 'no-speech') {
        toast.warning('No speech detected. Please try again.', { position: 'top-center' });
      } else {
        toast.error(`Error: ${event.error}`, { position: 'top-center' });
      }
    };
  
    recognition.onend = () => {
    //   toast.info('Stopped listening.', { position: 'top-center' });
    };
  
    recognition.start();
  };
  
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
    setSearchTerm("");
  };

  return (
    <div className='searchbar'>
      <input className=' search-input '
        type="text"
        value={searchTerm} // Display the text or voice input value
        onChange={handleInputChange} // Update on manual typing
        placeholder="Search here..."
        
      />
      <button onClick={handleSearch} className='search-button'><FaSearch /></button>
      <button onClick={handleVoiceSearch} className='search-mic'>
        {isListening ? 'Listening...' : <FaMicrophoneAlt />}
      </button>
    </div>
  );
};

export default SearchBar;

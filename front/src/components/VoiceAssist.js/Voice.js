import React, { useState } from 'react';

const Voice = () => {
  const [input, setInput] = useState(''); // Variable to store user input
  const [userInput, setUserInput] = useState(''); // Variable to display input on the webpage

  // Function to handle text input
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Function to save input (text or speech) and display it
  const handleSaveInput = () => {
    setUserInput(input);
    setInput(''); // Clear input field after saving
  };

  // Function to handle speech recognition
  const handleMicClick = () => {
    const recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!recognition) {
      alert('Speech Recognition not supported in this browser.');
      return;
    }

    const speech = new recognition();
    speech.lang = 'en-US';
    speech.start();

    speech.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setInput(speechText); // Populate input field with speech text
    };

    speech.onerror = (err) => {
      console.error('Speech recognition error:', err);
      alert('Could not process audio. Please try again.');
    };
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React Voice and Text Input</h1>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* Input field with mic inside */}
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type or speak something"
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '300px',
            paddingRight: '40px',
          }}
        />
        <button
          onClick={handleMicClick}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          🎤
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handleSaveInput}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Save Input
        </button>
      </div>
      <div style={{ marginTop: '30px', fontSize: '18px' }}>
        <p><strong>User Input:</strong> {userInput}</p>
      </div>
    </div>
  );
};

export default Voice;
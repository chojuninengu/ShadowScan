import React from 'react';

const TestPage = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: 'white', 
      color: 'black',
      minHeight: '100vh',
      position: 'relative',
      zIndex: 9999
    }}>
      <h1>Button Test Page</h1>
      
      <div style={{ margin: '20px 0' }}>
        <button 
          onClick={handleClick}
          style={{
            padding: '10px 20px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          🧪 Test Button
        </button>
      </div>

      <div style={{ margin: '20px 0' }}>
        <button 
          onClick={() => alert('Second button clicked!')}
          style={{
            padding: '10px 20px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          🔵 Second Test Button
        </button>
      </div>

      <div style={{ margin: '20px 0' }}>
        <input 
          type="text" 
          placeholder="Test input"
          onChange={(e) => console.log('Input changed:', e.target.value)}
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
      </div>

      <div style={{ margin: '20px 0' }}>
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            alert('Link clicked!');
          }}
          style={{
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
        >
          Test Link
        </a>
      </div>
    </div>
  );
};

export default TestPage; 
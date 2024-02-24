// ComponentB.js
import React from 'react';
import { useSharedContext } from './SharedContext';

const ComponentB = () => {
  const { sharedState, updateSharedState } = useSharedContext();

  const handleChange = (e) => {
    updateSharedState({ typingMessage: e.target.value });
  };

  const handleClick = () => {
    updateSharedState({
      messageFromB: sharedState.typingMessage,
      typingMessage:'',
      
    });
  };

  return (
    <div>
      <h2>Component B</h2>
      <input
        type="text"
        value={sharedState.typingMessage}
        onChange={handleChange}
        placeholder="Type a message..."
      />
      <button onClick={handleClick}>Send Message to Component A</button>
      <p>Message from Component A: {sharedState.messageFromA}</p>
    </div>
  );
};

export default ComponentB;

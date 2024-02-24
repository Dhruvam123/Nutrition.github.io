// ComponentA.js
import React, { useEffect } from 'react';
import { useSharedContext } from './SharedContext';

const ComponentA = () => {
  const { sharedState, updateSharedState } = useSharedContext();

  useEffect(() => {
    // Any additional logic you want to run when the component mounts
    // For example, you might fetch initial data or subscribe to external events
  }, []); // empty dependency array means this effect will only run once, similar to componentDidMount

  const handleChange = (e) => {
    updateSharedState({ typingMessage: e.target.value });
  };

  const handleClick = () => {
    updateSharedState({
      messageFromA: sharedState.typingMessage,
      typingMessage:'',
    });
  };

  return (
    <div>
      <h2>Component A</h2>
      <input
        type="text"
        value={sharedState.typingMessage}
        onChange={handleChange}
        placeholder="Type a message..."
      />
      <button onClick={handleClick}>Send Message to Component B</button>
      <p>Message from Component B: {sharedState.messageFromB}</p>
    </div>
  );
};

export default ComponentA;

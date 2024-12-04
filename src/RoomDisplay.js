import React, { useEffect, useState } from 'react';

const RoomDisplay = ({ isDarkTheme, level, difficulty }) => {
  const [displayedItems, setDisplayedItems] = useState([]);
  const [memorizeTime, setMemorizeTime] = useState(10);

  const items = [
    'Red book', 'Blue vase', 'Green plant', 'Yellow lamp', 'Purple cushion',
    'Orange painting', 'Brown chair', 'White candle', 'Black clock', 'Silver mirror',
    'Gold frame', 'Cyan rug', 'Magenta curtains', 'Teal bookend', 'Lavender incense'
  ];

  useEffect(() => {
    const getItemsToDisplay = () => {
      let baseItems, additionalItems;
      switch (difficulty) {
        case 'easy':
          baseItems = 3;
          additionalItems = Math.min(level - 1, 2);
          setMemorizeTime(10);
          break;
        case 'medium':
          baseItems = 4;
          additionalItems = Math.min(level - 1, 3);
          setMemorizeTime(8);
          break;
        case 'hard':
          baseItems = 5;
          additionalItems = Math.min(level - 1, 5);
          setMemorizeTime(6);
          break;
        default:
          baseItems = 3;
          additionalItems = Math.min(level - 1, 2);
          setMemorizeTime(10);
      }
      
      const totalItems = Math.min(baseItems + additionalItems, items.length);
      let selectedItems = items.slice(0, totalItems);
      
      if (difficulty !== 'easy') {
        selectedItems = selectedItems.sort(() => Math.random() - 0.5);
      }
      
      return selectedItems;
    };

    setDisplayedItems(getItemsToDisplay());
  }, [level, difficulty]);

  return (
    <div className={`room ${isDarkTheme ? 'dark' : 'light'}`}>
      <h2>Room Contents</h2>
      <div className="room-info">
        <span>Level: {level}</span>
        <span>Difficulty: {difficulty}</span>
        <span>Memorize Time: {memorizeTime}s</span>
      </div>
      <div className="items-grid">
        {displayedItems.map((item, index) => (
          <div key={index} className="item-card">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomDisplay;

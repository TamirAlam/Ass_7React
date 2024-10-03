import React, { useState, useRef } from 'react';
import './Home.css';
import Toast from '../components/Toast';  // Import the Toast component

const Homepage = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showToast, setShowToast] = useState(false);
  const inputRef = useRef(null);

  function buttonHandler() {
    if (searchValue.trim() !== "") {
      setData([...data, { value: searchValue, isChecked: false }]);
      setSearchValue('');
      inputRef.current.focus();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Toast disappears after 3 seconds
    }
  }

    function handleCheckboxChange(index) {
    const newData = data.map((item, i) => {
      if (i === index) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });
    setData(newData);
  }

  function deleteItem(index) {
    setData(data.filter((_, i) => i !== index));
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      buttonHandler(); // Allows adding items with the Enter key
    }
  }

  return (
    <div id='homepage'>
        <div id="card">
            <div id="heading">
                <h2>Grocery Bud</h2>
            </div>
            <div id="add-items-container">
                <input
                  ref={inputRef}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  type="text"
                  id="add-item-field"
                  placeholder="Add a new item..."
                />
                <button onClick={buttonHandler} id='add-item-button'>Add Item</button>
            </div>
            <div id='output'>
                {data.length > 0 ? data.map((item, index) => (
                    <div key={index} style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <input type="checkbox" checked={item.isChecked} onChange={() => handleCheckboxChange(index)} />
                        <p style={{ textDecoration: item.isChecked ? 'line-through' : 'none' }}>{item.value}</p>
                        <button onClick={() => deleteItem(index)}>Delete</button>
                    </div>
                )) : <p>No items added.</p>}
            </div>
        </div>
        {showToast && <Toast message="Item added successfully!" onClose={() => setShowToast(false)} />}
    </div>
  )
}

export default Homepage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios.get('https://reqres.in/api/users?page=2')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <h1>Employee List</h1>
      <input
        type="text"
        placeholder="Search by first name"
        value={searchText}
        onChange={handleSearch}
      />
      <ul className="list-view">
        {filteredUsers.map((user) => (
          <li key={user.id} className="list-item">
            <img src={user.avatar} alt={user.first_name} className="avatar" />
            <div className="user-info">
              <p className="info"> {user.id}</p>
              <p className="Name"> {user.first_name} </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
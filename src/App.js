import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import { GoSearch, GoStar } from 'react-icons/go';

function App() {
  const [user, setUser] = useState(``);
  const [status, setStatus] = useState();
  const [userRepositories, setUserRepositories] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://api.github.com/users/${user.replace(' ', '')}/repos`
      );
      setStatus(res.status);
      setUserRepositories(res.data);
      setUser('');
    } catch (err) {
      setStatus(err.response.status);
      setUser('');
    }
  }

  function handleChange(e) {
    setUser(e.target.value);
  }

  if (status === 200) {
    return (
      <>
        <form className='form' onSubmit={handleSubmit}>
          <input
            className='input'
            type='text'
            value={user}
            required
            onChange={handleChange}
            placeholder='Insert the username'
          />
          <button className='submit-button' type='submit'>
            <GoSearch />
          </button>
        </form>
        <div className='user-card'>
          <div className='user-info'>
            <img
              className='user-img'
              src={
                userRepositories.length > 0 &&
                userRepositories[0].owner.avatar_url
              }
              alt=''
            />
            <p>
              {userRepositories.length > 0 && userRepositories[0].owner.login}
            </p>
          </div>
          {userRepositories.map((repo) => {
            return (
              <div key={repo.id} className='repo-list'>
                <p>{repo.name}</p>
                <div className='repo-info'>
                  <span>
                    <GoStar /> {repo.stargazers_count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  if (status === 404) {
    return (
      <>
        <form className='form' onSubmit={handleSubmit}>
          <input
            className='input'
            type='text'
            value={user}
            required
            onChange={handleChange}
            placeholder='Insert the username'
          />
          <button className='submit-button' type='submit'>
            <GoSearch />
          </button>
        </form>
        <img
          className='not-found-img'
          src='https://image.freepik.com/free-vector/page-found_3482-1692.jpg'
          alt='404 user not found'
        />
      </>
    );
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input
        className='input'
        type='text'
        value={user}
        required
        onChange={handleChange}
        placeholder='Insert the username'
      />
      <button className='submit-button' type='submit'>
        <GoSearch />
      </button>
    </form>
  );
}

export default App;

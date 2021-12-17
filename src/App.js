import React from 'react';
import { useState, useEffect } from 'react'
import './App.css';

const App = () => {

  // This app will generate a password 36 characters long

  const [hashString, setHashString] = useState('-')

  useEffect(() => {
    localStorage.getItem(LOCAL_STORAGE_KEY) 
    ? setHashString(localStorage.getItem(LOCAL_STORAGE_KEY))
    : setHashString('-')
  }, [])

  const LOCAL_STORAGE_KEY = 'react-password'
  const hashes = [
    '!', '@', 'x', '(', 'q', 'w', 'e', 'r', 't',
    '$', '%', '[', ',', 'y', 'u', 'i', 'o', 'p',
    '&', 'c', 'e', ']', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'r', '-', '#', 'a', 'z', 'v', 'b', 'n', 'm'
  ]

  const generatePassword = (arr, hash) => {
    hash = stringify(arr)
    setHashString(hash)
  }

  const stringify = (arr) => {
    let testArr = [...arr]
    let hash = ''
    let i = 36
    const _hashString = (arr) => {
      if (i >= 0) {
        hash += arr[Math.round(Math.random() * (arr.length - 1))] 
        i--
        _hashString(testArr)
      }
    }
    _hashString(testArr)
    return hash
  }

  const savePassword = () => {
    if (hashString !== '-') {
      localStorage.setItem(LOCAL_STORAGE_KEY, hashString)
    }
  }

  const clearPassword = () => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
      setHashString('-')
    }
  }

  return (
    <div className="App">
      <h2 className="Header">Functional Programming - Hash Strings</h2>
      <p>
        Your generated password is:{' '}
        <span className="password">{ hashString }</span>
      </p>
      <div className="button-group">
        <button 
          className="generate-password" 
          onClick={() => generatePassword(hashes, hashString)}
        >
          <i className="ti ti-hexagon"></i>
          Generate Password
        </button>
        <button 
          className="save-password"
          onClick={savePassword}
        >
          <i className="ti ti-lock-access"></i>
          Save
        </button>
        <button 
          className="clear-btn"
          onClick={clearPassword}
        >
          <i className="ti ti-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default App;

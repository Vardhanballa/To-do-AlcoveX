// src/components/Header.js
import React from 'react';
import { FaTasks } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-blue-500 p-4 text-white">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium flex items-center">
        <FaTasks className="mr-2" /> Task Board
      </h1>
    </header>
  );
};

export default Header;


import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center pt-2">
      <h1 className="text-5xl font-bold mb-6">Welcome to Rentify</h1>
      <p className="text-xl mb-8">Find your perfect rental property or list your property for rent.</p>
      <div className="flex gap-6">
        <Link to="/properties" className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-600">
          Browse Properties
        </Link>
       
      </div>
    </div>
  );
};




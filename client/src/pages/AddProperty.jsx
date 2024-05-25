import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'


export const AddProperty = () => {
  const [propertyInfo, setPropertyInfo] = useState('');
  const [area, setArea] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [nearbyHospitals, setNearbyHospitals] = useState('');
  const [nearbyColleges, setNearbyColleges] = useState('');

  const { isLogin } = useSelector(state => state.user)


  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
    }
  };
  const navigate = useNavigate()

  useEffect(() => {

    if (!isLogin) {
        navigate("/login")
    }

}, [isLogin, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://presidio-assignment-backend.onrender.com/api/addProperty', {
        info: propertyInfo,
        area: area,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        nearbyHospitals: nearbyHospitals,
        nearbyColleges: nearbyColleges
      }, config);

      if (response.data.success) {
        toast.success('Property added successfully!');
        navigate("/seller")
        setPropertyInfo('');
        setArea('');
        setBedrooms('');
        setBathrooms('');
        setNearbyHospitals('');
        setNearbyColleges('');
      } else {
        toast.error('Failed to add property');
      }
    } catch (error) {
      console.error('Error adding property:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center pt-20">
      <h1 className="text-3xl font-bold mb-6">Add Property</h1>
      <form className="bg-gray-800 p-6 rounded-md w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Property Info</label>
          <input
            type="text"
            value={propertyInfo}
            onChange={(e) => setPropertyInfo(e.target.value)}
            className="w-full p-2 rounded-md text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Area</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full p-2 rounded-md text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Bedrooms</label>
          <input
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full p-2 rounded-md text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Bathrooms</label>
          <input
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className="w-full p-2 rounded-md text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Nearby Hospitals</label>
          <input
            type="number"
            value={nearbyHospitals}
            onChange={(e) => setNearbyHospitals(e.target.value)}
            className="w-full p-2 rounded-md text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Nearby Colleges</label>
          <input
            type="number"
            value={nearbyColleges}
            onChange={(e) => setNearbyColleges(e.target.value)}
            className="w-full p-2 rounded-md text-black"
            required
          />
        </div>
        <button type="submit" className="bg-blue-700 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-600">
          Add Property
        </button>
      </form>
    </div>
  );
};

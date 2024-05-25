import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export const Seller = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const { isLogin } = useSelector(state => state.user);

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
        }
    };

    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
    }, [isLogin, navigate]);

    useEffect(() => {
        const checkSellerStatus = async () => {
            try {
                const response = await axios.get('https://presidio-assignment-backend.onrender.com/api/isSeller', config);
                if (!response.data.isSeller) {
                    toast.error('You are not a seller');
                    navigate("/properties");
                } else {
                    fetchSellerProperties();
                }
            } catch (error) {
                console.error('Error checking seller status:', error);
            }
        };

        const fetchSellerProperties = async () => {
            try {
                const response = await axios.get('https://presidio-assignment-backend.onrender.com/api/getAllPropertiesOfSeller', config);
                setProperties(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching properties:', error);
                setLoading(false);
            }
        };

        checkSellerStatus();
    }, [navigate, config]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://presidio-assignment-backend.onrender.com/api/deleteProperty/${id}`, config);
            toast.success('Property deleted successfully');
            fetchSellerProperties();
        } catch (error) {
            console.error('Error deleting property:', error);

        }
    };

    const PropertyCard = ({ property, index }) => (
        <div className="bg-gray-800 flex flex-col gap-3 text-white md:w-1/3 w-full p-4 border rounded-md">
            <div>
                <span className="font-semibold text-lg">{index + 1}</span>
            </div>
            <div>
                <span className="font-semibold">Property ID:</span> {property._id}
            </div>
            <div>
                <span className="font-semibold">Property Info:</span> {property.info}
            </div>
            <div>
                <span className="font-semibold">Area:</span> {property.area}
            </div>
            <div>
                <span className="font-semibold">Bedrooms:</span> {property.bedrooms}
            </div>
            <div>
                <span className="font-semibold">Bathrooms:</span> {property.bathrooms}
            </div>
            <div>
                <span className="font-semibold">Nearby hospitals:</span> {property.nearbyHospitals}
            </div>
            <div>
                <span className="font-semibold">Nearby colleges:</span> {property.nearbyColleges}
            </div>
            <div>
                <span className="font-semibold">Posted at:</span> {new Date(property.createdAt).toLocaleDateString()}
            </div>
            <div className='flex gap-4'>
                <button
                    onClick={() => handleDelete(property._id)}
                    className='bg-red-700 text-white font-semibold px-5 py-1 rounded-md mt-3'
                >
                    Delete
                </button>
                <Link
                    to={`/updateProperty/${property._id}`}
                    className='bg-blue-700 text-white font-semibold px-5 py-1.5 rounded-md mt-3'
                >
                    Update
                </Link>
            </div>
        </div>
    );

    return (
        <div className='min-h-screen pt-14 bg-gray-900'>

            <p className='text-white text-center py-5 text-3xl font-semibold'>Your Properties</p>
            <div className='flex justify-center items-center w-full'>
                <Link
                    to="/addProperty"
                    className='bg-green-700 text-white font-semibold px-5 my-3 py-1 rounded-md mt-3'
                >
                    Add Property
                </Link>
            </div>
            <div className='flex justify-center'>
                <div className='w-full md:px-0 px-5 flex flex-col justify-center gap-4 items-center'>
                    {loading ? (
                        <div className="text-white">Loading...</div>
                    ) : (
                        properties.map((property, i) => (
                            <PropertyCard index={i} key={property._id} property={property} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

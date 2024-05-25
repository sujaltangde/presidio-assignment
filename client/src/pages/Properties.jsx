import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [bedroomsFilter, setBedroomsFilter] = useState('');
    const [bathroomsFilter, setBathroomsFilter] = useState('');

    const navigate = useNavigate()

    const { isLogin } = useSelector(state => state.user)

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
        }
    };

    useEffect(() => {
        if (!isLogin) {
            navigate("/login")
        }
    }, [isLogin, navigate])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://presidio-assignment-backend.onrender.com/api/getAllProperties', config);
                setProperties(response.data.data);
                setLoading(false); 
            } catch (error) {
                console.error('Error fetching properties:', error);
                setLoading(false); 
            }
        };
        fetchData();
    }, []);

    const handleBedroomsChange = (e) => {
        setBedroomsFilter(e.target.value);
    };

    const handleBathroomsChange = (e) => {
        setBathroomsFilter(e.target.value);
    };

    const PropertyCard = ({ property, index }) => {
        const [toggle, setToggle] = useState(false);

        return (
            <div className="bg-gray-800 flex flex-col gap-3 text-white md:w-1/3 w-full p-4 border rounded-md">
                <div>
                    <span className="font-semibold text-lg">{index+1}</span>
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

                <div>
                    <button onClick={() => setToggle(!toggle)} className='bg-blue-700 text-white font-semibold px-5 py-1 rounded-md'>Interested</button>

                    {toggle && (
                        <div className="bg-gray-700 text-white p-4 mt-2 rounded-md">
                            <div className="font-semibold text-lg mb-1">Seller Details</div>
                            <div><span className="font-semibold">Seller ID:</span> {property.sellerId._id}</div>
                            <div><span className="font-semibold">Name:</span> {property.sellerId.firstName} {property.sellerId.lastName}</div>
                            <div><span className="font-semibold">Email:</span> {property.sellerId.email}</div>
                            <div><span className="font-semibold">Phone No:</span> {property.sellerId.phoneNumber}</div>
                            <div><span className="font-semibold">Since:</span> {new Date(property.sellerId.createdAt).toLocaleDateString()}</div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

  
    const filteredProperties = properties.filter(property => {
        if (bedroomsFilter && property.bedrooms !== parseInt(bedroomsFilter)) {
            return false;
        }
        if (bathroomsFilter && property.bathrooms !== parseInt(bathroomsFilter)) {
            return false;
        }
        return true;
    });

    return (
        <div className='min-h-screen pt-14 bg-gray-900'>
            <p className='text-white text-center py-5 text-3xl font-semibold'>Properties to sell</p>
            <div className='flex justify-center'>
                <div className='w-full md:px-0 px-5 flex flex-col justify-center gap-4 items-center'>

                   
                <div className="flex justify-center gap-4 mb-4">
    <div className="flex items-center">
        <label htmlFor="bedrooms" className="mr-2 text-white font-semibold">Bedrooms:</label>
        <select id="bedrooms" value={bedroomsFilter} onChange={handleBedroomsChange} className="bg-gray-800 text-white rounded-md px-3 py-1">
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
    </div>
    <div className="flex items-center">
        <label htmlFor="bathrooms" className="mr-2 text-white font-semibold">Bathrooms:</label>
        <select id="bathrooms" value={bathroomsFilter} onChange={handleBathroomsChange} className="bg-gray-800 text-white rounded-md px-3 py-1">
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
    </div>
</div>

                    
                    {loading ? (
                        <div className="text-white">Loading...</div> // Show loader while loading
                    ) : (
                        filteredProperties.length > 0 ? (
                            filteredProperties.map((property,i) => (
                                <PropertyCard key={property._id} index={i} property={property} />
                            ))
                        ) : (
                            <div className="text-white">No properties found matching the filters</div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

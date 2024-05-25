const Property = require('../models/propertiesModel.js');
const bcrypt = require('bcrypt');
const { createToken } = require('../middlewares/auth.js');

// Post property 
exports.addProperty = async (req, res) => {
    try {

        const sellerId = req.user._id

        const { info, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges} = req.body ;

        if (!sellerId || !info || !area || !bedrooms || !bathrooms || !nearbyHospitals || !nearbyColleges) {
            return res.status(400).json({
                success: false,
                message: 'invalid data'
            })
        }

        
        const property = await Property.create({
            sellerId, info, area, bedrooms, bathrooms,
            nearbyHospitals, nearbyColleges
        });


      
        res.status(201).json({
            success: true,
            data: property
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get single property 
exports.getSingleProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.propertyId);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }
        res.status(200).json({
            success: true,
            data: property
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get all properties of a particular seller user
exports.getAllPropertiesOfSeller = async (req, res) => {
    try {
        const properties = await Property.find({ sellerId: req.user._id });
        res.status(200).json({
            success: true,
            data: properties
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Update property 
exports.updateProperty = async (req, res) => {
    try {

        const property = await Property.findById(req.params.propertyId);

        if(property.sellerId.toString() !== req.user._id.toString()){
            return res.status(404).json({
                success: false,
                message: 'Not access to change'
            });
        }

        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }

        const updatedProperty = await Property.findByIdAndUpdate(req.params.propertyId, req.body, {
            new: true,
            runValidators: true
        });

      


        res.status(200).json({
            success: true,
            data: updatedProperty
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Delete property 
exports.deleteProperty = async (req, res) => {
    try {

        const property = await Property.findById(req.params.propertyId);

        if(property.sellerId.toString() !== req.user._id.toString()){
            return res.status(404).json({
                success: false,
                message: 'Not access to delete'
            });
        }

        const deletedProperty = await Property.findByIdAndDelete(req.params.propertyId);
        
        res.status(200).json({
            success: true,
            message: 'Property deleted successfully',
            deletedProperty
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};



// get All properties
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find().populate({
            path: 'sellerId',
            select: '-password'
        });
        res.status(200).json({
            success: true,
            data: properties
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

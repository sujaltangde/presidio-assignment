const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    info: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    nearbyHospitals: {
        type: Number, 
        required: true
    },
    nearbyColleges: {
        type: Number, 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;

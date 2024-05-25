const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')
const { createToken } = require('../middlewares/auth.js')




// Register User 
exports.register = async (req, res) => {
    try {

        const { firstName, lastName, phoneNumber, email, role, password } = req.body;

        if (!firstName || !lastName || !phoneNumber || !email || !role || !password) {
            return res.status(400).json({
                success: false,
                message: 'invalid data'
            })
        }

        const hashPass = await bcrypt.hash(password, 10)
        const user = await User.create({
            firstName, lastName, phoneNumber, email, role,
            password: hashPass,
        });

        const token = createToken(user._id, user.email);

        res.status(201).json({
            success: true,
            user,
            token
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


// Login User
exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please enter email and password'
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exists"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Wrong credentials"
            })
        } else {


            const token = createToken(user._id, user.email);

            res.status(200).json({
                success: true,
                message: "User loggded in successfull",
                token
            })
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



// isLogin
exports.isLogin = async (req, res) => {
    try {
        const user = req.user;

        if (user) {
            return res.status(200).json({
                success: true,
                isLogin: true
            })
        }
        if (!user) {
            return res.status(200).json({
                success: true,
                isLogin: false
            })
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}






// get seller details
exports.sellerDetails = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;

        // Find the seller by ID
        const seller = await User.findById(sellerId);

        if (!seller) {
            return res.status(404).json({
                success: false,
                message: 'Seller not found'
            });
        }

        // Return seller details in the response

        const sellerDetails = {
            _id: seller._id,
            firstName: seller.firstName,
            lastName: seller.lastName,
            email: seller.email,
            phoneNumber: seller.phoneNumber,
            role: seller.role,
            createdAt: seller.createdAt
        }

        res.status(200).json({
            success: true,
            sellerDetails
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}




// isSeller
exports.isSeller = async (req, res) => {
    try {

        res.status(200).json({
            success: true,
            isSeller: true
        })


    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

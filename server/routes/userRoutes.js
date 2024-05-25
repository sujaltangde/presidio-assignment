const express = require('express')
const { register, login, isLogin, sellerDetails, isSeller } = require('../controllers/userControllers')
const { isAuthenticated, authorizationRoles} = require('../middlewares/auth')
const router = express.Router() 


router.route("/register").post(register) ;
router.route("/login").post(login) ;
router.route("/isLogin").get(isAuthenticated, isLogin) ; 
router.route("/sellerDetails/:sellerId").get(isAuthenticated, sellerDetails) ; 
router.route("/isSeller").get(isAuthenticated, authorizationRoles("seller"),isSeller) ; 




module.exports = router
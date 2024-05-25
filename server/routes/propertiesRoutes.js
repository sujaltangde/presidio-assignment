const express = require('express')
const { addProperty, getSingleProperty, getAllPropertiesOfSeller, updateProperty, deleteProperty, getAllProperties } = require('../controllers/propertyControllers')
const { isAuthenticated, authorizationRoles} = require('../middlewares/auth')
const router = express.Router() 


router.route("/addProperty").post(isAuthenticated, authorizationRoles("seller"), addProperty) ;
router.route("/getSingleProperty/:propertyId").get(isAuthenticated, getSingleProperty) ;
router.route("/getAllPropertiesOfSeller").get(isAuthenticated, authorizationRoles("seller"), getAllPropertiesOfSeller) ; 
router.route("/getAllProperties").get(isAuthenticated, getAllProperties) ; 
router.route("/updateProperty/:propertyId").put(isAuthenticated, authorizationRoles("seller"),updateProperty) ; 
router.route("/deleteProperty/:propertyId").delete(isAuthenticated, authorizationRoles("seller"),deleteProperty) ; 



module.exports = router
const { register, login, avatar, getAllUsers } = require('../controllers/usersController');
const verifyToken = require('../middlewares/auth');

const router = require('express').Router();

router.post("/register",register);
router.post("/login",login);
router.post("/avatar/:id",verifyToken ,avatar);
router.get("/allusers/:id",verifyToken ,getAllUsers);


module.exports = router;
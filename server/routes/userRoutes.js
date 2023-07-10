const { register, login, avatar, getAllUsers } = require('../controllers/usersController');
const verifyToken = require('../middlewares/auth');

const router = require('express').Router();

router.post("/register", verifyToken ,register);
router.post("/login", verifyToken,login);
router.post("/avatar/:id",verifyToken,avatar);
router.get("/allusers/:id",verifyToken,getAllUsers);


module.exports = router;
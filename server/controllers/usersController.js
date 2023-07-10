const User = require ("../model/userModel");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//-------------------------------------- Inscrpition---------------------------------------------------

module.exports.register = async (req,res,next) => {
    // console.log(req.body);
   try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if(usernameCheck)
    return res.json({msg:"Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if(emailCheck)
    return res.json({ msg : "Email is taken" ,status:false});
    const hashedPassword = await brcypt.hash(password,10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    

    return res.json({ status: true, user, token });
  } catch (ex) {
    next(ex);
  }
};

//-------------------------------------- Inscrpition---------------------------------------------------

//-------------------------------------- Ce Connecter--------------------------------------------------

module.exports.login = async (req,res,next) => {
    // console.log(req.body);
   try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(!user)
    return res.json({msg:"Incorrect username or password", status: false });
    const isPasswordValid = await brcypt.compare(password,user.password);
    if(!isPasswordValid)
    return res.json({msg:"Incorrect username or password", status: false });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    

    return res.json({ status: true, user, token });
  } catch (ex) {
    next(ex);
  }

};
//-------------------------------------- Ce Connecter---------------------------------------------------

//-------------------------------------- Avatar ---------------------------------------------------

module.exports.avatar = async (req,res,next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(
          userId,
          {
            isAvatarImageSet: true,
            avatarImage,
          },
          { new: true }
        );
        return res.json({
          isSet: userData.isAvatarImageSet,
          image: userData.avatarImage,
        });
      } catch (ex) {
        next(ex);
      }
    };

//-------------------------------------- Avatar ---------------------------------------------------

//-------------------------------------- Contacte Users ---------------------------------------------------

module.exports.getAllUsers = async (req,res,next) => {
    try {
        const users = await User.find({ _id: {$ne: req.params.id} }).select([
            "username",
            "_id",
            "avatarImage",
            "email",
        ]);
        return res.json(users);
    } catch (ex) {
        next(ex);
        
    }
}
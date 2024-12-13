const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const user = require('../models/user');
const multer = require("multer");
const path = require("path");
const fs = require('fs');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// router.get('/profile',(req,res)=>{
//   console.log("set profile");
// })

router.get('/profile1', async (req, res) => {
  const { username } = req.query;
  try {
    const user1 = await User.findOne({ username }); 
    if (user1) {
      res.status(200).json({ profile: user1.profile }); 
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post("/profile", upload.single("profileImage"), async (req, res) => {
  const { username } = req.body;
  const filePath = req.file ? `/uploads/${req.file.filename}` : null;
  console.log("hello")
  try {
    if (!username || !filePath) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const user1 = await user.findOne({ username });
    if (!user1) {
      return res.status(404).json({ error: "User not found" });
    }

    user1.profile = filePath;
    await user1.save();

    res.json({ message: "Profile image updated successfully", profile: filePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});



router.post('/', async (req, res) => {
  try {
    const { email, username, regno, password, role, dept, section, year } = req.body;
   
    const finduser = await user.findOne({email:email})
    if(finduser!==null){
        return res.status(400).json({message:"Email Already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = new user({
      email,
      username,
      regno,
      password: hashedPassword, 
      role,
      dept,
      section,
      year
    });


    const saveData = await data.save();
    console.log(data);
    res.status(201).json(saveData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error' });
  }
});


router.post('/signin', async (req, res) => {
  try {
    const { email, password ,role} = req.body;
    const userdata = await user.findOne({ email: email });

    if (!userdata) {
      return res.status(404).json({ message: 'User not found' });
    }
    else if(userdata.role!==role){
        return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, userdata.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials'});
    }

    console.log('Signin successful');
    res.status(200).json({ message: 'Signin successful' ,user:userdata});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error signing in' });
  }
});

module.exports = router;

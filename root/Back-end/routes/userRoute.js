const express = require('express');
const bcrypt = require('bcryptjs'); // Import bcrypt
const router = express.Router();
const user = require('../models/user');


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
    res.status(200).json({ message: 'Signin successful' ,user:userdata.username});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error signing in' });
  }
});

module.exports = router;

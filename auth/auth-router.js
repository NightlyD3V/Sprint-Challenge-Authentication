const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('./config/secret');
const db = require('./auth-model');

//GENERATE TOKEN
const generateToken = userId => {
  return jwt.sign({ userId }, secret.jwtSecret, { expiresIn: '5h' });
};

router.post('/register', (req, res) => {
  // implement registration
  const user = req.body 
  const hash = bcrypt.hashSync(user.password, 14)
  user.password = hash
  db.newUser(user)
    .then((res) => {
      res.status(201).json(res)
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error creating new user!'
      })
    })
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body
  db.findBy({username})
    .then((user) => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user.id)
        res.status(200).json({
          message: `user ${user.username} has logged in!`,
          token: token
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error logging in try again'
      })
    })
});

module.exports = router;

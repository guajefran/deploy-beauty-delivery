const express = require("express")
const authController = express.Router()
const passport = require("passport")

const User = require("../models/User")
const bcrypt = require("bcrypt")
const bcryptSalt = 10

module.exports = {
  signup: (req, res, next) => {
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    let role = req.body.role

    console.log(req.body.role);

    if (!username || !password || !email) {
      res.status(400).json({
        message: "Provide username,password & email"
      })
      return
    }

    User.findOne({
      username
    }, "username", (err, user) => {
      if (user !== null) {
        res.status(400).json({
          message: "The username already exists"
        })
        return
      }

      var salt = bcrypt.genSaltSync(bcryptSalt)
      var hashPass = bcrypt.hashSync(password, salt)

      var newUser = User({
        username,
        password: hashPass,
        email,
        role
      })

      newUser.save((err) => {
        if (err) {
          res.status(400).json({
            message: "Something went wrong"
          })
        } else {
          req.login(newUser, function(err) {
            if (err) {
              return res.status(500).json({
                message: 'something went wrong :('
              })
            }
            res.status(200).json(req.user)
          })
        }
      })
    })
  },
  login: (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err)
      }

      if (!user) {
        return res.status(401).json(info)
      }

      req.login(user, function(err) {
        if (err) {
          return res.status(500).json({
            message: 'something went wrong :('
          })
        }console.log (req.user )
        res.status(200).json(req.user)
      })
    })(req, res, next)
  },
  logout: (req, res) => {
    req.logout()
    res.status(200).json({
      message: 'Success'
    })
  },
  loggedin: (req, res) => {
    if (req.isAuthenticated()) {
      return res.status(200).json(req.user)
    }

    return res.status(403).json({
      message: 'Unauthorized'
    })
  },
  private: (req, res) => {
    if (req.isAuthenticated()) {
      return res.json({
        message: 'This is a private message'
      })
    }

    return res.status(403).json({
      message: 'Unauthorized'
    })
  },
  uploadfile: (req, res) => {
    return res.json({
      message: 'New Phone created!',
    })
  }
}

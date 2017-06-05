var ProfileModel = require('../models/ProfileModel.js')
const upload = require('../config/multer');

module.exports = {

  list: function(req, res) {
    ProfileModel.find(function(err, Profiles) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Profile.',
          error: err
        })
      }
      return res.json(Profiles)
    })
  },

  findByUser: function(req, res) {
    var id = req.params.id
    ProfileModel.findOne({
      professional: id
    }, function(err, Profile) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Profile.',
          error: err
        })
      }
      if (!Profile) {
        return res.status(404).json({
          message: 'No such Profile'
        })
      }
      return res.json(Profile)
    })
  },
  // show: function(req, res) {
  //   var id = req.params.id
  //   ProfileModel.findOne({
  //     _id: id
  //   }, function(err, Profile) {
  //     if (err) {
  //       return res.status(500).json({
  //         message: 'Error when getting Profile.',
  //         error: err
  //       })
  //     }
  //     if (!Profile) {
  //       return res.status(404).json({
  //         message: 'No such Profile'
  //       })
  //     }
  //     return res.json(Profile)
  //   })
  // },

  create: function(req, res) {
    console.log(req.body)
    var profile = new ProfileModel({
      company: req.body.company,
      description: req.body.description,
      professional: req.body.professional
    })

    profile.save(function(err, profile) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating Profile',
          error: err
        })
      }
      return res.status(201).json(profile)
    })
  },
//UPLOAD//
  upload: function(req, res) {
    const phone = new Phone({
    name: req.body.name,
    brand: req.body.brand,
    image: `/uploads/${req.file.filename}`,
    specs: JSON.parse(req.body.specs) || []
  });

  phone.save((err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'New Phone created!',
      phone: phone
    });
  });
  },



  update: function(req, res) {
    var id = req.params.id
    ProfileModel.findOne({
      _id: id
    }, function(err, Profile) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Profile',
          error: err
        })
      }
      if (!Profile) {
        return res.status(404).json({
          message: 'No such Profile'
        })
      }

      Profile.company = req.body.company ? req.body.company : Profile.company
      Profile.description = req.body.description ? req.body.description : Profile.description
      Profile.professional = req.body.professional ? req.body.professional : Profile.professional

      Profile.save(function(err, Profile) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating Profile.',
            error: err
          })
        }

        return res.json(Profile)
      })
    })
  },

  remove: function(req, res) {
    var id = req.params.id
    ProfileModel.findByIdAndRemove(id, function(err, Profile) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the Profile.',
          error: err
        })
      }
      return res.status(204).json()
    })
  }
}

const express = require('express')
const router = express.Router()
const moment = require('moment')

const Client = require('../models/Client')

router.route('/')
  .get((req, res) => {
    var queryGender = null
    var searchAlergy = null
    if(req.query.gender) {
      queryGender = { gender: req.query.gender }
    }
    if(req.query.alergy) {
      searchAlergy = 'allergies'
      var arrayToFind = req.query.alergy
      console.log('searchAlergy: ', searchAlergy)
    }
    Client.find()
      .limit(parseInt(req.query.pagesize))
      .where(queryGender)
      .where('age').gt(req.query.minage || 0).lt(req.query.maxage || 120)
      .where('lastVisit').gt(req.query.lastVisit || Date.now())
      .then(clients => { res.send(clients) })
      .catch(err => { res.status(400).send(err) })
  })
  .post((req, res) => {
    Client.create(req.body)
      .then(client => { res.send(client) })
      .catch(err => { res.status(400).send(err) })
  })


  router.route('/:id')
    .get((req,res) => {
      Client.findById(req.params.id)
        .then(client => res.send(client))
        .catch(err => res.status(400).send(err))
    })
    .put((req, res) => {
      Client.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
      .then(client => {
        res.send(client)
      })
      .catch(err => {
        res.status(400).send(err)
      })
    })
    .delete((req, res) => {
      Client.findByIdAndRemove(req.params.id)
      .then(client => client.save())
      .then(clients => {
        Client.find()
          .then(clients => res.send(clients))
      })
      .catch(err => {
        res.status(400).send(err)
      })
    })

module.exports = router

// router.route('/:id')
// .put((req, res) => {
//   User.findById(req.params.id)
//   .then(user => user.haveBirthday())
//   .then(user => {
//     res.send(user)
//   })
//   .catch(err => {
//     res.status(400).send(err)
//   })
// })

 // .get((req, res) => {
 //    Client.find()
 //      .skip(10)
 //      .limit(10)
 //      .then(clients => { res.send(clients) })
 //      .catch(err => { res.status(400).send(err) })
 //  })


// .limit(20)
// .sort({age: 1})
// .sort({age: -1}) - oldest
// .sort({age: -1})
// .limit(3) - top three oldest
// .sort('name.last') by last name
// .sort('-name.last') by decending last name
// .select('age gender') // will limit what fields are returned
// .select('-age')
// .select({
//   age: 1,
//   gender: 1
// })
// .select({
//   age: 1,
//   'name.first': true
// })

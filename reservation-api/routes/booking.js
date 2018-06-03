var express = require('express');
var router = express.Router();
var roomsModel = require('./../mongo/db')

router.get('/', (req, res) => {
    var allRooms = []
    roomsModel.find({}, (err, result) => {
        allRooms = result
        res.json(allRooms)
    })
})
module.exports = router
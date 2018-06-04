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

router.post('/update/:room_id', (req, res) => {
    roomsModel.update(
        { _id: req.params.room_id },
        { $set: 
            { status: "booked" }
        }
    )
})
module.exports = router
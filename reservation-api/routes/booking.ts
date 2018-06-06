import * as express from 'express'
import roomsModel from './../mongo/db'

const router: express.Router = express.Router();

router.get('/', (req, res) => {
    var allRooms = []
    roomsModel.find({}, (err, result) => {
        if (!err) {
            allRooms = result
            res.json(allRooms)
        }
        else {
            console.log(err)
        }
    })
})

router.post('/update/:room_id/:time_start/:time_end', (req, res) => {
    roomsModel.findOne({_id:req.params.room_id}, (err, result) => {
        if (!err && result.length > 0) {
            result.bookedAt.push({
                timestamp_start: req.params.time_start,
                timestamp_end: req.params.time_end
            })
            let booking = result
            result.save()
            res.json(booking)
        }
        else {
            res.status(404).json({ message: "An error occurred"})
        }
    })
})
export default router
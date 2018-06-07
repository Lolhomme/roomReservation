import * as express from 'express'
import roomsModel from './../mongo/db'
import * as mongoose from 'mongoose'

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
    let id = mongoose.Types.ObjectId(req.params.room_id)
    roomsModel.findById(id, (err, room) => {
        if (!err && room) {
            room.bookedAt.push({
                timestamp_start: req.params.time_start,
                timestamp_end: req.params.time_end
            })
            room.save()
            res.json(room)
        }
        else if (err) {
            res.status(404).json({ message: err})
        }
        else {
            res.status(404).json({ message: "An error occurred"})            
        }
    })
})
export default router
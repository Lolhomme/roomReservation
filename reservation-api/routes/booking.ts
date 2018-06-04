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

router.post('/update/:room_id', (req, res) => {
    roomsModel.update(
        { _id: req.params.room_id },
        { $set: 
            { status: "booked" }
        }
    )
})
export default router
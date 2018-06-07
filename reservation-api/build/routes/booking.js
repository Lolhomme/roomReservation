"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var db_1 = require("./../mongo/db");
var mongoose = require("mongoose");
var router = express.Router();
router.get('/', function (req, res) {
    var allRooms = [];
    db_1.default.find({}, function (err, result) {
        if (!err) {
            allRooms = result;
            res.json(allRooms);
        }
        else {
            console.log(err);
        }
    });
});
router.post('/update/:room_id/:time_start/:time_end', function (req, res) {
    var id = mongoose.Types.ObjectId(req.params.room_id);
    db_1.default.findById(id, function (err, room) {
        if (!err && room) {
            room.bookedAt.push({
                timestamp_start: req.params.time_start,
                timestamp_end: req.params.time_end
            });
            room.save();
            res.json(room);
        }
        else if (err) {
            res.status(404).json({ message: err });
        }
        else {
            res.status(404).json({ message: "An error occurred" });
        }
    });
});
exports.default = router;

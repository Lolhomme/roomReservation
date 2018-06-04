"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var db_1 = require("./../mongo/db");
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
router.post('/update/:room_id', function (req, res) {
    db_1.default.update({ _id: req.params.room_id }, { $set: { status: "booked" }
    });
});
exports.default = router;

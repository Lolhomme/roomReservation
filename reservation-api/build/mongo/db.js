"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/rooms');
var roomsSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    capacity: Number,
    equipements: [{ name: String }],
    bookedAt: [{
            timestamp_start: Number,
            timestamp_end: Number
        }],
    createdAt: Date,
    updatedAt: Date
});
var rooms = mongoose.model('room', roomsSchema);
var data = [
    {
        "name": "Salle #1",
        "description": "Salle #1",
        "capacity": 5,
        "equipements": [
            {
                "name": "TV"
            },
            {
                "name": "Retro Projecteur"
            }
        ],
        "bookedAt": [
            {
                "timestamp_start": 1528254000000,
                "timestamp_end": 1528261200000
            }
        ],
        "createdAt": "2016-12-07T12:39:29.812Z",
        "updatedAt": "2016-12-08T17:31:39.489Z"
    },
    {
        "name": "Salle #2",
        "description": "Salle #2",
        "capacity": 10,
        "equipements": [
            {
                "name": "Retro Projecteur"
            }
        ],
        "bookedAt": [],
        "createdAt": "2016-12-07T12:39:55.384Z",
        "updatedAt": "2016-12-07T13:33:37.184Z"
    },
    {
        "name": "Salle Okjsdkso",
        "description": "Salle Okjsdkso",
        "capacity": 11,
        "equipements": [],
        "bookedAt": [],
        "createdAt": "2016-12-07T14:15:55.733Z",
        "updatedAt": "2016-12-09T16:45:19.025Z"
    },
    {
        "name": "Salle de ouf",
        "description": "Salle de ouf",
        "capacity": 10,
        "equipements": [
            {
                "name": "TV"
            },
            {
                "name": "Retro Projecteur"
            }
        ],
        "bookedAt": [],
        "createdAt": "2016-12-09T16:45:34.419Z",
        "updatedAt": "2016-12-09T16:45:34.419Z"
    },
    {
        "name": "Salle nulle",
        "description": "Salle nulle",
        "capacity": 26,
        "equipements": [
            {
                "name": "TV"
            },
            {
                "name": "Retro Projecteur"
            }
        ],
        "bookedAt": [],
        "createdAt": "2016-12-09T16:45:49.096Z",
        "updatedAt": "2016-12-09T16:45:49.096Z"
    }
];
rooms.count({}, function (err, count) {
    if (!err && count == 0) {
        rooms.insertMany(data, function (err, res) {
            if (err) {
                console.log(err);
            }
        });
    }
});
exports.default = rooms;

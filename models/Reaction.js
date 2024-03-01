const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const luxon = require('luxon');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => luxon.DateTime.fromJSDate(createdAtVal).toFormat('YYYY MMM DD hh:mm a')
    }
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

module.exports = reactionSchema;
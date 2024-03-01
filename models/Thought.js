const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const luxon = require('luxon');
const reactionSchema = require('./Reaction');


const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => luxon.DateTime.fromJSDate(createdAtVal).toFormat('YYYY MMM DD hh:mm a')
    },
    username: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// const reactionSchema = new Schema({
//     reactionId: {
//         type: Schema.Types.ObjectId,
//         default: () => new Types.ObjectId()
//     },
//     reactionBody: {
//         type: String,
//         required: true,
//         minlength: 1,
//         maxlength: 280
//     },
//     username: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//         get: (createdAtVal) => luxon.DateTime.fromJSDate(createdAtVal).toFormat('YYYY MMM DD hh:mm a')
//     }
// },
// {
//     toJSON: {
//         virtuals: true,
//         getters: true
//     },
//     id: false
// }
// );

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
    

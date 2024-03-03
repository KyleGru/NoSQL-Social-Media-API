const { Thought, User } = require('../models');

const thoughtController = {

    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id: XX})
            .then(ThoughtData => res.json(ThoughtData))
            .catch((err) => res.json(err))
    },

    // Get thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({ path: 'reactions', select: '-__v' })
        .then(ThoughtData => {
            if(!ThoughtData) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(ThoughtData);
        })
        .catch((err) => res.status(500).json(err)); 
    },
    
    // Create a new thought
    createThought({ body }, res) {
        Thought.create(body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: body.userId},
                    { $push: { thoughts: thought._id } },
                    { new: true }
                )
            })
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(userData);
            })
    },

    // Update a thought by id
    updateThoughtById({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(ThoughtData => {
                if(!ThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json(ThoughtData);
            })
            .catch((err) => res.status(500).json(err));
    },

    // Delete a thought by id
    deleteThoughtById({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(ThoughtData => {
                if(!ThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                return User.findOneAndUpdate(
                    { thoughts: params.id },
                    { $pull: { thoughts: params.id } },
                    { new: true }
                )
            })
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(userData);
            })
            .catch((err) => res.status(500).json(err)); 
    },

    // Add a reaction to a thought by id
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(ThoughtData => {
            if(!ThoughtData) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(ThoughtData);
        })
        .catch((err) => res.status(500).json(err));
    },

    // Remove a reaction from a thought by id
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(ThoughtData => {
            if(!ThoughtData) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(ThoughtData);
        })
        .catch((err) => res.status(500).json(err));
    }
}

module.exports = thoughtController;
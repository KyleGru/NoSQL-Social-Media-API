const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
        .select('-__v')
        .then((userData) => {
            if (!userData) {
                res.status(404).json({ message: 'No users found' });
                return;
            }
            res.json(userData);
        })
        .catch((err) => res.status(500).json(err));
    },

    // Get a single user by id
    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
        .populate({ path: 'thought', select: '-__v' })
        .populate({ path: 'friend', select: '-__v' })
        .select('-__v')
        .then((userData) => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(userData);
        })
        .catch((err) => res.status(500).json(err)); 
    },

    // Create a new user
    createNewUser({body}, res) {
        User.create(body)
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },

    // Update a user by id
    updateUserById({params, body}, res) {
        User.findOneAndUpdate({ _id:params.id }, body, { new: true, runValidators: true })
        .then((userData) => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(userData);
        })
        .catch((err) => res.status(500).json(err));
    },

    // Delete a user by id
    deleteUserById({params}, res) {
        Thought.deleteMany({ userId: params.id })
        .then(() => {
        User.findOneAndDelete({ _id: params.id})
        .then((userData) => {
            if(!userData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json({ message: 'User with this id has been deleted'});
        })
        .catch((err) => res.status(500).json(err));
        })
    },

    // Add a friend to a user by id
    addFriend({params}, res) {
        User.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId }}, { new: true})
        .then((userData) => { 
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(userData);
        })
        .catch((err) => res.status(500).json(err));
    },

    // Remove a friend from a user by id
    removeFriend({params}, res) {
        User.findOneAndUpdate({ _id: params.userId }, { $pull: { friends: params.friendId }}, { new: true})
        .then((userData) => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(userData);
        })
        .catch((err) => res.status(500).json(err));
    }
}


module.exports = userController;

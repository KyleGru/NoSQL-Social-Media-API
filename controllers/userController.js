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




    // Create a new user



    // Update a user by id



    // Delete a user by id



    // Add a friend to a user by id


    
    // Remove a friend from a user by id





}


module.exports = userController;

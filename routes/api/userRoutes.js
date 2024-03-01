const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUserById,
    deleteUserById,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// /api/users
router.route('/')
    .get(getAllUsers)
    // .post(createNewUser);

// /api/users/:id


// api/users/:userId/friends/:friendId


module.exports = router;
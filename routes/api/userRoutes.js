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
    .post(createNewUser);

// /api/users/:id
router.route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

// api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;
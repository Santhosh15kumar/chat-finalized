const userController = require('../controllers/user.js');
const agentController = require('../controllers/agent.js');
const authenticateToken = require('../middleware/auth.js');

const router = require('express').Router();

router.post('/user/register', userController.create);
router.get('/user/details', userController.getAllUser);
router.get('/user/details/:id', userController.getUserById);
router.post('/user/changeOnlineStatus/:id', userController.changeOnlineStatus);
router.post('/user/updateMessageData/:id', userController.updateMessageArray);
router.post('/agent/register', agentController.register);
router.post('/agent/login', agentController.login);


module.exports = router;

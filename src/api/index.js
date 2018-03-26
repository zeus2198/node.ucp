/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import Express from 'express';

import indexStats from './indexStats';
import login from './login';
import auth from './auth';
import avatar from './avatar';
import avatarX50 from './avatarX50';
import user from './user';
import userStats from './user.stats';
import userVehicles from './user.vehicles';
import searchUsers from './searchUsers';
import top from './top';
import loc from './san-location';
import properties from './properties';
import changePwd from './changePwd';
import uploadAvatar from './uploadAvatar';
import logout from './logout';

let router = Express.Router();

router.post('/login',  login);
router.post('/changePwd', changePwd);
router.post('/avatar/upload', uploadAvatar);
router.get('/indexStats', indexStats);
router.get('/auth', auth);
router.get('/avatars/:id', avatar);
router.get('/avatars/x50/:id', avatarX50);
router.get('/users/:id', user);
router.get('/users/:id/stats', userStats);
router.get('/users/:id/vehicles', userVehicles);
router.get('/search/:text', searchUsers);
router.get('/top/:cat', top);
router.get('/san-location/:x/:y', loc);
router.get('/properties', properties);
router.get('/logout', logout);


router.get('*', (req, res) => res.status(404).end());
export default router;
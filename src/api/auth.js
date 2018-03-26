/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import verifySession from '../utils/verifySession';

export default (req, res) => {
    req.headers['if-none-match'] = 'no-match-for-this';//prevent express from sending "304 not modified" code which bugs the working of this api route.

    verifySession(req, res).then(() => 
        res.json({ authenticated: true, id: req.cookies.usr })
    ).catch((err) => 
        err ? res.status(500).end() : res.json({ authenticated: false })
    );
};
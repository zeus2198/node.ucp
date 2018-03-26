/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import path from 'path';
import fs from 'fs';

//get absolute path for serving avatar files
const root = path.join(__dirname, '../../public/avatar/');
const defautAvatar = root + 'defaultX50.jpg';

export default (req, res) => {    
    fs.access(root + req.params.id + 'x50.png', fs.constants.R_OK, (err) => {
        if(err)return res.sendFile(defautAvatar);
        res.sendFile(root + req.params.id + 'x50.png');
    });
};
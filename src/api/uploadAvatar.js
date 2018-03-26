/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import path from 'path';
import fs from 'fs';
import formidable from 'formidable';
import sharp from 'sharp';

import verifySession from '../utils/verifySession';

//get absolute path for serving avatar files
const root = path.join(__dirname, '../../public/avatar/');

sharp.cache({ files: 0 });

export default (req, res) => {
    req.headers['if-none-match'] = 'no-match-for-this';//prevent express from sending "304 not modified" code which bugs the working of this api route.

    verifySession(req, res).then(() => {
        if (!req.get('Content-Type').startsWith('multipart/form-data'))
            return res.status(401).end();

        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) return res.status(500).end();

            //validating file:
            if (files.image.size > 1000000) return res.status(401).end();
            const file_ext = files.image.name.split('.').pop().toLowerCase();

            sharp(files.image.path).resize(184, 184)
                .toFile(`${root}${req.cookies.usr}.png`).then(() => {

                    res.status(200).end(); // file upload successfully              

                    sharp(files.image.path).resize(50, 50) // create one small image to serve in top list and search page
                        .toFile(`${root}${req.cookies.usr}x50.png`).then(() => {
                            fs.unlink(files.image.path, () => { }); //deleting the temp image
                        }).catch((err) => {
                            console.log('Error converting avatar to 50x50', err);
                        }
                    );                    
                }).catch((err) => {
                    console.error("Error uploading avatar", err);
                    return res.status(500).end();
                }
            );
        });
    }).catch(err => {
        res.status(err ? 500 : 401).end();
    });
};

const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const shortId = require('shortid');

const s3 = new aws.S3({
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.SECRET_KEY
});

module.exports = {
  /**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns  information
 * 
 * information contiene la Key y la ubicacion de donde quedo guardada la imagen
 */
    uploadImage(req, res) {
    
        try{
         const objectName = req.query.objectName;
    
        const image = multer({
            storage: multerS3({
                s3: s3,
                bucket: process.env.S3_NAME,
                acl: 'public-read',
                metadata: function (req, file, cb) {
                    console.log("file --------<>", file)
                    
                    cb(null, { fieldName: file.fieldname });
                },
                key: function (req, file, cb) {
                    const imageName = objectName +"_"+ shortId.generate()+"_"+Date.now().toString();
                    cb(null, imageName)
                }

            })
        }).single("image")(req, res, (error) => {

            if (error) {
                console.log(error)
            }

            console.log(req, res, error);

             /**
              * Informacion donde se encuentra la Key y la locacion de donde quedo guardada la imagen
              */

            if(req && req.file){
                
                console.log("The image has been uploaded successfully", information, req);
                var information = { "key": req.file.key ,"location":  req.file.location}; 
                return res.status(201).send(information);

            }else{
                console.log(req, res, error);
                console.log("An error has occurred while loading the image");
                return res.status(500).send("Han error has occured please check with your systems administrator");
            }
        })
    }catch(error){
        console.log("An error has occurred while loading the image",error)
        return res.status(500).send(error)
    }
    }  
}
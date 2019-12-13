const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const storage = admin.storage();
const os = require("os");
const path = require("path");
const spawn = require("child-process-promise").spawn;

const cors = require("cors")({ origin: true });
const Busboy = require("busboy");
const fs = require("fs");

// const gcs = require("@google-cloud/storage");
// gcs.projectId = "YOUR_ID";
// gcs.keyFilename = "NO_NEED";

const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId: "jornal-porto-pecem"
});

exports.onFileChange = functions.storage.object().onFinalize(event => {
  console.log(event);
  const bucket = event.bucket;
  const contentType = event.contentType;
  const filePath = event.name;
  console.log('file detected')

if(event.resourceState === "not_exists"){
    console.log("nos apagamos, sinto muito")
    return
}

if(path.basename(filePath).startsWith('resized-')){
  console.log('already renamed this file')
  return;
}

  const destBucket = storage.bucket(bucket);
  const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
const metadata = { contentType : contentType }
  return destBucket.file(filePath).download({
    destination : tmpFilePath
  }).then(() => {
    return spawn('convert', [tmpFilePath, '-resize', "500x500", tmpFilePath]);
    

 
  }).then(()=>{
    return destBucket.upload(tmpFilePath, {
        destination:'resized-'+ path.basename(filePath),
        metadata: metadata
      }) 
  })

})


exports.uploadFile = functions.https.onRequest((req, res)=>{

    cors(req, res, ()=>{
        if (req.method !== 'POST'){
            return res.status(500).json({
                message: "metodo errado"
            })
        }
        const busboy = new Busboy({headers: req.headers})
        let  uploadData = null;
        busboy.on('file', (fieldname, file, filename, enconding, mimetype)=>{
            const filepath = path.join(os.tmpdir(), filename);
            uploadData = {file: filepath, type: mimetype}
            file.pipe(fs.createWriteStream(filepath))
        })

        busboy.on("finish", ()=>{
            const bucket = storage.bucket("jornal-porto-pecem.appspot.com")
            bucket.upload(uploadData.file,{
                uploadType:"media",
                metadata: {
                    metadata:{
                        contentType: uploadData.type
                    }
                }
            })
            .then(()=>{
               
                res.status(200).json({
                    message:"deu certo"
                })
            })
            .catch(err=>{
               res.status(500).json({
                    error: "aquio erro" +err
                })
            })
           
        }) 
        const fotoUrl = fileData.metadata.downloadUrls[0] 
        busboy.end(req.rawBody)  
    })
    
    
})

exports.onDataAdded = functions.database.ref('/message/{id}').onCreate(event => {
  console.log('event: ' + event.ref)
  const data = event.val();
  const newData = {
    msg: data.msg.toUpperCase()
  };
  return event.ref.parent.child('copiedData').set(newData)
});




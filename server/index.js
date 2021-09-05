const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path')
//requires Cors to be installed for the communication betweent SVR n Client!
app.use(cors());
//Tells express that the incoming object is JSON object!!
app.use(express.json());

app.use(express.static('ImgDB'))
app.use('/api/staticImages', express.static('ImgDB'))

app.get('/api/publist', (req,res) => {
    fs.readdir("./ImgDB/Publication/",'utf8', function(err,data){
        res.send(data)
    
    })
})

app.get('/api/datasets', (req,res) => {
    //console.log("Dataset stuff: " , req.query.datasetname)
    fs.readdir("./ImgDB/Publication/" + req.query.datasetname,'utf8', function(err,data){
        if (data === undefined){
            data = ["No Datasets"]
        }
        //console.log(req.query.datasetname)
        res.send(data)
    
    })
})

app.get('/api/channels', (req,res) => {
    //console.log("Channels stuff: " , req.query.channelname)
    fs.readdir("./ImgDB/Publication/" + req.query.channelname[1] +"/"+ req.query.channelname[2] + "/PNG/" +  req.query.channelname[0],'utf8', function(err,data){
        if (data === undefined){
            data = ["No Channels"]
        }
        //console.log()
        res.send(data)
    
    })
})

app.get('/api/directions', (req,res) => {
    //console.log("Direction Stuff: " , req.query.directionsname)
    fs.readdir("./ImgDB/Publication/" + req.query.directionsname[1] +"/"+ req.query.directionsname[0] + "/PNG",'utf8', function(err,data){
        if (data === undefined){
            data = ["No Direction"]
        }
        
        res.send(data)
    
    })
})

app.get('/api/textinfo', (req,res) => {
    //console.log("Text Stuff: " , req.query.textname)
    textstuff = ""
    fs.readdir("./ImgDB/Publication/" + req.query.textname[1] +"/"+ req.query.textname[0] + "/(B1)-Metadata",'utf8', function(err,data){
        if (data === undefined){
            textstuff = ["No Direction"]
            }
        data.forEach(element => {
            if (element.includes("-Info.txt")){
                fs.readFile("./ImgDB/Publication/" + req.query.textname[1] +"/"+ req.query.textname[0] + "/(B1)-Metadata/" + element,'utf8', function(err,textdata){
                    textstuff = (textdata)
                    //console.log(textstuff)
                    //console.log("Textstuff " + typeof(textstuff))
                    res.send(textstuff)
                } 
                )
            }
        });

    })
})

app.get('/api/images', (req,res) => {
    //console.log("Img stuff: " , req.query.pathinfo, "\n")
    var dirpath = "./ImgDB/Publication/" + req.query.pathinfo[1] +"/"+ req.query.pathinfo[0] + "/PNG/" + req.query.pathinfo[2] +"/"+ req.query.pathinfo[3]
    var NameList = []
    //console.log(dirpath)
    for (i = 0; i < (fs.readdirSync(dirpath).length); i++ ){
        NameList.push(fs.readdirSync(dirpath + "/" + (fs.readdirSync(dirpath)[i])))
        //console.log("this is namelist: " + NameList.length)

    }
    for (x = 0; x < NameList.length; x++){
        for (y=0; y< NameList[x].length; y++){
            NameList[x][y] = dirpath.replace("./ImgDB","/api/staticImages") + "/" + fs.readdirSync(dirpath)[x] + "/" + NameList[x][y]
        }
    }
    res.send(NameList)
})
   

app.listen(3001, () => {
    console.log("Server is up and running, me Lord!")
})







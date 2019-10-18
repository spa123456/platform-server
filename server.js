var creatmysql = require('./diaper/createtablediaper') //引入上传数据库
var express = require('express')
var app = new express
var querysql = require('./diaper/querydiaper')

var File = require('./diaper/uploadimage') //引入上传图片json文件

var bodyParser = require('body-parser')
app.use(bodyParser.json({
    limit: "100mb"
}));
app.use(bodyParser.urlencoded({
    limit: "100mb",
    urlencoded: true,
}))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200); /*让options请求快速返回*/
    } else {
        next();
    }
})
/*
 **  @description 上传尿不湿接口
 **  @param {} 
 **  @return 
 **  @author shipingan
 */
app.post('/adddiaperproduct', (req, res) => {
    let imageJSONfile = { //用于存储JSON文件到本地，查询图片的时候本地查询json
        "mainimageurl": req.body.mainimgurl,
        "detailsurl": req.body.detailsurl,
    }
    let jsonname = req.body.name
    var diaperfile = new File(jsonname, imageJSONfile) //实例化一个构造函数，存储本地图片JSON
    diaperfile.weiteFile(jsonname, imageJSONfile) //此处图片存储成功

    let mysqladdress = './diaper/imagefile/diaper' + jsonname + '.json' //json文件的地址
    let params = {
        address: mysqladdress,
        name: jsonname,
        number: req.body.number,
        moduls: req.body.moduls,
        weixin: req.body.weixin,
        phone: req.body.phone,
        expain: req.body.expain
    }
    creatmysql.creatwritetable(params) //写入数据库
    // console.log(res);
    let content = {
        status: "OK"
    }
    res.json(content)
})

/*
 **  @description 查询diaper数据渲染
 **  @param {} 
 **  @return 
 **  @author shipingan
 */

app.post('/getdiaperdetalis', (req, res) => {
    let querydiaper = `SELECT * FROM diaper`
    querysql.query(querydiaper, [], (result) => {
        var data = JSON.parse(JSON.stringify(result))
        res.send(data)
    })
})

/*
 **  @description 删除diaper数据
 **  @param {} 
 **  @return 
 **  @author shipingan
 */

app.post('/removediaperFile', (req, res) => {
    // 删除图片json文件
    let path = req.body.path
    var remove = new File('', '')
    remove.removeFile(path)
    //删除数据库
    let id = req.body.id
    let removediapersql = `DELETE FROM diaper where id=${id}`
    querysql.query(removediapersql, (err, result) => {
        if (err) {
            console.log(err);
            return
        }
        res.json("删除成功")
    })


})


var server = app.listen(3000, function () {

    var host = server.address().address;

    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
})
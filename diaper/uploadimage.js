var fs = require("fs")

function File(name, data,filename) {
    this.name = name
    this.data = data
    this.filename = filename
}

/*
 **  @description 创建
 **  @param {} 
 **  @return 
 **  @author shipingan
 */
File.prototype.weiteFile = function (name, data,filename) {
    this.name = name
    this.data = data
    this.filename = filename
    fs.writeFile(`./diaper/imagefile/${filename}${name}.json`, JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
            return
        }
        console.log("写好了");
    })
}
/*
 **  @description 删除
 **  @param {} 
 **  @return 
 **  @author shipingan
 */
File.prototype.removeFile = function (path) {
    fs.unlink(path, err => {
        if (err) {
            console.log(err);
            return
        }
        console.log("删除成功");
    })
}

/*
 **  @description 获取
 **  @param {} 
 **  @return 
 **  @author shipingan
 */
File.prototype.queryFile = function (path) {
    //文件流
    var data = ''
    //创建文件流
    var readerStream = fs.createReadStream(path);
    // 设置编码为 utf8。
    readerStream.setEncoding('UTF8');
    readerStream.on('data', function (chunk) {
        data += chunk;
    });
    readerStream.on('end', function () {
    });
    readerStream.on('error', function (err) {
        console.log(err.stack);
    });

}

module.exports = File
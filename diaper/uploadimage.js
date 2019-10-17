var fs = require("fs")
function File(name, data) {
    this.name = name
    this.data = data
}
File.prototype.weiteFile = function (name, data) {
    this.name = name
    this.data = data
    fs.writeFile('./diaper/imagefile/diaper' + name + '.json', JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
            return
        }
        console.log("写好了");
    })
}
module.exports = File
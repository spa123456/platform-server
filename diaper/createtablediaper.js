
var mysql = require("mysql")
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shi19930710.',
    port: '3306',
    database: 'product',
})
connection.connect()
// 数据 文件名
function creatwritetable(data,filename) {
    let propdata = data
    let file = filename
    let showtable = "SHOW TABLES"
    connection.query(showtable, (err, results) => {
        if (err) {
            console.log(err);
            return
        }

        var data = JSON.parse(JSON.stringify(results))
        if (data == '') {
            caertediapertable(propdata,file)
        } else {
            data.map(res => {
                if (res.Tables_in_product == file) {
                    //调用写数据
                    weitediaperdata(propdata,file)
                } else {
                    caertediapertable(propdata,file)
                }
            })
        }

        //放入函数内部才不会报错
        // connection.end()
    })
}


/*
 **  @description 创建diaper表格的函数
 **  @param {} 
 **  @return 
 **  @author shipingan
 */
function caertediapertable(data,filename) {
    let creattable = `CREATE TABLE ${filename} (id INT(100) UNSIGNED AUTO_INCREMENT,address varchar(1000),name varchar(1000),number varchar(1000),moduls varchar(1000),weixin varchar(1000),phone varchar(1000),expain varchar(20000),PRIMARY KEY (id))ENGINE=InnoDB DEFAULT CHARSET=utf8;`
    connection.query(creattable, (err, results) => {
        if (err) {
            console.log(err);
            return
        }
        weitediaperdata(data,filename)
    })
}

/*
 **  @description 写数据
 **  @param {} 
 **  @return 
 **  @author shipingan
 */
function weitediaperdata(data,filename) {
    let details = []
    for (const key in data) {
       details.push(data[key])
    }
    
    let writedata = `INSERT INTO ${filename} (id,address,name,number,moduls,weixin,phone,expain) VALUES (0,?,?,?,?,?,?,?)`
    connection.query(writedata, details, (err, results) => {
        if (err) {
            console.log(err);
            return
        }
    })
}

exports.creatwritetable = creatwritetable
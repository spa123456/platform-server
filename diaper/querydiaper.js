var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    password: 'shi19930710.',
    user: 'root',
    database: 'product'
})
connection.connect()
module.exports = {
    query: function (sql, params, callback) {

        connection.query(sql, params, function (err, results, fields) {
            if (err) {
                console.log('数据操作失败');
                throw err;
            }
            callback && callback(results, fields);

        });

    }
};
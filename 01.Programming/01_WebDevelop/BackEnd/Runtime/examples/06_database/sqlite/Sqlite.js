// 在Node.js中使用sqlite
// 作者：owlman
// 时间：2019年07月20日

const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()

class SqliteDB {
    constructor(file) {
        this.db = new sqlite3.Database(file)
        const db_exist = fs.existsSync(file)
    
        if ( !db_exist ) {
            console.error('数据库文件创建成功！')
            fs.openSync(file, 'w')
        }
    }

    createTable(sql) {
        this.db.serialize(function() {
            this.run(sql, function(err) {
                if( err !== null ) {
                    return console.error('错误信息：' + err.message)                
                }
            })
        })
    }

    insertData(sql, objects) {
        this.db.serialize(function() {
            const stmt = this.prepare(sql)
            for ( let i = 0; i < objects.length; ++i ) {
                stmt.run(objects[i])
            }
    
            stmt.finalize()
        })
    }
    
    queryData(sql, callback, message) {
        this.db.all(sql, function(err, rows) {
            if( err !== null ) {
                return console.error('错误信息：' + err.message)
            }
    
            if( callback ) {
                callback(rows, message)
            }
        })
    }
    
    executeSql(sql) {
        this.db.run(sql, function(err) {
            if( err !== null ) {
                return console.error('错误信息：' + err.message)
            }
        })
    }

    close() {
        this.db.close()
    }
}

module.exports = SqliteDB

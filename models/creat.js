const mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/lagou';


mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, err=>{
    if(err){
        console.log('---------------------------------------')
        console.log('数据库连接失败：', err)
        console.log('---------------------------------------')
        return; 
    }
    console.log('数据库连接成功');
})

const db = mongoose.connection;

const model = db.model('users',{
    username: {type: String},
    password: {type: String},
    email: {type: String}
})

const jobinfo = db.model('jobinfo',{
    zwname: {type: String},
    gsname: {type: String},
    gzjy: {type: String},
    zwlx: {type: String},
    gzdd: {type: String},
    gwxz: {type: String},
    imgurl: {type: String}
})

module.exports = {
    model,
    jobinfo
}
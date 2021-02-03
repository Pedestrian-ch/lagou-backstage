const creat = require('../models/creat');
const formidable = require('formidable')
const fs = require('fs');
const mongodb = require('mongodb')
var ObjectId = mongodb.ObjectId;


const model = creat.model;
const jobinfo = creat.jobinfo



var add = (req, res, next) => {
    
    var form = new formidable.IncomingForm();
    // 设置文件保存路径，相对路径
    form.uploadDir = "./public/images";
    form.keepExtensions = true;
    // 解析表单， fields表示文本域，files表示文件域
    form.parse(req, function(err, fields, files) {
        if(err){
            console.log(err);
        }
        
        model.findOne({username: fields.username}).then(rs => {
            if(rs){
                //将表单数据传入postdata对象
                var postData = fields;
                postData.imgurl = files.gslogo.path.replace(/^public/, '').replace(/\\/g, "/");
                delete postData['username'];

                //创建插入数据对象然后插入数据
                const insertData = new jobinfo(postData);
                insertData.save().then(r => {
                    if(r){
                        res.send({
                            meta: {
                                state: 200,
                                msg: "信息添加成功"
                            }
                        })
                    }else{
                        res.send({
                            meta: {
                                state: 500,
                                msg: "信息添加失败"
                            }
                        })
                    }
                }).catch(e => {
                    console.log('添加失败' + e);
                    return false;
                })
            }else{
                res.send({
                    meta: {
                        state: 500,
                        msg: "用户不存在,无法添加,请重新登录"
                    }
                })
            }
            return rs;
        }).catch(err => {
            console.log('查找失败' + err);
            return false;
        })
    });
}

var findinfo = (req, res, next) => {
    // 获取post传来的username
    var username = req.body.username;
    // 验证该用户名是否在users集合中，如果在那么就执行查找功能
    model.findOne({username: username}).then(rs => {
        if(rs){
            jobinfo.find().then(r => {
                res.send({
                    meta: {
                        state: 200,
                        msg: "查询成功"
                    },
                    data: r
                })
            })
        }else{
            res.send({
                meta: {
                    state: 500,
                    msg: "用户不存在,请重新登录"
                }
            })
        }
    }).catch(err => {
        console.log("查找信息失败" + err);
        return false;
    })
}

var deleteinfo = (req, res, next) => {
    // 获取get传值的id
    var id = req.query.id
    // 删除有此id的文档
    jobinfo.findOne({"_id": new ObjectId(id)}).then(rs => {
        if(rs){
            fs.unlink('./public' + rs.imgurl, (err) => {if(err) throw err})
            jobinfo.deleteOne({"_id": new ObjectId(id)}).then(r => {
                if(r){
                    res.redirect('/manage')
                }
            })
        }else{
            console.log("数据库没有该文档，删除失败");
        }
    }).catch(err => {
        console.log(err);
    })
}

var updatainfo = (req, res, next) => {
    var id = req.query.id;

}

module.exports = {
    add,
    findinfo,
    deleteinfo,
    updatainfo
}
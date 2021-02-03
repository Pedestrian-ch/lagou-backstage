const creat = require('../models/creat');
const model = creat.model;

var register = (req, res, next) => {
    var registData = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }

    const insertData = new model(registData);
    insertData.save().then(rs => {
        if (rs) {
            res.send({
                meta: {
                    state: 200,
                    msg: "注册成功"
                }
            })
        } else {
            res.send({
                meta: {
                    state: 500,
                    msg: "注册失败"
                }
            })
        }
        return rs;
    }).catch(err => {
        console.log('插入失败' + err);
        return false;
    })
    
}

var login = (req, res, next) => {
    var loginData = {
        username: req.body.username,
        password: req.body.password
    }

    model.findOne(loginData).then(rs => {
        if (rs) {
            res.send({
                meta: {
                    state: 200,
                    msg: "登录成功"
                },
                data: loginData.username
            })
        } else {
            res.send({
                meta: {
                    state: 500,
                    msg: "登录失败",
                },
                data: "用户名或密码不正确"
            })
        }
        return rs;
    }).catch(err => {
        console.log('查找失败' + err);
        return false;
    })
}

module.exports = {
    register,
    login
}
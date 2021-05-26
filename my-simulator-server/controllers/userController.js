const userModel = require('../models/user-model');
const enCoding = require('../utils/crypto');
const token = require('../utils/token')

function userController() {
    function createUser(req, res) {
        console.log('post');
        if (!req.body.name || !req.body.password) {
            console.log();
            return res.status(500).send(err);
        }
        if (!req.body.roleNum) {
            req.body.roleNum = 300;
        }
        req.body.password = enCoding.cipher(req.body.password);
        var newIntern = new userModel(req.body);
        newIntern.save(function (err, newDoc) {
            if (err) {
                console.log(err);
                return res.status(500).send()
            }
            res.status(201).send();
            console.log(newDoc);
        });
    }

    function login(req, res) {
        console.log("login");
        if (!req.body.userName || !req.body.password) {
            return res.status(400).send()
        }
        userModel.findOne({ userName: req.body.userName },
            { id: 1, name: 1, userName: 1, password: 1, roleNum: 1 }, function (err, doc) {
                if (err) {
                    return res.status(500).send();
                }
                if (!enCoding.compareCipher(req.body.password, doc.password))
                    return res.status(401).send();
                var split = '=!='
                var newToken = token.getEncrypto(doc.id + split + doc.roleNum + split + Date.now());
                res.status(200).send({ token: newToken })
            })
    }

    function chacking(req, res){
        if (!req.body.userName) {
            return res.status(400).send()
        }
        userModel.findOne({userName: req.body.userName},function(err, doc){
            if(err){
                return res.status(500).send();
            }
            res.status(200).send(doc!=null);
        })

    }

    return {
        createUser,
        login,
        chacking
    }
}

module.exports = userController();
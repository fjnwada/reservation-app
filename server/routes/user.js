const express = require('express')
const router = express.Router()
const User = require('../model/user')
const config = require('../config')
const jwt = require('jsonwebtoken')

router.post('/login', async function(req, res){
    const {email, password} = req.body
    if(!email){
        return res.status(422).send({errors:  [{title: 'User error',detail: 'Please fill email'}]})
    }

    if(!password){
        return res.status(422).send({errors:  [{title: 'User error',detail: 'Please fill password'}]})
    }

    try {
        // ユーザーをデータベースから取得
        const foundUser = await User.findOne({ email });

        // ユーザーが存在しない場合
        if (!foundUser) {
            return res.status(422).send({
                errors: [{ title: 'User error', detail: 'User does not exist' }]
            });
        }

        // パスワードが一致しない場合
        if (!foundUser.hashSamePassword(password)) {
            return res.status(422).send({
                errors: [{ title: 'User error', detail: 'Incorrect password' }]
            });
        }

        // JWT トークンの生成
        const token = jwt.sign(
            {
                userId: foundUser.id,
                username: foundUser.username
            },
            config.SECRET,
            { expiresIn: '1h' }
        );

        // トークンをレスポンスとして返す
        return res.json({ token });

    } catch (err) {
        // エラーが発生した場合
        return res.status(422).send({
            errors: [{ title: 'User error', detail: 'Something went wrong' }]
        });
    }

    // User.findOne({email}, function(err, foundUser){
    //     //try~catch文を入れる。
    // if(err){
    //         return res.status(422).send({errors:  [{title: 'User error',detail: 'Someting went wrong'}]})
    //     }
    //     if(!foundUser){
    //         // invaild error
    //         return res.status(422).send({errors:  [{title: 'User error',detail: 'User already exist'}]})
    //     }
    //     if(foundUser.hasSamePassword(password)){
    //         return res.status(422).send({errors:  [{title: 'User error',detail: 'Incorrect password'}]})
    //     }

    //     const token = jwt.sign({
    //         userId: foundUser.id,
    //         username: foundUser.username
    //       }, config.SECRET, { expiresIn: '1h' })

        return res.json(token)

        
    })


router.post('/register', async function(req, res){
    const{username, email, password, confirmPassword} = req.body //*1

    // *1と*2は同じ意味
    // const username = req.body.username *2
    // const email = req.body.email *2
    // const password = req.body.password *2
    // const confirmPassword = req.body.confirmPassword *2

    if(!username){
        return res.status(422).send({errors:  [{title: 'User error',detail: 'Please fill username'}]})
    }

    if(!email){
        return res.status(422).send({errors:  [{title: 'User error',detail: 'Please fill email'}]})
    }

    if(!password){
        return res.status(422).send({errors:  [{title: 'User error',detail: 'Please fill password'}]})
    }

    if(password != confirmPassword){
        // Invalid error
        return res.status(422).send({errors:  [{title: 'User error',detail: 'Please check password'}]})
    }


    /*コードを読み直す0730*/
    try {
        // ユーザーの存在チェック
        const foundUser = await User.findOne({ email });
        
        if (foundUser) {
            // ユーザーが既に存在する場合
            return res.status(422).send({
                errors: [{ title: 'User error', detail: 'User already exists' }]
            });
        }

        // 新しいユーザーの作成
        const user = new User({ username, email, password });
        await user.save();

        // 登録成功
        return res.json({ registered: true });
    } catch (err) {
        // エラー処理
        return res.status(422).send({
            errors: [{ title: 'User error', detail: 'Something went wrong' }]
        });
    }

    // User.findOne({email},function(err, foundUser){
    //     if(err){
    //         return res.status(422).send({errors:  [{title: 'User error',detail: 'Someting went wrong'}]})
    //     }
    //     if(foundUser){
    //         // invaild error
    //         return res.status(422).send({errors:  [{title: 'User error',detail: 'User already exist'}]})
    //     }

    // User.findOne({ email }).exec()
    // .then(foundUser => {
    //     if (foundUser) {
    //         // ユーザーが既に存在する場合
    //         return res.status(422).send({
    //             errors: [{ title: 'User error', detail: 'User already exists' }]
    //         });
    //     }
    // }

})

module.exports = router
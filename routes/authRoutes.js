const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

//registro de usuario
router.post("/registerUsuario", async(req, res)=>{
    console.log(req);
    const email = req.body.email;
    const password = req.body.password;

    //checagem de dados
    if (email ==null || password == null){
        return res.status(400).json({error : "Por favor, preencha todos os campos"});
    }

    //conferindo o usuário
    const emailExists = await User.findOne({email : email});
    if(emailExists){
        return res.status(400).json({error : "O e-mail informado já existe."})
    }

    //criando a senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //criando o usuário após as validações no sistema
    const user = new User({
        email : email,
        password: passwordHash
    });

    //montando um try catch para pegar outros erros e afins
    try{
        const newUser = await user.save();
        //criando o token do usuario
        const token = jwt.sign(
        //payload
        {
        name : newUser.name,
        id : newUser._id
        },
        );

        //retornar o token para o projeto e manda mensagem
        res.json({
            error: null, 
            msg: "Você fez o cadastro com sucesso!!!", 
            token: token, 
            userId: newUser._id
        });
    } catch(error){
        res.status(400).json({error});
    }
});
module.exports = router; 
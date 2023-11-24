//modulos
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//routes
const authRouter = require("./routes/authRoutes");

//midllewares

//config
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const app = express();
const port = 3000;

//atrelar as rotas ao express
app.use("/api/auth", authRouter);

//conexão mongodb
mongoose.connect(
    `mongodb://127.0.0.1:27017/dbooks`,{
    useNewUrlParser : true,
    UseUnifiedTopology : true,
    }
)

//criando a model do seu projeto
const UsuarioSchema = new mongoose.Schema({
  nome: { type: String },
  email: { type: String, required: true },
  password: { type: String }
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

//criando a model do seu projeto
const ProdutoSchema = new mongoose.Schema({
    codigo: {type: Number, required: true},
    descricao: {type: String},
    fornecedor: {type: String},
    dataImpressao: {type: Date},
    quantidadeEstoque: {type: Number}
});
  
const Produto = mongoose.model("Produto", ProdutoSchema);

//configuração dos roteamendos
//cadastrousuario
app.post("/cadastrousuario", async (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const password = req.body.password;


  //validação de campos
  if(nome == null || email == null || password == null){
    return res.status(400).json({error : "Prencher todos os campos!!!"});
  }

  //teste de duplicidade
  const emailExiste = await Usuario.findOne({email : email});

  if(emailExiste){
    return res.status(400).json({error : "O email informado já existe"});
  }

  const usuario = new Usuario({
    nome: nome,
    email: email,
    password: password
  });

  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}
});

app.post("/cadastroproduto", async (req, res) => {
    const codigo = req.body.codigo;
    const descricao = req.body.descricao;
    const fornecedor = req.body.fornecedor;
    const dataImpressao = req.body.dataImpressao;
    const quantidadeEstoque = req.body.quantidadeEstoque

    //checando se todos os dados foram enviados
    if (codigo==null || descricao ==null || fornecedor == null || dataImpressao == null || quantidadeEstoque == null){
        return res.status(400).json({error: "Por favor, preencha todos os campos"});
    }

    //conferindo se o produto já existe
    const produtoExists = await User.findOne({codigo: codigo});

    if(produtoExists){
        return res.status(400).json({error: "O produto informado já está cadastrado."})
    }

    //criando o produto após as validações no sistema
    const produto = new Produto({
        codigo: codigo,
        descricao: descricao,
        fornecedor: fornecedor,
        dataImpressao: dataImpressao,
        quantidadeEstoque: quantidadeEstoque
    });

    //montando um try catch para pega outros erros e afins
    try{
        const newProduto = await produto.save();
        
        //criando o token do usuario
        const token = jwt.sign(
            //payload
            {
                codigo: newProduto.codigo,
                id: newProduto._id
            },
            "segredo" //isso torna o nosso token único
        );

        //retornar o token para o projeto e manda mensagem
        res.json({error: null, msg: "Você fez o cadastro com sucesso!!!", token: token, produtoId:
        newProduto._id});
    } catch(error){
        res.status(400).json({error});
    }
});

//rota de get de formulario
app.get("/cadastrousuario", async (req, res) => {
  res.sendFile(__dirname);
});

app.get("/", async (req, res) => {
  res.sendFile(__dirname);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});







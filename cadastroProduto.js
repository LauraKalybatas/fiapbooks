async function cadastroProduto(){
    // Pega os campos da tela de login (login.html)
    const codigoField = document.getElementById('codigo_field');
    const descricaoField = document.getElementById('descricao_field');
    const fornecedorField = document.getElementById('fornecedor_field');
    const dataImpressaoField = document.getElementById('dataImpressao_field');
    const estoqueField = document.getElementById('estoque_field');
    

    // faz a request no endpoint de registro na api enviando os dados da tela.
    // retorna o token da autenticação
    await fetch(
        'http://localhost:3000/api/auth/registerProduto', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'codigo': codigoField.value,
                'descricao': descricaoField.value,
                'fornecedor': fornecedorField.value,
                'dataImpressao': dataImpressaoField.value,
                'estoque': estoqueField.value
            }),
        }
    );
}
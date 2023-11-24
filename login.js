async function login(){
    // Pega os campos da tela de login (login.html)
    const emailField = document.getElementById('email_field');
    const namedField = document.getElementById('name_field');
    const passwordField = document.getElementById('password_field');

    // faz a request no endpoint de registro na api enviando os dados da tela.
    // retorna o token da autenticação
    await fetch(
        'http://localhost:3000/api/auth/registerUser', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'name': namedField.value,
                'email': emailField.value,
                'password': passwordField.value
            }),
        }
    );
}
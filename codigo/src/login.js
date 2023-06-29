function registrar(event) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário

    // Obter os valores dos campos de registro
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    // Armazenar as informações de registro no localStorage
    localStorage.setItem(email, senha);

    alert("Registro concluído com sucesso");
  }

  function login(event) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário

    // Obter os valores dos campos de entrada de login
    var email = document.getElementById("loginEmail").value;
    var senha = document.getElementById("loginSenha").value;

    // Verificar se as credenciais são válidas
    var storedSenha = localStorage.getItem(email);

    if (storedSenha === senha) {
      alert("Login bem-sucedido");
      // Redirecionar para a página de dashboard ou fazer outra ação desejada
    } else {
      alert("Credenciais inválidas");
      // Lidar com credenciais inválidas, como exibir uma mensagem de erro
    }
  }
function leDados () {
    let strDados = localStorage.getItem('db');
    let objDados = {};
  
    if (strDados) {
        objDados = JSON.parse (strDados);
    }
    else {
        objDados = { usuario: [ 
                        {
                          email: "exemplo@gmail.com", senha: "1234senha"
                        },
  
                    ]}
    }
  
    return objDados;
  }

//salva os dados no LocalStorage
function salvaDados (dados) {
    localStorage.setItem ('db', JSON.stringify (dados));
}//fim salvaDados()

//Carrega o Local Storage ao carregar a página
window.onload = function() {
    let objDados = leDados();
    salvaDados(objDados);
    apresentaDados();
}

const campoSenha = document.getElementById('campoSenha');
const campoEmail = document.getElementById('campoEmail');

///Apresenta o email e senha nas text areas
function apresentaDados() {
    let dados = leDados();
    
  
    document.getElementById('campoEmail').value = dados.usuario[0].email;
    campoSenha.value = dados.usuario[0].senha;

    ///Configura toggle de exibir 
    var btnToggleSenha = document.getElementById("btnToggleSenha");

    btnToggleSenha.addEventListener("click", function() {
    if (this.classList.contains("active")) {
        campoSenha.type = "text";
    } else {
        campoSenha.type = "password";
    }
});
};

///Configura botões de editar e salvar
const btnEditar = document.getElementById("BtnEditar");
const btnSalvar = document.getElementById("BtnSalvar");

btnEditar.addEventListener("click", () => {

    btnSalvar.hidden = false;
    btnEditar.hidden = true;

    ///tratamento dos inputs
    campoEmail.disabled = false;
    campoSenha.disabled = false;
    campoSenha.type = "text";


})

btnSalvar.addEventListener("click", () => {

    //tratamento botão editar/salvar
    btnSalvar.hidden = true;
    btnEditar.hidden = false;

    ///tratamento dos inputs
    campoEmail.disabled = true;
    campoSenha.disabled = true;
    campoSenha.type = "password";

    let dados = leDados();

    //leva a edição ao local storage
    dados.usuario[0].email = campoEmail.value;
    dados.usuario[0].senha = campoSenha.value;

    salvaDados (dados);

})


//Configura o switch de Notificações
const switchNotif = document.getElementById("switchNotif");
const NotifOnOff = document.getElementById("labelNotif");

switchNotif.addEventListener("change", function() {
    if (this.checked) {
        console.log("Switch ativado");
        NotifOnOff.querySelector("h3").textContent = "Notificações [ON]";
    } else {
        console.log("Switch desativado");
        NotifOnOff.querySelector("h3").textContent = "Notificações [OFF]";
    }
});

// Configura o botão de dentro do modal
const btnLimpaDadosModal = document.getElementById("btnLimparDadosModal");

btnLimpaDadosModal.addEventListener("click", () => {
    let objDados = leDados();

    let confirmaSenha = prompt("Informe sua senha para prosseguir: ");

    if(confirmaSenha == objDados.usuario[0].senha)
        localStorage.clear();
    else alert("Senha incorreta!");
})
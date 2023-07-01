if (localStorage.getItem("logado") === null || localStorage.getItem("logado") === "false") {
  window.location.href = "login.html";
}

//Carrega o Local Storage ao carregar a página
window.onload = function() {
  let objDados = leDados();
  salvaDados(objDados);

  CategoriaDropdowns(objDados);
  CategoriaDropdownsModal(objDados);
}

function leDados() {
  let strDados = localStorage.getItem('db');
  let objDados = {};
  
  if (strDados) {
    objDados = JSON.parse(strDados);
  }
  else {
    objDados = {
      produtos: [
        {
          nome: "Cano PVC", descricao: "Cano PVC Tigre tamanho x",
          estqInicial: "35", estqAtual: "23", estqMin: "10",
          valorCompra: "8.00", valorVenda: "10.00", precificacao: "bruto",
          categoria: "construção", codigo: "CON1", categoria: "Construção",
          imagem: ""
        },
        {
          nome: "Lâmpada LED", descricao: "Lâmpada LED 25W redonda",
          estqInicial: "50", estqAtual: "28", estqMin: "10",
          valorCompra: "10.00", valorVenda: "13.00", precificacao: "bruto",
          categoria: "iluminação", codigo: "ILU1", categoria: "Iluminação",
          imagem: ""
        },
        {
          nome: "KIT Reparos", descricao: "Martelo, furadeira ...",
          estqInicial: "5", estqAtual: "3", estqMin: "1",
          valorCompra: "300.00", valorVenda: "350.00", precificacao: "nobre",
          categoria: "KIT", codigo: "KIT1", categoria: "Kit",
          imagem: ""
        }
      ],
      categoria: [{nomeCategoria: "Construção"},{nomeCategoria: "Iluminação"},{nomeCategoria: "Kit"}]
    }
  }

  return objDados;
}// fim leDados()

//salva os dados no LocalStorage
function salvaDados (dados) {
  localStorage.setItem ('db', JSON.stringify (dados));
}//fim salvaDados()

//Tratamento da imagem
const campoImagem = document.getElementById('campoImagem');
const btnAddImg = document.getElementById('btnAddImg');

btnAddImg.addEventListener('click', function() {
  const inputImagem = document.createElement('input');
  inputImagem.type = 'file';
  inputImagem.accept = 'image/*';
  inputImagem.addEventListener('change', function(event) {
    const arquivo = event.target.files[0];
    const leitor = new FileReader();
    leitor.onload = function(e) {
      campoImagem.src = e.target.result;
    };
    leitor.readAsDataURL(arquivo);
  });
  inputImagem.click();
});




// Configura botão de salvar
document.getElementById('btnsalvar').addEventListener('click', incluirProduto);

function incluirProduto() {
  // Ler os dados do localStorage
  let objDados = leDados();

  // Incluir um novo produto
  let imagem = document.getElementById('campoImagem').src;
  let strNome = document.getElementById('campoNome').value;
  let strDescricao = document.getElementById('campoDescricao').value;
  let strEstqInicial = document.getElementById('campoEstq-inicial').value;
  let strEstqAtual = document.getElementById('campoEstq-atual').value;
  let strEstqMin = document.getElementById('campoEstq-min').value;
  let strValorCompra = document.getElementById('campoValor-compra').value;
  let strValorVenda = document.getElementById('campoValor-venda').value;
  let strCodigo = document.getElementById('campoCodigo').value;


  //tratamento das possibilidades de precificação
  let opcaoPrecificacao = document.getElementsByName('flexRadioDefault');
  let precificacaoEscolhida;
  opcaoPrecificacao.forEach((option) => {
    if (option.checked) {
      precificacaoEscolhida = option.value;
    }
  });

  //tratamento das categorias
  let select = document.getElementById('labelCategoria');
  let categoriaSelecionada;

  if(select.innerText == '') categoriaSelecionada = 'Sem Categoria';
  else categoriaSelecionada = select.innerText;


  // Verificar se os campos obrigatórios estão preenchidos
  let camposObrigatoriosPreenchidos = true;
  let camposObrigatorios = {
    Nome: strNome,
    estqAtual: strEstqAtual,
    estqMin: strEstqMin,
    valorVenda: strValorVenda
  };

  for (let campo in camposObrigatorios) {

    if (camposObrigatorios[campo] == '') { // Verifica se o valor da variável é vazio ou nulo
      camposObrigatoriosPreenchidos = false;
      alert(`O campo ${campo} é obrigatório. Por favor, preencha todos os campos obrigatórios.`);
      break;
    }
  }

  if (camposObrigatoriosPreenchidos) {

    let novoProduto = {
      nome: strNome,
      descricao: strDescricao,
      estqInicial: strEstqInicial,
      estqAtual: strEstqAtual,
      estqMin: strEstqMin,
      valorCompra: strValorCompra,
      valorVenda: strValorVenda,
      precificacao: precificacaoEscolhida,
      codigo: strCodigo,
      categoria: categoriaSelecionada,
      imagem: imagem
      
    };

    console.log(novoProduto);
  
    objDados.produtos.push(novoProduto);
  
    // Salvar os dados no localStorage novamente
    salvaDados(objDados);
  
    alert("Produto cadastrado com sucesso!");
    
    /*Limpa o formulário
    document.getElementById("cadastroProduto").reset();
    document.querySelector('.form-check-label').checked = false;*/

   window.location.href = 'produtos.html';
  
  }

}//fim incluirProduto()

/******************************************************************************************************************************************************
*******************************************************************************************************************************************************
******************************************************************************************************************************************************/

function CategoriaDropdowns(objDados){

  let label = document.getElementById("labelCategoria");
  var categorias = objDados.categoria;
  var menuDropdown = document.getElementById('menuDropdown');
  menuDropdown.innerHTML = '';

  categorias.forEach(function(categoria) {
      var li = document.createElement('li');
      li.className = 'dropdown-item';
      li.textContent = categoria.nomeCategoria;

      li.addEventListener('click', function() {
          label.innerText = categoria.nomeCategoria;
      });
      menuDropdown.appendChild(li);
  });
}

var controleInput;

function CategoriaDropdownsModal(objDados){

  var categorias = objDados.categoria;
  var menuDropdownModal = document.getElementById('menuDropdownModal');
  menuDropdownModal.innerHTML = '';

  categorias.forEach(function(categoria) {
      var li = document.createElement('li');
      li.className = 'dropdown-item';
      li.textContent = categoria.nomeCategoria;

      li.addEventListener('click', function() {
          document.getElementById("inputCategoria").value = categoria.nomeCategoria;
          controleInput = categoria.nomeCategoria;

      });
      menuDropdownModal.appendChild(li);
  });
}


//Inclui novas categorias
let btnAddCategoria = document.getElementById ('btnNovaCategoria').addEventListener('click', IncluirCategoriaNova);
let btnDeleteCategoria = document.getElementById ('btnExcluirCategoria').addEventListener('click', ExcluirCategoria);
let btnEditarCategoria = document.getElementById ('btnEditarCategoria').addEventListener('click', EditarCategoria);

function IncluirCategoriaNova() {

  let objDados = leDados();

  let strNomeCategoria = document.getElementById ('inputCategoria').value;

  let catExiste = false;
  let c = 0;
  while ((catExiste == false) && (c < objDados.categoria.length)) {
      if (objDados.categoria[c].nomeCategoria == strNomeCategoria) {
          catExiste = true;
      }
      c++;
  }

  if (catExiste == true) {
      alert ("[ CATEGORIA JÁ EXISTE ]");
      return;

  } else if(strNomeCategoria === '') {
      alert(" > INFORME UM NOME! <")
      return;

  } else {

      let novaCategoria = { nomeCategoria: strNomeCategoria };
      objDados.categoria.push(novaCategoria);
      
      // Salvar os dados no localStorage novamente
      salvaDados (objDados);
      
      CategoriaDropdowns(objDados);
      CategoriaDropdownsModal(objDados)
      document.getElementById('inputCategoria').value = "";

      alert("Categoria cadastrada com sucesso!");

  }
}//fim IncluirCategoriaNova



function ExcluirCategoria() {
  let objDados = leDados();
  let strNomeCategoria = document.getElementById('inputCategoria').value; // Supondo que você tenha um elemento select com o ID "categoriaSelecionada"

  // Encontrar a categoria selecionada e removê-la do array de categorias
  for (let i = 0; i < objDados.categoria.length; i++) {
    if (objDados.categoria[i].nomeCategoria === strNomeCategoria) {
      objDados.categoria.splice(i, 1);
      break;
    }
  }

  // Atualizar os dados no localStorage
  salvaDados(objDados);
  
  document.getElementById('inputCategoria').value = "";
  CategoriaDropdowns(objDados);
  CategoriaDropdownsModal(objDados);

  alert("Categoria removida com sucesso!");
}



function EditarCategoria() {
  let objDados = leDados();
  let novoNomeCategoria = document.getElementById('inputCategoria').value;
  
  let catExiste = false;
  let c = 0;
  let nCatEditar;

  while ((catExiste == false) && (c < objDados.categoria.length)) {
      if (objDados.categoria[c].nomeCategoria == controleInput) {
          catExiste = true;
          nCatEditar = c;
      }
      c++;
      
  }

  if (catExiste == false) {
      alert ("[ CATEGORIA NÃO EXISTE ]");
      return;

  } else if(novoNomeCategoria === '') {
      alert(" > INFORME UMA CATEGORIA! <");
      return;

  } else {

      objDados.categoria[nCatEditar].nomeCategoria = novoNomeCategoria;
      
      // Salvar os dados no localStorage novamente
      salvaDados (objDados);
      
      CategoriaDropdowns(objDados);
      CategoriaDropdownsModal(objDados)
      document.getElementById('inputCategoria').value = "";

      alert("Categoria editada com sucesso!");

  }
}//fim IncluirCategoriaNova

if (localStorage.getItem("logado") === null || localStorage.getItem("logado") === "false") {
  window.location.href = "login.html";
}

//Pegar parametro nome do produto na url:
var url_string = window.location.href;
var url = new URL(url_string);
var nomeProduto = url.searchParams.get("produto");

//Pegar detalhes do produto selecionado e colocar nos campos de cada um:
var db = JSON.parse(localStorage.getItem("db"));
var produtos = db.produtos;
var produtoPesquisado = produtos.find(produto => produto.nome == nomeProduto);

// função que leva os dados para o Local Storage
function salvaDados (dados) {
  localStorage.setItem ('db', JSON.stringify (dados));
}//fim salvaDados()

CategoriaDropdowns(db);
CategoriaDropdownsModal(db);

console.log(produtoPesquisado)

  document.getElementById('campoImagem').src = produtoPesquisado.imagem;
  document.getElementById('campoNome').textContent = produtoPesquisado.nome;
  document.getElementById('campoDescricao').textContent = produtoPesquisado.descricao;
  document.getElementById('campoEstq-inicial').textContent = produtoPesquisado.estqInicial;
  document.getElementById('campoEstq-atual').textContent = produtoPesquisado.estqAtual;
  document.getElementById('campoEstq-min').textContent = produtoPesquisado.estqMin;
  document.getElementById('campoValor-compra').textContent = produtoPesquisado.valorCompra;
  document.getElementById('campoValor-venda').textContent = produtoPesquisado.valorVenda;
  document.getElementById('campoBruto').textContent = produtoPesquisado.precificacao;
  document.getElementById('labelCategoria').innerText = produtoPesquisado.categoria;
  document.getElementById('campoCodigo').textContent = produtoPesquisado.codigo;



const camposTexto = document.getElementsByTagName('textarea');
const campoImagem = document.getElementById('campoImagem');
const botaoEditar = document.getElementById('editar');
const botaoSalvar = document.getElementById('salvar');
const btnAddImg = document.getElementById('btnAddImg');
const visDropdwn = document.getElementById('visDropdwCat');

let edicaoHabilitada = false; // Variável para controlar se a edição está habilitada

botaoEditar.addEventListener('click', function() {
  edicaoHabilitada = true; // Marca que a edição está habilitada

  for (let i = 0; i < camposTexto.length; i++) {
    camposTexto[i].disabled = !camposTexto[i].disabled;
  }

  botaoSalvar.disabled = false; // Habilita o botão "Salvar"
  btnAddImg.hidden = false;
  visDropdwn.classList = ''
});

btnAddImg.addEventListener('click', function() {
  if (edicaoHabilitada && !campoImagem.disabled) {
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
  }
});

botaoSalvar.addEventListener('click', function() {
  //Pegar valores das textareas:
  const nome = document.getElementById('campoNome').value;
  const descricao = document.getElementById('campoDescricao').value;
  const estqInicial = document.getElementById('campoEstq-inicial').value;
  const estqAtual = document.getElementById('campoEstq-atual').value;
  const estqMin = document.getElementById('campoEstq-min').value;
  const valorCompra = document.getElementById('campoValor-compra').value;
  const valorVenda = document.getElementById('campoValor-venda').value;
  const precificacao = document.getElementById('campoBruto').textContent;
  const categoria = document.getElementById('labelCategoria').innerText;
  const codigo = document.getElementById('campoCodigo').value;
  const imagem = document.getElementById('campoImagem').src;

  //Set produto:
  const produtoEditado = {
    nome,
    descricao,
    estqInicial,
    estqAtual,
    estqMin,
    valorCompra,
    valorVenda,
    precificacao,
    categoria,
    codigo,
    imagem
  };

  //Editar a db substituindo o produto antigo pelo produto editado:
  const db = JSON.parse(localStorage.getItem('db'));
  const produtos = db.produtos;
  const produtoAntigo = produtos.find(produto => produto.nome == nomeProduto);
  const index = produtos.indexOf(produtoAntigo);
  produtos[index] = produtoEditado;
  localStorage.setItem('db', JSON.stringify(db));
  
  fimEdicao();
  
  alert("Produto editado com sucesso!");
});

//Desabilita a edição
function fimEdicao(){
  edicaoHabilitada = false; // Marca que a edição está desabilitada

  for (let i = 0; i < camposTexto.length; i++) {
    camposTexto[i].disabled = !camposTexto[i].disabled;
  }
  botaoSalvar.disabled = true; // Habilita o botão "Salvar"
  btnAddImg.hidden = true;
  visDropdwn.classList = 'd-none';
}

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
          console.log(controleInput)

      });
      menuDropdownModal.appendChild(li);
  });
}


//Inclui novas categorias
let btnAddCategoria = document.getElementById ('btnNovaCategoria').addEventListener('click', IncluirCategoriaNova);
let btnDeleteCategoria = document.getElementById ('btnExcluirCategoria').addEventListener('click', ExcluirCategoria);
let btnEditarCategoria = document.getElementById ('btnEditarCategoria').addEventListener('click', EditarCategoria);

function IncluirCategoriaNova() {

  let objDados = db;

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
  let objDados = db;
  let strNomeCategoria = document.getElementById('inputCategoria').value; // Supondo que você tenha um elemento select com o ID "categoriaSelecionada"

  // Encontrar a categoria selecionada e removê-la do array de categorias
  for (let i = 0; i < objDados.categoria.length; i++) {
    if (objDados.categoria[i].nomeCategoria === strNomeCategoria) {
      objDados.categoria.splice(i, 1);
      break;
    }
  }

  atualizaCategoriasLS("");

  // Atualizar os dados no localStorage
  salvaDados(objDados);
  window.location.reload();
  
  document.getElementById('inputCategoria').value = "";
  CategoriaDropdowns(objDados);
  CategoriaDropdownsModal(objDados);

  alert("Categoria removida com sucesso!");
}//fim ExcluirCategoria



function EditarCategoria() {
  let objDados = db;
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
      atualizaCategoriasLS(novoNomeCategoria);
      // Salvar os dados no localStorage novamente
      salvaDados (objDados);
      window.location.reload();
      
      CategoriaDropdowns(objDados);
      CategoriaDropdownsModal(objDados)
      document.getElementById('inputCategoria').value = "";

      alert("Categoria editada com sucesso!");

  }
}//fim EditarCategoria


function atualizaCategoriasLS(CategoriaEditada){
  let objDados = db;
  objDados.produtos.forEach(function(produto) {
    // Verifica se a categoria do produto é igual à CategoriaAntiga
    if (produto.categoria === controleInput) {
      // Atualiza a categoria para CategoriaEditada
      produto.categoria = CategoriaEditada;
    }
  });
}
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


document.getElementById('campoImagem').src = produtoPesquisado.imagem;
document.getElementById('campoNome').textContent = produtoPesquisado.nome;
document.getElementById('campoDescricao').textContent = produtoPesquisado.descricao;
document.getElementById('campoEstq-inicial').textContent = produtoPesquisado.estqInicial;
document.getElementById('campoEstq-atual').textContent = produtoPesquisado.estqAtual;
document.getElementById('campoEstq-min').textContent = produtoPesquisado.estqMin;
document.getElementById('campoValor-compra').textContent = produtoPesquisado.valorCompra;
document.getElementById('campoValor-venda').textContent = produtoPesquisado.valorVenda;
document.getElementById('campoBruto').textContent = produtoPesquisado.precificacao;
document.getElementById('campoCategoria').textContent = produtoPesquisado.categoria;
document.getElementById('campoCodigo').textContent = produtoPesquisado.codigo;


const camposTexto = document.getElementsByTagName('textarea');
const campoImagem = document.getElementById('campoImagem');
const botaoEditar = document.getElementById('editar');
const botaoSalvar = document.getElementById('salvar');

let edicaoHabilitada = false; // Variável para controlar se a edição está habilitada

botaoEditar.addEventListener('click', function() {
  edicaoHabilitada = true; // Marca que a edição está habilitada

  for (let i = 0; i < camposTexto.length; i++) {
    camposTexto[i].disabled = !camposTexto[i].disabled;
  }
  campoImagem.style.pointerEvents = 'auto'; // Habilita o clique na imagem
  campoImagem.style.cursor = 'pointer'; // Altera o cursor para indicar que a imagem é clicável
  botaoSalvar.disabled = false; // Habilita o botão "Salvar"
});

campoImagem.addEventListener('click', function() {
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
  const categoria = document.getElementById('campoCategoria').textContent;
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
  
  
  alert("Produto editado com sucesso!");
});
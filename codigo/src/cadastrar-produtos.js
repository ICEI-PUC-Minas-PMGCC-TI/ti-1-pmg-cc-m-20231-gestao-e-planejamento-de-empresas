function leDados () {
  let strDados = localStorage.getItem('db');
  let objDados = {};

  if (strDados) {
      objDados = JSON.parse (strDados);
  }
  else {
      objDados = { produtos: [ 
                      {
                        nome: "Cano PVC", descricao: "Cano PVC Tigre tamanho x", 
                        estqInicial: "35", estqAtual: "23", estqMin: "10",
                        valorCompra: "8.00", valorVenda: "10.00", precificacao: "bruto",
                        categoria: "construção", codigo: "CON1"
                      },
                      {
                        nome: "Lâmpada LED", descricao: "Lâmpada LED 25W redonda", 
                        estqInicial: "50", estqAtual: "28", estqMin: "10",
                        valorCompra: "10.00", valorVenda: "13.00", precificacao: "bruto",
                        categoria: "iluminação", codigo: "ILU1"
                      },
                      {
                        nome: "KIT Reparos", descricao: "Martelo, furadeira ...", 
                        estqInicial: "5", estqAtual: "3", estqMin: "1",
                        valorCompra: "300.00", valorVenda: "350.00", precificacao: "nobre",
                        categoria: "KIT", codigo: "KIT1"
                      }
                      
                  ]}
  }

  return objDados;
}


function salvaDados (dados) {
  localStorage.setItem ('db', JSON.stringify (dados));
}

// Configura botão de salvar
document.getElementById ('btnsalvar').addEventListener ('click', incluirProduto);

function incluirProduto (){
  // Ler os dados do localStorage
  let objDados = leDados();

  // Incluir um novo produto
  let strNome = document.getElementById ('campoNome').value;
  let strDescricao = document.getElementById ('campoDescricao').value;
  let strEstqInicial = document.getElementById('campoEstq-inicial').value;
  let strEstqAtual = document.getElementById('campoEstq-atual').value;
  let strEstqMin = document.getElementById('campoEstq-min').value;
  let strValorCompra = document.getElementById('campoValor-compra').value;
  let strValorVenda = document.getElementById('campoValor-venda').value;
  let strCodigo = document.getElementById('campoCodigo').value;

  //tratamento das possibilidades de categoria
  let strCategoria = document.getElementById('categoria-escolhida').innerText.trim();
  if(strCategoria === "Escolha a categoria"){
    strCategoria = "Sem Categoria";
  }

  //tratamento das possibilidades de precificação
  let opcaoPrecificacao = document.getElementsByName('flexRadioDefault');
  let precificacaoEscolhida;
  opcaoPrecificacao.forEach((option) => {
    if (option.checked) {
      precificacaoEscolhida = option.value;
    }
});


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
      categoria: strCategoria

  };
  objDados.produtos.push (novoProduto);
  
  // Salvar os dados no localStorage novamente
  salvaDados (objDados);

  alert("Produto cadastrado com sucesso!");

  //Limpa o formulário
  document.getElementById("cadastroProduto").reset();
  document.getElementById ('categoria-escolhida').textContent = 'Escolha a categoria';
  document.querySelector('.form-check-label').checked = false;
  
}

//Funcionamento do menu de Categorias
let dropdownMenu = document.querySelector('#Categoria .dropdown-menu');
let categoriaEscolhida = document.getElementById('categoria-escolhida');

dropdownMenu.addEventListener('click', function(e) {
  const text = e.target.textContent;
  if (e.target.classList.contains('text-info-emphasis')) {
    categoriaEscolhida.textContent = text;
  }
});
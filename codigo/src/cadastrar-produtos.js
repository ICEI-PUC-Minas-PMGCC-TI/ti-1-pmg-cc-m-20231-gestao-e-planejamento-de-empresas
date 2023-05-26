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
          categoria: "construção", codigo: "CON1", categoria: "Construção"
        },
        {
          nome: "Lâmpada LED", descricao: "Lâmpada LED 25W redonda",
          estqInicial: "50", estqAtual: "28", estqMin: "10",
          valorCompra: "10.00", valorVenda: "13.00", precificacao: "bruto",
          categoria: "iluminação", codigo: "ILU1", categoria: "Iluminação"
        },
        {
          nome: "KIT Reparos", descricao: "Martelo, furadeira ...",
          estqInicial: "5", estqAtual: "3", estqMin: "1",
          valorCompra: "300.00", valorVenda: "350.00", precificacao: "nobre",
          categoria: "KIT", codigo: "KIT1", categoria: "Kit"
        }
      ],
      categoria: [{nomeCategoria: "Construção"},{nomeCategoria: "Iluminação"},{nomeCategoria: "Kit"}]
    }
  }

  return objDados;
}


// Configura botão de salvar
document.getElementById('btnsalvar').addEventListener('click', incluirProduto);

function incluirProduto() {
  // Ler os dados do localStorage
  let objDados = leDados();

  // Incluir um novo produto
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
  let select = document.getElementById('seletorCategoria');
  let categoriaSelecionada;

  if(select.value == 'Selecione uma categoria:') categoriaSelecionada = 'Sem Categoria';
  else categoriaSelecionada = select.value;

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
      categoria: categoriaSelecionada
  
    };
  
    if (!objDados.produtos) objDados.produtos = [];
    objDados.produtos.push(novoProduto);
  
    // Salvar os dados no localStorage novamente
    salvaDados(objDados);
  
    alert("Produto cadastrado com sucesso!");
  
    //Limpa o formulário
    document.getElementById("cadastroProduto").reset();
    document.querySelector('.form-check-label').checked = false;
  }

}

//salva os dados no LocalStorage
function salvaDados (dados) {
  localStorage.setItem ('db', JSON.stringify (dados));
}//fim salvaDados()

//Configura o botão
let btnAddCategoria = document.getElementById ('adicionarCategoria').addEventListener ('click', IncluirCategoria);

//Adiciona uma categoria criada pelo usuário ao menu de seleção
function IncluirCategoria (){
  // Ler os dados do localStorage
  let objDados = leDados();

  // Incluir uma nova categoria
  let strNomeCategoria = document.getElementById ('novaCategoria').value;

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
  }
  else if(strNomeCategoria === ''){
      alert(" > NOME INVÁLIDO! <")
      return;
  }

  else {
      let novaCategoria = {
          nomeCategoria: strNomeCategoria
      };
      objDados.categoria.push(novaCategoria);
      
      // Salvar os dados no localStorage novamente
      salvaDados (objDados);
      

      alert("Categoria cadastrada com sucesso!");

  }

  //Limpa o formulário
  document.getElementById('novaCategoria').value = 'catapimbas';

  //Adciona a nova categoria ao menu de seleção
  AddCategoriaMenuSelect(objDados.categoria.length-1);

}//fim Incluir categoria()


//Adciona as categorias ao menu de seleção
function AddCategoriaMenuSelect(tam){
  let select = document.getElementById('seletorCategoria');
  let objDados = leDados();
  let categoria = objDados.categoria[tam];
  let option = document.createElement('option');

  option.text = categoria.nomeCategoria;
  option.value = categoria.nomeCategoria;
  select.options.add(option);
}//fim AddCategoriaMenuSelect()


//Carrega o Local Storage ao carregar a página
window.onload = function() {
  let objDados = leDados();
  salvaDados(objDados);

  let select = document.getElementById('seletorCategoria');

  //limpa as opções do menu select, deixando somente a "selecione a categoria"
  select.options.length = 1;

  console.log(objDados)
  for (let i = 0; i < objDados.categoria.length; i++) {
      AddCategoriaMenuSelect(i);
  }
}
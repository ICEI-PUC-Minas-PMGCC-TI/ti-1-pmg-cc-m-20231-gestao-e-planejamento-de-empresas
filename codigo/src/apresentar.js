function leDados () {
    let strDados = localStorage.getItem('db');
    let objDados = {};
  
    if (strDados) {
        objDados = JSON.parse (strDados);
    }
    else {
        objDados = { produtos: [ 
                        {
                          imagem:"image/CanoTigre.webp", nome: "Cano PVC Tigre 5m.", descricao: " Cano PVC (Policloreto de Vinila) Tigre,  tamanho 5 metros, diametro de 20cm // FORNECEDOR=TigreCuritiba.", 
                          estqInicial: "35", estqAtual: "21", estqMin: "10",
                          valorCompra: "7.90", valorVenda: "12.90", precificacao: "B R U T O",
                          categoria: "Construção", codigo: "CON1"
                        },
                        {
                          imagem:"image/Lampada25W.jpg", nome: "Lâmpada OuroLux LED 25w", descricao: "Lâmpada OuroLux LED 25W arredondada e com alcance de 10m de iluminação // FORNECEDOR=OuroLuxContagem.", 
                          estqInicial: "100", estqAtual: "32", estqMin: "15",
                          valorCompra: "15.90", valorVenda: "29.90", precificacao: "B R U T O",
                          categoria: "Eletrico-Iluminacao", codigo: "ILU1"
                        },
                        {
                          imagem:"image/KitReparo.jpg", nome: "KIT Reparos 38", descricao: "Kit reparo de 38 peças, dentre elas: parafuso,brocas, 6 chaves // FORNECEDOR=AmazonContagem.", 
                          estqInicial: "10", estqAtual: "3", estqMin: "2",
                          valorCompra: "51.70", valorVenda: "251.9", precificacao: "N O B R E",
                          categoria: "KIT", codigo: "KIT1"
                        }
  
                    ]}
    }
  
    return objDados;
  }
  
  
  function salvaDados (dados) {
    localStorage.setItem ('db', JSON.stringify (dados));
  }

  
  document.getElementById('produto1').addEventListener('click', function() {
    let dados = leDados();
  
    document.getElementById('campoImagem').src = dados.produtos[0].imagem;
    document.getElementById('campoNome').textContent = dados.produtos[0].nome;
    document.getElementById('campoDescricao').textContent = dados.produtos[0].descricao;
    document.getElementById('campoEstq-inicial').textContent = dados.produtos[0].estqInicial;
    document.getElementById('campoEstq-atual').textContent = dados.produtos[0].estqAtual;
    document.getElementById('campoEstq-min').textContent = dados.produtos[0].estqMin;
    document.getElementById('campoValor-compra').textContent = dados.produtos[0].valorCompra;
    document.getElementById('campoValor-venda').textContent = dados.produtos[0].valorVenda;
    document.getElementById('campoBruto').textContent = dados.produtos[0].precificacao;
    document.getElementById('campoCategoria').textContent = dados.produtos[0].categoria;
    document.getElementById('campoCodigo').textContent = dados.produtos[0].codigo;
  });
  
  
  document.getElementById('produto2').addEventListener('click', function() {
    let dados = leDados();
  
    document.getElementById('campoImagem').src = dados.produtos[1].imagem;
    document.getElementById('campoNome').textContent = dados.produtos[1].nome;
    document.getElementById('campoDescricao').textContent = dados.produtos[1].descricao;
    document.getElementById('campoEstq-inicial').textContent = dados.produtos[1].estqInicial;
    document.getElementById('campoEstq-atual').textContent = dados.produtos[1].estqAtual;
    document.getElementById('campoEstq-min').textContent = dados.produtos[1].estqMin;
    document.getElementById('campoValor-compra').textContent = dados.produtos[1].valorCompra;
    document.getElementById('campoValor-venda').textContent = dados.produtos[1].valorVenda;
    document.getElementById('campoBruto').textContent = dados.produtos[1].precificacao;
    document.getElementById('campoCategoria').textContent = dados.produtos[1].categoria;
    document.getElementById('campoCodigo').textContent = dados.produtos[1].codigo;
  });
  
  document.getElementById('produto3').addEventListener('click', function() {
    let dados = leDados();
  
    document.getElementById('campoImagem').src = dados.produtos[2].imagem;
    document.getElementById('campoNome').textContent = dados.produtos[2].nome;
    document.getElementById('campoDescricao').textContent = dados.produtos[2].descricao;
    document.getElementById('campoEstq-inicial').textContent = dados.produtos[2].estqInicial;
    document.getElementById('campoEstq-atual').textContent = dados.produtos[2].estqAtual;
    document.getElementById('campoEstq-min').textContent = dados.produtos[2].estqMin;
    document.getElementById('campoValor-compra').textContent = dados.produtos[2].valorCompra;
    document.getElementById('campoValor-venda').textContent = dados.produtos[2].valorVenda;
    document.getElementById('campoBruto').textContent = dados.produtos[2].precificacao;
    document.getElementById('campoCategoria').textContent = dados.produtos[2].categoria;
    document.getElementById('campoCodigo').textContent = dados.produtos[2].codigo;
  });


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
    if (edicaoHabilitada) {
      let produtoEditado = prompt("Informe o número do produto que deseja editar:");
  
      if (produtoEditado === "1" || produtoEditado === "2" || produtoEditado === "3") {
        let dados = leDados();
        let indiceProduto = parseInt(produtoEditado) - 1;
  
        dados.produtos[indiceProduto].imagem = campoImagem.src; // Atualiza a imagem
  
        dados.produtos[indiceProduto].nome = document.getElementById("campoNome").value;
        dados.produtos[indiceProduto].descricao = document.getElementById("campoDescricao").value;
        dados.produtos[indiceProduto].estqInicial = document.getElementById("campoEstq-inicial").value;
        dados.produtos[indiceProduto].estqAtual = document.getElementById("campoEstq-atual").value;
        dados.produtos[indiceProduto].estqMin = document.getElementById("campoEstq-min").value;
        dados.produtos[indiceProduto].valorCompra = document.getElementById("campoValor-compra").value;
        dados.produtos[indiceProduto].valorVenda = document.getElementById("campoValor-venda").value;
        dados.produtos[indiceProduto].codigo = document.getElementById("campoCodigo").value;
  
        salvaDados(dados);
        alert("As informações foram salvas com sucesso!");
  
        // Desativa os componentes textarea
        for (let i = 0; i < camposTexto.length; i++) {
          camposTexto[i].disabled = true;
        }
        campoImagem.style.pointerEvents = 'none'; // Desabilita o clique na imagem
        campoImagem.style.cursor = 'default'; // Restaura o cursor padrão
        botaoSalvar.disabled = true; // Desabilita o botão "Salvar" novamente
      } else {
        alert("Número de produto inválido. Tente novamente.");
      }
    }
  });
  
  
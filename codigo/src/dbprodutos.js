
//Criação do objeto categoria e o array categorias:
var categoria1 = { nome: "Papelaria"};
var categorias = [categoria1];

//Adicionando categorias ao LocalStorage usando o stringify
localStorage.setItem("categorias", JSON.stringify(categorias));

//Criação de produtos e seu array:
var produto1 = { nome: "Lápis de Cor Faber Castell",
                id: "12345",
                categoria: categoria1,
                nobreza: "bruto",
                preco: "49.99",
                disponivel: "100",
                estoqueMin: 50
                };

var produto2 = { nome: "Kit Marca-Texto Stabillo",
                id: "12346",
                categoria: categoria1,
                nobreza: "nobre",
                preco: "49.99",
                disponivel: "50",
                estoqueMin: 30
                };

var produto3 = { nome: "Kit Marca-Texto Faber",
        id: "12347",
        categoria: categoria1,
        nobreza: "nobre",
        preco: "50.00",
        disponivel: "50",
        estoqueMin: 30
};

var produto4 = {
    nome: "Canetas permanentes",
    id: "12349",
    categoria: categoria1,
    nobreza: "nobre",
    preco: "50.00",
    disponivel: "50",
    estoqueMin: 30
}

var produto5 = {
    nome: "Caderno Cicero",
    id: "12350",
    categoria: categoria1,
    nobreza: "nobre",
    preco: "69.99",
    disponivel: "50",
    estoqueMin: 30
}

var produtos = [produto1, produto2, produto3, produto4, produto5];

//Adicionando o array no LocalStorage
//Essa linha abaixo deve ser descomentada apenas se todos os produtos anteriores precisarem ser colocados de novo para teste.
//Caso precise, dar um clear antes. -> (localStorage.clear())
//localStorage.setItem("produtos", JSON.stringify(produtos));
const dadosProdutos = JSON.parse(localStorage.getItem("produtos"));


var produtoSelecionadoId;
const elementosTr = {};

adicionarLinhas(dadosProdutos);

//O array de produtos é recebido e são criados os campos na tabela html conforme os produtos existem.
//É setada usando oo style a altura padrão das td e tr para não haver conflito com o css.
function adicionarLinhas(produtos){
    const tbody = document.querySelector("tbody");

    produtos.forEach(item => {
        console.log(item);
        const tr = document.createElement("tr");
        elementosTr[item.id] = tr;
        tr.style.height = "110px";

        const tdSelect = document.createElement("td");
        const tdImagem = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        tdSelect.appendChild(checkbox);

        tdImagem.style.height = "110px";
        tdSelect.style.height = "110px";
        tr.appendChild(tdSelect);
        tr.appendChild(tdImagem);

        const tdNome = document.createElement("td")
        tdNome.style.height = "110px";
        tdNome.textContent = item.nome;
        tr.appendChild(tdNome)

        const tdId = document.createElement("td");
        tdId.style.height = "110px";
        tdId.textContent = item.id;
        tr.appendChild(tdId)

        const tdCategoria = document.createElement("td");
        tdCategoria.style.height = "110px";
        tdCategoria.textContent = item.categoria.nome;
        tr.appendChild(tdCategoria)

        const tdNobreza = document.createElement("td");
        tdNobreza.style.height = "110px";
        tdNobreza.textContent = item.nobreza;
        tr.appendChild(tdNobreza);

        const tdPreco = document.createElement("td");
        tdPreco.style.height = "110px";
        tdPreco.textContent = item.preco;
        tr.appendChild(tdPreco);

        const tdDisponivel = document.createElement("td");  
        tdDisponivel.style.height = "110px";
        tdDisponivel.textContent = item.disponivel;
        tr.appendChild(tdDisponivel);

        const tdEstoqueMin = document.createElement("td");  
        tdEstoqueMin.style.height = "110px";
        tdEstoqueMin.textContent = item.estoqueMin;
        tr.appendChild(tdEstoqueMin);

        //Adiciona o tr à tbody da tabela html
        tbody.appendChild(tr);

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                produtoSelecionadoId = item.id;
                console.log(produtoSelecionadoId);
            }
        });
    })
}

//Pega os dados do LocalStorage e adiciona as linhas usando a função criada anteriormente



const btnExcluir = document.querySelector('#btn-excluir');
btnExcluir.addEventListener('click', () => {
    const index = indexDoProdutoPorId(dadosProdutos, produtoSelecionadoId);
    if (index !== -1) {
        removeProdutoPorIndex(dadosProdutos, index);
    }
    localStorage.setItem('produtos', JSON.stringify(dadosProdutos));
});


function removeProdutoPorIndex(produtos, index) {
    produtos.splice(index, 1);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    const tr = elementosTr[produtoSelecionadoId];
    tr.parentNode.removeChild(tr);
}


function indexDoProdutoPorId(produtos, id){
    let indexDoProduto;

    //Percorre o array dos produtos e verifica o id pra ver se o id passado como parâmetro é o produto a ser apagado:
    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].id === id) {

            //Retorna o índice achado
            return i;
        }
    }

    //Caso o produto não seja achado, retorna -1
    return -1;
}




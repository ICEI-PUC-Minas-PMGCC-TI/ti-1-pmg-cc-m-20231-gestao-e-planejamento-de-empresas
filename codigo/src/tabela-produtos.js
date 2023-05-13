var produtoSelecionado;

function adicionarLinhas(produtos){
    const tbody = document.querySelector("tbody");

    produtos.forEach(item => {
        const tr = document.createElement("tr");
        tr.style.height = "110px";

        const tdSelect = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        tdSelect.appendChild(checkbox);
        tr.appendChild(tdSelect);

        const tdNome = document.createElement("td")
        tdNome.style.height = "110px";
        tdNome.textContent = item.nome;
        tr.appendChild(tdNome)

        const tdCategoria = document.createElement("td");
        tdCategoria.style.height = "110px";
        tdCategoria.textContent = item.categoria;
        tr.appendChild(tdCategoria)

        const tdNobreza = document.createElement("td");
        tdNobreza.style.height = "110px";
        tdNobreza.textContent = item.precificacao;
        tr.appendChild(tdNobreza);

        const tdPreco = document.createElement("td");
        tdPreco.style.height = "110px";
        tdPreco.textContent = item.valorVenda;
        tr.appendChild(tdPreco);

        const tdDisponivel = document.createElement("td");  
        tdDisponivel.style.height = "110px";
        tdDisponivel.textContent = item.estqAtual;

        const tdEstoqueMin = document.createElement("td");  
        tdEstoqueMin.style.height = "110px";
        tdEstoqueMin.textContent = item.estqMin;

        //Checa o estoque:
        if(parseInt(item.estqAtual) < parseInt(item.estqMin)){
            tr.classList.add("estoque-baixo");
            tdDisponivel.style.color = "red";
        }

        tr.appendChild(tdDisponivel);
        tr.appendChild(tdEstoqueMin);

        
        //Adiciona o tr à tbody da tabela html
        tbody.appendChild(tr);

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                produtoSelecionado = item;
            }
        });
    })
}

//Pega os dados do LocalStorage e adiciona as linhas usando a função criada anteriormente

const dadosProdutos = JSON.parse(localStorage.getItem("db"));

const btnExcluir = document.querySelector('#btn-excluir');



function selecionarTodos() {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(checkbox => checkbox.checked = true);
}

function deselecionarTodos() {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
}

const btnSelecionarTodos = document.querySelector('#btn-selecionar-todos');

//Função excluir selecionados:
btnExcluir.addEventListener('click', () => {
    //Pega os checkboxes selecionados e os nomes dos produtos selecionados:
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    const selecionados = Array.from(checkboxes).filter(checkbox => checkbox.checked);
    const selecionadosNomes = selecionados.map(selecionado => selecionado.parentElement.parentElement.children[1].textContent);
    
    //Array de produtos:
    const produtos = JSON.parse(localStorage.getItem('db')).produtos;

    //O filter checa se o nome do produto está no array de nomes dos produtos selecionados e retorna um array com os produtos que não estão:
    const produtosFiltrados = produtos.filter(produto => !selecionadosNomes.includes(produto.nome));
    
    //Agora, a database terá apenas os produtos que não foram filtrados
    const db = {produtos: produtosFiltrados};
    localStorage.setItem('db', JSON.stringify(db));
    window.location.reload();
});

//Se o botão é clicado uma vez, seleciona todos os checkboxes e se é clicado de novo, deseleciona todos:
btnSelecionarTodos.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    const todosSelecionados = Array.from(checkboxes).every(checkbox => checkbox.checked);
    if (todosSelecionados) {
        deselecionarTodos();
    } else {
        selecionarTodos();
    }
});

//Pega o json e coloca os produtos em um array de produtos:

const produtosArray = dadosProdutos.produtos;

adicionarLinhas(produtosArray);
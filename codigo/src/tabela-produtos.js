var produtoSelecionado;

if (localStorage.getItem("produtosEmFalta") === null) {
    localStorage.setItem("produtosEmFalta", JSON.stringify([]));
}

const btnMostrarEmFalta = document.querySelector("#btn-produtos-faltando");
btnMostrarEmFalta.addEventListener("click", () => {
    const produtosEmFalta = JSON.parse(localStorage.getItem("produtosEmFalta"));
    const produtos = JSON.parse(localStorage.getItem("db")).produtos;
    const produtosFaltando = produtos.filter(produto => produtosEmFalta.includes(produto.nome));

    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
  
    adicionarLinhas(produtosFaltando);
});



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
        
        tdNome.addEventListener("click", () => {
            window.location.href = `apresentar-produto.html?produto=${item.nome}`;
        });

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

        if(parseInt(item.estqAtual) < parseInt(item.estqMin)){
            tr.classList.add("estoque-baixo");
            tdDisponivel.style.color = "red";
            const produtosEmFalta = JSON.parse(localStorage.getItem("produtosEmFalta"));

            if(!produtosEmFalta.includes(item.nome)){
                produtosEmFalta.push(item.nome);
            }
            localStorage.setItem("produtosEmFalta", JSON.stringify(produtosEmFalta));
        }

        tr.appendChild(tdDisponivel);
        tr.appendChild(tdEstoqueMin);

        tbody.appendChild(tr);

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                produtoSelecionado = item;
            }
        });
    })
}

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
    const confirmacao = confirm('Tem certeza que deseja excluir os produtos selecionados?');
    if (!confirmacao) {
        return;
    }

    //Apagar os produtos selecionados, deixando as categorias ainda na db:
    const produtos = JSON.parse(localStorage.getItem('db')).produtos;
    const produtosNaoSelecionados = produtos.filter(produto => produto.nome !== produtoSelecionado.nome);
    const db = JSON.parse(localStorage.getItem('db'));
    db.produtos = produtosNaoSelecionados;
    db.categorias = JSON.parse(localStorage.getItem('db')).categorias;
    localStorage.setItem('db', JSON.stringify(db));

    window.location.reload();
});

btnSelecionarTodos.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    const todosSelecionados = Array.from(checkboxes).every(checkbox => checkbox.checked);
    if (todosSelecionados) {
        deselecionarTodos();
    } else {
        selecionarTodos();
    }
});

const dadosProdutos = JSON.parse(localStorage.getItem("db"));
const produtosArray = dadosProdutos.produtos;

const mostrarTodos = document.querySelector("#btn-todos");

mostrarTodos.addEventListener("click", () => {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    adicionarLinhas(produtosArray);
});

if (window.location.search == "") {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    adicionarLinhas(produtosArray);
}



const btnSearch = document.querySelector(".btn-pesquisa");
const caixaPesquisa = document.querySelector(".caixa-pesquisa");


btnSearch.addEventListener("click", () => {
    caixaPesquisa.style.display = "flex";
    const main = document.querySelector("main");
    main.style.opacity = "0.5";
});


const fechar = document.querySelector(".fechar");
fechar.addEventListener("click", () => {
    caixaPesquisa.style.display = "none";
    const main = document.querySelector("main");
    main.style.opacity = "1";
});

//Colocar categorias no select:
const db = JSON.parse(localStorage.getItem("db")); 
const categorias = db.categoria;
const selectCategoria = document.querySelector(".categoria-select");
categorias.forEach(categoria => {
    const option = document.createElement("option");
    option.textContent = categoria.nomeCategoria;
    option.value = categoria.nomeCategoria;
    selectCategoria.appendChild(option);
} );

function filtrarPorCategoria(){
    //Pegar opcao escolhida no select por meio do parametro da url:
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaSelecionada = urlParams.get("categoria-select");
    const produtos = JSON.parse(localStorage.getItem("db")).produtos;
    const produtosFiltrados = produtos.filter(produto => produto.categoria == categoriaSelecionada);
    adicionarLinhas(produtosFiltrados)
}
filtrarPorCategoria();

function filtrarPorNobreza(){
    //Pega o parametro se é nobreza-nobre=on ou nobreza-bruto=on
    var nobrezaSelecionada;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.forEach((value, key) => {
        if (key == "nobreza-nobre" && value == "on") {
            nobrezaSelecionada = "nobre";
        } else if (key == "nobreza-bruto" && value == "on") {
            nobrezaSelecionada = "bruto";
        }
    });
    const produtos = JSON.parse(localStorage.getItem("db")).produtos;
    const produtosFiltrados = produtos.filter(produto => produto.precificacao == nobrezaSelecionada);
    adicionarLinhas(produtosFiltrados)
}
filtrarPorNobreza();

function buscarPorNome(){
    const urlParams = new URLSearchParams(window.location.search);
    const nomeBuscado = urlParams.get("search");
    console.log(nomeBuscado);
    const produtos = JSON.parse(localStorage.getItem("db")).produtos;
    //Não precisa ser o nome igual, mas conter a string, ent fica assim:
    const produtosFiltrados = produtos.filter(produto => produto.nome.toLowerCase().includes(nomeBuscado.toLowerCase()));
    console.log(produtosFiltrados);
    adicionarLinhas(produtosFiltrados)
}
buscarPorNome();
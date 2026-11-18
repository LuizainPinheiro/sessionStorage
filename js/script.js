const lista = document.getElementById("lista-carrinho");
const qtdPedido = document.getElementById("total-itens");
const qtdTopo = document.getElementById("contador-header");
const total = document.getElementById("valor-total");
const painel = document.querySelector("aside");
const principal = document.querySelector(".layout-principal");

const botaoCarrinho = document.getElementById("btn-carrinho");
const botaoEsvaziar = document.querySelector(".btn-esvaziar");
const botaoFinalizar = document.querySelector(".btn-finalizar");
const botoesAdicionar = document.querySelectorAll(".btn-adicionar");

let carrinho = [];
const salvo = sessionStorage.getItem("carrinho");

if (salvo !== null) {
    carrinho = JSON.parse(salvo);
}

function atualizar() {
    sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
    lista.innerHTML = "";
    let soma = 0;

    if (carrinho.length === 0) {
        lista.innerHTML = "<li>Nenhum item no pedido.</li>";
    } else {
        for (let i = 0; i < carrinho.length; i++) {
            const item = carrinho[i];
            soma = soma + item.preco;

            const li = document.createElement("li");

            const nomeTexto = document.createElement("span");
            nomeTexto.textContent = item.nome;

            const precoTexto = document.createElement("span");
            precoTexto.textContent = "R$ " + item.preco.toFixed(2).replace(".", ",") + " ";

            const botaoRemover = document.createElement("button");
            botaoRemover.textContent = "x";
            botaoRemover.className = "btn-remover";

            botaoRemover.addEventListener("click", function() {
                carrinho.splice(i, 1);
                atualizar();
            });

            precoTexto.appendChild(botaoRemover);
            li.appendChild(nomeTexto);
            li.appendChild(precoTexto);
            lista.appendChild(li);
        }
    }

    qtdPedido.textContent = carrinho.length;
    qtdTopo.textContent = carrinho.length;
    total.textContent = "R$ " + soma.toFixed(2).replace(".", ",");
}

for (let i = 0; i < botoesAdicionar.length; i++) {
    const botao = botoesAdicionar[i];

    botao.addEventListener("click", function() {
        const nome = botao.getAttribute("data-nome");
        const preco = Number(botao.getAttribute("data-preco"));

        carrinho.push({ nome: nome, preco: preco });
        atualizar();
    });
}

botaoEsvaziar.addEventListener("click", function() {
    carrinho = [];
    atualizar();
});

botaoFinalizar.addEventListener("click", function() {
    if (carrinho.length === 0) {
        alert("O carrinho está vazio.");
    } else {
        alert("Pedido finalizado! Total: " + total.textContent);
        carrinho = [];
        atualizar();
    }
});

botaoCarrinho.addEventListener("click", function() {
    if (painel.style.display === "none") {
        painel.style.display = "block";
        principal.style.gridTemplateColumns = "300px 1fr";
    } else {
        painel.style.display = "none";
        principal.style.gridTemplateColumns = "1fr";
    }
});

atualizar();
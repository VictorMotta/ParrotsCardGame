const someMenu = document.querySelector(".container-menu-principal");
const containerMostraFimDeJogo = document.querySelector(".container-mostra-fim-de-jogo");
const containerJogoFim = document.querySelector(".container-fim-de-jogo");
const mostraMensagemFim = document.querySelector(".mostra-mensagem-fim");
let jogadaClass;
let escolha;
let personagens = [
    "explodyparrot",
    "bobrossparrot",
    "fiestaparrot",
    "metalparrot",
    "revertitparrot",
    "tripletsparrot",
    "unicornparrot",
];

let carta = [];
let cartasDuplicadas = [];
let qtdPersonagens = 0;
let jogadas = [];
let pontuacao = 0;
let tentativas = 0;
let qtdTempo;
let timer;
let contador = 0;

function selecionaQtdCartas(select) {
    const selecionado = document.querySelector(".selecionado");

    if (selecionado !== null) {
        selecionado.classList.remove("selecionado");
    }
    escolha = select.innerHTML;

    select.classList.add("selecionado");
}

function escolheDificuldade() {
    someMenu.classList.add("hidden");
    qtdPersonagens = escolha / 2;
    loadGame();
    tempo();
}

function loadGame() {
    adicionaCartas();
    const cartasSorteadas = sorteiaCartas();

    cartasSorteadas.forEach((caracter) => {
        criaCartas(caracter);
    });
}

function tempo() {
    const mostraTempo = document.querySelector(".contador span");

    timer = setInterval(() => {
        mostraTempo.innerHTML = contador;
        contador++;
    }, 1000);
}

function adicionaCartas() {
    for (let i = 0; i < qtdPersonagens; i++) {
        carta.push(personagens[i]);
    }
}

function sorteiaCartas() {
    cartasDuplicadas = [...carta, ...carta];
    const cartasSorteadas = cartasDuplicadas.sort((a, b) => Math.random() - 0.5);
    return cartasSorteadas;
}

function criaCartas(caracter) {
    const elemento = document.querySelector(".game");

    elemento.innerHTML += `
    <div id="${caracter}" onclick="viraCarta(this);" class="card">
        <div class="front-face face">
            <img src="./img/${caracter}.gif" alt="" />
        </div>
        <div class="back-face face ">
            <img src="./img/back.png" alt="" />
        </div>
    </div>
    `;
}

function viraCarta(virar) {
    virar.classList.add("flip");
    virar.classList.add("jogada");

    regrasDoJogo(virar);
}

function regrasDoJogo(cartaVirada) {
    jogadas.push(cartaVirada);
    jogadaClass = document.querySelectorAll(".jogada");
    tentativas++;
    console.log(jogadaClass);
    console.log(tentativas);
    if (jogadas[1] === undefined) {
        // Corrije erro de clicar no primeiro e não achar o segundo click por ser undefined
        return;
    } else if (jogadas.length > 2) {
        // Não deixa virar mais de duas cartas
        for (let i = 0; i < jogadas.length; i++) {
            jogadas[i].classList.remove("jogada");
            jogadas[i].classList.remove("flip");

            if (jogadas[i] === undefined) {
                return;
            }
        }
        jogadas = [];
    } else if (jogadas[0].id === jogadas[1].id) {
        // Lógica de se acertar
        jogadaClass[0].classList.remove("jogada");
        jogadaClass[1].classList.remove("jogada");
        jogadaClass[0].classList.add("acertou");
        jogadaClass[1].classList.add("acertou");
        pontuacao++;
        jogadas = [];
        console.log("Entrou no if");
    } else {
        //
        setTimeout(function () {
            if (jogadaClass[1] === undefined) {
                return;
            }
            if (
                jogadaClass[0].classList.contains("jogada") &&
                jogadaClass[1].classList.contains("jogada")
            ) {
                jogadaClass[0].classList.remove("flip");
                jogadaClass[1].classList.remove("flip");
                if (
                    !jogadaClass[0].classList.contains("flip") &&
                    !jogadaClass[1].classList.contains("flip")
                ) {
                    jogadaClass[0].classList.remove("jogada");
                    jogadaClass[1].classList.remove("jogada");
                }
            }
            jogadas = [];
        }, 1000);
    }
    fimDoJogo();
}

function fimDoJogo() {
    // Pegar todos os acertou
    const acertou = document.querySelectorAll(".acertou");
    const totalCartas = document.querySelectorAll(".card");
    // e comparar a qtd com todos os cards do jogo
    if (acertou.length == totalCartas.length) {
        clearInterval(timer);
        setTimeout(mostraFimDoJogo, 1000);
        // caso for igual o você acertou tudo
    }
}

function mostraFimDoJogo() {
    const containerFimDeJogo = document.querySelector(".container-fim-de-jogo");
    const mostraMensagemAcertos = containerFimDeJogo.querySelector("h1");
    containerMostraFimDeJogo.classList.remove("hidden");

    mostraMensagemAcertos.innerHTML = `Você ganhou em ${tentativas} jogadas, e em ${
        contador - 1
    } segundos!!`;
}

function resetaJogo() {
    const cards = document.querySelectorAll(".card");
    const elemento = document.querySelector(".game");
    const selecionado = document.querySelector(".selecionado");
    carta = [];
    cartasDuplicadas = [];
    qtdPersonagens = 0;
    pontuacao = 0;
    tentativas = 0;
    contador = 0;

    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("acertou");
        cards[i].classList.remove("flip");
    }

    if (containerJogoFim.classList.contains("hidden")) {
        containerJogoFim.classList.remove("hidden");
    }
    if (!mostraMensagemFim.classList.contains("hidden")) {
        mostraMensagemFim.classList.add("hidden");
    }

    elemento.innerHTML = "";
    containerMostraFimDeJogo.classList.add("hidden");
    someMenu.classList.remove("hidden");

    if (selecionado !== null) {
        selecionado.classList.remove("selecionado");
    }
}

function naoQuerJogar() {
    containerJogoFim.classList.add("hidden");
    mostraMensagemFim.classList.remove("hidden");
}

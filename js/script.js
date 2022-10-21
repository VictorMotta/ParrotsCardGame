let jogadaClass;

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

function tempo() {
    const mostraTempo = document.querySelector(".contador span");

    timer = setInterval(() => {
        mostraTempo.innerHTML = contador;
        contador++;
    }, 1000);
}

function escolheDificuldade() {
    let condition = true;
    while (condition) {
        let escolha = prompt(
            "Escolha a quantidade de cartas que quer jogar(escolha entre 4 e 14 e somente números pares): "
        );
        let par = escolha % 2;
        if (par == 0 && escolha >= 4 && escolha <= 14) {
            qtdPersonagens = escolha / 2;
            condition = false;
            console.log(qtdPersonagens);
            loadGame();
            tempo();
        } else {
            alert("Escolha um número entre 4 e 14 e somente número par: ");
            condition = true;
        }
    }
}

function loadGame() {
    adicionaCartas();
    const cartasSorteadas = sorteiaCartas();

    cartasSorteadas.forEach((caracter) => {
        criaCartas(caracter);
    });
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
        setTimeout(() => {
            alert(`Você ganhou em ${tentativas} jogadas, e em ${contador - 1} segundos.`);
            jogarDeNovo();
        }, 1000);
        // caso for igual o você acertou tudo
    }
}

function jogarDeNovo() {
    const jogarNovamente = prompt("Gostaria de Jogar novamente?").toUpperCase();
    if (jogarNovamente === "SIM") {
        resetaJogo();
    } else if (jogarNovamente === "NÃO" || jogarNovamente === "NAO") {
        alert("Obrigado por jogar!");
        return;
    } else {
        alert("Digite apenas sim ou não!");
        jogarDeNovo();
    }
}

function resetaJogo() {
    const cards = document.querySelectorAll(".card");
    const elemento = document.querySelector(".game");
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

    elemento.innerHTML = "";

    escolheDificuldade();
}

function viraCarta(virar) {
    virar.classList.add("flip");
    virar.classList.add("jogada");

    regrasDoJogo(virar);
}

escolheDificuldade();

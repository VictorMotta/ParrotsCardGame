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
        } else {
            alert("Escolha um número entre 4 e 14 e somente número par: ");
            condition = true;
        }
    }
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

function loadGame() {
    adicionaCartas();
    const cartasSorteadas = sorteiaCartas();

    cartasSorteadas.forEach((caracter) => {
        criaCartas(caracter);
    });
}

function regrasDoJogo(cartaVirada) {
    jogadas.push(cartaVirada);
    jogadaClass = document.querySelectorAll(".jogada");
    console.log(jogadaClass);

    if (jogadas[1] === undefined) {
        return;
    } else if (jogadas.length > 2) {
        for (let i = 0; i < jogadas.length; i++) {
            jogadas[i].classList.remove("jogada");
            jogadas[i].classList.remove("flip");
            if (jogadas[i] === undefined) {
                return;
            }
        }
        jogadas = [];
    } else if (jogadas[0].id === jogadas[1].id) {
        jogadaClass[0].classList.remove("jogada");
        jogadaClass[1].classList.remove("jogada");
        jogadaClass[0].classList.add("acertada");
        jogadaClass[1].classList.add("acertada");
        pontuacao++;
        jogadas = [];
        console.log("Entrou no if");
    } else {
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
        }, 2000);
    }
    console.log(pontuacao);
}
// escolhe 1 carta, escolhe a segunda e compara com a primeira
// se for igual permanece virada, e aumenta 1 ponto
// se for diferente as duas viram e tenta novamente
// caso todas estiverem virada é fim de jogo

function viraCarta(virar) {
    virar.classList.add("flip");
    virar.classList.add("jogada");

    regrasDoJogo(virar);
}

escolheDificuldade();

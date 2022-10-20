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
let qtdCartas = 0;

function escolheDificuldade() {
    let condition = true;
    while (condition) {
        let escolha = prompt(
            "Escolha a quantidade de cartas que quer jogar(escolha entre 4 e 14 e somente números pares): "
        );
        let par = escolha % 2;
        if (par == 0 && escolha >= 4 && escolha <= 14) {
            qtdCartas = escolha / 2;
            condition = false;
            console.log(qtdCartas);
            adicionaCartas();
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
    for (let i = 0; i < qtdCartas; i++) {
        carta.push(personagens[i]);
    }
}

function sorteiaCartas() {
    cartasDuplicadas = [...carta, ...carta];
    const cartasSorteadas = cartasDuplicadas.sort((a, b) => Math.random() - 0.5);

    return cartasSorteadas;
}

function loadGame() {
    const cartasSorteadas = sorteiaCartas();

    cartasSorteadas.forEach((caracter) => {
        criaCartas(caracter);
    });
}

function viraCarta(virar) {
    virar.classList.add("flip");
}

escolheDificuldade();

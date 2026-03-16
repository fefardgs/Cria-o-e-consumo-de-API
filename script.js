// ==============================
// ELEMENTOS HTML
// ==============================

const heroImage = document.getElementById("heroImage");
const heroName = document.getElementById("heroName");

const randomBtn = document.getElementById("randomBtn");
const searchBtn = document.getElementById("searchBtn");

const heroInput = document.getElementById("heroInput");

const heroArea = document.querySelector(".hero-area");

// ==============================
// URL DA API
// ==============================

const API = "http://10.106.208.39:3000/api/marvel";

// ==============================
// FUNÇÃO PRINCIPAL
// ==============================

async function buscarHeroi(url){

heroArea.classList.add("loading");

try{

    const response = await fetch(url);

    if(!response.ok){
        throw new Error("Erro na API");
    }

    const data = await response.json();

    console.log(data);

    if(data.status === "error"){

        heroName.textContent = data.message;
        heroImage.src = "";
        return;

    }

    heroImage.src = data.imagem;

    const partes = data.imagem.split("/");

    const personagem = partes[partes.length - 1]
        .split(".")[0];

    heroName.textContent =
    personagem.charAt(0).toUpperCase() +
    personagem.slice(1);

}
catch(erro){

    console.error(erro);

    heroName.textContent =
    "⚠️ Servidor offline - rode node server.js";

    heroImage.src = "";

}
finally{

    heroArea.classList.remove("loading");

}

}

// ==============================
// HERÓI ALEATÓRIO
// ==============================

function heroiAleatorio(){

buscarHeroi(`${API}/aleatorio`);

}

// ==============================
// BUSCAR PERSONAGEM
// ==============================

function buscarPorPersonagem(){

const personagem = heroInput.value.trim().toLowerCase();

if(!personagem){

    alert("Digite um personagem!");
    return;

}

buscarHeroi(`${API}/${personagem}`);

}

// ==============================
// EVENTOS
// ==============================

randomBtn.addEventListener("click", heroiAleatorio);

searchBtn.addEventListener("click", buscarPorPersonagem);

heroImage.addEventListener("click", heroiAleatorio);

heroInput.addEventListener("keypress",(event)=>{

if(event.key === "Enter"){

    buscarPorPersonagem();

}

});

// ==============================
// CARREGAR AO ABRIR
// ==============================

heroiAleatorio();
const input_pesquisa =  document.querySelector('#input_pesquisa');
const btnPesquisar = document.querySelector('#btnPesquisar');
const img_anime = document.querySelector('#img_anime');
const nome_anime = document.querySelector('#nome_anime');
const sinopse_anime = document.querySelector('#sinopse_anime');
const episodios_anime = document.querySelector('#episodios_anime');
const status_anime = document.querySelector('#status_anime');
const form = document.querySelector('.form');

let searchAnime = 20;

//API
const buscaAnime = async (anime_id) => {
    const APIResposta = await fetch(`https://api.jikan.moe/v4/anime/${anime_id}/full`);

    console.log(APIResposta)

    if(APIResposta.status === 200) {
        const dados = await APIResposta.json();
        return dados;
    } else {
        alert('Anime não encontrado!')
    }
}

const renderAnime = async (anime_id) => {
    const dados = await buscaAnime(anime_id)

    if(dados) {
        img_anime.src = dados['data']['images']['jpg']['image_url']
        nome_anime.innerHTML = dados['data']['title']
        sinopse_anime.innerHTML = dados['data']['synopsis']
        episodios_anime.innerHTML = 'Episódios: ' + dados['data']['episodes']
        status_anime.innerHTML = 'Status: ' + dados['data']['status']
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderAnime(input_pesquisa.value);
  });

renderAnime(searchAnime);

var button = document.getElementById('read_button');

// Click Event
button.addEventListener('click', function() {
    // Select card
    var card = document.querySelector('.card');

    // Add/Remove Class Active
    card.classList.toggle('active');

    if (card.classList.contains('active')) {
        // Change button text if has class active
        return button.textContent = 'Ler Menos';
    }
    
    // Change button text if hasn't class active
    button.textContent = 'Ler Mais';
});

// Variáveis Globais que me trarão os resultados
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');


const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon  = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }  
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando ...';

    const data = await fetchPokemon(pokemon);

    if (data){

        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else{
        pokemonName.innerHTML = 'Não Encontrado';
        pokemonNumber.innerHTML = '';
        // pokemonImage.style.display = 'none'; retorna a busca sem a imagem
        pokemonImage.src = 'https://media.tenor.com/3ovqIbBiVFsAAAAd/when-computer-dies-when-almost-finish-angry-cat.gif';
        input.value = '';
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});


// Configuração dos botões, voltar e passar

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
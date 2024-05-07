// On attend le chargement de la page HTML
document.addEventListener("DOMContentLoaded", async function () {
    const pokemonsTypesToCouleurs = {
        'normal' : '949795',
        'fighting': 'FF7322',
        'flying' : '6FB1E9',
        'poison' : '8D3ABF',
        'ground' : '8B4723',
        'rock' : 'A69F79',
        'bug' : '83962B',
        'ghost' : '693963',
        'steel' : '4D97AE',
        'fire' : 'ED202A',
        'water' : '1876E7',
        'grass' : '1F9731',
        'electric' : 'FEB72E',
        'psychic' : 'F8376D',
        'ice' : '00D3FC',
        'dragon' : '4857D7',
        'dark' : '483938',
        'fairy' : 'F765E7',
        'unknow' : 'FFFFFF',
        'shadow' : '693963',
    };
    let idPokemonEnVedette;
    let idPokemonMax = 151;
    let idPokemonMin = 0;
    let idTireAuSort;
    let nombreMaxPokemonsAPI = 1302;
    let nomStockagePokemons = 'pokemons';
    let pokemons = [];

    idTireAuSort = tirageAuSortUnPokemon();
    document.getElementById('pokemon-en-vedette-chargement').style.display = 'none';
    await afficherUnPokemon(idTireAuSort);
    test = await recupererInformationsUnItem();
    //document.getElementById('pokemon-en-vedette').insertAdjacentHTML("afterbegin", genererCarteItem(test));

    /**
     * Infos intéressants à prendre:
     * id -> numéro
     * name -> nom
     * types[indice].name -> types
     * sprites.front_default -> image
     * cries.legacy -> cri original ou si nul, cries.latest
     */

    async function afficherLesPokemonsReference() {

    }

    async function afficherUnPokemon(identifiant) {
        // Usage de l'API PokéAPI pour récupérer les informations souhaitées
        let pokemon = (pokemons[identifiant]) ? pokemons[identifiant] : await recupererInformationsUnPokemon(identifiant);
        // Mise à zéro du contenu de la div
        document.getElementById('pokemon-en-vedette').innerHTML = "";
        // Ajoute d'une card avec les informations souhaitées
        document.getElementById('pokemon-en-vedette').insertAdjacentHTML("beforeend", genererCartePokemon(pokemon))
    }

    function genererCartePokemon(pokemon) {
        let badgesPokemon = '';
        let couleurCartePokemon = '';
        let nombreTypesPokemon = pokemon.types.length;
        // Si le pokémon a plusieurs types
        if (nombreTypesPokemon > 1) {
            // Indice utile pour faire un linear-gradiant en couleur de fond de la carte courante
            let indiceTypeCourant = 1;
            // Préparation de la propriété CSS du fond de la carte courante
            couleurCartePokemon += 'background: linear-gradient(to right, '
            pokemon.types.forEach((type) => {
                // Création du badge de type du pokémon courant
                badgesPokemon += '<span class="badge badge-pill col-4 m-1 mx-auto text-bolder text-white" style="background-color: #' + pokemonsTypesToCouleurs[type.type.name] + '">' + type.type.name + '</span>';
                // Actualisation de la propriété CSS du fond de la carte courante
                couleurCartePokemon += '#' + pokemonsTypesToCouleurs[type.type.name] + ',';
            });
            // Actualisation de la propriété CSS du fond de la carte courante
            couleurCartePokemon = couleurCartePokemon.slice(0, -1) + ');';
        // Sinon, le pokémon courant n'a qu'un seul type
        } else {
            // Création du badge de type du pokémon courant
            badgesPokemon += '<span class="badge badge-pill col-4 m-1 mx-auto text-bolder text-white" style="background-color: #' + pokemonsTypesToCouleurs[pokemon.types[0].type.name] + '">' + pokemon.types[0].type.name + '</span>';
            // Préparation de la propriété CSS du fond de la carte courante
            couleurCartePokemon += 'background-color: #' + pokemonsTypesToCouleurs[pokemon.types[0].type.name] + ';';
        }
        return  '<div class="card col-4 mx-auto p-0 text-center" style="border-width: medium; ' + couleurCartePokemon + '">\n' +
                '  <img src="' + pokemon.sprites.front_default + '" class="card-img-top" alt="' + pokemon.name + '">\n' +
                '  <div class="card-body bg-light">\n' +
                '    <h5 class="card-title"> #' + pokemon.id + ' ' + pokemon.name.toUpperCase() + '</h5>' +
                '    <div class="mb-1 row" id="types-pokemon-' + pokemon.id + '">\n' +
                        badgesPokemon +
                '    </div>\n' +
                '    <div class="mb-1 row">\n' +
                '        <div class="col-5 mx-auto"><i class="fa-solid fa-up-right-and-down-left-from-center"></i> Height: ' + (pokemon.height) * 10 + ' cm</div>' +
                '        <div class="col-5 mx-auto"><i class="fa-solid fa-weight-hanging"></i> Weight: ' + (pokemon.weight) / 10 + ' Kg</div>' +
                '    </div>\n' +
                '    <p class="card-text"></p>\n' +
                '  </div>\n' +
                '</div>';
    }

    function genererCarteItem(image) {
        return '<div class="card col-4 mx-auto p-0 text-center">\n' +
            '  <img src="' + image.urls.regular + '" class="card-img" alt="Objet Aléatoire">\n' +
            '  <div class="card-img-overlay">\n' +
            '  </div>\n' +
            '</div>';
    }

    async function recupererInformationsUnItem() {
        return await fetch("https://api.unsplash.com/photos/random?query=hat&client_id=2s8z36ff69y94Pu919qPqD2VBrjfG4ZQyOkHo2oOdhc")
            .then(response => response.json())
            .then(data => {
               return data;
            });
    }

    async function recupererInformationsUnPokemon(identifiant) {
        return await fetch("https://pokeapi.co/api/v2/pokemon/" + identifiant)
            .then((response) => response.json())
            .then((pokemon) => {
                return pokemon;
            });
    }

    async function recupererInformationsPlusieursPokemons(debut = 0, fin = 2000) {
        return await fetch("https://pokeapi.co/api/v2/pokemon/?limit=" + fin + "&offset=" + debut)
            .then((response) => response.json())
            .then((pokemons) => {
                return pokemons.results;
            });
    }

    function tirageAuSortUnPokemon() {
        return Math.floor(Math.random() * (idPokemonMax - idPokemonMin + 1));
    }
});
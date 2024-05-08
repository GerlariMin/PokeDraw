// On attend le chargement de la page HTML
document.addEventListener("DOMContentLoaded", async function () {
    // Tableau de conversion type <=> couleur hexadécimale
    const pokemonsTypesToCouleurs = {
        'acier' : '4D97AE',
        'combat': 'FF7322',
        'dragon' : '4857D7',
        'eau' : '1876E7',
        'électrik' : 'FEB72E',
        'feu' : 'ED202A',
        'fée' : 'F765E7',
        'glace' : '00D3FC',
        'inconnu' : 'FFFFFF',
        'insecte' : '83962B',
        'normal' : '949795',
        'plante' : '1F9731',
        'poison' : '8D3ABF',
        'psy' : 'F8376D',
        'roche' : 'A69F79',
        'sol' : '8B4723',
        'spectre' : '693963',
        'ténèbres' : '483938',
        'vol' : '6FB1E9',
    };
    // Usage de l'API Tyradex pour la récupération des informations des pokémons
    const urlAPIPokemon = 'https://tyradex.vercel.app/api/v1/';
    // Numéro du dernier Pokémon pouvant être tiré au sort
    let idPokemonMax = 151;
    // Numéro du premier Pokémon pouvant être tiré au sort
    let idPokemonMin = 1;
    // Numéro du Pokémon qui est tiré au sort
    let idTireAuSort;
    // Afficher le modal de chargement
    //const myModal = new bootstrap.Modal(document.getElementById('pokemon-en-chargement'), 'show');
    // Retrait du modal de chargement
    //myModal.Modal(document.getElementById('pokemon-en-chargement'), 'hide');
    // Tirage au sort d'un numéro de Pokémon
    idTireAuSort = tirageAuSortUnPokemon();
    // Afficher le Pokémon tiré au sort
    await afficherUnPokemon(idTireAuSort);
    // Récupération des différentes générations de Pokémons
    let generations = await recupererInformationsGenPokemons();
    // Parcourt de l'ensemble des générations
    generations.forEach((gen) => {
        // Par défaut, c'est la première génération qui est affichée, donc on met la classe dédiée
        let actif = (gen.generation === 1) ? 'active' : '';
        // Génération du bouton sur l'interface
        document.getElementById('boutons-generations-pokemons').insertAdjacentHTML("beforeend", '<button class="btn btn-outline-dark generations ' + actif + '" id="generation-' + gen.generation + '" type="button" value="' + gen.generation + '"><i class="fa-solid fa-layer-group"></i> ' + gen.generation + '</button>');
        // Génération de l'interaction qui se produira lors du clique utilisateur sur le bouton
        document.getElementById('generation-' + gen.generation).addEventListener('click', async function () {
            // Suppression de la classe active sur les autres boutons de choix de génération à afficher
            document.querySelectorAll('.generations.active').forEach((bouton) => {
                bouton.classList.remove('active');
            });
            // Ajout de la classe active pour indiquer quelle génération de Pokémon est affichée
            this.classList.add('active');
            // Actualiser les références de Pokémons affichées
            await afficherListeReference(this.value);
            // Actualiser les numéros min et max des Pokémons pouvant être tirés au sort
            idPokemonMax = gen.to;
            idPokemonMin = gen.from;
        });
    });
    // Cas particulier du bouton permettant d'afficher toutes les génération
    // Génération du bouton sur l'interface
    document.getElementById('boutons-generations-pokemons').insertAdjacentHTML("beforeend", '<button class="btn btn-outline-dark generations" id="generation-toutes" type="button" value="0"><i class="fa-solid fa-layer-group"></i> Toutes</button>');
    // Génération de l'interaction qui se produira lors du clique utilisateur sur le bouton
    document.getElementById('generation-toutes').addEventListener('click', async function () {
        // Suppression de la classe active sur les autres boutons de choix de génération à afficher
        document.querySelectorAll('.generations.active').forEach((bouton) => {
            bouton.classList.remove('active');
        });
        // Ajout de la classe active pour indiquer quelle génération de Pokémon est affichée
        this.classList.add('active');
        // Actualiser les références de Pokémons affichées
        await afficherListeReference(this.value);
        // Actualiser les numéros min et max des Pokémons pouvant être tirés au sort
        idPokemonMax = 1;
        idPokemonMin = 1025;
    });
    // Affichage des Pokémons références
    await afficherListeReference();

    document.getElementById('actualiser-objet').addEventListener('click', async () => {
        if (document.getElementById('objet-aleatoire')) {
            document.getElementById('objet-aleatoire').remove();
        }
        let objetAleatoire = await recupererInformationsUnItem();
        document.getElementById('tirage-au-sort').insertAdjacentHTML("afterbegin", genererCarteItem(objetAleatoire));
    });

    document.getElementById('actualiser-pokemon').addEventListener('click', async () => {
        if (document.getElementById('pokemon-aleatoire')) {
            document.getElementById('pokemon-aleatoire').remove();
        }
        let identifiantPokemonAleatoire = tirageAuSortUnPokemon();
        await afficherUnPokemon(identifiantPokemonAleatoire);
    });

    /**
     * Fonction dédiée à la génération des cartes des Pokémons d'une génération souhaitée.
     *
     * @param generation
     * @returns {Promise<void>}
     */
    async function afficherListeReference(generation = 1) {
        // Si on veut afficher le Pokémon bug, on remplace le bloc if/else par : let gen = (generation === "0") ? await recupererInformationsPokemons() : await recupererInformationsUneGenPokemons(generation);
        let gen;
        // Vérification du cas où l'utilisateur souhaite afficher tous les Pokémons existants
        if (generation === "0") {
            // Récupération de tous les Pokémons
            gen = await recupererInformationsPokemons();
            // Retrait du Pokémon bug
            gen.shift();
        } else {
            gen = await recupererInformationsUneGenPokemons(generation);
        }
        // Initialisation des cartes
        let cartes = '';
        // Suppression du contenu de la div qui affiche tous les Pokémons références
        document.getElementById('pokemons-references').innerHTML = "";
        // PArcourt de chaque pokemon de la génération voulue
        gen.forEach((pokemon) => {
            // Ajout à la variable dédié, le code HTML de la carte de présentation du pokemon courant
            cartes += genererCartePokemon(pokemon);
        });
        // Ajout du code HTML final à la div des Pokémons de références
        document.getElementById('pokemons-references').insertAdjacentHTML("afterbegin", cartes);
    }

    /**
     * Fonction effectuant les traitement nécessaires pour afficher un Pokémon donné
     *
     * @param identifiant
     * @returns {Promise<void>}
     */
    async function afficherUnPokemon(identifiant) {
        // Usage de l'API ou du stockage local pour récupérer les informations souhaitées
        //let pokemon = (pokemons[identifiant]) ? pokemons[identifiant] : await recupererInformationsUnPokemon(identifiant);
        let pokemon = await recupererInformationsUnPokemon(identifiant);
        // Ajoute d'une card avec les informations souhaitées
        document.getElementById('tirage-au-sort').insertAdjacentHTML("beforeend", genererCartePokemon(pokemon))
    }

    function genererCarteItem(image) {
        return '<div class="col-4 p-1" id="objet-aleatoire">\n' +
            '    <div class="card h-100 text-center">\n' +
            '        <img alt="Objet Aléatoire" class="card-img h-100 img-fluid w-100" src="' + image.urls.regular + '"/>\n' +
            '    </div>\n' +
            '</div>\n';
    }

    function genererCartePokemon(pokemon) {
        let badgesPokemon = '';
        let couleurCartePokemon = '';
        let nombreTypesPokemon = (pokemon?.types) ? pokemon.types.length : 0;
        // Si le pokémon a plusieurs types
        if (nombreTypesPokemon > 1) {
            // Indice utile pour faire un linear-gradiant en couleur de fond de la carte courante
            let indiceTypeCourant = 1;
            // Préparation de la propriété CSS du fond de la carte courante
            couleurCartePokemon += 'background: linear-gradient(to right, ';
            // Parcourt de tous les types du pokemon courant
            pokemon.types.forEach((type) => {
                // Création du badge de type du pokémon courant
                badgesPokemon += '<span class="badge badge-pill col-4 m-1 mx-auto text-bolder text-white" style="background-color: #' + pokemonsTypesToCouleurs[type.name.toLowerCase()] + '">' + type.name + '</span>';
                // Actualisation de la propriété CSS du fond de la carte courante
                couleurCartePokemon += '#' + pokemonsTypesToCouleurs[type.name.toLowerCase()] + ',';
            });
            // Actualisation de la propriété CSS du fond de la carte courante
            couleurCartePokemon = couleurCartePokemon.slice(0, -1) + ');';
        // Sinon, le pokémon courant n'a qu'un seul type
        } else if (nombreTypesPokemon === 1) {
            // Création du badge de type du pokémon courant
            badgesPokemon += '<span class="badge badge-pill col-4 m-1 mx-auto text-bolder text-white" style="background-color: #' + pokemonsTypesToCouleurs[pokemon.types[0].name.toLowerCase()] + '">' + pokemon.types[0].name + '</span>';
            // Préparation de la propriété CSS du fond de la carte courante
            couleurCartePokemon += 'background-color: #' + pokemonsTypesToCouleurs[pokemon.types[0].name.toLowerCase()] + ';';
        } else {
            // Création du badge de type du pokémon courant
            badgesPokemon += '<span class="badge badge-pill col-4 m-1 mx-auto text-bolder text-dark" style="background-color: #' + pokemonsTypesToCouleurs['inconnu'] + '">Inconnu</span>';
            // Préparation de la propriété CSS du fond de la carte courante
            couleurCartePokemon += 'background-color: #' + pokemonsTypesToCouleurs['inconnu'] + ';';
        }
        // La fonction retourne l'élément HTML créé pour afifcher la carte de présentation du pokemon courant
        return  '<div class="col-4 p-1" id="pokemon-aleatoire">\n' +
                '  <div class="card h-100 text-center" id="carte-pokemon-' + pokemon.pokedex_id + '" style="border-width: medium; ' + couleurCartePokemon + '">\n' +
                '    <img src="' + pokemon.sprites.regular + '" class="card-img-top" alt="' + pokemon.name.fr + '">\n' +
                '    <div class="card-body bg-light rounded-bottom">\n' +
                '      <h5 class="card-title"> #' + pokemon.pokedex_id + ' ' + pokemon.name.fr.toUpperCase() + '</h5>' +
                '      <div class="mb-1 row" id="types-pokemon-' + pokemon.pokedex_id + '">\n' +
                          badgesPokemon +
                '      </div>\n' +
                '      <div class="mb-1 mt-5 row">\n' +
                '          <div class="col-5 mx-auto"><i class="fa-solid fa-up-right-and-down-left-from-center"></i> Taille: ' + pokemon.height + '</div>' +
                '          <div class="col-5 mx-auto"><i class="fa-solid fa-weight-hanging"></i> Poids: ' + pokemon.weight + '</div>' +
                '      </div>\n' +
                '      <p class="card-text"></p>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</div>\n';
    }

    async function recupererInformationsGenPokemons() {
        // La fonction retourne le résultat de l'API Tyradex
        return await fetch(urlAPIPokemon + "gen")
            .then((response) => response.json())
            .then((generations) => {
                return generations;
            });
    }

    async function recupererInformationsPokemons() {
        // La fonction retourne le résultat de l'API Tyradex
        return await fetch(urlAPIPokemon + "pokemon")
            .then((response) => response.json())
            .then((pokemons) => {
                return pokemons;
            });
    }

    async function recupererInformationsUneGenPokemons(generation) {
        // La fonction retourne le résultat de l'API Tyradex
        return await fetch(urlAPIPokemon + "gen/" + generation)
            .then((response) => response.json())
            .then((pokemons) => {
                return pokemons;
            });
    }

    async function recupererInformationsUnItem() {
        return await fetch("https://api.unsplash.com/photos/random?client_id=2s8z36ff69y94Pu919qPqD2VBrjfG4ZQyOkHo2oOdhc&query=object&orientation=portrait")
            .then(response => response.json())
            .then(data => {
                return data;
            });
    }

    async function recupererInformationsUnPokemon(identifiant) {
        // La fonction retourne le résultat de l'API Tyradex
        return await fetch(urlAPIPokemon + "pokemon/" + identifiant)
            .then((response) => response.json())
            .then((pokemon) => {
                return pokemon;
            });
    }

    function tirageAuSortUnPokemon() {
        return Math.floor(Math.random() * (idPokemonMax - idPokemonMin + 1) + idPokemonMin);
    }
});
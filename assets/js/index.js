/**
 * Conversion des types en code hexadécimal pour la couleur HTML à affecter
 * @type {{normal: string, steel: string, unknow: string, poison: string, shadow: string, electric: string, ice: string, fighting: string, dragon: string, water: string, rock: string, ghost: string, bug: string, grass: string, flying: string, dark: string, fire: string, ground: string, psychic: string, fairy: string}}
 */
const types_pokemons = {
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
const accessoires = ['Lunettes', 'Livre', 'Gants', 'Bottes', 'Bonnet', 'Chapeau', 'Bandana'];
/**
 * Fonction qui génère l'affichage des cartes de présentation des pokémons
 */
function aficher_pokemons() {
    // Actualisation du span affichant le nombre de pokémons à afficher sur la page
    $('#nombre-pokemons-affiches').text($('#affichage-pokemons').val());
    // Cast du nombre de pokémons à afficher en entier
    let nombre_pokemons_a_affichier = parseInt($('#affichage-pokemons').val());
    // Réinitialisation du contenu de l'élément HTML accueillant les cartes de présentation des pokémons
    $('#cartes-pokemons').html('');
    // Pour chaque pokémon dont l'id est comprit entre 1 et le nombre max désiré par l'utilisateur
    for (let id_pokemon = 1; id_pokemon <= nombre_pokemons_a_affichier; id_pokemon++) {
        // On interroge l'API dédiée pour récupérer les information à propos du pokémon courant
        $.get("https://pokeapi.co/api/v2/pokemon/" + id_pokemon, function (pokemon) {
            // On génère une carte de présentation avec les informations que l'on souhaite afficher pour le pokémon courant
            $('#cartes-pokemons').append('<div class="col-4 mt-3 mb-3">' +
                '  <div class="card w-100" id="pokemon-' + pokemon.id + '" style="width: 18rem;">\n' +
                '    <img src="' + pokemon.sprites.front_default + '" class="card-img-top" alt="' + pokemon.name + '">\n' +
                '    <div class="card-body bg-light">\n' +
                '      <h5 class="card-title"> #' + pokemon.id + ' <span style="text-transform:uppercase;">' + pokemon.name + '</span></h5>\n' +
                '      <div class="row">\n' +
                '        <div class="col-8">\n' +
                '          <p class="card-text"> Height: ' + (pokemon.height)*10 + ' cm </p>\n' +
                '          <p class="card-text"> Weight: ' + (pokemon.weight)/10 + ' Kg </p>\n' +
                '        </div>\n' +
                '        <div class="col-4 text-white text-bolder" id="types-pokemon-' + pokemon.id + '">\n' +
                '        </div>\n' +
                '      </div>\n' +
                '    </div>\n' +
                '  </div>' +
                '</div>');
            $('#pokemon-' + pokemon.id).css('border-width', 'medium');
            // On récupère le nombre de types que possède le pokémon courant
            let nombre_types = pokemon.types.length;
            // Si le pokémon a plusieurs types
            if (nombre_types > 1) {
                // Indice utile pour faire un linear-gradiant en couleur de fond de la carte courante
                let indice_type_courant = 1;
                // Préparation de la propriété CSS du fond de la carte courante
                let fond_carte_pokemon_courant = 'linear-gradient(to right, ';
                pokemon.types.forEach(function( type) {
                    // Création du badge de type du pokémon courant
                    $('#types-pokemon-' + pokemon.id).append('<span class="badge badge-pill" style="background-color: #' + types_pokemons[type.type.name] + '">' + type.type.name + '</span>');
                    // Calcul du pourcentage que va prendre la couleur du type courant en couleur de fond
                    let pourcentage = Math.round((indice_type_courant/nombre_types)*100);
                    // Actualisation de la propriété CSS du fond de la carte courante
                    fond_carte_pokemon_courant += '#' + types_pokemons[type.type.name] + ' ' + pourcentage + '%,';
                    // Actualisation de la valeur de l'indice dédié au type courant du pokémon courant
                    indice_type_courant++;
                });
                // Actualisation de la propriété CSS du fond de la carte courante
                fond_carte_pokemon_courant = fond_carte_pokemon_courant.slice(0, -1) + ')';
                // Création de la propriété CSS pour la carte de présentation courante
                $('#pokemon-' + pokemon.id).css('background', fond_carte_pokemon_courant);
            // Sinon, le pokémon courant n'a qu'un seul type
            } else {
                // Création du badge de type du pokémon courant
                $('#types-pokemon-' + pokemon.id).append('<span class="badge badge-pill" style="background-color: #' + types_pokemons[pokemon.types[0].type.name] + '">' + pokemon.types[0].type.name + '</span>');
                // Génération de la propriété CSS pour attribuer une unique couleur de fond pour l'unique type du pokémon courant
                $('#pokemon-' + pokemon.id).css('background-color', '#' + types_pokemons[pokemon.types[0].type.name]);
            }
        }, "json");
    }
}
function tirage_item() {
    let indice_accessoire_max = accessoires.length;
    let indice_tire = Math.floor(Math.random() * indice_accessoire_max);
    $('#acessoire-tire').val(accessoires[indice_tire]);
}
// On attend que le document HTML soit chargé sur le navigateur du client avant d'effecteur les opérations souhaitées.
$(document).ready(function () {
    // Affichage de tous les pokémons
    aficher_pokemons();
    // En fonction du choix de l'utilisateur, on affiche les pokémons souhaités.
    $('#affichage-pokemons').change(function () {
        aficher_pokemons();
    });
    $('#bouton-tirage-accessoire').click(function () {
        tirage_item();
    });
});
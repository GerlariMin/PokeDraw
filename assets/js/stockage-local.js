//import { prefixe_sessions } from "./firebase.js";
// On attend que le document HTML soit chargé sur le navigateur du client avant d'effecteur les opérations souhaitées.
$(document).ready(function () {
    //console.log(sessionStorage.getItem(prefixe_sessions + "-nom-utilisateur") + ' : ' + sessionStorage.getItem(prefixe_sessions + "-connecte"));
    console.log(sessionStorage.getItem( "pokedraw-393c4-nom-utilisateur") + ' : ' + sessionStorage.getItem( "pokedraw-393c4-connecte"));
    if (sessionStorage.getItem( "pokedraw-393c4-nom-utilisateur") && sessionStorage.getItem( "pokedraw-393c4-connecte")) {
        $('#bouton-page-connexion').hide();
        $('.navbar').append('<p class="navbar-text text-white" id="bienvenue-utilisateur">Bienvenue <span class="text-bolder">' + sessionStorage.getItem( "pokedraw-393c4-nom-utilisateur") + '</span></p>')
    } else {
        $('#bienvenue-utilisateur').remove();
        $('#bouton-page-connexion').show();
    }
});
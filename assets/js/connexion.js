// Import the functions you need from the SDKs you need
import { getDatabase, onValue, ref } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
//import { prefixe_sessions } from "./firebase.js";
// Récupération de la base de données
const base_de_donnees = getDatabase();
// Variables utiles relatives aux id des éléments de la page de connexion
const id_bouton_connexion = 'bouton-connexion';
const id_champ_nom_utilisateur = 'nom-utilisateur';
const id_champ_mot_de_passe = 'mot-de-passe';
const id_div_connexion_en_cours = 'connexion-en-cours';
const id_div_se_connecter = 'se-connecter';
const id_aide_nom_utilisateur ='aide-nom-utilisateur';
const id_aide_nom_utilisateur_erreur ='erreur-nom-utilisateur';
const id_aide_nom_utilisateur_succes ='succes-nom-utilisateur';
const id_aide_nom_utilisateur_vide ='nom-utilisateur-vide';
const id_aide_mot_de_passe ='aide-mot-de-passe';
const id_aide_mot_de_passe_erreur ='erreur-mot-de-passe';
const id_aide_mot_de_passe_succes ='succes-mot-de-passe';
const id_aide_mot_de_passe_vide ='mot-de-passe-vide';

/**
 * Connexion de l'utilisateur
 * Comparaison des valeurs saisies avec les données stockées en base
 * TODO - trouver un moyen de comparer le mot de passe saisi avec le mot de passe haché en base.
 */
function connexion_utilisateur() {
    let nom_utilisateur = $('#' + id_champ_nom_utilisateur).val();
    let mot_de_passe = $('#' + id_champ_mot_de_passe).val();
    if(nom_utilisateur && mot_de_passe) {
        let informations_utilisateur = ref(base_de_donnees, 'users/' + nom_utilisateur);
        onValue(informations_utilisateur, (utilisateur_trouve) => {
            // Récupération du contenu
            let utilisateur = utilisateur_trouve.val();
            if (!utilisateur) {
                swal({
                    icon: "error",
                    text: "Il semble que les informations saisies ne correspondent à aucun profil!",
                    title: "Erreur!",
                });
                verouiller_bouton_connexion();
            } else {
                if (mot_de_passe === utilisateur.password) {
                    swal({
                        icon: "success",
                        text: "Vous allez être rediriger vers la page d'accueil.",
                        timer: 3000,
                        title: "Connexion réussie!",
                    });
                    // Création des sessions
                    //sessionStorage.setItem(prefixe_sessions + "-nom-utilisateur", nom_utilisateur);
                    //sessionStorage.setItem(prefixe_sessions + "-connecte", true);
                    sessionStorage.setItem("pokedraw-393c4-nom-utilisateur", nom_utilisateur);
                    sessionStorage.setItem("pokedraw-393c4-connecte", true);
                    window.location.replace("../../index.html");
                } else {
                    swal({
                        icon: "error",
                        text: "Le mot de passe saisi ne correspond pas!",
                        title: "Erreur!",
                    });
                    verouiller_bouton_connexion();
                }
            }
        });
    } else {
        swal({
            icon: "error",
            text: "Il semble qu'un des champs soit vide!",
            title: "Erreur!",
        });
        verouiller_bouton_connexion();
    }
}

/**
 * Permettre à l'utilisateur de cliquer sur la bouton de connexion
 */
function deverouiller_bouton_connexion() {
    $('#' + id_bouton_connexion).prop("disabled", false);
}

/**
 * Vérifier que l'utilisateur a saisi un mot de passe
 * @param taille_mot_de_passe - taille du mot de passe saisi
 */
function verifier_mot_de_passe(taille_mot_de_passe) {
    $('#' + id_aide_mot_de_passe_erreur).hide();
    $('#' + id_aide_mot_de_passe_succes).hide();
    $('#' + id_aide_mot_de_passe_vide).hide();
    if(taille_mot_de_passe === 0) {
        $('#' + id_aide_mot_de_passe_vide).show();
        verouiller_bouton_connexion();
    } else {
        $('#' + id_aide_mot_de_passe_succes).show();
        deverouiller_bouton_connexion();
    }
    $('#' + id_aide_mot_de_passe).fadeIn('slow');
}

/**
 * Vérifier que l'utilisateur a bien saisi un nom d'utilisateur existant en base
 * @param nom_utilisateur - nom d'utilisateur saisi
 */
function verifier_nom_utilisateur(nom_utilisateur) {
    $('#' + id_aide_nom_utilisateur_succes).hide();
    $('#' + id_aide_nom_utilisateur_erreur).hide();
    $('#' + id_aide_nom_utilisateur_vide).hide();
    if (!nom_utilisateur) {
        $('#' + id_aide_nom_utilisateur_vide).show();
        verouiller_bouton_connexion();
    } else {
        // https://firebase.google.com/docs/database/web/read-and-write?hl=fr#web-version-9_2
        let email_utilisateur_cherche = ref(base_de_donnees, 'users/' + nom_utilisateur + '/email');
        onValue(email_utilisateur_cherche, (email_trouve) => {
            // Récupération du contenu
            let email = email_trouve.val();
            if (!email) {
                $('#' + id_aide_nom_utilisateur_erreur).show();
                verouiller_bouton_connexion();
            } else {
                $('#' + id_aide_nom_utilisateur_succes).show();
                deverouiller_bouton_connexion();
            }
        });
    }
    $('#' + id_aide_nom_utilisateur).fadeIn('slow');
}

/**
 * Empêcher l'utilisateur de cliquer sur la bouton de connexion
 */
function verouiller_bouton_connexion() {
    $('#' + id_div_se_connecter).show();
    $('#' + id_div_connexion_en_cours).hide();
    $('#' + id_bouton_connexion).prop("disabled", "disabled");
}
// On attend que le document HTML soit chargé sur le navigateur du client avant d'effecteur les opérations souhaitées.
$(document).ready(function () {
    $('#' + id_aide_nom_utilisateur).hide();
    $('#' + id_aide_mot_de_passe).hide();
    $('#' + id_div_connexion_en_cours).hide();
    verouiller_bouton_connexion();

    $('#' + id_champ_nom_utilisateur).focusout(function() {
        $('#' + id_aide_nom_utilisateur).hide();
        verifier_nom_utilisateur($(this).val());
    });

    $('#' + id_champ_mot_de_passe).focusout(function() {
        $('#' + id_aide_mot_de_passe).hide();
        verifier_mot_de_passe($(this).val().length);
    });

    $('#' + id_bouton_connexion).click(function () {
        $('#' + id_div_se_connecter).hide();
        $('#' + id_div_connexion_en_cours).show();
        connexion_utilisateur();
    });
});
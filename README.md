# PokéDraw

## Auteur

**Morgan MINBIELLE ([@GerlariMin](https://github.com/GerlariMin))**

## Table des matières

[Description du projet](#description-du-projet)  
[Langages utilisés](#langages-utilisés)  
[Frameworks utilisés](#frameworks-utilisés)  
[API](#api)  
[Développement](#développement)  
[Changelog](#changelog)
[Site Web](#site-web)

## Description du projet

> La page Web permet d'avoir un aperçu du design authentique des Pokémons de la première génération, avec quelques informations basiques sur ceux-ci.
> En complément, le site propose de tirer au sort un item, afin d'accompagner le Pokémon.
>
> Le but de tout cela: dessiner le Pokémon souhaité avec l'item tiré au sort!

## Langages utilisés

- HTML 5
- JavaScript (avec JQuery)

## Frameworks utilisés

- [Bootstrap 4.3.1](https://getbootstrap.com/docs/4.3/getting-started/introduction/)
- [Firebase 6.0.2](https://firebase.google.com/docs)
- [Font Awesome 6.5.2](https://fontawesome.com/v6/search)
- [JQuery 3.3.1](https://api.jquery.com/category/deprecated/deprecated-3.3/)
- [Popper 1.14](https://popper.js.org/docs/v1/)

## API

- ~~[PokéAPI](https://pokeapi.co/docs/v2) pour la génération des cartes de présentation des Pokémons.~~
- [Tyradex](https://tyradex.vercel.app/docs) en remplacement de [PokéAPI](https://pokeapi.co/docs/v2), pour la génération des cartes de présentation des Pokémons.
- [Unsplash](https://unsplash.com/documentation) pour la génération d'image pour un item aléatoire à dessiner en supplément.

## Développement

### v1
- [x] Afficher les 151 premiers Pokémons (1ère génération)
- [x] Proposer de tirer au sort un accessoire
- [x] Choisir le nombre de Pokémons à visualiser
- [ ] ~~Module de connexion~~ (abandonné)
- [ ] ~~Sauvegarder le tirage~~ (abandonné)

### v2
- [x] Choix de la génération à afficher dans les cartes de référence
- [x] Changement d'API pour les Pokémons, pour proposer les informations en français
- [x] Utilisation d'une API pour les objets tiés au sort
- [ ] Indicateur de chargement, en cas de process long
- [ ] Permettre le délenchement d'un chronomètre
- [ ] Permettre le paramétrage d'un chronomètre (facultatif)
- [ ] Mettre à disposition un canva pour dessiner directement sur la page (facultatif)

## [Changelog](https://github.com/GerlariMin/PokeDraw/blob/main/CHANGELOG.md)

[Changelog consultable ici](https://github.com/GerlariMin/PokeDraw/blob/main/CHANGELOG.md).

## [Site Web](https://gerlarimin.github.io/PokeDraw/index.html)

Vous pouvez consulter le [site Web ici](https://gerlarimin.github.io/PokeDraw/index.html).
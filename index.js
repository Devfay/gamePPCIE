const choices = document.querySelectorAll('.choice');
const resultDiv = document.getElementById('result');
const playerScoreElement = document.getElementById('player-score');
const botScoreElement = document.getElementById('bot-score');
const resetButton = document.getElementById('reset');

let playerScore = 0;
let botScore = 0;

// Fonction pour choisir une action aléatoire pour le bot
function botChoice() {
    const options = ['pierre', 'papier', 'ciseaux', 'invisibilite', 'explosion'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

// Fonction pour déterminer le gagnant entre le joueur et le bot
function determineWinner(player, bot) {
    if (player === bot) return 'Égalité !';

    // Logique classique de Pierre-Papier-Ciseaux
    if (player === 'pierre' && bot === 'ciseaux' || player === 'papier' && bot === 'pierre' || player === 'ciseaux' && bot === 'papier') {
        return 'Tu as gagné !';
    } else if (bot === 'pierre' && player === 'ciseaux' || bot === 'papier' && player === 'pierre' || bot === 'ciseaux' && player === 'papier') {
        return 'Le bot a gagné !';
    }

    // Logique des super-pouvoirs
    if (player === 'invisibilite') {
        if (bot === 'explosion') return 'Le bot a gagné ! Explosion annule invisibilité.';
        return 'Tu as gagné avec Invisibilité !';
    }

    if (player === 'explosion') {
        if (bot === 'invisibilite') return 'Le bot a gagné ! Explosion annule invisibilité.';
        return 'Tu as gagné avec Explosion !';
    }

    return 'Le bot a gagné !';
}

// Gestion de l'événement de sélection du joueur
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const playerChoice = choice.dataset.choice;
        const botChoiceSelected = botChoice();
        const result = determineWinner(playerChoice, botChoiceSelected);

        // Affichage du résultat
        resultDiv.textContent = `Tu as choisi : ${playerChoice} | Le bot a choisi : ${botChoiceSelected} | ${result}`;
        
        // Mise à jour des scores
        if (result.includes('Tu as gagné')) {
            playerScore++;
        } else if (result.includes('Le bot a gagné')) {
            botScore++;
        }

        playerScoreElement.textContent = playerScore;
        botScoreElement.textContent = botScore;

        // Affichage du bouton reset quand un tour est terminé
        resetButton.style.display = 'block';
    });
});

// Réinitialiser le jeu
resetButton.addEventListener('click', () => {
    playerScore = 0;
    botScore = 0;
    playerScoreElement.textContent = playerScore;
    botScoreElement.textContent = botScore;
    resultDiv.textContent = '';
    resetButton.style.display = 'none';
});

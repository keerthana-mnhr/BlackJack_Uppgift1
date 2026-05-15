
class BlackjackGame {
    constructor() {
        this.deck = [];
        this.playerCards = [];
        this.dealerCards = [];
        this.gameOver = false;
        this.initializeDeck();
    }

    
    initializeDeck() {
        this.deck = [];
        for (let i = 1; i <= 52; i++) {
            this.deck.push(i);
        }
        this.shuffleDeck();
    }

    
    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    
    drawCard() {
        if (this.deck.length === 0) {
            this.initializeDeck();
        }
        return this.deck.pop();
    }

    
    getCardValue(cardNumber) {
        const rankOrder = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
        const rankIndex = Math.floor((cardNumber - 1) / 4);
        const rank = rankOrder[rankIndex];

        if (rank === 'A') return 11;
        if (rank === 'K' || rank === 'Q' || rank === 'J' || rank === '10') return 10;
        return parseInt(rank, 10);
    }

    
    calculateScore(hand) {
        let score = 0;
        let aces = 0;

        for (let card of hand) {
            const value = this.getCardValue(card);
            if (value === 11) {
                aces++;
                score += 11;
            } else {
                score += value;
            }
        }

       
        while (score > 21 && aces > 0) {
            score -= 10;
            aces--;
        }

        return score;
    }

    
    startGame() {
        this.initializeDeck();
        this.playerCards = [];
        this.dealerCards = [];
        this.gameOver = false;

        
        this.playerCards.push(this.drawCard());
        this.playerCards.push(this.drawCard());
        
        this.dealerCards.push(this.drawCard());
        this.dealerCards.push(this.drawCard());

        return this.getGameState();
    }

    
    playerHit() {
        if (this.gameOver) return null;

        this.playerCards.push(this.drawCard());
        const playerScore = this.calculateScore(this.playerCards);

        if (playerScore > 21) {
            this.gameOver = true;
            return { gameOver: true, result: 'BUST', message: 'Player busts! Dealer wins!' };
        }

        return this.getGameState();
    }

   
    playerStand() {
        if (this.gameOver) return null;

        
        while (this.calculateScore(this.dealerCards) < 17) {
            this.dealerCards.push(this.drawCard());
        }

        const playerScore = this.calculateScore(this.playerCards);
        const dealerScore = this.calculateScore(this.dealerCards);

        this.gameOver = true;

        
        if (dealerScore > 21) {
            return {
                gameOver: true,
                result: 'WIN',
                message: `Dealer busts! Player wins! (Player: ${playerScore}, Dealer: ${dealerScore})`,
                playerScore,
                dealerScore
            };
        } else if (playerScore > dealerScore) {
            return {
                gameOver: true,
                result: 'WIN',
                message: `Player wins! (Player: ${playerScore}, Dealer: ${dealerScore})`,
                playerScore,
                dealerScore
            };
        } else if (dealerScore > playerScore) {
            return {
                gameOver: true,
                result: 'LOSE',
                message: `Dealer wins! (Dealer: ${dealerScore}, Player: ${playerScore})`,
                playerScore,
                dealerScore
            };
        } else {
            return {
                gameOver: true,
                result: 'TIE',
                message: `It's a tie! (Both: ${playerScore})`,
                playerScore,
                dealerScore
            };
        }
    }

    
    getGameState() {
        return {
            playerCards: this.playerCards,
            dealerCards: this.dealerCards,
            playerScore: this.calculateScore(this.playerCards),
            dealerScore: this.calculateScore(this.dealerCards),
            gameOver: this.gameOver
        };
    }
}


let game = new BlackjackGame();

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('currentUser')) || null;
    } catch (e) {
        return null;
    }
}

function saveCurrentUser(user) {
    if (!user) return;
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function initUserDisplay() {
    const user = getCurrentUser();
    const display = document.getElementById('user-display');

    if (!display || !user || !user.username) return;

    const scorePart = user.score !== undefined && user.score !== null ? ` (${user.score})` : '';
    display.textContent = `${user.username}${scorePart}`;
}

function logoutUser() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function updateLoggedInUserScore(score) {
    const user = getCurrentUser();
    if (!user || !user.username) return;

    user.score = score;
    saveCurrentUser(user);

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const idx = users.findIndex(u => u.username === user.username);
    if (idx !== -1) {
        users[idx] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }
}


function displayPlayerCards() {
    const container = document.getElementById('player-cards');
    container.innerHTML = '';
    
    for (let card of game.playerCards) {
        const img = document.createElement('img');
        img.src = `../images/${card}.png`;
        img.alt = `Card ${card}`;
        img.className = 'card-image';
        container.appendChild(img);
    }
    
    const score = game.calculateScore(game.playerCards);
    document.getElementById('player-score').textContent = `(Score: ${score})`;
    updateLoggedInUserScore(score);
}


function displayDealerCards() {
    const container = document.getElementById('dealer-cards');
    container.innerHTML = '';
    
    for (let card of game.dealerCards) {
        const img = document.createElement('img');
        img.src = `../images/${card}.png`;
        img.alt = `Card ${card}`;
        img.className = 'card-image';
        container.appendChild(img);
    }
    
    document.getElementById('dealer-score').textContent = `(Score: ${game.calculateScore(game.dealerCards)})`;
}


function startNewGame() {
    game.startGame();
    displayPlayerCards();
    displayDealerCards();
    
    document.getElementById('hit-btn').disabled = false;
    document.getElementById('stand-btn').disabled = false;
    setGameMessage('');
}

function setGameMessage(message, type = '') {
    const messageEl = document.getElementById('result-message');
    if (!messageEl) return;

    messageEl.innerText = message;
    messageEl.className = 'result-message';
    if (message) {
        messageEl.classList.add('show');
        if (type) {
            messageEl.classList.add(type);
        }
    }
}

function playerHit() {
    const result = game.playerHit();
    
    displayPlayerCards();
    displayDealerCards();

    if (result && result.gameOver) {
        endGame(result);
    }
}


function playerStand() {
    const result = game.playerStand();
    
    displayPlayerCards();
    displayDealerCards();

    if (result) {
        endGame(result);
    }
}

window.addEventListener('DOMContentLoaded', initUserDisplay);

function endGame(result) {
    document.getElementById('hit-btn').disabled = true;
    document.getElementById('stand-btn').disabled = true;
    
    let type = '';
    if (result.result === 'WIN') {
        type = 'win';
    } else if (result.result === 'LOSE' || result.result === 'BUST') {
        type = 'lose';
    } else if (result.result === 'TIE') {
        type = 'tie';
    }

    setGameMessage(result.message, type);
}

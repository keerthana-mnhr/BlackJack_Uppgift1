# Blackjack Game

## Overview
This project is a simple Blackjack card game where players can create an account, log in, and play against the dealer. User information and the most recent game score are stored using local storage.

---

## User Registration and Login

1. Run the application.
2. New users can create an account by clicking the **Create Account** link.
3. After successfully registering, log in using the created credentials.
4. Registered users and their latest game scores are saved in the browser's local storage.
5. Once login is successful, the user is redirected to the **Game Page**.

---

## How to Play

1. Click the **Start** button to begin the game.
2. Press **Hit** to draw an additional card.
3. Press **Stand** if you are satisfied with your current score.  
   Once the player stands, the dealer will begin playing automatically.

---

## Game Rules

- The objective of the game is to achieve the highest score possible without exceeding **21**.
- If the **dealer's score exceeds 21**, the **player wins**.
- If the **player's score exceeds 21**, the **dealer wins**.
- If both the player and dealer have the same score, the match ends in a **tie**.

### Main Rule
The winner is the one with the highest total score that does not go above **21**.  
Any score higher than **21** results in an automatic loss.



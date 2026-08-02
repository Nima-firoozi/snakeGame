# SnakeGame
<div dir="ltr" align="left">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Vanilla%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS">
</div>


## ONLINE DEMO
[![ONLINE-DEMO](https://img.shields.io/badge/online-Demo-green)](https://nima-firoozi.github.io/snakeGame/)
#
Snake Game

A fully functional browser-based Snake game built with vanilla HTML, CSS, and JavaScript — no frameworks, no external libraries.

Overview

This project implements the classic Snake game logic from scratch: grid rendering, keyboard-driven movement, collision detection, food spawning, score tracking, and win/lose states. The entire game runs on a 20×20 grid (400 cells), and the goal is to grow the snake to fill the entire board.

Why this project

I built this to practice translating a real-world problem into an algorithmic model. The core challenge was representing a 2D grid using a flat, one-dimensional numbering system (1–400), and figuring out the math needed to move correctly in every direction — including detecting when the snake was about to cross the left or right edge of the board using modulo arithmetic on the grid width. This kind of index-to-coordinate mapping is a common pattern in grid-based problems, and implementing it without a library forced me to actually understand the relationship between a flat index and its row/column position.

Features
Fully playable with arrow-key controls
Dynamic snake growth on eating food
Collision detection (walls and self-collision)
Live score/progress tracking
Win condition when the snake fills the board
Game over screen with Restart and Exit options
Tech
HTML5 / CSS3 (Flexbox-based grid layout)
Vanilla JavaScript (DOM manipulation, no state library)

# README
## 2-11
[Live Site](https://ziluoh.github.io/2-11/)
![Screenshot](https://github.com/ZiluoH/2-11/blob/master/img/screencapture.png)

## About
2-11 is a game inspired by 2048 created by Gabriele Cirulli. The game's objective is to slide numbered tiles on a grid to combine them to create a tile with the number 2048. However, one can continue to play the game after reaching the goal, creating tiles with larger numbers.

## Technologies
HTML, Javascript, CSS

## Features
### High Score
Local high scores are saved in a score object. This score object will also try to write a cookie to the browser in order to save local high scores between sessions. The score object will check if there is a cookie with scores already present, and if there is it will use those saved high scores.

### Game Over
Implement a game over check if there is any available move after player's move. Render game over modal if it is game over and allow player to restart the game.

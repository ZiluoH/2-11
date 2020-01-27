JS Project Proposal: 2^11

Background

2^11 is a game that player move all blocks in the board in the same direction. Merge number to create bigger numbers and repeat to avoid gridlock. The formula may be straightforward, but 2^11 simplicity belies an endlessly gratifying and reward thoughtful strategy move. Here is the basic rules:

1) Move blocks with four arrow keys.
2) Blocks move as far as possible in the chosen direction, until they hit the edge of board.
3) After everymove, a new block with base number will generate at the empty space on the board.
4) If two block with the same number collide while moving, they will merge into a block with the total of these two        blocks. The resulting block can not merge with another block in the same turn.
5) If a move causes three consecutive blocks of the same number to move together, only the two blocks farthest along       the moving direction will merge.
6) If all four blocks in a row or column with the same number, a move will merge the first two and last two blocks.

Functionality & MVP

Basic rule and control info shown on the side
Start and restart a game.
Move all blocks toward the same direction as play's choice
Correctly merge blocks base on the rules
Has a scoreboard show play's score
Special message will shown if player win the game
A production README

Architecture and Technologies
Pure JS CSS HTML

Wireframes


Implementation Timeline
Day 1: Write the full Proposal. Setup all necessary file. 
Day 2: Code out the game move and game logic.
Day 3: JS
Day 4: CSS
Day 5: CSS


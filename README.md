# Wordle with input
 A wordle rendition that the users can input their own words.
### Video Demo:
https://studio.youtube.com/video/xpaycb7e-Fo/edit
### Description:
The project I worked on is a wordle game in which the player can input custom words. Wordle has become hugely popular recently, and I thought having a version in which players can import their own words would be an excellent addition. I did use Ania Kubow's video (https://www.youtube.com/watch?v=mpby4HiElek&t=3990s) as a reference and added my own concepts and ideas to this project. I could even see teachers using this app in classrooms for spelling and vocabulary practice. The three main aspects of creating this game were finding ways for players to input and display their words, creating the engine of the game, and the input and validation of the game. Enjoy!
## Word Input and Display
Players input the words through the text input and submit them into an array by pressing the submit button. The way this works is by pulling the value from the text input and pushing it into an empty array. Once the user submits their words, a bulleted list will display the words they wrote. Users can delete the words by clicking on the bulleted word. Once plays are ready to play, all they have to do is hit the play button which will pull a random index of the array for the word of the game.
## Game Engine
The engine of the game consists of creating multiple elements and appending them into the HTML document. Most of the elements that are appended are arrays that have been pushed into a flex display to contain them.
## Game Input and Validation
The logic of the game is dependent on the current row and tile the player is on. Once the player enters all of the letters they wish to guess, the join method is called to add the arrays into one string. If the letter is in the word but in the wrong place, a function called to give that current row and current tile a class that will apply animation and changes the background color of the key. The same logic is applied if the word is correct or if the letter is not in the word.
## What I Learned
The main things I learned from this project were all of the different types of Functions that can be called to affect the DOM. Overall this project was really fun, and I have already created a few different variants. I am excited to keep tuning up this game and hope to place it on my portfolio one day! CS50 has been a great resource for me and I hope to take more classes from them.
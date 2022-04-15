let word = [];
//add words to an array
let addedArray = [];

//function to get random word of an array
let randomArr = (arr) => {
  //get random index
  const randomIndex = Math.floor(Math.random() * arr.length);
  //get random item
  const item = arr[randomIndex];
  return item;
};

// console.log(word);

//add words to an array

const wordContainer = document.getElementById('word-container');
wordContainer.addEventListener('click', (event) => {
  if (wordContainer.textContent === '') {
    return;
  } else {
    //grabbing the text content of the event
    let wordToRemove = event.target.textContent;
    //filter through the items in the array and delete the word that was clicked
    addedArray = addedArray.filter((el) => el !== wordToRemove);
    console.log(`${wordToRemove} was deleted`);
    //clearing container
    wordContainer.textContent = '';
    addedArray.map((word) => {
      //creating a list element of the word that has been typed by the user
      let li = document.createElement('li');
      li.textContent = word;
      wordContainer.appendChild(li);
    });
  }
});

//function of adding words to the empty array
const addTo = () => {
  //simple user validation
  if (userInput.value.length < 5) {
    return alert('Must be a five letter word.');
  } else {
    //display the input when users hit the submit button
    wordContainer.style.display = 'inline-block';

    console.log('clicked');
    //pushing the value of the users input into the arrow and uppercasing it
    addedArray.push(userInput.value);
    addedArray = addedArray.map((word) => word.toUpperCase());
    console.log(addedArray);
    //last item of the array sine we are pushing
    let li = document.createElement('li');
    li.textContent = addedArray[addedArray.length - 1];
    wordContainer.appendChild(li);
    userInput.value = '';
  }
};
//creating the userinput
const userInput = document.getElementById('userInput');
const submit = document.getElementById('submit');
//click event when the submit button is clicked
submit.addEventListener('click', () => addTo());

//Play button and resets the board
const play = () => {
  //setting the display of the list of words to none
  wordContainer.style.display = 'none';
  console.log(`These are the items you added ${addedArray}`);
  //when play function runs it calls the randomArr to pick a random index from the array
  word = randomArr(addedArray);
  console.log(word);

  const tile = document.querySelectorAll('.tile');
  const keyboard = document.querySelectorAll('.keyboard');
    //when the play is reset, it removes the color from the elements with the class names that give it the color
  tile.forEach((tile) =>
    tile.classList.remove(
      'green-overlay',
      'yellow-overlay',
      'grey-overlay',
      'flip'
    )
  );
  tile.forEach((tile) => (tile.textContent = ''));
  currentRow = 0;
  currentTile = 0;
  keyboard.forEach((key) =>
    key.classList.remove('green-overlay', 'yellow-overlay', 'grey-overlay')
  );

};

const playButton = document.getElementById('playButton');
//click event for play
playButton.addEventListener('click', () => play());

//selecting the tile container div
const tileDisplay = document.querySelector('.tile-container');
//selecting the key container div
const keyboard = document.querySelector('.key-container');
//selecting the msg container div
const messageDisplay = document.querySelector('.msg-container');

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

//array of keys for the keyboard
const keys = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  '<<',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'ENTER',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
];
const emptyRows = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];
let guessRows = emptyRows;
//look at each guessRows
guessRows.forEach((guessRow, guessRowIndex) => {
  //create a div for each row
  const row = document.createElement('div');
  //setting the ID
  row.setAttribute('id', 'guessRow-' + guessRowIndex);
  //look at each tile
  guessRow.forEach((guess, guessIndex) => {
    //create a div for each tile
    const tileElement = document.createElement('div');
    //setting the id of the tiles
    tileElement.setAttribute(
      'id',
      'guessRow-' + guessRowIndex + '-tile-' + guessIndex
    );
    //giving the tile a class
    tileElement.classList.add('tile');
    //creating the row element in HTML
    row.append(tileElement);
  });
  //creating the tiles in HTML
  tileDisplay.append(row);
});

//creating a key button for each key that can be presssed
keys.forEach((key) => {
  //for each key create a button with the text of the key
  const button = document.createElement('button');
  button.textContent = key;

  //giving each key an id of its letter value
  button.setAttribute('id', key);
  button.classList.add('keyboard');
  //an event listener for clicks that runs the click handle
  button.addEventListener('click', () => handleClick(key));
  //Creating the keyboard
  keyboard.append(button);
});

const handleClick = (letter) => {
  //logging which key is being clicked
  console.log('clicked', letter);
  //when << is pressed run the delete letter
  if (letter === '<<') {
    deleteLetter();
    console.log('guessRows', guessRows);
    return;
  }
  if (letter === 'ENTER') {
      //check rows when ENTER is pressed
    checkRow();
    console.log('guessRows', guessRows);
    return;
  }
  addLetter(letter);
};

//conditions of adding letters to the tiles
const addLetter = (letter) => {
  if (currentTile < 5 && currentRow < 6) {
    const tile = document.getElementById(
      'guessRow-' + currentRow + '-tile-' + currentTile
    );
    //inserting the letter in the tile when pressed depending on the row and tile
    tile.textContent = letter;
    guessRows[currentRow][currentTile] = letter;
    tile.setAttribute('data', letter);
    //incriment up a tile when a letter is pressed
    currentTile++;
    console.log('guessRows', guessRows);
  }
};
const deleteLetter = (letter) => {
    //if tile is bigger than zero remove from the array
  if (currentTile > 0) {
    currentTile--;
    const tile = document.getElementById(
      'guessRow-' + currentRow + '-tile-' + currentTile
    );
    tile.textContent = '';
    guessRows[currentRow][currentTile] = '';
    tile.setAttribute('data', '');
  }
};

const checkRow = () => {
  const guess = guessRows[currentRow].join('');

  if (currentTile > 4) {
    console.log(`Guess is ${guess}, worlde is ${word}`);
    //animation function
    flipTile();
    //win condition
    if (word === guess) {
      showMessage('Noice!');
      isGameOver = true;
      return;
    } else {
      //if you are on your last row and get the word wrong. GAME OVER
      if (currentRow >= 5) {
        isGameOver = true;
        showMessage('Game Over');
        return;
      }
      // If the current row is less that five incriment over to the next row
      if (currentRow < 5) {
        currentRow++;
        //set current tile back to 0
        currentTile = 0;
      }
    }
  }
};

//showing the win message or lose message
const showMessage = (message) => {
    //create a new p element and display message
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  messageDisplay.append(messageElement);
  setTimeout(() => messageDisplay.removeChild(messageElement), 1000);
};

const addColorToKey = (keyLetter, color) => {
  const key = document.getElementById(keyLetter);
  key.classList.add(color);
};

//animation function
const flipTile = () => {
  const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes;
  let checkWord = word;
  const guess = [];

  rowTiles.forEach((tile) => {
      //if guess it wrong make color grey
    guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay' });
  });
//if letter is in the guess but wrong spot change color to yellow
  guess.forEach((guess) => {
    if (checkWord.includes(guess.letter)) {
      guess.color = 'yellow-overlay';
      checkWord = checkWord.replace(guess.letter, '');
    }
  });

  guess.forEach((guess, index) => {
      //if letter is in right spot, display green
    if (guess.letter == word[index]) {
      guess.color = 'green-overlay';
      checkWord = checkWord.replace(guess.letter, '');
    }
  });

  rowTiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add('flip');
      tile.classList.add(guess[index].color);
      addColorToKey(guess[index].letter, guess[index].color);
    }, 500 * index);
  });
};

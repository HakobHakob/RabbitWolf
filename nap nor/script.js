//Get the selected option value and create
const imgDatas = {
  rabbit: { id: 1, name: 'nap', src: 'img/nap.jpg', count: 1 },
  wolf: {
    id: 2,
    name: 'gel',
    src: 'img/wolf.jpg',
  },
  home: {
    id: 3,
    name: 'home',
    src: 'img/home.jpg',
    count: 1,
  },
  fence: {
    id: 4,
    name: 'fence',
    src: 'img/fence.jpg',
  },
};

let FREE_CELL = 0;
const RABBIT = imgDatas.rabbit.name;
const WOLF = imgDatas.wolf.name;
const HOME = imgDatas.home.name;
const FENCE = imgDatas.fence.name;

function start() {
  const value = selectValue();
  const createMass = createEmptyMass(value);

  console.log(createMass);

  imgDatas.wolf.count = Math.ceil((60 * value) / 100);
  imgDatas.fence.count = Math.ceil((40 * value) / 100);

  getRandomPosition(createMass);

  Object.values(imgDatas).map((elemnt) => {
    setCharacters(createMass, elemnt.name, elemnt.count);
  });

  moveRabbit(createMass, RABBIT);

  wolvesCoord(createMass, WOLF);
}

function selectValue() {
  const select = document.getElementById('gameSelect');
  const option = select.options[select.selectedIndex];

  const value = parseInt(
    (document.querySelectorAll('.selectOption').value = option.value)
  );

  return value;
}

function createEmptyMass(gameBoardSize) {
  const gameBoard = new Array(gameBoardSize)
    .fill(FREE_CELL)
    .map(() => new Array(gameBoardSize).fill(FREE_CELL));

  return gameBoard;
}

function getRandomPosition(gamePlaceArr) {
  let x = Math.floor(Math.random() * gamePlaceArr.length);
  let y = Math.floor(Math.random() * gamePlaceArr.length);

  if (gamePlaceArr[x][y] === FREE_CELL) {
    return [x, y];
  } else {
    return getRandomPosition(gamePlaceArr);
  }
}

function setHeroesAtRandomPosition(gamePlaceArr, gameHero) {
  const [x, y] = getRandomPosition(gamePlaceArr);

  gamePlaceArr[x][y] = gameHero;
}

function setCharacters(gamePlaceArr, character, count) {
  for (let i = 0; i < count; i++) {
    setHeroesAtRandomPosition(gamePlaceArr, character);
  }
}

function findCordOfCharacter(gamePlaceArr, character) {
  const findInGameplace = function (accumulator, row, x) {
    row.forEach((element, y) => {
      if (element === character) {
        accumulator.push([x, y]);
      }
    });
    return accumulator;
  };
  return gamePlaceArr.reduce(findInGameplace, []);
}

function keyDownLeft(gamePlaceArr, character) {
  const rabbitCord = findCordOfCharacter(gamePlaceArr, character)[0];

  const [x, y] = rabbitCord;

  const newY = (y - 1) % gamePlaceArr.length;

  console.log(newY, 'new y');

  if (gamePlaceArr[x][newY] === FREE_CELL) {
    gamePlaceArr[x][y] = FREE_CELL;
    gamePlaceArr[x][newY] = character;
  } else if (gamePlaceArr[x][newY] === WOLF) {
    alert('GAME OVER');
  } else if (gamePlaceArr[x][newY] === HOME) {
    alert('You Won!');
  } else if (newY < FREE_CELL) {
    const newY = gamePlaceArr.length - 1;

    if (gamePlaceArr[x][newY] === FREE_CELL) {
      gamePlaceArr[x][y] = FREE_CELL;
      gamePlaceArr[x][newY] = character;
    } else if (gamePlaceArr[x][newY] === WOLF) {
      alert('GAME OVER');
    } else if (gamePlaceArr[x][newY] === HOME) {
      alert('You Won!');
    }
  }
}

function keyDownRight(gamePlaceArr, character) {
  const rabbitCord = findCordOfCharacter(gamePlaceArr, character)[0];

  const [x, y] = rabbitCord;

  const newY = (y + 1) % gamePlaceArr.length;

  if (gamePlaceArr[x][newY] === FREE_CELL) {
    gamePlaceArr[x][y] = FREE_CELL;
    gamePlaceArr[x][newY] = character;
  } else if (gamePlaceArr[x][newY] === WOLF) {
    alert('GAME OVER');
  } else if (gamePlaceArr[x][newY] === HOME) {
    alert('You Won!');
  } else if (newY === FREE_CELL) {
    if (gamePlaceArr[x][newY] === FREE_CELL) {
      gamePlaceArr[x][y] = FREE_CELL;
      gamePlaceArr[x][newY] = character;
    } else if (gamePlaceArr[x][newY] === WOLF) {
      alert('GAME OVER');
    } else if (gamePlaceArr[x][newY] === HOME) {
      alert('You Won!');
    }
  }
}

function keyDownDown(gamePlaceArr, character) {
  const rabbitCord = findCordOfCharacter(gamePlaceArr, character)[0];

  const [x, y] = rabbitCord;

  const newX = (x + 1) % gamePlaceArr.length;

  if (gamePlaceArr[newX][y] === FREE_CELL) {
    gamePlaceArr[x][y] = FREE_CELL;
    gamePlaceArr[newX][y] = character;
  } else if (gamePlaceArr[newX][y] === WOLF) {
    alert('GAME OVER');
  } else if (gamePlaceArr[newX][y] === HOME) {
    alert('You Won!');
  } else if (newX === FREE_CELL) {
    if (gamePlaceArr[newX][y] === FREE_CELL) {
      gamePlaceArr[x][y] = FREE_CELL;
      gamePlaceArr[newX][y] = character;
    } else if (gamePlaceArr[newX][y] === WOLF) {
      alert('GAME OVER');
    } else if (gamePlaceArr[newX][y] === HOME) {
      alert('You Won!');
    }
  }
}

function keyDownUp(gamePlaceArr, character) {
  const rabbitCord = findCordOfCharacter(gamePlaceArr, character)[0];

  const [x, y] = rabbitCord;
  const newX = (x - 1)  % gamePlaceArr.length;

  if (newX >= FREE_CELL && gamePlaceArr[newX][y] === FREE_CELL) {
    gamePlaceArr[x][y] = FREE_CELL;
    gamePlaceArr[newX][y] = character;
  } else if (newX >= FREE_CELL && gamePlaceArr[newX][y] === WOLF) {
    alert('GAME OVER');
  } else if (newX >= FREE_CELL && gamePlaceArr[newX][y] === HOME) {
    alert('You Won!');
  } else if (newX < FREE_CELL) {
    const newX = gamePlaceArr.length - 1;

    if (gamePlaceArr[newX][y] === FREE_CELL) {
      gamePlaceArr[x][y] = FREE_CELL;
      gamePlaceArr[newX][y] = character;
    } else if (gamePlaceArr[newX][y] === WOLF) {
      alert('GAME OVER');
    } else if (gamePlaceArr[newX][y] === HOME) {
      alert('You Won!');
    }
  }
}

function moveRabbit(gamePlaceArr, character) {
  window.onkeydown = () => {
    if (event.key === 'ArrowLeft') {
      keyDownLeft(gamePlaceArr, character);
      console.log(gamePlaceArr);
    } else if (event.key === 'ArrowRight') {
      keyDownRight(gamePlaceArr, character);
      console.log(gamePlaceArr);
    } else if (event.key === 'ArrowDown') {
      keyDownDown(gamePlaceArr, character);
      console.log(gamePlaceArr);
    } else if (event.key === 'ArrowUp') {
      keyDownUp(gamePlaceArr, character);
      console.log(gamePlaceArr);
    }
  };
}



function wolvesCoord(gamePlaceArr, character) {
     const some = firstWolfAround(gamePlaceArr, character);
     console.log(some,'my')
}

function firstWolfAround(gamePlaceArr, character){
  const firstWolfCord= findCordOfCharacter(gamePlaceArr, character)[0];

  const [x,y] = firstWolfCord;

  const newXToUp  = (x - 1)  % gamePlaceArr.length;

  const emptyBoxUp = gamePlaceArr[newXToUp][y];

  if (newXToUp >= FREE_CELL && emptyBoxUp === FREE_CELL && emptyBoxUp === FENCE){
    return gamePlaceArr[newXToUp][y];
  } 

  

}


// const wolfCoordinateFirst =  wolvesArr.map((coordinates) => {

//   const [x, y] = wolvesArr;

//   console.log([x,y],'x,y');

//   return {
//     ArrowLeft: ([newX, newY] = [x, y - 1]), //left
//     ArrowUp: ([newX, newY] = [x - 1, y]), //up
//     ArrowRight: ([newX, newY] = [x, y + 1]), //right
//     ArrowDown: ([newX, newY] = [x + 1, y]), //down
//   }[event.key];
// });

// console.log(wolfCoordinateFirst, 'new');

// wolvesArr.forEach((element) =>  [x,y] = element);

// console.log([x,y],'my');

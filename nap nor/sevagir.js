//Get the selected option value and create
const object = {
    rabbit: {
      id: 1,
      name: 'nap',
      src: 'img/nap.jpg',
    },
    wolf: {
      id: 2,
      name: 'gel',
      src: 'img/wolf.jpg',
    },
    home: {
      id: 3,
      name: 'home',
      src: 'img/home.jpg',
    },
    fence: {
      id: 4,
      name: 'fence',
      src: 'img/fence.jpg',
    },
  };
  
  const FREE_CELL = 0;
  
  function start() {
    clearDivs();
    const value = selectValue();
    const createMass = createEmptyMass(value);
  
    createDivs(createMass, value);
  
    wolfCount(value);
    fenceCount(value);
  
    setCharactersInRandomPosition(createMass, object.rabbit.name);
    setCharactersInRandomPosition(createMass, object.wolf.name);
    setCharactersInRandomPosition(createMass, object.fence.name);
    setCharactersInRandomPosition(createMass, object.home.name);
  
    setRabbit() ;
    setWolf();
    setFence();
    setHome();
  
  
  
    // createNap(value);
    // createHome(value);
  }
  
  function createDivs(emptyMass, matrixSize) {
    emptyMass.map((item) => {
      item.map((item) => {
        createPlace(matrixSize);
      });
    });
  }

  function clearDivs() {
    const place = document.getElementById('place');
    place.innerHTML = '';
  }
  
  function createPlace(matrixSize) {
    const place = document.getElementById('place');
  
    if (matrixSize == 5) {
      place.style.width = '350px';
    }
  
    if (matrixSize == 7) {
      place.style.width = '450px';
    }
  
    if (matrixSize == 10) {
      place.style.width = '680px';
    }
  
    const myDiv = document.createElement('div');
  
    place.append(myDiv);
  }
  
  function selectValue() {
    const select = document.getElementById('gameSelect');
    const option = select.options[select.selectedIndex];
  
    const value = parseInt(
      (document.querySelectorAll('.selectOption').value = option.value)
    );
  
    return value;
  }
  
  function createEmptyMass(matrixSize) {
    const matrixValue = 0;
  
    const matrix = new Array(matrixSize)
      .fill(matrixValue)
      .map(() => new Array(matrixSize).fill(matrixValue));
  
    return matrix;
  }
  
  
  
  function wolfCount(matrixSize) {
    const wolfCount = Math.ceil((60 * matrixSize) / 100);
  }
  
  function fenceCount(matrixSize) {
    const fenceCount = Math.ceil((40 * matrixSize) / 100);
  }
  
  function setCharactersInRandomPosition(matrixSize, character) {
    const emptyMass = createEmptyMass(matrixSize);
  
    let rndRow = Math.floor(Math.random() * matrixSize);
    let rndCol = Math.floor(Math.random() * matrixSize);
  
    if (emptyMass[rndRow][rndCol] == FREE_CELL) {
      emptyMass[rndRow][rndCol] = character;
    } else {
      setCharactersInRandomPosition(matrixSize, character);
    }
  
    // return emptyMass;
  }
  
  function setRabbit() {
    const arr = createEmptyMass();
    setCharactersInRandomPosition(arr, object.rabbit.name);
  
    return emptyMass;
  }
  
  function setWolf() {
    const arr = setRabbit();
  
    const wolves = wolfCount();
  
    for (let i = 0; i < wolves; i++) {
      setCharactersInRandomPosition(arr, object.wolf.name);
    }
    return arr;
  }
  
  function setFence() {
    const arr = setWolf();
  
    const fencies = fenceCount();
  
    for (let i = 0; i < fencies; i++) {
      setCharactersInRandomPosition(arr, object.fence.name);
    }
    return arr;
  }
  
  function setHome() {
    const arr = setFence();
    setCharactersInRandomPosition(arr, object.home.name);
  
    return arr;
  }
  


  ////////////////////////////////////////////////////////

  //Get the selected option value and create
const imgDatas = {
  rabbit: {
    id: 1,
    name: 'nap',
    src: 'img/nap.jpg',
    count: 1,
  },
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

  // wolvesCoord(createMass, WOLF);
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
  const newX = (x - 1) % gamePlaceArr.length;

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
      console.log(gamePlaceArr, 'newe arr');

      wolvesAlldirection(gamePlaceArr);

      // wolvesAroundEmptyCells(gamePlaceArr, WOLF);
      // console.log(wolvesAroundEmptyCells(gamePlaceArr, WOLF),'hhh');
    } else if (event.key === 'ArrowRight') {
      keyDownRight(gamePlaceArr, character);
      console.log(gamePlaceArr, 'new arr');

      // wolvesAroundEmptyCells(gamePlaceArr, WOLF);
      // console.log(wolvesAroundEmptyCells(gamePlaceArr, WOLF),'hhh');
    } else if (event.key === 'ArrowDown') {
      keyDownDown(gamePlaceArr, character);
      console.log(gamePlaceArr, 'new arr');

      // wolvesAroundEmptyCells(gamePlaceArr, WOLF)
      // console.log(wolvesAroundEmptyCells(gamePlaceArr, WOLF),'hhh');
    } else if (event.key === 'ArrowUp') {
      keyDownUp(gamePlaceArr, character);
      console.log(gamePlaceArr, 'new arr');

      // wolvesAroundEmptyCells(gamePlaceArr, WOLF)
      // console.log(wolvesAroundEmptyCells(gamePlaceArr, WOLF),'hhh');
    }
  };
}

// function wolvesCord(gamePlaceArr, WOLF) {
//   return (wolvesCordAfterStep = findCordOfCharacter(gamePlaceArr, WOLF));
// }

function wolvesAlldirection(gamePlaceArr) {
  const rabbitCoordinates = findCordOfCharacter(gamePlaceArr, RABBIT);
  const wolvesCordAfterStep = findCordOfCharacter(gamePlaceArr, WOLF);

  wolvesCordAfterStep.forech((element) => {
    const wolvesEmptyCells = wolvesAroundEmptyCells(gamePlaceArr, element);


    // calculateDistanceFromRabbitandPlace(gamePlaceArr, wolvesEmptyCells, rabbitCoordinates, element);
  });
}

function wolvesAroundEmptyCells(gamePlaceArr,volvesAllCoordinates){

  const [x, y] = volvesAllCoordinates;

  if (x === array.length - 1) {
    return wolvesXmax(array, wolvesCords);
  }
  if (x === 0) {
    return  wolvesXmin(gamePlaceArr);
  }
  if (y === 0) {
    return wolvesYmin(gamePlaceArr);
  }
  if (y === array.length - 1) {
    return wolvesYmax(gamePlaceArr);
  } else {
    return allPositionsForAction(gamePlaceArr);
  }
}

function allPositionsForAction(gamePlaceArr) {
  const wolvesCordAfterStep = wolvesCord(gamePlaceArr, WOLF);

  const EMPTY_CELLS = [];

  wolvesCordAfterStep.forEach((empty) => {
    const [x, y] = empty;

    const newYtoLeft = (y - 1) % gamePlaceArr.length;
    const newYtoRight = (y + 1) % gamePlaceArr.length;
    const newXtoUp = (x - 1) % gamePlaceArr.length;
    const newXtoDown = (x + 1) % gamePlaceArr.length;

    if (newYtoLeft > FREE_CELL && gamePlaceArr[x][newYtoLeft] === FREE_CELL) {
      EMPTY_CELLS.push([x, newYtoLeft]);
    } else if (
      gamePlaceArr[x][newYtoLeft] === RABBIT &&
      gamePlaceArr[x][newYtoLeft] !== HOME &&
      gamePlaceArr[x][newYtoLeft] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }

    if (newYtoRight > FREE_CELL && gamePlaceArr[x][newYtoRight] === FREE_CELL) {
      EMPTY_CELLS.push([x, newYtoRight]);
    } else if (
      gamePlaceArr[x][newYtoRight] === RABBIT &&
      gamePlaceArr[x][newYtoRight] !== HOME &&
      gamePlaceArr[x][newYtoRight] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }

    if (newXtoUp > FREE_CELL && gamePlaceArr[newXtoUp][y] === FREE_CELL) {
      EMPTY_CELLS.push([x, newXtoUp]);
    } else if (
      gamePlaceArr[newXtoUp][y] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }

    if (newXtoDown > FREE_CELL && gamePlaceArr[newXtoDown][y] === FREE_CELL) {
      EMPTY_CELLS.push([x, newXtoDown]);
    } else if (
      gamePlaceArr[newXtoDown][y] === RABBIT &&
      gamePlaceArr[newXtoDown][y] !== HOME &&
      gamePlaceArr[newXtoDown][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }
  });
  return EMPTY_CELLS;
}

function wolvesXmax(gamePlaceArr) {
  const wolvesCordAfterStep = wolvesCord(gamePlaceArr, WOLF);

  const EMPTY_CELLS = [];

  wolvesCordAfterStep.forEach((empty) => {
    const [x, y] = empty;

    const newYtoLeft = (y - 1) % gamePlaceArr.length;
    const newYtoRight = (y + 1) % gamePlaceArr.length;
    const newXtoUp = (x - 1) % gamePlaceArr.length;

    if (newXtoUp > FREE_CELL && gamePlaceArr[newXtoUp][y] === FREE_CELL) {
      EMPTY_CELLS.push([newXtoUp, y]);

    } else if (
      gamePlaceArr[newXtoUp][y] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }


    if (newYtoLeft > FREE_CELL && gamePlaceArr[x][newYtoLeft] === FREE_CELL) {
      EMPTY_CELLS.push([x, newYtoLeft]);
    } else if (
      gamePlaceArr[x][newYtoLeft] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[x][newYtoRight] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }

    if (newYtoRight > FREE_CELL && gamePlaceArr[x][newYtoRight] === FREE_CELL) {
      EMPTY_CELLS.push([x, newXtoUp]);
    } else if (
      gamePlaceArr[x][newYtoRight] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }

  });
  return EMPTY_CELLS;
}

function wolvesXmin(gamePlaceArr) {
  const wolvesCordAfterStep = wolvesCord(gamePlaceArr, WOLF);

  const EMPTY_CELLS = [];

  wolvesCordAfterStep.forEach((empty) => {
    const [x, y] = empty;

    const newYtoLeft = (y - 1) % gamePlaceArr.length;
    const newYtoRight = (y + 1) % gamePlaceArr.length;
    const newXtoUp = (x - 1) % gamePlaceArr.length;
    const newXtoDown = (x + 1) % gamePlaceArr.length;

    if (newXtoDown > FREE_CELL && gamePlaceArr[newXtoDown][y] === FREE_CELL) {
      EMPTY_CELLS.push([newXtoDown, y]);

    } else if (
      gamePlaceArr[newXtoDown][y] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }



    if (newYtoLeft > FREE_CELL && gamePlaceArr[x][newYtoLeft] === FREE_CELL) {
      EMPTY_CELLS.push([x, newYtoLeft]);

    } else if (
      gamePlaceArr[x][newYtoLeft] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }



    if (newYtoRight > FREE_CELL && gamePlaceArr[x][newYtoRight] === FREE_CELL) {
      EMPTY_CELLS.push([x, newYtoRight]);
    } else if (
      gamePlaceArr[x][newYtoRight] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }

    
  });
  return EMPTY_CELLS;
}

function wolvesYmax(gamePlaceArr) {
  const wolvesCordAfterStep = wolvesCord(gamePlaceArr, WOLF);

  const EMPTY_CELLS = [];

  wolvesCordAfterStep.forEach((empty) => {
    const [x, y] = empty;

    const newYtoLeft = (y - 1) % gamePlaceArr.length;
    // const newYtoRight = (y + 1) % gamePlaceArr.length;
    const newXtoUp = (x - 1) % gamePlaceArr.length;
    const newXtoDown = (x + 1) % gamePlaceArr.length;

    if (newXtoUp > FREE_CELL && gamePlaceArr[newXtoUp][y] === FREE_CELL) {
      EMPTY_CELLS.push([newXtoUp, y]);
    } else if (
      gamePlaceArr[newXtoUp][y] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[x][newYtoLeft] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }




    if (newXtoDown > FREE_CELL && gamePlaceArr[newXtoDown][y] === FREE_CELL) {
      EMPTY_CELLS.push([newXtoDown, y]);
    } else if (
      gamePlaceArr[newXtoDown][y] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }



    if (newYtoLeft > FREE_CELL && gamePlaceArr[x][newYtoLeft] === FREE_CELL) {
      EMPTY_CELLS.push([x, newXtoUp]);
    } else if (
      gamePlaceArr[x][newYtoLeft] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }

 
  });
  return EMPTY_CELLS;
}

function wolvesYmin(gamePlaceArr) {
  const wolvesCordAfterStep = wolvesCord(gamePlaceArr, WOLF);

  const EMPTY_CELLS = [];

  wolvesCordAfterStep.forEach((empty) => {
    const [x, y] = empty;

    // const newYtoLeft = (y - 1) % gamePlaceArr.length;
    const newYtoRight = (y + 1) % gamePlaceArr.length;
    const newXtoUp = (x - 1) % gamePlaceArr.length;
    const newXtoDown = (x + 1) % gamePlaceArr.length;

    if (newXtoUp > FREE_CELL && gamePlaceArr[newXtoUp][y] === FREE_CELL) {
      EMPTY_CELLS.push([newXtoUp][y]);

    } else if (
      gamePlaceArr[newXtoUp][y] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }







    if (newXtoDown > FREE_CELL && gamePlaceArr[newXtoDown][y] === FREE_CELL) {
      EMPTY_CELLS.push([newXtoDown, y]);
    } else if (
      gamePlaceArr[newXtoDown][y] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }







    if (newYtoRight > FREE_CELL && gamePlaceArr[x][newYtoRight] === FREE_CELL) {
      EMPTY_CELLS.push([x, newYtoRight]);
    } else if (
      gamePlaceArr[x][newYtoRight] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }

    
  });
  return EMPTY_CELLS;
}






// function calculateDistanceFromRabbitandPlace(array, freeVellsArray, rabbitCords, item) {

//   const distanceArray = []
//   freeVellsArray.forEach((item) => {
//     const distance = calculateDistanceFromRabbit(item, rabbitCords);
//     distanceArray.push(distance)
//   });
//   // console.log(distanceArray)
//   const max = Math.min(...distanceArray);
//   const index = distanceArray.indexOf(max);
//   // console.log(freeVellsArray[index])
//   // console.log(freeVellsArray)
//   placeWolvesIntoNewCells(array, freeVellsArray[index], item)
// }

// const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// function placeWolvesIntoNewCells(array, wolvesCords, item){
//     const rabbitCords = findCharacterCords(array, RABBIT);
//     const [x, y] = wolvesCords
//     const[k, p] = item
//     if(equals([x, y], rabbitCords)){
//         alert("Game over")
//     } else {
//       array[x][y] = WOLF
//       array[k][p] = EMPTY_CELL
//     }
      
// }

// function calculateDistanceFromRabbit(arrayItem, rabbitCords) {
  
//   let [x, y] = arrayItem;
//   let [z, k] = rabbitCords[0];

//   return Math.round(Math.sqrt(Math.pow(x - z, 2) + Math.pow(y - k, 2)));
// }

























// function wolvesLeftEmptyCells(gamePlaceArr, WOLF) {
//   const wolvesCordAfterStep = wolvesCord(gamePlaceArr, WOLF);

//   const LEFT_EMPTY_CELLS = [];

//   wolvesCordAfterStep.forEach((empty) => {
//     const [x, y] = empty;

//     const newYtoLeft = (y - 1) % gamePlaceArr.length;

//     if (
//       newYtoLeft > FREE_CELL &&
//       gamePlaceArr[x][newYtoLeft] === FREE_CELL &&
//       gamePlaceArr[x][newYtoLeft] !== FENCE &&
//       gamePlaceArr[x][newYtoLeft] !== RABBIT &&
//       gamePlaceArr[x][newYtoLeft] !== WOLF &&
//       gamePlaceArr[x][newYtoLeft] !== HOME
//     ) {
//       LEFT_EMPTY_CELLS.push([x, newYtoLeft]);
//     } else {
//       LEFT_EMPTY_CELLS.push([x, y]);
//     }
//   });

//   return LEFT_EMPTY_CELLS;
// }

// function wolvesRightEmptyCells(gamePlaceArr, WOLF) {
//   const wolvesCordAfterStep = wolvesCord(gamePlaceArr, WOLF);

//   const RIGHT_EMPTY_CELLS = [];

//   wolvesCordAfterStep.forEach((empty) => {
//     const [x, y] = empty;

//     const newYtoRight = (y + 1) % gamePlaceArr.length;

//     if (
//       newYtoRight > FREE_CELL &&
//       gamePlaceArr[x][newYtoRight] === FREE_CELL &&
//       gamePlaceArr[x][newYtoRight] !== FENCE &&
//       gamePlaceArr[x][newYtoRight] !== RABBIT &&
//       gamePlaceArr[x][newYtoRight] !== WOLF
//     ) {
//       RIGHT_EMPTY_CELLS.push([x, newYtoRight]);
//     } else {
//       RIGHT_EMPTY_CELLS.push([x, y]);
//     }
//   });

//   return RIGHT_EMPTY_CELLS;
// }

// function wolvesUpEmptyCells(gamePlaceArr, WOLF) {
//   const wolvesCordAfterStep = wolvesCord(gamePlaceArr, WOLF);

//   const UP_EMPTY_CELLS = [];

//   wolvesCordAfterStep.forEach((empty) => {
//     const [x, y] = empty;

//     const newXtoUp = (x - 1) % gamePlaceArr.length;

//     if (
//       newXtoUp > FREE_CELL &&
//       gamePlaceArr[newXtoUp][y] === FREE_CELL &&
//       gamePlaceArr[newXtoUp][y] !== FENCE &&
//       gamePlaceArr[newXtoUp][y] !== RABBIT &&
//       gamePlaceArr[newXtoUp][y] !== WOLF
//     ) {
//       UP_EMPTY_CELLS.push([newXtoUp, y]);
//     } else {
//       UP_EMPTY_CELLS.push([x, y]);
//     }
//   });

//   return UP_EMPTY_CELLS;
// }

// function wolvesDownEmptyCells(gamePlaceArr, WOLF) {
  const wolvesCordAfterStep = wolvesCord(gamePlaceArr, WOLF);

  const DOWN_EMPTY_CELLS = [];

  wolvesCordAfterStep.forEach((empty) => {
    const [x, y] = empty;

    const newXtoDown = (x + 1) % gamePlaceArr.length;

    if (
      newXtoDown > FREE_CELL &&
      gamePlaceArr[newXtoDown][y] === FREE_CELL &&
      gamePlaceArr[newXtoDown][y] !== FENCE &&
      gamePlaceArr[newXtoDown][y] !== RABBIT &&
      gamePlaceArr[newXtoDown][y] !== WOLF
    ) {
      DOWN_EMPTY_CELLS.push([newXtoDown, y]);
    } else {
      DOWN_EMPTY_CELLS.push([x, y]);
    }
  });

  return DOWN_EMPTY_CELLS;
}

// function wolvesAroundEmptyCells(gamePlaceArr, WOLF){
//   return {
//          "ArrowLeft"  : wolvesLeftEmptyCells(gamePlaceArr, WOLF),
//          "ArrowRight" : wolvesRightEmptyCells(gamePlaceArr, WOLF),
//          "ArrowUp"    : wolvesUpEmptyCells(gamePlaceArr, WOLF),
//          "ArrowDown"  : wolvesDownEmptyCells(gamePlaceArr, WOLF),
//         }[event.key]

// }

// function some(gamePlaceArr){
//   const wolvesCordAfterStep = wolvesCord(gamePlaceArr, WOLF);

//   const valod = []

//   const morena = wolvesCordAfterStep.forEach((empty) => {
//      const [x, y] = empty;
//    return {

//          "ArrowLeft" : ([newX, newY] = [x, y - 1]),
//          "ArrowRight": ([newX, newY] = [x - 1, y]),
//          "ArrowUp"   : ([newX, newY] = [x, y + 1]),
//          "ArrowDown" : ([newX, newY] = [x + 1, y]),
//          }[event.key]
//        });

//        valod.push(morena)

//        return valod;
//  }










// +++++++++++++++++++++++++++++++++++++++++=
const imgDatas = {
  rabbit: {
    id: 1,
    name: 'nap',
    src: 'img/nap.jpg',
    count: 1,
  },
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

  // wolvesCoord(createMass, WOLF);
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
  const newX = (x - 1) % gamePlaceArr.length;

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
      console.log(gamePlaceArr, 'newe arr');

      wolvesAlldirection(gamePlaceArr);

      // wolvesAroundEmptyCells(gamePlaceArr, WOLF);
      // console.log(wolvesAroundEmptyCells(gamePlaceArr, WOLF),'hhh');
    } else if (event.key === 'ArrowRight') {
      keyDownRight(gamePlaceArr, character);
      console.log(gamePlaceArr, 'new arr');

      // wolvesAroundEmptyCells(gamePlaceArr, WOLF);
      // console.log(wolvesAroundEmptyCells(gamePlaceArr, WOLF),'hhh');
    } else if (event.key === 'ArrowDown') {
      keyDownDown(gamePlaceArr, character);
      console.log(gamePlaceArr, 'new arr');

      // wolvesAroundEmptyCells(gamePlaceArr, WOLF)
      // console.log(wolvesAroundEmptyCells(gamePlaceArr, WOLF),'hhh');
    } else if (event.key === 'ArrowUp') {
      keyDownUp(gamePlaceArr, character);
      console.log(gamePlaceArr, 'new arr');

      // wolvesAroundEmptyCells(gamePlaceArr, WOLF)
      // console.log(wolvesAroundEmptyCells(gamePlaceArr, WOLF),'hhh');
    }
  };
}

// function wolvesCord(gamePlaceArr, WOLF) {
//   return (wolvesCordAfterStep = findCordOfCharacter(gamePlaceArr, WOLF));
// }

function wolvesAlldirection(gamePlaceArr) {
  const rabbitCoordinates = findCordOfCharacter(gamePlaceArr, RABBIT);
  const wolvesCordAfterStep = findCordOfCharacter(gamePlaceArr, WOLF);

  wolvesCordAfterStep.forech((element) => {
    const wolvesEmptyCells = wolvesAroundEmptyCells(gamePlaceArr, element);


    // calculateDistanceFromRabbitandPlace(gamePlaceArr, wolvesEmptyCells, rabbitCoordinates, element);
  });
}

function wolvesAroundEmptyCells(gamePlaceArr,volvesAllCoordinates){

  const [x, y] = volvesAllCoordinates;

  if (x === array.length - 1) {
    return wolvesXmax(gamePlaceArr, wolvesCords);
  }
  if (x === 0) {
    return  wolvesXmin(gamePlaceArr);
  }
  if (y === 0) {
    return wolvesYmin(gamePlaceArr);
  }
  if (y === array.length - 1) {
    return wolvesYmax(gamePlaceArr);
  } else {
    return allPositionsForAction(gamePlaceArr);
  }
}

function allPositionsForAction(gamePlaceArr) {
  const wolvesCordAfterStep = wolvesCord(gamePlaceArr, WOLF);

  const EMPTY_CELLS = [];

  wolvesCordAfterStep.forEach((empty) => {
    const [x, y] = empty;

    const newYtoLeft = (y - 1) % gamePlaceArr.length;
    const newYtoRight = (y + 1) % gamePlaceArr.length;
    const newXtoUp = (x - 1) % gamePlaceArr.length;
    const newXtoDown = (x + 1) % gamePlaceArr.length;

    if (newYtoLeft > FREE_CELL && gamePlaceArr[x][newYtoLeft] === FREE_CELL) {
      EMPTY_CELLS.push([x, newYtoLeft]);
    } else if (
      gamePlaceArr[x][newYtoLeft] === RABBIT &&
      gamePlaceArr[x][newYtoLeft] !== HOME &&
      gamePlaceArr[x][newYtoLeft] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }

    if (newYtoRight > FREE_CELL && gamePlaceArr[x][newYtoRight] === FREE_CELL) {
      EMPTY_CELLS.push([x, newYtoRight]);
    } else if (
      gamePlaceArr[x][newYtoRight] === RABBIT &&
      gamePlaceArr[x][newYtoRight] !== HOME &&
      gamePlaceArr[x][newYtoRight] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }

    if (newXtoUp > FREE_CELL && gamePlaceArr[newXtoUp][y] === FREE_CELL) {
      EMPTY_CELLS.push([x, newXtoUp]);
    } else if (
      gamePlaceArr[newXtoUp][y] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }

    if (newXtoDown > FREE_CELL && gamePlaceArr[newXtoDown][y] === FREE_CELL) {
      EMPTY_CELLS.push([x, newXtoDown]);
    } else if (
      gamePlaceArr[newXtoDown][y] === RABBIT &&
      gamePlaceArr[newXtoDown][y] !== HOME &&
      gamePlaceArr[newXtoDown][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }
  });
  return EMPTY_CELLS;
}

function wolvesXmax(gamePlaceArr) {
  const wolvesCordAfterStep = wolvesCord(gamePlaceArr, WOLF);

  const EMPTY_CELLS = [];

  wolvesCordAfterStep.forEach((empty) => {
    const [x, y] = empty;

    const newYtoLeft = (y - 1) % gamePlaceArr.length;
    const newYtoRight = (y + 1) % gamePlaceArr.length;
    const newXtoUp = (x - 1) % gamePlaceArr.length;

    if (newXtoUp > FREE_CELL && gamePlaceArr[newXtoUp][y] === FREE_CELL) {
      EMPTY_CELLS.push([newXtoUp, y]);

    } else if (
      gamePlaceArr[newXtoUp][y] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }


    if (newYtoLeft > FREE_CELL && gamePlaceArr[x][newYtoLeft] === FREE_CELL) {
      EMPTY_CELLS.push([x, newYtoLeft]);
    } else if (
      gamePlaceArr[x][newYtoLeft] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[x][newYtoRight] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }

    if (newYtoRight > FREE_CELL && gamePlaceArr[x][newYtoRight] === FREE_CELL) {
      EMPTY_CELLS.push([x, newXtoUp]);
    } else if (
      gamePlaceArr[x][newYtoRight] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }

  });
  return EMPTY_CELLS;
}

function wolvesXmin(gamePlaceArr) {
  const wolvesCordAfterStep = wolvesCord(gamePlaceArr, WOLF);

  const EMPTY_CELLS = [];

  wolvesCordAfterStep.forEach((empty) => {
    const [x, y] = empty;

    const newYtoLeft = (y - 1) % gamePlaceArr.length;
    const newYtoRight = (y + 1) % gamePlaceArr.length;
    const newXtoUp = (x - 1) % gamePlaceArr.length;
    const newXtoDown = (x + 1) % gamePlaceArr.length;

    if (newXtoDown > FREE_CELL && gamePlaceArr[newXtoDown][y] === FREE_CELL) {
      EMPTY_CELLS.push([newXtoDown, y]);

    } else if (
      gamePlaceArr[newXtoDown][y] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }



    if (newYtoLeft > FREE_CELL && gamePlaceArr[x][newYtoLeft] === FREE_CELL) {
      EMPTY_CELLS.push([x, newYtoLeft]);

    } else if (
      gamePlaceArr[x][newYtoLeft] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }



    if (newYtoRight > FREE_CELL && gamePlaceArr[x][newYtoRight] === FREE_CELL) {
      EMPTY_CELLS.push([x, newYtoRight]);
    } else if (
      gamePlaceArr[x][newYtoRight] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }

    
  });
  return EMPTY_CELLS;
}

function wolvesYmax(gamePlaceArr) {
  const wolvesCordAfterStep = wolvesCord(gamePlaceArr, WOLF);

  const EMPTY_CELLS = [];

  wolvesCordAfterStep.forEach((empty) => {
    const [x, y] = empty;

    const newYtoLeft = (y - 1) % gamePlaceArr.length;
    // const newYtoRight = (y + 1) % gamePlaceArr.length;
    const newXtoUp = (x - 1) % gamePlaceArr.length;
    const newXtoDown = (x + 1) % gamePlaceArr.length;

    if (newXtoUp > FREE_CELL && gamePlaceArr[newXtoUp][y] === FREE_CELL) {
      EMPTY_CELLS.push([newXtoUp, y]);
    } else if (
      gamePlaceArr[newXtoUp][y] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[x][newYtoLeft] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }




    if (newXtoDown > FREE_CELL && gamePlaceArr[newXtoDown][y] === FREE_CELL) {
      EMPTY_CELLS.push([newXtoDown, y]);
    } else if (
      gamePlaceArr[newXtoDown][y] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }



    if (newYtoLeft > FREE_CELL && gamePlaceArr[x][newYtoLeft] === FREE_CELL) {
      EMPTY_CELLS.push([x, newXtoUp]);
    } else if (
      gamePlaceArr[x][newYtoLeft] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }

 
  });
  return EMPTY_CELLS;
}

function wolvesYmin(gamePlaceArr) {
  const wolvesCordAfterStep = wolvesCord(gamePlaceArr, WOLF);

  const EMPTY_CELLS = [];

  wolvesCordAfterStep.forEach((empty) => {
    const [x, y] = empty;

    // const newYtoLeft = (y - 1) % gamePlaceArr.length;
    const newYtoRight = (y + 1) % gamePlaceArr.length;
    const newXtoUp = (x - 1) % gamePlaceArr.length;
    const newXtoDown = (x + 1) % gamePlaceArr.length;

    if (newXtoUp > FREE_CELL && gamePlaceArr[newXtoUp][y] === FREE_CELL) {
      EMPTY_CELLS.push([newXtoUp][y]);

    } else if (
      gamePlaceArr[newXtoUp][y] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }







    if (newXtoDown > FREE_CELL && gamePlaceArr[newXtoDown][y] === FREE_CELL) {
      EMPTY_CELLS.push([newXtoDown, y]);
    } else if (
      gamePlaceArr[newXtoDown][y] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }







    if (newYtoRight > FREE_CELL && gamePlaceArr[x][newYtoRight] === FREE_CELL) {
      EMPTY_CELLS.push([x, newYtoRight]);
    } else if (
      gamePlaceArr[x][newYtoRight] === RABBIT &&
      gamePlaceArr[newXtoUp][y] !== HOME &&
      gamePlaceArr[newXtoUp][y] !== FENCE
    ) {
      alert('Game Over! Try again.');
      return;
    }

    
  });
  return EMPTY_CELLS;
}






// function calculateDistanceFromRabbitandPlace(array, freeVellsArray, rabbitCords, item) {

//   const distanceArray = []
//   freeVellsArray.forEach((item) => {
//     const distance = calculateDistanceFromRabbit(item, rabbitCords);
//     distanceArray.push(distance)
//   });
//   // console.log(distanceArray)
//   const max = Math.min(...distanceArray);
//   const index = distanceArray.indexOf(max);
//   // console.log(freeVellsArray[index])
//   // console.log(freeVellsArray)
//   placeWolvesIntoNewCells(array, freeVellsArray[index], item)
// }

// const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// function placeWolvesIntoNewCells(array, wolvesCords, item){
//     const rabbitCords = findCharacterCords(array, RABBIT);
//     const [x, y] = wolvesCords
//     const[k, p] = item
//     if(equals([x, y], rabbitCords)){
//         alert("Game over")
//     } else {
//       array[x][y] = WOLF
//       array[k][p] = EMPTY_CELL
//     }
      
// }

// function calculateDistanceFromRabbit(arrayItem, rabbitCords) {
  
//   let [x, y] = arrayItem;
//   let [z, k] = rabbitCords[0];

//   return Math.round(Math.sqrt(Math.pow(x - z, 2) + Math.pow(y - k, 2)));
// }

























// function wolvesLeftEmptyCells(gamePlaceArr, WOLF) {
//   const wolvesCordAfterStep = wolvesCord(gamePlaceArr, WOLF);

//   const LEFT_EMPTY_CELLS = [];

//   wolvesCordAfterStep.forEach((empty) => {
//     const [x, y] = empty;

//     const newYtoLeft = (y - 1) % gamePlaceArr.length;

//     if (
//       newYtoLeft > FREE_CELL &&
//       gamePlaceArr[x][newYtoLeft] === FREE_CELL &&
//       gamePlaceArr[x][newYtoLeft] !== FENCE &&
//       gamePlaceArr[x][newYtoLeft] !== RABBIT &&
//       gamePlaceArr[x][newYtoLeft] !== WOLF &&
//       gamePlaceArr[x][newYtoLeft] !== HOME
//     ) {
//       LEFT_EMPTY_CELLS.push([x, newYtoLeft]);
//     } else {
//       LEFT_EMPTY_CELLS.push([x, y]);
//     }
//   });

//   return LEFT_EMPTY_CELLS;
// }

// function wolvesRightEmptyCells(gamePlaceArr, WOLF) {
//   const wolvesCordAfterStep = wolvesCord(gamePlaceArr, WOLF);

//   const RIGHT_EMPTY_CELLS = [];

//   wolvesCordAfterStep.forEach((empty) => {
//     const [x, y] = empty;

//     const newYtoRight = (y + 1) % gamePlaceArr.length;

//     if (
//       newYtoRight > FREE_CELL &&
//       gamePlaceArr[x][newYtoRight] === FREE_CELL &&
//       gamePlaceArr[x][newYtoRight] !== FENCE &&
//       gamePlaceArr[x][newYtoRight] !== RABBIT &&
//       gamePlaceArr[x][newYtoRight] !== WOLF
//     ) {
//       RIGHT_EMPTY_CELLS.push([x, newYtoRight]);
//     } else {
//       RIGHT_EMPTY_CELLS.push([x, y]);
//     }
//   });

//   return RIGHT_EMPTY_CELLS;
// }

// function wolvesUpEmptyCells(gamePlaceArr, WOLF) {
//   const wolvesCordAfterStep = wolvesCord(gamePlaceArr, WOLF);

//   const UP_EMPTY_CELLS = [];

//   wolvesCordAfterStep.forEach((empty) => {
//     const [x, y] = empty;

//     const newXtoUp = (x - 1) % gamePlaceArr.length;

//     if (
//       newXtoUp > FREE_CELL &&
//       gamePlaceArr[newXtoUp][y] === FREE_CELL &&
//       gamePlaceArr[newXtoUp][y] !== FENCE &&
//       gamePlaceArr[newXtoUp][y] !== RABBIT &&
//       gamePlaceArr[newXtoUp][y] !== WOLF
//     ) {
//       UP_EMPTY_CELLS.push([newXtoUp, y]);
//     } else {
//       UP_EMPTY_CELLS.push([x, y]);
//     }
//   });

//   return UP_EMPTY_CELLS;
// }

// function wolvesDownEmptyCells(gamePlaceArr, WOLF) {
//   const wolvesCordAfterStep = wolvesCord(gamePlaceArr, WOLF);

//   const DOWN_EMPTY_CELLS = [];

//   wolvesCordAfterStep.forEach((empty) => {
//     const [x, y] = empty;

//     const newXtoDown = (x + 1) % gamePlaceArr.length;

//     if (
//       newXtoDown > FREE_CELL &&
//       gamePlaceArr[newXtoDown][y] === FREE_CELL &&
//       gamePlaceArr[newXtoDown][y] !== FENCE &&
//       gamePlaceArr[newXtoDown][y] !== RABBIT &&
//       gamePlaceArr[newXtoDown][y] !== WOLF
//     ) {
//       DOWN_EMPTY_CELLS.push([newXtoDown, y]);
//     } else {
//       DOWN_EMPTY_CELLS.push([x, y]);
//     }
//   });

//   return DOWN_EMPTY_CELLS;
// }

// function wolvesAroundEmptyCells(gamePlaceArr, WOLF){
//   return {
//          "ArrowLeft"  : wolvesLeftEmptyCells(gamePlaceArr, WOLF),
//          "ArrowRight" : wolvesRightEmptyCells(gamePlaceArr, WOLF),
//          "ArrowUp"    : wolvesUpEmptyCells(gamePlaceArr, WOLF),
//          "ArrowDown"  : wolvesDownEmptyCells(gamePlaceArr, WOLF),
//         }[event.key]

// }

// function some(gamePlaceArr){
//   const wolvesCordAfterStep = wolvesCord(gamePlaceArr, WOLF);

//   const valod = []

//   const morena = wolvesCordAfterStep.forEach((empty) => {
//      const [x, y] = empty;
//    return {

//          "ArrowLeft" : ([newX, newY] = [x, y - 1]),
//          "ArrowRight": ([newX, newY] = [x - 1, y]),
//          "ArrowUp"   : ([newX, newY] = [x, y + 1]),
//          "ArrowDown" : ([newX, newY] = [x + 1, y]),
//          }[event.key]
//        });

//        valod.push(morena)

//        return valod;
//  }

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

const characterCord = {
  rabbit: [],
  wolf: [],
  home: [],
  fence: [],
};

const FREE_CELL = 0;
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

  const rabbitCoordinates = findCordOfCharacter(createMass, RABBIT);
  characterCord.rabbit = rabbitCoordinates;

  const wolvesCoordinates = findCordOfCharacter(createMass, WOLF);
  characterCord.wolf = wolvesCoordinates;

  const homeCoordinates = findCordOfCharacter(createMass, HOME);
  characterCord.home = homeCoordinates;

  const fenceiesCoordinates = findCordOfCharacter(createMass, FENCE);
  characterCord.fence = fenceiesCoordinates;
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
  const heroPosition = getRandomPosition(gamePlaceArr);

  const x = heroPosition[0];
  const y = heroPosition[1];

  gamePlaceArr[x][y] = gameHero;

  

  // if(gameHero === RABBIT){

  // }
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

document.addEventListener('keydown', changerabbitCoordinates);



function changerabbitCoordinates(event) {

  const rabbitCoord = characterCord.rabbit;

  const rabbitNewCoord = rabbitCoord.map((rabbitCoord) => {
    const [x, y] = rabbitCoord;

    return {
      ArrowLeft: ([newX, newY] = [x, y - 1]), //left
      ArrowUp: ([newX, newY] = [x - 1, y]), //up
      ArrowRight: ([newX, newY] = [x, y + 1]), //right
      ArrowDown: ([newX, newY] = [x + 1, y]), //down
    }[event.key];

  });
  
  characterCord.rabbit = rabbitNewCoord;

   findCordOfCharacter(gamePlaceArr, character)

  console.log(rabbitNewCoord, 'gujyy');
}



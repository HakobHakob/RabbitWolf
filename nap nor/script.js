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

const FREE_CELL = 0;
const WOLF = imgDatas.wolf.name;
const HOME = imgDatas.home.name;
const FENCE = imgDatas.fence.name;
const RABBIT = imgDatas.rabbit.name;

function start() {
  const value = selectValue();
  const createMass = createEmptyMass(value);

  imgDatas.wolf.count = Math.ceil((60 * value) / 100);
  imgDatas.fence.count = Math.ceil((40 * value) / 100);
  console.log(createMass);

  getRandomPosition(createMass);

  Object.values(imgDatas).map((elemnt) => {
    setCharacters(createMass, elemnt.name, elemnt.count);
  });
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
  const gameBoardValue = 0;

  const gameBoard = new Array(gameBoardSize)
    .fill(gameBoardValue)
    .map(() => new Array(gameBoardSize).fill(gameBoardValue));

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
}

function setCharacters(gamePlaceArr, character, count) {
  for (let i = 0; i < count; i++) {
    setHeroesAtRandomPosition(gamePlaceArr, character);
  }
}

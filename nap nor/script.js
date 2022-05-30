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





const characterDatas = {
  rabbit: { name: 'nap', src: 'img/nap.jpg', count: 1 },
  wolf: { name: 'gel', src: 'img/wolf.jpg' },
  home: { name: 'home', src: 'img/home.jpg', count: 1 },
  fence: { name: 'fence', src: 'img/fence.jpg' },
}
const RABBIT = characterDatas.rabbit.name
const WOLF = characterDatas.wolf.name
const HOME = characterDatas.home.name
const FENCE = characterDatas.fence.name
const FREE_CELL = 0
const X = 0
const Y = 1
let gamePlaceNumber = 1




const newGameBtn = document.querySelector('#createNewGamePLace')
newGameBtn.onclick = showGameAppearance

function createNewGamePlace(gamePlaceNumber) {
  const newGamePlace = `
  <div class="main" id="${'main' + gamePlaceNumber}">
    <div class="selectDiv">
      <button id="startBtn" onclick="start(${gamePlaceNumber})">START</button>
      <select name="select" id="${'gameSelect' + gamePlaceNumber}">
        <option class="selectOption" value="5">5x5</option>
        <option class="selectOption" value="7">7x7</option>
        <option class="selectOption" value="10">10x10</option>
      </select>
    </div>
    <div id="${'place' + gamePlaceNumber}"></div>

    <div id="${'arrowsDiv' + gamePlaceNumber}">

      <div class="upDiv">
        <button class="btn" id="${'upBtn' + gamePlaceNumber}"><span>&#8593;</span></button>
      </div>

      <div class="leftNadRight">
        <button class="btn" id="${
          'leftBtn' + gamePlaceNumber
        }"><span>&#8592;</span></button>
        <button class="btn" id="${
          'rightBtn' + gamePlaceNumber
        }"><span>&#8594;</span></button>
      </div>

      <div class="downDiv">
        <button class="btn" id="${
          'downBtn' + gamePlaceNumber
        }"><span>&#8595;</span></button>
      </div>

    </div>

  </div>

  <div id="${'showMessage' + gamePlaceNumber}">
    <button onclick="start(${'showMessage' + gamePlaceNumber})">START</button>
    <h2></h2>
  </div>`

  return newGamePlace
}

function showGameAppearance() {
  appendGamePlaceElements()
}

function appendGamePlaceElements() {
  gamePlaceNumber++
  const gameContainer = document.getElementById('container')
  const gamePlace = createNewGamePlace(gamePlaceNumber)
  const newWrapper = document.createElement('div')
  newWrapper.id = 'wrapper-' + gamePlaceNumber
  newWrapper.innerHTML = gamePlace
  gameContainer.append(newWrapper)
}

function start(gamePlaceNumber) {
  const placeNumerSelect = 'gameSelect' + gamePlaceNumber
  const value = parseInt(document.getElementById(placeNumerSelect).value)
  const createMass = createEmptyMass(value)

  const gameStat = {
    matrix: createMass,
    isGameOver: false,
    gameResult: null,
    placeNumber: gamePlaceNumber,
  }
  const btnsData = {
    UP: { direction: 0, btn: document.getElementById(`${'upBtn' + gameStat.placeNumber}`) },
    DOWN: { direction: 1, btn: document.getElementById(`${'downBtn' + gameStat.placeNumber}`) },
    RIGHT: { direction: 2, btn: document.getElementById(`${'rightBtn' + gameStat.placeNumber}`) },
    LEFT: { direction: 3, btn: document.getElementById(`${'leftBtn' + gameStat.placeNumber}`) },
  }

  gameAreaSize(value,gameStat)

  getRandomPosition(createMass)

  wolvesAndFenciesCounts(value)
  Object.values(characterDatas).map((element) => {
    setCharacters(gameStat.matrix, element.name, element.count)
  })

  hideOrShowMesaage(gameStat.placeNumber)
  clearDivs(gameStat.placeNumber)
  createGameArea(gameStat, value)
  moveRabbit(gameStat, btnsData)
}

function createEmptyMass(gameBoardSize) {
  const gameBoard = new Array(gameBoardSize)
    .fill(FREE_CELL)
    .map(() => new Array(gameBoardSize).fill(FREE_CELL))

  return gameBoard
}

function getRandomPosition(gamePlaceArr) {
  const x = Math.floor(Math.random() * gamePlaceArr.length)
  const y = Math.floor(Math.random() * gamePlaceArr.length)

  if (gamePlaceArr[x][y] === FREE_CELL) {
    return [x, y]
  } else {
    return getRandomPosition(gamePlaceArr)
  }
}

function setHeroesAtRandomPosition(gamePlaceArr, character) {
  const [x, y] = getRandomPosition(gamePlaceArr)

  gamePlaceArr[x][y] = character
}

function wolvesAndFenciesCounts(gameBoardSize) {
  characterDatas.wolf.count = Math.ceil((60 * gameBoardSize) / 100)
  characterDatas.fence.count = Math.ceil((40 * gameBoardSize) / 100)
}

function setCharacters(gamePlaceArr, character, characterCount) {
  for (let i = 0; i < characterCount; i++) {
    setHeroesAtRandomPosition(gamePlaceArr, character)
  }
}

function findCordOfCharacter(gamePlaceArr, character) {
  const findInGameplace = function (accumulator, row, x) {
    row.forEach((element, y) => {
      if (element === character) {
        accumulator.push([x, y])
      }
    })
    return accumulator
  }
  return gamePlaceArr.reduce(findInGameplace, [])
}

function setRabbitInNewCell(gameStat, arrow) {
  if (gameStat.isGameOver === true) {
    return
  } else {
    const gamePlaceArr = gameStat.matrix

    const rabbitCord = findCordOfCharacter(gamePlaceArr, RABBIT)[0]
    const newCoordsData = rabbitCoordinatesForNewCell(rabbitCord)
    const rabbitNewCoordinates = arrangeNewCoordinates(
      gamePlaceArr,
      newCoordsData
    )
    setRabbitInNewCoordinates(gameStat, rabbitNewCoordinates, rabbitCord, arrow)
  }
}

function eventForRabbitMoveBtn(gameStat, rabbitDirection, rabbitMoveBtn) {
  rabbitMoveBtn.onclick = function () {
    setRabbitInNewCell(gameStat, rabbitDirection)

    wolvesCoordinates(gameStat)
    clearDivs(gameStat.placeNumber)
    createGameArea(gameStat)
  }
}
function moveRabbit(gameStat, rabbitMoveBtn) {
  if (gameStat.isGameOver === false) {
    eventForRabbitMoveBtn(
      gameStat,
      rabbitMoveBtn.LEFT.direction,
      rabbitMoveBtn.LEFT.btn
    )
  }
  if (gameStat.isGameOver === false) {
    eventForRabbitMoveBtn(
      gameStat,
      rabbitMoveBtn.RIGHT.direction,
      rabbitMoveBtn.RIGHT.btn
    )
  }
  if (gameStat.isGameOver === false) {
    eventForRabbitMoveBtn(
      gameStat,
      rabbitMoveBtn.DOWN.direction,
      rabbitMoveBtn.DOWN.btn
    )
  }
  if (gameStat.isGameOver === false) {
    eventForRabbitMoveBtn(
      gameStat,
      rabbitMoveBtn.UP.direction,
      rabbitMoveBtn.UP.btn
    )
  }
}

function rabbitCoordinatesForNewCell([x, y]) {
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y + 1],
    [x, y - 1],
  ]
}

function arrangeNewCoordinates(gamePlaceArr, newCoordsData) {
  const newCoordsArr = newCoordsData.map(([x, y]) => {
    if (x < 0) {
      x = gamePlaceArr.length - 1
    }
    if (x > gamePlaceArr.length - 1) {
      x = 0
    }
    if (y > gamePlaceArr.length - 1) {
      y = 0
    }
    if (y < 0) {
      y = gamePlaceArr.length - 1
    }
    return [x, y]
  })

  return newCoordsArr
}

function setRabbitInNewCoordinates(
  gameStat,
  rabbitNewCoordinates,
  rabbitCord,
  arrow
) {
  const gamePlaceArr = gameStat.matrix
  const [x, y] = rabbitCord
  const [newX, newY] = rabbitNewCoordinates[arrow]

  switch (gamePlaceArr[newX][newY]) {
    case FREE_CELL:
      gamePlaceArr[newX][newY] = RABBIT
      gamePlaceArr[x][y] = FREE_CELL
      break

    case HOME:
      gamePlaceArr[x][y] = FREE_CELL
      gameStat.isGameOver = true
      gameStat.gameResult = 'You win!'
      showGameMessages(gameStat)
      break

    case FENCE:
      return

    case WOLF:
      gameStat.isGameOver = true
      gameStat.gameResult = 'Game Over!'
      showGameMessages(gameStat)
      break
  }
  return [newX, newY]
}

function wolvesCoordinates(gameStat) {
  if (gameStat.isGameOver === true) {
    return
  } else {
    const wolvesCordAfterStep = findCordOfCharacter(gameStat.matrix, WOLF)
    const coordinatesAfterRabbitStep = wolvesCordAfterStep.forEach((wolf) => {
      const cells = findCellsArroundWolves(gameStat.matrix, wolf)
      const emtyCells = findEmptyCellsAroundWolf(gameStat, cells)
      const shortDistance = shortestDistanceBox(emtyCells, gameStat)
      moveWolves(gameStat, wolf, shortDistance)
    })
  }
}

function conditionXandYinGamePlace(gamePlaceArr, [x, y]) {
  return x >= 0 && x < gamePlaceArr.length && y >= 0 && y < gamePlaceArr.length
}

function findCellsArroundWolves(gamePlaceArr, [x, y]) {
  const review = [
    [x - 1, y],
    [x + 1, y],
    [x, y + 1],
    [x, y - 1],
  ]
  const allBoxesAroundWolves = review.filter((boxes) =>
    conditionXandYinGamePlace(gamePlaceArr, boxes)
  )

  return allBoxesAroundWolves
}

function cellCharacter(gamePlaceArr, cells, character) {
  const cellsArray = cells.filter(([x, y]) => gamePlaceArr[x][y] === character)
  return cellsArray
}

function findEmptyCellsAroundWolf(gameStat, cords) {
  const gamePlaceArr = gameStat.matrix
  const rabbitFound = cellCharacter(gamePlaceArr, cords, RABBIT)

  if (rabbitFound.length > 0) {
    gameStat.isGameOver = true
    gameStat.gameResult = 'Game Over'
    showGameMessages(gameStat)
  } else {
    return cellCharacter(gamePlaceArr, cords, FREE_CELL)
  }
}

function calculateDistanceFromRabbit([x1, y1], [[x2, y2]]) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

function getDistances(emtyCellsAroundWolves, gameStat) {
  const gamePlaceArr = gameStat.matrix
  const rabbitCord = findCordOfCharacter(gamePlaceArr, RABBIT)

  const cells = emtyCellsAroundWolves.map((cord) => {
    return calculateDistanceFromRabbit(cord, rabbitCord)
  })
  return cells
}

function shortestDistanceBox(emtyCellsAroundWolves, gameStat) {
  if (gameStat.isGameOver === true) {
    return
  } else {
    const distanceArray = getDistances(emtyCellsAroundWolves, gameStat)
    const minOfDistances = Math.min(...distanceArray)
    const index = distanceArray.indexOf(minOfDistances)

    return emtyCellsAroundWolves[index]
  }
}

function moveWolves(gameStat, wolvesCord, minDistanceData) {
  if (gameStat.isGameOver === true) {
    return
  } else {
    const gamePlaceArr = gameStat.matrix

    const [q, k] = wolvesCord
    const [a, b] = minDistanceData

    gamePlaceArr[a][b] = WOLF
    gamePlaceArr[q][k] = FREE_CELL
  }
}

function clearDivs(gamePlaceNumber) {
  const place = document.getElementById('place' + gamePlaceNumber)
  place.innerHTML = ''
}

function gameAreaSize(gameBoardSize, gameStat) {
  
  const gamePlace = document.getElementById('place' + gameStat.placeNumber)

  console.log(gamePlace,'kkk')

  const gamePlaceSize = gameBoardSize * 60 + 20 + 'px'
  gamePlace.style.width = gamePlaceSize
}

function createPlace(boxIndex, placeNumber) {
  const containerNode = document.getElementById('place' + placeNumber)
  const myDiv = document.createElement('div')

  myDiv.setAttribute('id', boxIndex)
  containerNode.append(myDiv)
}

function createCharacterImage(boxIndex, characterImgSrc) {
  const imgDiv = document.getElementById(boxIndex)
  const img = document.createElement('img')

  img.src = characterImgSrc
  imgDiv.append(img)
}

function createGameArea(gameStat) {
  const gamePlaceArr = gameStat.matrix
  gamePlaceArr.forEach((row, i) => {
    row.forEach((column, j) => {
      const boxIndex = '' + gameStat.placeNumber + `${i}${j}`
      createPlace(boxIndex, gameStat.placeNumber)

      if (column === RABBIT) {
        createCharacterImage(boxIndex, characterDatas.rabbit.src)
      }
      if (column === HOME) {
        createCharacterImage(boxIndex, characterDatas.home.src)
      }

      if (column === WOLF) {
        createCharacterImage(boxIndex, characterDatas.wolf.src)
      }

      if (column === FENCE) {
        createCharacterImage(boxIndex, characterDatas.fence.src)
      }
    })
  })
}

function showGameMessages(gameStat) {
  const mainDivId = 'showMessage' + gameStat.placeNumber
  const mainDiv = document.getElementById(mainDivId)

  const messageId = mainDivId + '> h2'
  const message = document.getElementById(messageId)

  const gameBoard = document.getElementById('main' + gameStat.placeNumber)

  gameBoard.style.display = 'none'

  if (gameStat.gameResult === 'Game Over') {
    message.innerText = 'Game Over'
  } else if (gameStat.gameResult === 'You win!') {
    message.innerText = 'You win!'
  }
  mainDiv.style.display = 'block'
}

function hideOrShowMesaage(gamePlaceNumber) {
  const mainDiv = document.getElementById('showMessage' + gamePlaceNumber)
  mainDiv.style.display = 'none'
  const gameBoard = document.getElementById('main' + gamePlaceNumber)
  gameBoard.style.display = 'block'
}

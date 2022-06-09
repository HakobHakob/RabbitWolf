const characterDatas = {
  rabbit: { name: 'nap', src: 'img/nap.jpg', count: 1 },
  wolf: { name: 'gel', src: 'img/wolf.jpg' },
  home: { name: 'home', src: 'img/home.jpg', count: 1 },
  fence: { name: 'fence', src: 'img/fence.jpg' },
}

const btnsData = {
  UP:{direction:0, btn:document.getElementById("upBtn")},
  DOWN:{direction:1, btn:document.getElementById("downBtn")},
  RIGHT:{direction:2, btn:document.getElementById("rightBtn")},
  LEFT:{direction:3, btn:document.getElementById("leftBtn")},
}


const RABBIT = characterDatas.rabbit.name
const WOLF = characterDatas.wolf.name
const HOME = characterDatas.home.name
const FENCE = characterDatas.fence.name
const FREE_CELL = 0
const X = 0
const Y = 1

function start() {
  clearDivs()
  hideGameMessages()
  const value = selectValue()
  const createMass = createEmptyMass(value)

  const gameStat = {
    matrix: createMass,
    isGameOver: false,
    gameResult: null,
  }

  gameAreaSize(value)
  getRandomPosition(createMass)

  wolvesAndFenceCounts(value)
  Object.values(characterDatas).map((element) => {
    setCharacters(gameStat.matrix, element.name, element.count)
  })

  createGameArea(gameStat.matrix, value)
  moveRabbit(gameStat,btnsData)
  
}

function selectValue() {
  return parseInt(document.getElementById('gameSelect').value)
}

function createEmptyMass(gameBoardSize) {
  const gameBoard = new Array(gameBoardSize)
    .fill(FREE_CELL)
    .map(() => new Array(gameBoardSize).fill(FREE_CELL))

  return gameBoard
}

function getRandomPosition(gamePlaceArr) {
  let x = Math.floor(Math.random() * gamePlaceArr.length)
  let y = Math.floor(Math.random() * gamePlaceArr.length)

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

function wolvesAndFenceCounts(gameBoardSize){
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

function eventForRabbitMoveBtn(gameStat,rabbitDirection,rabbitMoveBtn){
  rabbitMoveBtn.onclick = function(){
    setRabbitInNewCell(gameStat, rabbitDirection)

    wolvesCoordinates(gameStat)
    clearDivs()
    createGameArea(gameStat.matrix) 
  }
      
}
function moveRabbit(gameStat,rabbitMoveBtn) {

  if(gameStat.isGameOver === false){
    eventForRabbitMoveBtn(gameStat,rabbitMoveBtn.LEFT.direction,rabbitMoveBtn.LEFT.btn)
  }
  if(gameStat.isGameOver === false){
    eventForRabbitMoveBtn(gameStat,rabbitMoveBtn.RIGHT.direction,rabbitMoveBtn.RIGHT.btn)
  }
  if(gameStat.isGameOver === false){
    eventForRabbitMoveBtn(gameStat,rabbitMoveBtn.DOWN.direction,rabbitMoveBtn.DOWN.btn)
  }
  if(gameStat.isGameOver === false){
    eventForRabbitMoveBtn(gameStat,rabbitMoveBtn.UP.direction,rabbitMoveBtn.UP.btn)
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
      showGameMessages(gameStat.gameResult)
      break

    case FENCE:
      return

    case WOLF:
      gameStat.isGameOver = true
      gameStat.gameResult = 'Game Over!'
      showGameMessages(gameStat.gameResult)
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
    showGameMessages(gameStat.gameResult)
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

function clearDivs() {
  const place = document.getElementById('place')
  place.innerHTML = ''
}

function gameAreaSize(gameBoardSize) {
  const gamePlace = document.getElementById('place')
  const gamePlaceSize = gameBoardSize * 60 + 20 + 'px'
  gamePlace.style.width = gamePlaceSize
}

function createPlace(boxIndex) {
  const containerNode = document.getElementById('place')
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

function createGameArea(gamePlaceArr) {
  gamePlaceArr.forEach((row, i) => {
    row.forEach((column, j) => {
      const boxIndex = '' + `${i}${j}`
        createPlace(boxIndex)

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

function showGameMessages(gameStatus) {
  const mainDiv = document.getElementById('showMessage')
  const message = document.querySelector('#showMessage > h2')
  const gameBoard = document.getElementById('container')
  gameBoard.style.display = 'none'

  if (gameStatus) {
    message.innerText = gameStatus
  }
  mainDiv.style.display = 'block'
}

function hideGameMessages() {
  const mainDiv = document.getElementById('showMessage')
  mainDiv.style.display = 'none'
  const gameBoard = document.getElementById('container')
  gameBoard.style.display = 'block'
}

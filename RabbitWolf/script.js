const characterDatas = {
  rabbit: { name: 'nap', src: 'img/nap.png', count: 1 },
  wolf: { name: 'gel', src: 'img/wolf.png' },
  home: { name: 'home', src: 'img/home.png', count: 1 },
  fence: { name: 'fence', src: 'img/fence.png' },
}
const btnsData =  {
  UP: {direction: 0},
  DOWN: {direction: 1},
  RIGHT: {direction: 2},
  LEFT: {direction: 3},
}
const RABBIT = characterDatas.rabbit.name
const WOLF = characterDatas.wolf.name
const HOME = characterDatas.home.name
const FENCE = characterDatas.fence.name
const FREE_CELL = 0
const X = 0
const Y = 1
let GAME_PLACE_NUMBER = 1
const GAME_OBJECTS = {}

const newGameBtn = document.querySelector('#createNewGamePLace')
newGameBtn.onclick = showGameAppearance

function createNewGamePlace(GAME_PLACE_NUMBER) {
  const newGamePlace = `
  <div class="main" id="${'main' + GAME_PLACE_NUMBER}">
    <div class="selectDiv">
      <button id="startBtn" onclick="start(${GAME_PLACE_NUMBER})">START</button>
      <select name="select" id="${'gameSelect' + GAME_PLACE_NUMBER}" class = "gameSelect">
        <option class="selectOption" value="5">5x5</option>
        <option class="selectOption" value="7">7x7</option>
        <option class="selectOption" value="10">10x10</option>
      </select>
      <div id="${'arrowsDiv' + GAME_PLACE_NUMBER}">
      <div class="upDiv">
        <button class="up btn" id="${'upBtn' + GAME_PLACE_NUMBER}"><span>&#8593;</span></button>
      </div>
      <div class="leftNadRight">
        <button class="left btn" id="${'leftBtn' + GAME_PLACE_NUMBER}"><span>&#8592;</span></button>
        <button class="right btn" id="${'rightBtn'+ GAME_PLACE_NUMBER}"><span>&#8594;</span></button>
      </div>
      <div class="downDiv">
        <button class="down btn" id="${'downBtn' + GAME_PLACE_NUMBER}"><span>&#8595;</span></button>
      </div>
    </div>
    </div>
    <div id="${'place' + GAME_PLACE_NUMBER}" class = "place"></div>
  </div>

  <div id="${'showMessage' + GAME_PLACE_NUMBER}" class = "showMessage">
  <button id="startBtn" onclick="start(${GAME_PLACE_NUMBER})">START</button>
    <h2></h2>
  </div>`
  return newGamePlace
}

function showGameAppearance() {
  appendGamePlaceElements()
} 

function appendGamePlaceElements() {
  GAME_PLACE_NUMBER++
  const gameContainer = document.getElementById('container')
  const gamePlace = createNewGamePlace(GAME_PLACE_NUMBER)
  const newWrapper = document.createElement('div')
  newWrapper.id = 'wrapper-' + GAME_PLACE_NUMBER
  newWrapper.innerHTML = gamePlace
  gameContainer.append(newWrapper)
}

function start(GAME_PLACE_NUMBER) {
 
if(GAME_OBJECTS[GAME_PLACE_NUMBER]){
    clearInterval(GAME_OBJECTS[GAME_PLACE_NUMBER].intervalId)
}
  const placeNumerSelect = 'gameSelect' + GAME_PLACE_NUMBER
  const value = parseInt(document.getElementById(placeNumerSelect).value)
  const createMass = createEmptyMass(value)  
 
  const gameStat = {
    matrix: createMass,
    isGameOver: false,
    gameResult: null,
    placeNumber: GAME_PLACE_NUMBER,
    wolvesIntervalStatus:false,
    intervalId: setInterval(() => {
      getWolvesCoordinatesAndMove(gameStat)      
      clearDivs(GAME_PLACE_NUMBER)
      createGameArea(gameStat)
    }, 2000),
  }
  GAME_OBJECTS[GAME_PLACE_NUMBER] = gameStat

  clearDivs(gameStat.placeNumber)
  gameAreaSize(value, gameStat)
  getRandomPosition(createMass)
  wolvesAndFenciesCounts(value)

  Object.values(characterDatas).map((element) => {
    setCharacters(gameStat.matrix, element.name, element.count)
  })
  removeBtnsEventListeners(gameStat)
  hideOrShowMesaage(gameStat)
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

function setCharacterAtRandomPosition(gamePlaceArr, character) {
  const [x, y] = getRandomPosition(gamePlaceArr)
  gamePlaceArr[x][y] = character
}

function wolvesAndFenciesCounts(gameBoardSize) {
  characterDatas.wolf.count = Math.ceil((60 * gameBoardSize) / 100)
  characterDatas.fence.count = Math.ceil((40 * gameBoardSize) / 100)
}

function setCharacters(gamePlaceArr, character, characterCount) {
  for (let i = 0; i < characterCount; i++) {
    setCharacterAtRandomPosition(gamePlaceArr, character)
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
    const rabbitNewCoordinates = arrangeNewCoordinates(gamePlaceArr,newCoordsData)
    setRabbitInNewCoordinates(gameStat, rabbitNewCoordinates, rabbitCord, arrow)
  }
}

function removeListeners(element) { 
  const newBtnElement = element.cloneNode(true)
  element.parentNode.replaceChild(newBtnElement, element)
 }

 function getBtnElements(gameStat,btnId){ 
   return document.getElementById(btnId + gameStat.placeNumber) 
 }

 function removeBtnsEventListeners(gameStat) {
  removeListeners(getBtnElements(gameStat, "upBtn"))
  removeListeners(getBtnElements(gameStat, "downBtn"))
  removeListeners(getBtnElements(gameStat, "rightBtn"))
  removeListeners(getBtnElements(gameStat, "leftBtn"))
}

function moveRabbit(gameStat, rabbitMoveBtn) {
    const moveLeft = getBtnElements(gameStat, "leftBtn")
    moveLeft.addEventListener('click',function(){
      addEventsForRabbitMoveBtn(gameStat,rabbitMoveBtn.LEFT.direction) 
    })
    const moveRight = getBtnElements(gameStat, "rightBtn")
    moveRight.addEventListener('click',function(){
      addEventsForRabbitMoveBtn(gameStat,rabbitMoveBtn.RIGHT.direction)   
    })
    const moveDown = getBtnElements(gameStat, "downBtn")
    moveDown.addEventListener('click',function(){
      addEventsForRabbitMoveBtn( gameStat,rabbitMoveBtn.DOWN.direction)  
    })
    const moveUp = getBtnElements(gameStat, "upBtn")
    moveUp.addEventListener('click',function(){
      addEventsForRabbitMoveBtn(gameStat,rabbitMoveBtn.UP.direction)  
    })    
}

function addEventsForRabbitMoveBtn(gameStat, rabbitDirection) {      
  setRabbitInNewCell(gameStat, rabbitDirection)
  clearDivs(gameStat.placeNumber)
  createGameArea(gameStat)  
}

function rabbitCoordinatesForNewCell([x, y]) {
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y + 1],
    [x, y - 1],
  ]
}

function rabbitCoordsForCorrect([x, y], gamePlaceArr) {
  const maxValue = gamePlaceArr.length
  x = (x + maxValue) % maxValue
  y = (y + maxValue) % maxValue
  return [x, y]
}

function arrangeNewCoordinates(gamePlaceArr, newCoordsData) {
  return newCoordsData.map(([x, y]) =>
    rabbitCoordsForCorrect([x, y], gamePlaceArr)
  )
}
function setRabbitInNewCoordinates(gameStat,rabbitNewCoordinates,rabbitCord,arrow) {
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
      gameStat.gameResult = 'win'
      showGameMessages(gameStat)
      break

    case FENCE:
      return

    case WOLF:
      gameStat.gameResult = 'over'
      showGameMessages(gameStat)
      break
  }
  return [newX, newY]
}

function getWolvesCoordinatesAndMove(gameStat) {
  if (gameStat.isGameOver === true) {
    showGameMessages(gameStat)
    return
  } else {
    const wolvesCoordinates = findCordOfCharacter(gameStat.matrix, WOLF)
    wolvesCoordinates.forEach((wolf) => {
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
  return cells.filter(([x, y]) => gamePlaceArr[x][y] === character)
}

function findEmptyCellsAroundWolf(gameStat, cords) {
  const gamePlaceArr = gameStat.matrix
  const rabbitFound = cellCharacter(gamePlaceArr, cords, RABBIT)

  if (rabbitFound.length > 0) {
    gameStat.wolvesIntervalStatus = true
    gameStat.gameResult = 'over'
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

function clearDivs(GAME_PLACE_NUMBER) {
  const place = document.getElementById('place' + GAME_PLACE_NUMBER)
  place.innerHTML = ''
}

function gameAreaSize(gameBoardSize, gameStat) {
  const placeId = 'place' + gameStat.placeNumber
  const gamePlace = document.getElementById(placeId)

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

function changeWolvesCellBackground(boxIndex,color){
  const imgDiv = document.getElementById(boxIndex)
  imgDiv.style.backgroundColor = color
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
        // changeWolvesCellBackground(boxIndex,"red")
      }

      if (column === FENCE) {
        createCharacterImage(boxIndex, characterDatas.fence.src)
      }
    })
  })
}

function showGameMessages(gameStat) {
  const messageDivId = 'showMessage' + gameStat.placeNumber
  const messageDiv = document.getElementById(messageDivId)
  const messageId = '#' + messageDivId + '>h2'
  const message = document.querySelector(messageId)
  const gameBoard = document.getElementById('main' + gameStat.placeNumber)

  gameBoard.style.display = 'none'

  if (gameStat.gameResult === 'over') {
    gameStat.isGameOver = true
    message.innerText = 'Game Over'
  }
  if (gameStat.gameResult === 'win') {
    gameStat.isGameOver = true
    message.innerText = 'You win!'
  }
  messageDiv.style.display = 'block'
}

function hideOrShowMesaage(gameStat) {
  const messageDiv = document.getElementById(
    'showMessage' + gameStat.placeNumber
  )
  messageDiv.style.display = 'none'
  const gameBoard = document.getElementById('main' + gameStat.placeNumber)
  gameBoard.style.display = 'block'
}

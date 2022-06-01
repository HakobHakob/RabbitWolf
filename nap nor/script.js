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

  let some = findCordOfCharacter(createMass, RABBIT);
  const  rabbitCoord  = Array.from(some);

  console.log(rabbitCoord)



 

  moveRabbit(createMass, RABBIT,rabbitCoord)


 
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



// function findCordOfCharacter(gamePlaceArr, character) {

//   const findInGameplace = function (accumulator, row, x) {
//     row.forEach((element, y) => {
//       if (element === character) {
//         accumulator.push([x, y]);
//       }
//     });
//     return accumulator;
//   };
//   return gamePlaceArr.reduce(findInGameplace, []);
// }



function findCordOfCharacter(gamePlaceArr, character){
  for (let i = 0; i < gamePlaceArr.length; i++) {
    for (let k = 0; k < gamePlaceArr.length; k++) {
      if (gamePlaceArr[i][k] === character) {
        return [i, k];
      }
    }
  }
}




function keyDownLeft(gamePlaceArr, character){

 

  const [x, y] = findCordOfCharacter(gamePlaceArr, character);

  console.log([x,y])
  // const rabbitCoord = imgDatas.rabbit;
  //  = rabbitCoord;

  if(gamePlaceArr[x][y - 1] === FREE_CELL){

    gamePlaceArr[x][y] = FREE_CELL;
    gamePlaceArr[x][y - 1] = character;

  } else if(gamePlaceArr[x][y - 1] === WOLF ){

    alert('GAME OVER');

  } else if(gamePlaceArr[x][y - 1] === HOME ){

    alert('You Won!');
  }

}

function keyDownRight(gamePlaceArr, character,rabbitCoord){
  const [x, y] = rabbitCoord;
  // const rabbitCoord = imgDatas.rabbit;
  //  = rabbitCoord;

  if(gamePlaceArr[x][ y + 1] === FREE_CELL){

    gamePlaceArr[x][y] = FREE_CELL;
    gamePlaceArr[x][y + 1] = character;

  } else if(gamePlaceArr[x][y + 1] === WOLF ){

    alert('GAME OVER');

  } else if(gamePlaceArr[x][y + 1] === HOME ){
    
    alert('You Won!');
  }

}

function keyDownDown(gamePlaceArr, character,rabbitCoord){
  const [x, y] = rabbitCoord;
  // const rabbitCoord = imgDatas.rabbit;
  //  = rabbitCoord;

  if(gamePlaceArr[x + 1] [y] === FREE_CELL){

    gamePlaceArr[x][y] = FREE_CELL;
    gamePlaceArr[x + 1] [y] = character;

  } else if(gamePlaceArr[x + 1] [y] === WOLF ){

    alert('GAME OVER');

  } else if(gamePlaceArr[x][y + 1] === HOME ){
    
    alert('You Won!');
  }

}

function keyDownUp(gamePlaceArr, character,rabbitCoord){
  const [x, y] = rabbitCoord;

  // const rabbitCoord = imgDatas.rabbit;
  //  = rabbitCoord;

  if(gamePlaceArr[x - 1] [y] === FREE_CELL){

    gamePlaceArr[x][y] = FREE_CELL;
    gamePlaceArr[x - 1] [y] = character;

  } else if(gamePlaceArr[x - 1] [y] === WOLF ){

    alert('GAME OVER');

  } else if(gamePlaceArr[x - 1] [y] === HOME ){
    
    alert('You Won!');
  }

}

window.addEventListener('keydown', moveRabbit);
function moveRabbit(gamePlaceArr, character,rabbitCoord) {

  if (event.key === "ArrowLeft") {
    keyDownLeft(gamePlaceArr, character,rabbitCoord);
    console.log(gamePlaceArr);

  } else if (event.key ===  "ArrowRight" ) {
    keyDownRight(gamePlaceArr, character,rabbitCoord);
    console.log(gamePlaceArr);

  } else if (event.key === "ArrowDown" ) {
    keyDownDown(gamePlaceArr, character,rabbitCoord);
    console.log(gamePlaceArr);

  } else if (event.key === "ArrowUp") {
    keyDownUp(gamePlaceArr, character,rabbitCoord);
    console.log(gamePlaceArr);

   
   }
};

  // const rabbitCoord = imgDatas.rabbit;

  // const rabbitNewCoord = rabbitCoord.map((rabbitCoord) => {
  //   const [x, y] = rabbitCoord;

  //   return {
  //     ArrowLeft: ([newX, newY] = [x, y - 1]), //left
  //     ArrowUp: ([newX, newY] = [x - 1, y]), //up
  //     ArrowRight: ([newX, newY] = [x, y + 1]), //right
  //     ArrowDown: ([newX, newY] = [x + 1, y]), //down
  //   }[event.key];

  // });
  
  // characterCord.rabbit = rabbitNewCoord;

   

  // console.log(rabbitNewCoord, 'gujyy');
// }



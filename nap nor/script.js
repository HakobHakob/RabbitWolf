//Get the selected option value and create
let napo = [
  {
    id: 1,
    name: 'nap',
    src: 'img/nap.jpg',
  },
  {
    id: 2,
    name: 'gel',
    src: 'img/wolf.jpg',
  },
  {
    id: 3,
    name: 'home',
    src: 'img/home.jpg',
  },
  {
    id: 4,
    name: 'fence',
    src: 'img/fence.jpg',
  },
];

function start() {
  clearDivs();
  const value = selectValue();
  const createMass = createEmptyMass(value);
  createDivs(createMass, value);
  nodeList();

  wolfCount(value);
  fenseCount(value);

  createNap( value);
  createHome(value)
}

function createDivs(emptyMass, value) {
  emptyMass.map((item) => {
    item.map((item) => {
      createPlace(value);
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

function createEmptyMass(value) {
  const zero = 0;

  const bigPlace = new Array(value)
    .fill(zero)
    .map(() => new Array(value).fill(zero));

  return bigPlace;
}

function clearDivs() {
  const place = document.getElementById('place');
  place.innerHTML = '';
}

function createPlace(value) {
  const place = document.getElementById('place');

  if (value == 5) {
    place.style.width = '350px';
  }

  if (value == 7) {
    place.style.width = '450px';
  }

  if (value == 10) {
    place.style.width = '680px';
  }

 
  const myDiv = document.createElement('div');

 
  
  place.append(myDiv);
}



function nodeList(value) {
  // const nodeList = document.querySelectorAll('#place div');

  const some = createEmptyMass(value);

  const rnd = Math.floor(Math.random() * some.length);

  const result = some[rnd];

  console.log(result);

  return result;
}

function wolfCount(value){
  const wolfCount = Math.ceil((60 * value) / 100);
}

function fenseCount(value){
  const fenseCount = Math.ceil((40 * value) / 100);
}




function createNap(value){

  const emptyMass = createEmptyMass(value);

      let rndRow = Math.floor(Math.random() * value);
      let rndCol = Math.floor(Math.random() * value);
      
      if(emptyMass[rndRow][rndCol] == 0){
        emptyMass[rndRow][rndCol] = 1
      }
      
  

  console.log(emptyMass);
  return emptyMass
}

function createHome(value){

  const emptyMass = createEmptyMass(value);
  
      let rndRow = Math.floor(Math.random() * value);
      let rndCol = Math.floor(Math.random() * value);
      
      if(emptyMass[rndRow][rndCol] == 0){
        emptyMass[rndRow][rndCol] = 3
      }
  return emptyMass
}

function createWolf(value){

  const wolf =  wolfCount(value);

  const emptyMass = createEmptyMass(value);

  for(let i=0; i < wolf; i++ ){
  
      let rndRow = Math.floor(Math.random() * value);
      let rndCol = Math.floor(Math.random() * value);
      
      if(emptyMass[rndRow][rndCol] == 0){
        emptyMass[rndRow][rndCol] = 2
      }
    }
  return emptyMass
}

// function createImg() {
//   for (const key in napo) {
//     if (napo[key].name) {
//       const img = document.createElement('img');
//       const imgSrc = napo[key].src;
//       img.src = imgSrc;

//       const node = nodeList();

//       node.appendChild(img);
//     }
//   }
// }

// function nodeList() {
//   const nodeList = document.querySelectorAll('#place div');

//   const rnd = Math.floor(Math.random() * nodeList.length);

//   const result = nodeList[rnd];

//   return result;
// }

// function createImg() {
//   for (const key in napo) {
//     if (napo[key].name) {
//       const img = document.createElement('img');
//       const imgSrc = napo[key].src;
//       img.src = imgSrc;

//       const node = nodeList();

//        node.appendChild(img);
//     }
//   }
// }

// function getNapoDivId() {
//   const node = nodeList();

//   for (let j = 0; j < node.length; j++) {
//     if (nodeList[j].innerHTML !== '') {
//       console.log(nodeList[j]);
//     }
//   }

//   const result = pictureArr.filter((napoId) => napo[key].name === 'nap');
// }


// }

// for(key in napo){
//   if(napo[key].name === 'nap'){

//     console.log(napo[key]);

//   }
// }

// document.addEventListener('keypress', function onEvent(event) {
//   if (event.key === 'ArrowLeft') {
//     alert('hello');
//   } else if (event.key === 'Enter') {
//     alert('hajox');
//   }
// });

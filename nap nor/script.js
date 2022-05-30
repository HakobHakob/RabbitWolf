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

  createImg( value)

  // createImg();
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



//get random int

function nodeList(value) {
  // const nodeList = document.querySelectorAll('#place div');

  const some = createEmptyMass(value);

  const rnd = Math.floor(Math.random() * some.length);

  const result = some[rnd];

  console.log(result);

  return result;
}

function createImg( value){

  const emptyMass = createEmptyMass(value);

  console.log(emptyMass)

  for(let i = 0; i < value; i++){
      let rndRow = Math.floor(Math.random() * value)
      let rndCol = Math.floor(Math.random() * value)

      console.log(rndRow,rndCol)
      
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

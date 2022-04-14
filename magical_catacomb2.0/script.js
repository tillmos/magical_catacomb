

imageList = [
    { id: "kanyar", north: false, south: true, east: true, west: false, src: "00.PNG", fix: true, rotated: 0, isPLayerThere: false,hasDiamond: false },
    { id: "egyenes", north: false, south: false, east: true, west: true, src: "straight.PNG", fix: true, rotated: 0, isPLayerThere: false,hasDiamond: false },
    { id: "t", north: false, south: true, east: true, west: true, src: "02.PNG", fix: true, rotated: 0, isPLayerThere: false,hasDiamond: false },
    { id: 'button', nyitott: [], src: 'arrow_final.png', fix: true, rotated: 0 }
]

let straight = new Array(13)
let curve = new Array(15)
let letterT = new Array(6)
straight.fill({ id: "egyenes", north: false, south: false, east: true, west: true, src: "straight.PNG", fix: true, rotated: 0, isPLayerThere: false,hasDiamond: false }, 0, 13)
curve.fill({ id: "kanyar", north: false, south: true, east: true, west: false, src: "00.PNG", fix: true, rotated: 0, isPLayerThere: false ,hasDiamond: false}, 0, 15)
letterT.fill({ id: "t", north: false, south: true, east: true, west: true, src: "02.PNG", fix: true, rotated: 0, isPLayerThere: false,hasDiamond: false }, 0, 6)

allRooms = new Array();
allRooms.push(straight)
allRooms.push(curve)
allRooms.push(letterT)

rotate = [90, 180, 270, 0];

player1 = [{ id: 1, positionI: 1, positionJ: 1, numOfCollected: 0, color: 'blue', srcP: 'bloo.png', srcD: 'diamond.png', diamonds: [{ positionI: 0, positionJ: 0, collected: false }, { positionI: 0, positionJ: 0, collected: false }, { positionI: 0, positionJ: 0, collected: false }] }]


let indexSet = new Set()
let randomArray = new Array(3);


for (let i = 0; i < player1[0].diamonds.length; i++) {
    let randomDiamondI = Math.floor(Math.random() * (7 - 1 + 1) + 1)
    let randomDiamondJ = Math.floor(Math.random() * (7 - 1 + 1) + 1)

    let iscorner = false;
    if (randomDiamondI === 1 && randomDiamondJ === 1 || randomDiamondI === 7 && randomDiamondJ === 1 || randomDiamondI === 7 && randomDiamondJ === 7 || randomDiamondI === 1 && randomDiamondJ === 7) {
        iscorner = true;

    }

    if (!iscorner && !randomArray.includes(([randomDiamondI, randomDiamondJ]).toString())) {
        player1[0].diamonds[i].positionI = randomDiamondI;
        player1[0].diamonds[i].positionJ = randomDiamondJ;
        randomArray[i] = ([randomDiamondI, randomDiamondJ]).toString();

    }

    else {
        i--;
        randomDiamondI = Math.floor(Math.random() * (7 - 1 + 1) + 1)
        randomDiamondJ = Math.floor(Math.random() * (7 - 1 + 1) + 1)
    }

}

matrix = [

    ['n', 'n', 'b', 'n', 'b', 'n', 'b', 'n', 'n'],
    ['n', 'f', 'm', 'f', 'm', 'f', 'm', 'f', 'n'],
    ['b', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'b'],
    ['n', 'f', 'm', 'f', 'm', 'f', 'm', 'f', 'n'],
    ['b', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'b'],
    ['n', 'f', 'm', 'f', 'm', 'f', 'm', 'f', 'n'],
    ['b', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'b'],
    ['n', 'f', 'm', 'f', 'm', 'f', 'm', 'f', 'n'],
    ['n', 'n', 'b', 'n', 'b', 'n', 'b', 'n', 'n']


]

const table = document.querySelector('table')
const tableAndExcessDiv = document.createElement('div');
tableAndExcessDiv.classList.add('wrapper');
const excessRoomdiv = document.createElement('div');
const tableDiv = document.createElement('div');
tableDiv.classList.add('first')
let excessRoom = [{}];
let newExcessRoom = [{}];
const body = document.querySelector('body');
body.onkeydown = function (e) { handlePlayer(e) };

function randomCell() {
    let actual;
    actual = straight.at(-1)
    straight.splice(straight.at(-1), 1);
    return actual
}

function plusOneRoom() {
    let randomRotate = Math.floor(Math.random() * 3);
    let img = document.createElement("img");
    let rotateDeg = rotate[randomRotate]

    img.src = allRooms[0][0].src
    excessRoom = { img: img, data: allRooms[0][0] };
    excessRoom.data.fix = false;

    excessRoom.data.rotated = rotateDeg;
    excessRoom.img.style.transform = 'rotate(' + excessRoom.data.rotated + 'deg)';

    excessRoomdiv.innerHTML = '<p> Kimaradó szoba: </p> '
    excessRoomdiv.append(img)
    tableAndExcessDiv.append(excessRoomdiv);
    excessRoomdiv.classList.add('second')
    
    img.addEventListener("click",handelExcessRoomClick)
    excessRoom.img.classList.add("notfix")
    if (excessRoom.data.id === 'egyenes') {
           
        if ((excessRoom.data.rotated % 360) / 90 === 1) {
            excessRoom.data.north = true;
            excessRoom.data.south = true;
            excessRoom.data.east = false;
            excessRoom.data.west = false;
        }
        if (((excessRoom.data.rotated %360) / 90) === 2) {
            excessRoom.data.north = false;
            excessRoom.data.south = false;
            excessRoom.data.east = true;
            excessRoom.data.west = true;
        }

        if (excessRoom.data.rotated % 360 / 90 === 0) {
            excessRoom.data.north = false;
            excessRoom.data.south = false;
            excessRoom.data.east = true;
            excessRoom.data.west = true;

        }
        if (excessRoom.data.rotated % 360 / 90 === 3) {
            excessRoom.data.north = true;
            excessRoom.data.south = true;
            excessRoom.data.east = false;
            excessRoom.data.west = false;
      
        }
    }
    if (excessRoom.data.id === "kanyar") {
        if ((excessRoom.data.rotated % 360) / 90 === 0) {
            excessRoom.data.north = false;
            excessRoom.data.south = true;
            excessRoom.data.east = true;
            excessRoom.data.west = false;
        }
        if ((excessRoom.data.rotated% 360) / 90 === 1) {
            excessRoom.data.north = false;
            excessRoom.data.south = true;
            excessRoom.data.east = false;
            excessRoom.data.west = true;
        }

        if ((excessRoom.data.rotated% 360) / 90 === 2) {
            excessRoom.data.north = true;
            excessRoom.data.south = false;
            excessRoom.data.east = false;
            excessRoom.data.west = true;

        }
        if ((excessRoom.data.rotated% 360) / 90 === 3) {
            excessRoom.data.north = true;
            excessRoom.data.south = false;
            excessRoom.data.east = true;
            excessRoom.data.west = false;
        }
    }
    if(excessRoom.data.id === "t"){
        if ((excessRoom.data.rotated % 360)/ 90 === 0) {
            excessRoom.data.north = false;
            excessRoom.data.south = true;
            excessRoom.data.east = true;
            excessRoom.data.west = true;

        }
        if ((excessRoom.data.rotated % 360)/ 90 === 1) {
            excessRoom.data.north = true;
            excessRoom.data.south = true;
            excessRoom.data.east = false;
            excessRoom.data.west = true;

        }
        if ((excessRoom.data.rotated% 360)/ 90 === 2) {
            excessRoom.data.north = true;
            excessRoom.data.south = false;
            excessRoom.data.east = true;
            excessRoom.data.west = true;

        }
        if ((excessRoom.data.rotated% 360) / 90 === 3) {
            excessRoom.data.north = true;
            excessRoom.data.south = true;
            excessRoom.data.east = true;
            excessRoom.data.west = false;

        }
        if ((excessRoom.data.rotated % 360)/ 90 === 4) {
            excessRoom.data.north = false;
            excessRoom.data.south = true;
            excessRoom.data.east = true;
            excessRoom.data.west = true;
        }

    }
    excessRoom.img.classList.add("sample")
    excessRoom.img.classList.add("notfix")

    return excessRoom

}


function handelExcessRoomClick(e){
    excessRoom.data.fix = false;
 
    excessRoom.data.rotated += 90;

    excessRoom.img.style.transform = 'rotate(' + excessRoom.data.rotated + 'deg)';
    e.target.style.transform = 'rotate(' + excessRoom.data.rotated + 'deg)';

    if (excessRoom.data.id === 'egyenes') {
           
        if ((excessRoom.data.rotated % 360) / 90 === 1) {
            excessRoom.data.north = true;
            excessRoom.data.south = true;
            excessRoom.data.east = false;
            excessRoom.data.west = false;
        }
        if (((excessRoom.data.rotated %360) / 90) === 2) {
            excessRoom.data.north = false;
            excessRoom.data.south = false;
            excessRoom.data.east = true;
            excessRoom.data.west = true;
        }

        if (excessRoom.data.rotated % 360 / 90 === 0) {
            excessRoom.data.north = false;
            excessRoom.data.south = false;
            excessRoom.data.east = true;
            excessRoom.data.west = true;

        }
        if (excessRoom.data.rotated % 360 / 90 === 3) {
            excessRoom.data.north = true;
            excessRoom.data.south = true;
            excessRoom.data.east = false;
            excessRoom.data.west = false;
     
        }
    }
    if (excessRoom.data.id === "kanyar") {
        if ((excessRoom.data.rotated % 360) / 90 === 0) {
            excessRoom.data.north = false;
            excessRoom.data.south = true;
            excessRoom.data.east = true;
            excessRoom.data.west = false;
        }
        if ((excessRoom.data.rotated% 360) / 90 === 1) {
            excessRoom.data.north = false;
            excessRoom.data.south = true;
            excessRoom.data.east = false;
            excessRoom.data.west = true;
        }

        if ((excessRoom.data.rotated% 360) / 90 === 2) {
            excessRoom.data.north = true;
            excessRoom.data.south = false;
            excessRoom.data.east = false;
            excessRoom.data.west = true;

        }
        if ((excessRoom.data.rotated% 360) / 90 === 3) {
            excessRoom.data.north = true;
            excessRoom.data.south = false;
            excessRoom.data.east = true;
            excessRoom.data.west = false;
        }
    }
    if(excessRoom.data.id === "t"){
        if ((excessRoom.data.rotated % 360)/ 90 === 0) {
            excessRoom.data.north = false;
            excessRoom.data.south = true;
            excessRoom.data.east = true;
            excessRoom.data.west = true;

        }
        if ((excessRoom.data.rotated % 360)/ 90 === 1) {
            excessRoom.data.north = true;
            excessRoom.data.south = true;
            excessRoom.data.east = false;
            excessRoom.data.west = true;

        }
        if ((excessRoom.data.rotated% 360)/ 90 === 2) {
            excessRoom.data.north = true;
            excessRoom.data.south = false;
            excessRoom.data.east = true;
            excessRoom.data.west = true;

        }
        if ((excessRoom.data.rotated% 360) / 90 === 3) {
            excessRoom.data.north = true;
            excessRoom.data.south = true;
            excessRoom.data.east = true;
            excessRoom.data.west = false;

        }
        if ((excessRoom.data.rotated % 360)/ 90 === 4) {
            excessRoom.data.north = false;
            excessRoom.data.south = true;
            excessRoom.data.east = true;
            excessRoom.data.west = true;
        }

    }
    excessRoom.img.classList.add("sample")
    excessRoom.img.classList.add("notfix")
    e.target.classList.add('sample');
    e.target.classList.add('notfix');
    
}
function updateExcessRoom() {
   
    excessRoom = { ...newExcessRoom };
    let img = document.createElement("img");
    img.src = excessRoom.data.src
    
    excessRoom.img.classList.add("notfix")
    img.style.transform = 'rotate(' + excessRoom.data.rotated + 'deg)';
    excessRoomdiv.innerHTML = '<p> Kimaradó szoba: </p> '

    excessRoomdiv.classList.add('second')
    excessRoom.data.fix = false;
    img.addEventListener("click",handelExcessRoomClick)
    excessRoomdiv.append(img)
    tableAndExcessDiv.append(excessRoomdiv);

}

function createTable(tableData) {
    tableData.forEach(function (rowData) {
        var row = document.createElement('tr');
        rowData.forEach(function (cellData) {
            var cell = document.createElement('td');
            if (cellData.data.id === 'button') {

                cellData.button.append(cellData.img)
                cell.append(cellData.button)
            }
            else {

                //cell.append(cellData.img);
                cell.append(cellData.img3)
  
                cell.append(cellData.img)
                cell.append(cellData.img2)

            }
            row.appendChild(cell);

        });

        table.appendChild(row);

    });

    tableDiv.append(table)
    tableAndExcessDiv.append(tableDiv, excessRoomdiv);

    document.body.appendChild(tableAndExcessDiv);
    document.body.onload = plusOneRoom();
}

let countOfStraight = 0;
let countOfCurve = 0;
let countOfT = 0;


for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {

        if (matrix[i][j] === 'f') {
            if (i === 1 && j === 1) {

                matrix[i][j] = { ...imageList[0] };
                matrix[i][j].north = false;
                matrix[i][j].south = true;
                matrix[i][j].east = true;
                matrix[i][j].west = false;


            }
            if (i === 1 && j === 7) {

                matrix[i][j] = { ...imageList[0] }
                matrix[i][j].rotated = 90;
                matrix[i][j].north = false;
                matrix[i][j].south = true;
                matrix[i][j].east = false;
                matrix[i][j].west = true;


            }

            if (i === 7 && j === 1) {

                matrix[i][j] = { ...imageList[0] };
                matrix[i][j].rotated = 270;
                matrix[i][j].north = true;
                matrix[i][j].east = true;
                matrix[i][j].south = false;
                matrix[i][j].west = false;


            }
            if (i === 7 && j === 7) {

                matrix[i][j] = { ...imageList[0] };
                matrix[i][j].rotated = 180;
                matrix[i][j].north = true;
                matrix[i][j].east = false;
                matrix[i][j].south = false;
                matrix[i][j].west = true;

            }
            if (i === 1 && j === 3 || i === 1 && j === 5 || i === 3 && j === 5) {
                matrix[i][j] = { ...imageList[2] };
                matrix[i][j].north = false;
                matrix[i][j].east = true;
                matrix[i][j].south = true;
                matrix[i][j].west = true;


            }
            if ((i === 3 && j === 1) || (i === 5 && j === 1) || (i === 3 && j === 3)) {

                matrix[i][j] = { ...imageList[2] };
                matrix[i][j].rotated = 270;
                matrix[i][j].north = true;
                matrix[i][j].east = true;
                matrix[i][j].south = true;
                matrix[i][j].west = false;


            }
            if (i === 7 && j === 3 || i === 7 && j === 5 || i === 5 && j === 3) {

                matrix[i][j] = { ...imageList[2] };
                matrix[i][j].rotated = 180;
                matrix[i][j].north = true;
                matrix[i][j].east = true;
                matrix[i][j].west = true;
                matrix[i][j].south = false;



            }
            if (i === 3 && j === 7 || i === 5 && j === 7 || i === 5 && j === 5) {

                matrix[i][j] = { ...imageList[2] };
                matrix[i][j].rotated = 90;
                matrix[i][j].north = true;
                matrix[i][j].east = false;
                matrix[i][j].west = true;
                matrix[i][j].south = true;

            }

        }
        if (matrix[i][j] === 'm') {

            let found = false;
            let tmp
            let randomRotate = Math.floor(Math.random() * rotate.length)
            while (!found) {

                let random = Math.floor(Math.random() * allRooms.length)
                if (random === 0 ) {

                    //egyenes
                    


                    tmp = { ...allRooms[random][0] };
                    

                    tmp.rotated = rotate[randomRotate]
                    if ((tmp.rotated / 90) === 1) {
                        tmp.north = true;
                        tmp.south = true;
                        tmp.east = false;
                        tmp.west = false;
                
                    }
                    if ((tmp.rotated / 90) === 2) {
                        tmp.north = false;
                        tmp.south = false;
                        tmp.east = true;
                        tmp.west = true;
                    
                    }

                    if (tmp.rotated / 90 === 0) {
                        tmp.north = false;
                        tmp.south = false;
                        tmp.east = true;
                        tmp.west = true;
     
                    }
                    if (tmp.rotated / 90 === 3) {
                        tmp.north = true;
                        tmp.south = true;
                        tmp.east = false;
                        tmp.west = false;

                    }
               
                    found = true;
                    allRooms[random].pop();
                }
                if (random === 1 ) {
                    //KANYAR
                    tmp = { ...allRooms[random][0] };
                 

                    tmp.rotated = rotate[randomRotate]
                    


                    if ((tmp.rotated / 90) === 0) {
                        tmp.north = false;
                        tmp.south = true;
                        tmp.east = true;
                        tmp.west = false;


                    }
                    if (tmp.rotated / 90 === 1) {
                        tmp.north = false;
                        tmp.south = true;
                        tmp.east = false;
                        tmp.west = true;
                     
     
                    }
                    if (tmp.rotated / 90 === 2) {
                        tmp.north = true;
                        tmp.south = false;
                        tmp.east = false;
                        tmp.west = true;
                
                    }
                   
                    if (tmp.rotated / 90 === 3) {
                        
                        tmp.north = true;
                        tmp.south = false;
                        tmp.east = true;
                        tmp.west = false;
         
                    }
                    found = true;
                    allRooms[random].pop();
      
                }
                if (random === 2 ) {
                    //T ALAK

                    tmp = { ...allRooms[random][0] };


                    tmp.rotated = rotate[randomRotate]
                    if (tmp.rotated / 90 === 0) {
                        tmp.north = false;
                        tmp.south = true;
                        tmp.east = true;
                        tmp.west = true;
  

                    }
                    if (tmp.rotated / 90 === 1) {
                        tmp.north = true;
                        tmp.south = true;
                        tmp.east = false;
                        tmp.west = true;

                    }
                    if (tmp.rotated / 90 === 2) {
                        tmp.north = true;
                        tmp.south = false;
                        tmp.east = true;
                        tmp.west = true;
           

                    }
                    if (tmp.rotated / 90 === 3) {
                        tmp.north = true;
                        tmp.south = true;
                        tmp.east = true;
                        tmp.west = false;
                    }
                    found = true;
                    allRooms[random].pop();

                }

                if (allRooms[random].length === 0) {
                    allRooms.splice(random, 1);

                }


            }

            matrix[i][j] = { ...tmp }
                    matrix[i][j].rotated = tmp.rotated
                    matrix[i][j].fix = false;
                    matrix[i][j].north = tmp.north;
                    matrix[i][j].south = tmp.south;
                    matrix[i][j].east = tmp.east;
                    matrix[i][j].west = tmp.west;
            tmp = null;

        }
        if (matrix[i][j] === 'b') {

            if (i === 0 && j === 2 || i === 0 && j === 4 || i === 0 && j === 6) {
                matrix[i][j] = { ...imageList[3] };
                matrix[i][j].rotated = 270;
            }
            if (i === 2 && j === 0 || i === 4 && j === 0 || i === 6 && j === 0) {
                matrix[i][j] = { ...imageList[3] };
                matrix[i][j].rotated = 180;
            }
            if (i === 8 && j === 2 || i === 8 && j === 4 || i === 8 && j === 6) {
                matrix[i][j] = { ...imageList[3] };
                matrix[i][j].rotated = 90;
            }
            if (i === 2 && j === 8 || i === 4 && j === 8 || i === 6 && j === 8) {
                matrix[i][j] = { ...imageList[3] };
            }

        }
        if (matrix[i][j] === 'n') {
            matrix[i][j] = { id: 'empty' }
        }


    }
}


for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {

        if (matrix[i][j].id !== 'empty') {
            if (matrix[i][j].id !== 'button') {

                let img = document.createElement("img");

                img.src = matrix[i][j].src;

                img.indexes = i.toString() + ',' + j.toString();
                if (i === 1 && j === 1) {

                    let img3 = document.createElement('img');
                    img3.src = player1[0].srcP;

                    img3.id = 'player'
                    img3.addEventListener("onkeyDown", function (e) { handlePlayer(e) })
                    matrix[i][j] = { img: img, img2: '', img3: img3, data: matrix[i][j] }
             

                }

                if (player1[0].diamonds[0].positionI === i && player1[0].diamonds[0].positionJ === j ||
                    player1[0].diamonds[1].positionI === i && player1[0].diamonds[1].positionJ === j ||
                    player1[0].diamonds[2].positionI === i && player1[0].diamonds[2].positionJ === j) {
                        matrix[i][j].hasDiamond = true;
                   


                    let img2 = document.createElement("img");
                    img2.src = player1[0].srcD
                    img2.classList.add('image2')
                    matrix[i][j] = { img: img, img2: img2, img3: '', data: matrix[i][j] };
                }
                else if (i !== 1 || j !== 1) {

              
                    matrix[i][j] = { img: img, img2: '', img3: '', data: matrix[i][j] };
                }

                matrix[i][j].img.style.transform = 'rotate(' + matrix[i][j].data.rotated + 'deg)';
           
                if (matrix[i][j].data.fix === false) {
                    img.classList.add('notfix')
                }

            }

            if (matrix[i][j].id === 'button') {
  
                let img = document.createElement("img");
                let btn = document.createElement("button");

                btn.addEventListener("click", function (e) { handleBetolás(e.target.indexes, matrix) })
                img.src = matrix[i][j].src;
                btn.classList.add('button');

                btn.style.background = "none";
                btn.style.border = "none";
                img.indexes = i.toString() + ',' + j.toString();

                matrix[i][j] = { img: img, button: btn, data: matrix[i][j] };
                if (matrix[i][j].data.id === 'button') {

                    matrix[i][j].img.style.transform = 'rotate(' + matrix[i][j].data.rotated + 'deg)';
                }

            }

        }
        if (matrix[i][j].id === 'empty') {
            matrix[i][j] = { img: '', img2: '', img3: '', data: matrix[i][j] }

        }

    }
}

createTable(matrix)

function handleBetolás(indexes, matrix) {

    if (indexes !== undefined) {
        var ids = indexes.split(',');
        var buttonI = parseInt(ids[0]);
        var buttonJ = parseInt(ids[1]);


    }
    if (buttonI === 8 && buttonJ === 2 || buttonI === 8 && buttonJ === 4 || buttonI === 8 && buttonJ === 6) {
        let tmpRow = new Array(9)
        
        newExcessRoom = { ...matrix[1][buttonJ] };
        for (let j = 0; j < 9; j++) {


            if (matrix[j][buttonJ].data.id !== 'button') {
            
                tmpRow[j] = { ...matrix[j + 1][buttonJ] }
            }
            else {
                tmpRow[j] = { ...matrix[j][buttonJ] };
            }
           
        }
        tmpRow[7] = { ...excessRoom };
        if(newExcessRoom.data.hasDiamond){
            tmpRow[7].data.hasDiamond = true;
             newExcessRoom.data.hasDiamond = false;
             let image2 = document.createElement('img');
             image2.src = "diamond.png"
             image2.classList.add('image2');
            
 
            tmpRow[7].img2 = image2;
 
         }
        

        updateExcessRoom()

        let col = [];
        for (let j = 1; j < 8; j++) {
          
            col[j - 1] = table.rows[j].cells[buttonJ]

        }

        for (let j = 1; j < 8; j++) {
            table.rows[j].deleteCell(buttonJ);
        }
        for (let j = 1; j < 8; j++) {

            let cell = table.rows[j].insertCell(buttonJ)
            
            let image = document.createElement('img')

            if (image.src = tmpRow[j].data !== undefined) {
                image.indexes = j.toString() + ',' + buttonJ.toString();
                image.classList.add('notfix')

                image.src = tmpRow[j].data.src



                image.style.transform = 'rotate(' + tmpRow[j].data.rotated + 'deg)';
                cell.append(image)
                
              
                if(tmpRow[j].data.hasDiamond){
                    let image2 = document.createElement('img');
                    //image2.indexes = buttonI.toString() + ',' + j.toString();
                    image2.classList.add('image2');
                    image2.src = "diamond.png"
                    cell.append(image2)
               
    

                }
      
            }

        }
        for (let j = 1; j < 8; j++) {
            matrix[j][buttonJ] = { ...tmpRow[j] };
        }


    }
    if (buttonI === 0 && buttonJ === 2 || buttonI === 0 && buttonJ === 4 || buttonI === 0 && buttonJ === 6) {
        let tmpRow = new Array(9)
        newExcessRoom = { ...matrix[7][buttonJ] };
        for (let j = 0; j < 9; j++) {


            if (matrix[j][buttonJ].data.id !== 'button') {
           
                tmpRow[j + 1] = { ...matrix[j][buttonJ] }
            }
            else {
                tmpRow[j] = { ...matrix[j][buttonJ] };
            }
        }
        tmpRow[1] = { ...excessRoom };
        if(newExcessRoom.data.hasDiamond){
            tmpRow[1].data.hasDiamond = true;
             newExcessRoom.data.hasDiamond = false;
             image2 = document.createElement('img');
             image2.src = "diamond.png"
             image2.classList.add('image2');
 
            tmpRow[1].img2 = image2;
 
         }
     
        updateExcessRoom()

        let col = [];
        for (let j = 1; j < 8; j++) {
            col[j - 1] = table.rows[j].cells[buttonJ]

        }

        for (let j = 1; j < 8; j++) {
            table.rows[j].deleteCell(buttonJ);
        }
        for (let j = 1; j < 8; j++) {

            let cell = table.rows[j].insertCell(buttonJ)

            let image = document.createElement('img')

            if (image.src = tmpRow[j].data !== undefined) {
                image.indexes = j.toString() + ',' + buttonJ.toString();
                image.classList.add('notfix')


                image.src = tmpRow[j].data.src
                image.style.transform = 'rotate(' + tmpRow[j].data.rotated + 'deg)';
                cell.append(image)
                if(tmpRow[j].data.hasDiamond){
                    let image2 = document.createElement('img');
                    //image2.indexes = buttonI.toString() + ',' + j.toString();
                    image2.classList.add('image2');
                    image2.src = "diamond.png"
                    cell.append(image2)
               
    

                }
               
            }

        }
        for (let j = 1; j < 8; j++) {
            matrix[j][buttonJ] = { ...tmpRow[j] };
        }

    }

    if (buttonI === 2 && buttonJ === 8 || buttonI === 4 && buttonJ === 8 || buttonI === 6 && buttonJ === 8) {
        let tmpRow = new Array(9)
        newExcessRoom = { ...matrix[buttonI][1] };
        for (let j = 0; j < 9; j++) {

            if (matrix[buttonI][j].data.id !== 'button') {
                tmpRow[j] = { ...matrix[buttonI][j + 1] }
            }
            else {
                tmpRow[j] = { ...matrix[buttonI][j] };
            }
        }
        let neighbors = [matrix[buttonI][6], matrix[buttonI - 1][7], matrix[buttonI + 1][7]];
        tmpRow[7] = { ...excessRoom };
        excessRoom = { ...tmpRow[1] }
         
        if(newExcessRoom.data.hasDiamond){
            tmpRow[7].data.hasDiamond = true;
             newExcessRoom.data.hasDiamond = false;
             image2 = document.createElement('img');
             image2.src = "diamond.png"
             image2.classList.add('image2');
 
            tmpRow[7].img2 = image2;
 
         }
        updateExcessRoom()
  
        let row = table.rows[buttonI]

        for (let j = 1; j < 8; j++) {
            row.deleteCell(1);
        }
        for (let j = 1; j < 8; j++) {
            let cell = row.insertCell(j)
            let image = document.createElement('img')

            if (image.src = tmpRow[j].data !== undefined) {
                image.indexes = buttonI.toString() + ',' + j.toString();
                image.classList.add('notfix')

                image.src = tmpRow[j].data.src
                image.style.transform = 'rotate(' + tmpRow[j].data.rotated + 'deg)';
                cell.append(image)
                if(tmpRow[j].data.hasDiamond){
                    let image2 = document.createElement('img');
                    image2.indexes = buttonI.toString() + ',' + j.toString();
                    image2.classList.add('image2');
                    image2.src = "diamond.png"
                    cell.append(image2)
               
    

                }
                
            }

        }
        matrix[buttonI] = { ...tmpRow }

    }


    if (buttonI === 2 && buttonJ === 0 || buttonI === 4 && buttonJ === 0 || buttonI == 6 && buttonJ === 0) {
        let tmpRow = new Array(9)
       
        newExcessRoom = { ...matrix[buttonI][7] };
        
        for (let j = 0; j < 9; j++) {

            if (matrix[buttonI][j].data.id !== 'button') {
                tmpRow[j] = { ...matrix[buttonI][j - 1] }
            }
            else {
                tmpRow[j] = { ...matrix[buttonI][j] };
            }
        }
        tmpRow[1] = { ...excessRoom };
        excessRoom = { ...tmpRow[7] }
        
        if(newExcessRoom.data.hasDiamond){
           tmpRow[1].data.hasDiamond = true;
            newExcessRoom.data.hasDiamond = false;
            image2 = document.createElement('img');
            image2.src = "diamond.png"
            image2.classList.add('image2');

           tmpRow[1].img2 = image2;

        }
        
        updateExcessRoom()
      
        let row = table.rows[buttonI]

        for (let j = 1; j < 8; j++) {
            row.deleteCell(1);
        }
        for (let j = 1; j < 8; j++) {
            let cell = row.insertCell(j)
            let image = document.createElement('img')
           


            if (tmpRow[j].data !== undefined && tmpRow[j].data !== undefined) {
                image.indexes = buttonI.toString() + ',' + j.toString();
                image.classList.add('notfix')
                
              
                image.src = tmpRow[j].data.src
                image.style.transform = 'rotate(' + tmpRow[j].data.rotated + 'deg)';
             
                cell.append(image)
                if(tmpRow[j].data.hasDiamond){
                    let image2 = document.createElement('img');
                    image2.indexes = buttonI.toString() + ',' + j.toString();
                    image2.classList.add('image2');
                    image2.src = "diamond.png"
                    cell.append(image2)
               
    

                }
              
            }

        }
        matrix[buttonI] = { ...tmpRow }
        

    }


}

function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
        const targetElement = event.target.closest(selector)
        if (this.contains(targetElement)) handler.call(targetElement, event)
    })

}
delegate(document.querySelector('table'), 'click', 'td', function (e) {
    image = (this.querySelector("img"))
    if(image.indexes !== undefined){
    

    ids = image.indexes.split(',');
    indexI = parseInt(ids[0])
    indexJ = parseInt(ids[1])

    if (matrix[indexI][indexJ].data.fix === false) {


        matrix[indexI][indexJ].data.rotated += 90;
        
        if (matrix[indexI][indexJ].data.id === 'egyenes') {
           
            if ((matrix[indexI][indexJ].data.rotated % 360) / 90 === 1) {
                matrix[indexI][indexJ].data.north = true;
                matrix[indexI][indexJ].data.south = true;
                matrix[indexI][indexJ].data.east = false;
                matrix[indexI][indexJ].data.west = false;
            }
            if (((matrix[indexI][indexJ].data.rotated %360) / 90) === 2) {
                matrix[indexI][indexJ].data.north = false;
                matrix[indexI][indexJ].data.south = false;
                matrix[indexI][indexJ].data.east = true;
                matrix[indexI][indexJ].data.west = true;
            }

            if (matrix[indexI][indexJ].data.rotated % 360 / 90 === 0) {
                matrix[indexI][indexJ].data.north = false;
                matrix[indexI][indexJ].data.south = false;
                matrix[indexI][indexJ].data.east = true;
                matrix[indexI][indexJ].data.west = true;

            }
            if (matrix[indexI][indexJ].data.rotated % 360 / 90 === 3) {
                matrix[indexI][indexJ].data.north = true;
                matrix[indexI][indexJ].data.south = true;
                matrix[indexI][indexJ].data.east = false;
                matrix[indexI][indexJ].data.west = false;
              

            }
        }
        if (matrix[indexI][indexJ].data.id === "kanyar") {
            if ((matrix[indexI][indexJ].data.rotated % 360) / 90 === 0) {
                matrix[indexI][indexJ].data.north = false;
                matrix[indexI][indexJ].data.south = true;
                matrix[indexI][indexJ].data.east = true;
                matrix[indexI][indexJ].data.west = false;
            }
            if ((matrix[indexI][indexJ].data.rotated% 360) / 90 === 1) {
                matrix[indexI][indexJ].data.north = false;
                matrix[indexI][indexJ].data.south = true;
                matrix[indexI][indexJ].data.east = false;
                matrix[indexI][indexJ].data.west = true;
            }

            if ((matrix[indexI][indexJ].data.rotated% 360) / 90 === 2) {
                matrix[indexI][indexJ].data.north = true;
                matrix[indexI][indexJ].data.south = false;
                matrix[indexI][indexJ].data.east = false;
                matrix[indexI][indexJ].data.west = true;

            }
            if ((matrix[indexI][indexJ].data.rotated% 360) / 90 === 3) {
                matrix[indexI][indexJ].data.north = true;
                matrix[indexI][indexJ].data.south = false;
                matrix[indexI][indexJ].data.east = true;
                matrix[indexI][indexJ].data.west = false;

            }

        }
        if(matrix[indexI][indexJ].data.id === "t"){
            if ((matrix[indexI][indexJ].data.rotated % 360)/ 90 === 0) {
                matrix[indexI][indexJ].data.north = false;
                matrix[indexI][indexJ].data.south = true;
                matrix[indexI][indexJ].data.east = true;
                matrix[indexI][indexJ].data.west = true;

            }
            if ((matrix[indexI][indexJ].data.rotated % 360)/ 90 === 1) {
                matrix[indexI][indexJ].data.north = true;
                matrix[indexI][indexJ].data.south = true;
                matrix[indexI][indexJ].data.east = false;
                matrix[indexI][indexJ].data.west = true;

            }
            if ((matrix[indexI][indexJ].data.rotated% 360)/ 90 === 2) {
                matrix[indexI][indexJ].data.north = true;
                matrix[indexI][indexJ].data.south = false;
                matrix[indexI][indexJ].data.east = true;
                matrix[indexI][indexJ].data.west = true;

            }
            if ((matrix[indexI][indexJ].data.rotated% 360) / 90 === 3) {
                matrix[indexI][indexJ].data.north = true;
                matrix[indexI][indexJ].data.south = true;
                matrix[indexI][indexJ].data.east = true;
                matrix[indexI][indexJ].data.west = false;

            }
            if ((matrix[indexI][indexJ].data.rotated % 360)/ 90 === 4) {
                matrix[indexI][indexJ].data.north = false;
                matrix[indexI][indexJ].data.south = true;
                matrix[indexI][indexJ].data.east = true;
                matrix[indexI][indexJ].data.west = true;
            }

        }
        image.classList.add("sample")

        image.style.transform = 'rotate(' + matrix[indexI][indexJ].data.rotated + 'deg)';
        

    }
}
  
})

function init() {
    objImage = document.getElementById("player");
   
    objImage.style.position = "fixed"
    objImage.style.left = 190 + "px"
    objImage.style.top = 166 + "px"
    
    matrix[1][1].isPLayerThere = true;

}

function handlePlayer(e) {
    var key_code = e.which || e.keyCode;
    
    switch (key_code) {
        case 37: //left arrow key
        
            if (player1[0].positionJ !== 1 && matrix[player1[0].positionI][player1[0].positionJ-1].data.east && matrix[player1[0].positionI][player1[0].positionJ].data.west ) {
                moveLeft();
            }

            break;
        case 38: //Up arrow key
            if (player1[0].positionI !== 1  && matrix[player1[0].positionI-1][player1[0].positionJ].data.south && matrix[player1[0].positionI][player1[0].positionJ].data.north ) {

                moveUp();
            }
            break;
        case 39: //right arrow key
            if (player1[0].positionJ !== 7  && matrix[player1[0].positionI][player1[0].positionJ+1].data.west && matrix[player1[0].positionI][player1[0].positionJ].data.east )
                moveRight();
            break;
        case 40: //down arrow key
            if (player1[0].positionI !== 7  && matrix[player1[0].positionI+1][player1[0].positionJ].data.north && matrix[player1[0].positionI][player1[0].positionJ].data.south )
                moveDown();
            break;
    }
}

function moveLeft() {
    matrix[player1[0].positionI][player1[0].positionJ].data.isPLayerThere = false;
    objImage.style.left = parseInt(objImage.style.left) - 73 + "px";
    player1[0].positionJ -= 1;
    matrix[player1[0].positionI][player1[0].positionJ].data.isPLayerThere = true;
    
}
function moveUp() {
    matrix[player1[0].positionI][player1[0].positionJ].data.isPLayerThere = false;
    objImage.style.top = parseInt(objImage.style.top) - 72 + "px";
    player1[0].positionI -= 1;
    matrix[player1[0].positionI][player1[0].positionJ].data.isPLayerThere = true;
    
}
function moveRight() {
    matrix[player1[0].positionI][player1[0].positionJ].data.isPLayerThere = false;
    objImage.style.left = parseInt(objImage.style.left) + 73 + "px";
    player1[0].positionJ += 1;
    matrix[player1[0].positionI][player1[0].positionJ].data.isPLayerThere = true;
    
   
}
function moveDown() {
    matrix[player1[0].positionI][player1[0].positionJ].data.isPLayerThere = false;
    objImage.style.top = parseInt(objImage.style.top) + 72 + "px";
    player1[0].positionI += 1;
    matrix[player1[0].positionI][player1[0].positionJ].data.isPLayerThere = true;
    
}
    
window.onload = init;



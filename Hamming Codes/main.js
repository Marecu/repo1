const toggleBox = (box) => {
    let boxes = document.getElementsByClassName("box");
    let current = parseInt(boxes[box].innerText);
    boxes[box].innerText = current ^ 1;
};


/*
For an n x n Hamming square,

2log2(n) parity squares

log2(n) squares for columns/rows

COLUMN GENERAL FORMULA:
    for i (starting at 1) columns:
    Math.floor(i / (n / 2^i)) % 2 === 0 

ROW GENERAL FORMULA:
    for i (starting at 1) rows:
    Math.floor(i / (n * 2^(i - 1))) % 2 === 1
*/


//Generate n x n Hamming square (n must be power of 2)
const generateBoxes = (n) => {
    let result = [];
    let parent = document.getElementById("gridParent");
    //get parity classes
    for (let i = 0; i < Math.pow(n, 2); i++) {
        let classes = "box "
        //first box
        if (i === 0) {
            classes += "boxParityValue ";
        };
        //flag parity squares
        if (Number.isInteger(Math.log2(i))) {
            classes += "parityValue ";
        };
        //column parity general formula
        for (let j = 0; j < Math.log2(n); j++) {
            if ((Math.floor(i / (n / Math.pow(2, (j + 1)))) % 2) === 1) {
                classes += `column${j} `;
            };
        };
        //row parity general formula
        for (let k = 0; k < Math.log2(n); k++) {
            if ((Math.floor(i / (n * Math.pow(2, k))) % 2) === 1) {
                classes += `row${k} `;
            };
        };
        let div = document.createElement("div");
        div.className = classes.trim();
        div.setAttribute("onclick", `toggleBox(${i})`);
        div.innerText = Math.round(Math.random());
        result.push(div);
    };
    result.forEach(x => parent.appendChild(x));
    parent.style.gridTemplateRows = `repeat(${n}, 1fr)`;
    parent.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
};

generateBoxes(4);


//Highlighting parity groups when key value is hovered
const highlightParityGroup = (box) => {
    let parityClass = box.classList[2];
    let elementsToUpdate = document.getElementsByClassName(parityClass);
    for (let i = 0; i < elementsToUpdate.length; i++) {
        elementsToUpdate[i].classList.add("highlightedBox");
    };
};

const removeHighlight = (box) => {
    let parityClass = box.classList[2];
    let elementsToUpdate = document.getElementsByClassName(parityClass);
    for (let i = 0; i < elementsToUpdate.length; i++) {
        elementsToUpdate[i].classList.remove("highlightedBox");
    };
};

let parities = document.getElementsByClassName("parityValue");
for (let i = 0; i < parities.length; i++) {
    parities[i].addEventListener("mouseover", function () {highlightParityGroup(parities[i])})
    parities[i].addEventListener("mouseout", function () {removeHighlight(parities[i])})
};



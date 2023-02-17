/*
=-=-=-=-=-=-=-=-=-=-=-=-=-=
          THE PLAN
=-=-=-=-=-=-=-=-=-=-=-=-=-=

1) Intro page with descriptions of everything (will prob need to rewatch video)
2) 4x4 hamming code page with description of what's going on
3) nxn hamming code page to play around with
4) Intro to programming page (show how each box corresponds to a binary position)
5) XOR representation page with hardcoded 4x4
*/



const toggleBox = (box) => {
    let boxes = document.getElementsByClassName("box");
    let current = parseInt(boxes[box].dataset.num);
    boxes[box].style.backgroundImage = `url(assets/${current ^ 1}.PNG)`;
    boxes[box].setAttribute("data-num", current ^ 1);
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

//Make the grid into a valid Hamming square
const createValidParityGroups = (n) => {
    for (let i = 0; i < n; i++) {
        //columns
        let columnGroup = document.getElementsByClassName(`column${i}`);
        columnGroup = Array.prototype.slice.call(columnGroup).map(x => parseInt(x.dataset.num));
        let columnSum = columnGroup.reduce((x, y) => x + y);
        if (columnSum % 2 === 1) {
            let parityElement = document.getElementsByClassName(`parityValue column${i}`)[0]
            parityElement.onclick.apply();
        };

        //rows
        let rowGroup = document.getElementsByClassName(`row${i}`);
        rowGroup = Array.prototype.slice.call(rowGroup).map(x => parseInt(x.dataset.num));
        let rowSum = rowGroup.reduce((x, y) => x + y);
        if (rowSum % 2 === 1) {
            let parityElement = document.getElementsByClassName(`parityValue row${i}`)[0]
            parityElement.onclick.apply();
        };
    };
    //total box
    let boxes = document.getElementsByClassName("box");
    boxes = Array.prototype.slice.call(boxes).map(x => parseInt(x.dataset.num));
    let totalSum = boxes.reduce((x, y) => x + y);
    if (totalSum % 2 === 1) {
        let parityElement = document.getElementsByClassName(`boxParityValue`)[0]
        parityElement.onclick.apply();
    };
};

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
        let boxNum = Math.round(Math.random());
        let div = document.createElement("div");
        div.className = classes.trim();
        div.setAttribute("onclick", `toggleBox(${i})`);
        div.setAttribute("data-num", boxNum);
        //styling stuff
        div.style.backgroundImage = `url(assets/${boxNum}.PNG)`;
        div.style.backgroundRepeat = "no-repeat";
        div.style.backgroundSize = "contain";
        div.style.boxShadow = `inset 0 0 ${80 / n}px #666`
        result.push(div);
    };
    result.forEach(x => parent.appendChild(x));
    parent.style.gridTemplateRows = `repeat(${n}, minmax(0, 1fr))`;
    parent.style.gridTemplateColumns = `repeat(${n}, minmax(0, 1fr))`;
    parent.style.gap = `${8 / Math.log2(n)}px`;

    createValidParityGroups(Math.log2(n));
};

generateBoxes(4);




//Highlighting parity groups when parity value is hovered
const highlightParityGroup = (box) => {
    let parityClass = box.classList[2];
    let elementsToUpdate = document.getElementsByClassName(parityClass);
    for (let i = 0; i < elementsToUpdate.length; i++) {
        elementsToUpdate[i].classList.add("highlightedBox");
    };
};

const highlightAll = () => {
    let boxes = document.getElementsByClassName("box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.add("highlightedBox");
    };
};

const removeHighlight = (box) => {
    let parityClass = box.classList[2];
    let elementsToUpdate = document.getElementsByClassName(parityClass);
    for (let i = 0; i < elementsToUpdate.length; i++) {
        elementsToUpdate[i].classList.remove("highlightedBox");
    };
};

const removeHighlightAll = () => {
    let boxes = document.getElementsByClassName("box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.remove("highlightedBox");
    };
};

let parities = document.getElementsByClassName("parityValue");
for (let i = 0; i < parities.length; i++) {
    parities[i].addEventListener("mouseover", function () {highlightParityGroup(parities[i])})
    parities[i].addEventListener("mouseout", function () {removeHighlight(parities[i])})
};
document.getElementsByClassName("boxParityValue")[0].addEventListener("mouseover", function () {highlightAll()});
document.getElementsByClassName("boxParityValue")[0].addEventListener("mouseout", function () {removeHighlightAll()});



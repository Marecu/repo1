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

const descriptions = {
    intro: {
        mainTitle: "Efficient and Reliable Error Correction - An Overview of Hamming Codes",
        mainDescription: "[insert description here]",
        sidebarTitle: "A Brief Guide",
        sidebarDescription: `<strong>Basic Hamming Codes:</strong><br>
        This section contains a valid 4 × 4 Hamming code. Click a square to create an error and see how it affects each of the parity groups.<br><br>
        <strong>Extending to n × n:</strong><br>
        This section allows you to create larger Hamming codes and explore the algorithm's efficiency in scaling. Click the menu at the top to change the size of the grid.<br><br>
        <strong>Applying Hamming Codes in Programming:</strong><br>
        This section goes over the basics of translating the visual representation of a Hamming code to a binary, computer-friendly representation.<br><br>
        <strong>The Magic of XOR:</strong><br>This section shows how using the XOR logic operator lets us identify errors in a Hamming code with low amounts of computation.`
    },
    bhc: {
        title: "Visualizing",
        description: "[insert description here]"
    },
    nxn: {
        title: "Scaling",
        description: "Despite their already low amount of redundancy bits, the efficiency of Hamming codes only gets better as the size of the grid increases.\n\nFor the 4 × 4 grids we have explored so far, 4 (or 5 if you count the first bit) redundancy bits are required to identify an error in any position on the grid. For an 8 × 8 grid with four times as many positions, one may expect to need four times as many redundancy bits. With Hamming codes, this is not the case - an 8 × 8 grid only requires 6 redundancy bits.\n\nIn general, an n × n grid can be perfectly tracked by only 2 × log2(n) redundancy bits. This means that the larger of a grid we use, the more efficient the Hamming code process becomes.\n\nDespite this, it is not always optimal to use the largest grid possible. Recall that Hamming codes have trouble detecting the positions of more than one error - a larger grid also increases the chance that there will be more than one error in the grid. Due to this, many choose to use multiple smaller grids to strike the right balance between efficiency and likeliness of multiple errors occurring."
    },
    introprog: {
        title: "Translation",
        description: "While Hamming Codes are easy to understand visually, they are a bit impractical to work out by hand. Thankfully, there is a very elegant way to represent everything we have explored so far.\n\nThe trick is simple - we just have to label every bit in order, and critically, in binary. For example, the upper leftmost bit in a 4 × 4 grid would be 0000, the one to the right would be 0001, the one to the right of that would be 0010, and so on until we reach the last bit labeled 1111.\n\nThis may seem arbitrary, but it actually tells us a lot of information. Notably, each parity bit's label will consist of all zeros and a singular 1. The position of the 1 represents the parity group the parity bit corresponds to, meaning any other bit with a position label containing a 1 in that position belongs to that parity group.\n\nUsing this, we can accurately identify which parity groups any given position on the grid belongs to just by analyzing the bits of its position.\n\nClick on a bit to see its binary position in the grid."
    },
    xor: {
        title: "Exclusive OR",
        description: "[insert description here]"
    }
};

//Global boolean to turn 0/1 flipping on/off
let toggle = false;

//Global boolean to turn number/binary flipping on/off
let binary = false;

//Nav bar styling behaviour
const navButtons = document.getElementsByClassName("navButton");
for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener("click", function () {
        let currentSelected = document.getElementsByClassName("navSelected")[0];
        currentSelected.classList.remove("navSelected");
        navButtons[i].classList.add("navSelected");
    });
};

//Page updating functions
const main = document.getElementById("main");
const sidebarTitle = document.getElementById("sidebarTitle");
const sidebarDesc = document.getElementById("sidebarDescription");

const loadIntro = () => {
    toggle = true;
    binary = false;
    main.innerHTML = "";
    sidebarTitle.innerText = descriptions.intro.sidebarTitle;
    sidebarDesc.innerHTML = descriptions.intro.sidebarDescription;
    toggle = false;
};

const loadBHC = () => {
    toggle = true;
    binary = false;
    main.innerHTML = "";
    let gridParent = document.createElement("div");
    gridParent.id = "gridParent";
    main.appendChild(gridParent);
    generateBoxes(4);
    sidebarTitle.innerText = descriptions.bhc.title;
    sidebarDesc.innerText = descriptions.bhc.description;
};

const loadNXN = () => {
    const getNXNOptions = () => {
        let options =  ["4 × 4", "8 × 8", "16 × 16"];
        let result = [];
        for (let i = 0; i < options.length; i++) {
            let option = document.createElement("option");
            option.value = options[i];
            option.innerHTML = options[i];
            result.push(option);
        };
        return result;
    };
    toggle = true;
    binary = false;
    main.innerHTML = "";
    let gridParent = document.createElement("div");
    gridParent.id = "gridParent";
    let selectParent = document.createElement("div");
    selectParent.id = "selectParent";
    let selectMenu = document.createElement("select");
    selectMenu.id = "selectMenu";
    let options = getNXNOptions();
    for (let i = 0; i < options.length; i++) {
        selectMenu.appendChild(options[i]);
    };
    selectMenu.addEventListener("change", function () {
        let num = parseInt(selectMenu.value.split(" ")[0]);
        gridParent.innerHTML = "";
        generateBoxes(num);
    });
    selectMenu.style = `
        width: 100px;
        height: 50px;
        -webkit-appearance: none;
        text-align: center;
        border-radius: 5px;
        border: 3px solid #fff;
        color: #fff;
        font-size: 1.5em;
        background-color: rgb(43, 45, 68);
        font-family: "Trebuchet MS";
        cursor: pointer;
    `
    selectParent.appendChild(selectMenu);
    main.appendChild(selectParent);
    main.appendChild(gridParent);
    generateBoxes(4);
    sidebarTitle.innerText = descriptions.nxn.title;
    sidebarDesc.innerText = descriptions.nxn.description;
};

const loadIntroProg = () => {
    toggle = true;
    main.innerHTML = "";
    sidebarTitle.innerText = descriptions.introprog.title;
    sidebarDesc.innerText = descriptions.introprog.description;
    let gridParent = document.createElement("div");
    gridParent.id = "gridParent";
    main.appendChild(gridParent);
    generateBoxes(4);
    addPositionHovering();
    toggle = false;
    binary = true;
};

const loadXOR = () => {
    toggle = true;
    binary = false;
    main.innerHTML = "";
    sidebarTitle.innerText = descriptions.xor.title;
    sidebarDesc.innerText = descriptions.xor.description;
};

//Toggle 0/1 or number/binary position when box is clicked;
const toggleBox = (box) => {
    let boxes = document.getElementsByClassName("box");
    let current = parseInt(boxes[box].dataset.num);
    //Toggle 0/1
    if (toggle) {
        boxes[box].style.backgroundImage = `url(assets/${current ^ 1}.PNG)`;
        boxes[box].setAttribute("data-num", current ^ 1);
        checkParityDisruption();
    };
    //Toggle number/binary position
    if (binary) {
        if (boxes[box].style.backgroundImage === "none") {
            boxes[box].style.backgroundImage = `url(assets/${current}.PNG)`;
            for (subBox of boxes[box].children) {
                subBox.classList.add("invisible");
            };
        } else {
            boxes[box].style.backgroundImage = "none";
            for (subBox of boxes[box].children) {
                subBox.classList.remove("invisible");
            };
        };
    };
};

//Make the grid into a valid Hamming square
const createValidParityGroups = (n) => {
    for (let i = 0; i < n; i++) {
        //columns
        let columnGroup = document.getElementsByClassName(`column${i}`);
        columnGroup = Array.from(columnGroup).map(x => parseInt(x.dataset.num));
        let columnSum = columnGroup.reduce((x, y) => x + y);
        if (columnSum % 2 === 1) {
            let parityElement = document.getElementsByClassName(`parityValue column${i}`)[0];
            let boxNum = parseInt(parityElement.onclick.toString().split("(")[2].split(")")[0]);
            toggleBox(boxNum);
        };

        //rows
        let rowGroup = document.getElementsByClassName(`row${i}`);
        rowGroup = Array.from(rowGroup).map(x => parseInt(x.dataset.num));
        let rowSum = rowGroup.reduce((x, y) => x + y);
        if (rowSum % 2 === 1) {
            let parityElement = document.getElementsByClassName(`parityValue row${i}`)[0];
            let boxNum = parseInt(parityElement.onclick.toString().split("(")[2].split(")")[0]);
            toggleBox(boxNum);
        };
    };
    //total box
    let boxes = document.getElementsByClassName("box");
    boxes = Array.from(boxes).map(x => parseInt(x.dataset.num));
    let totalSum = boxes.reduce((x, y) => x + y);
    if (totalSum % 2 === 1) {
        toggleBox(0);
    };
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
        let boxNum = Math.round(Math.random());
        let div = document.createElement("div");
        div.className = classes.trim();
        div.setAttribute("onclick", `toggleBox(${i})`);
        div.setAttribute("data-num", boxNum);
        //styling stuff
        div.style.backgroundImage = `url(assets/${boxNum}.PNG)`;
        div.style.boxShadow = `inset 0 0 ${80 / n}px #666`
        result.push(div);
    };
    result.forEach(x => parent.appendChild(x));
    parent.style.gridTemplateRows = `repeat(${n}, minmax(0, 1fr))`;
    parent.style.gridTemplateColumns = `repeat(${n}, minmax(0, 1fr))`;
    parent.style.gap = `${8 / Math.log2(n)}px`;

    createValidParityGroups(Math.log2(n));
    addHighlighting();
};


//Highlighting parity groups when parity value is hovered
const addHighlighting = () => {
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
        parities[i].addEventListener("mouseover", function () {highlightParityGroup(parities[i])});
        parities[i].addEventListener("mouseout", function () {removeHighlight(parities[i])});
    };
    document.getElementsByClassName("boxParityValue")[0].addEventListener("mouseover", highlightAll);
    document.getElementsByClassName("boxParityValue")[0].addEventListener("mouseout", removeHighlightAll);
};

//Make number red if a parity group has an odd sum
const checkParityDisruption = () => {
    //Test small parity groups
    let parityValues = document.getElementsByClassName("parityValue");
    for (let i = 0; i < parityValues.length; i++) {
        let parityClass = parityValues[i].classList[2];
        let groupElements = document.getElementsByClassName(parityClass);
        let current = parseInt(parityValues[i].dataset.num);
        let sum = 0;
        for (let j = 0; j < groupElements.length; j++) {
            if (parseInt(groupElements[j].dataset.num) === 1) {
                sum++;
            };
        };
        if (sum % 2 === 1) {
            parityValues[i].style.backgroundImage = `url(assets/wrong${current}.PNG)`;
        } else {
            parityValues[i].style.backgroundImage = `url(assets/${current}.PNG)`;
        };
    };
    
    //Test overall box
    let boxes = document.getElementsByClassName("box");
    boxes = Array.from(boxes).map(x => parseInt(x.dataset.num));
    let boxParity = document.getElementsByClassName("boxParityValue")[0];
    let totalSum = boxes.reduce((x, y) => x + y);
    let current = parseInt(boxParity.dataset.num);
    if (totalSum % 2 === 1) {
        boxParity.style.backgroundImage = `url(assets/wrong${current}.PNG)`;
    } else {
        boxParity.style.backgroundImage = `url(assets/${current}.PNG)`;
    };
};

//Converts an integer to a string containing the binary representation up to the number of bits specified
const convertToBinary = (n, numOfBits) => {
    let num = n.toString(2);
    while (num.length < numOfBits) {
        num = "0" + num;
    };
    return num;
};

//Adds functionality to show the binary position of a given tile when hovered - only works for 4 x 4
const addPositionHovering = () => {
    let boxes = document.getElementsByClassName("box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.add("positionFormatting");
        let binaryRepresentation = convertToBinary(i, 4).split("");
        //create boxes to show the binary position
        for (let j = 0; j < 4; j++) {
            let innerBox = document.createElement("div");
            innerBox.classList.add("positionNumber", "invisible");
            innerBox.style.backgroundImage = `url(assets/${binaryRepresentation[j]}.PNG)`;
            boxes[i].appendChild(innerBox);
        };
    };
};

loadIntro();

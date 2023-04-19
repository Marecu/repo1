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
        basicIntro: `Every single piece of data, whether it is a program, an image, a video, or even a song inscribed on a CD, is ultimately just an extremely long string of 1s and 0s. With the use of technology, we are able to interpret these strings into whatever end result we are looking for. Often, data gets damaged somewhere along the way during the time when it is travelling between the sender and receiver. This creates issues - if the data we receive isn't correct, we'll end up with errors in the final result. In an image, this could mean miscoloured pixels, or on a CD, this could result in distorted audio.<br><br>
        Clearly, there is a reason to include some form of redundancy to ensure the correct data gets transmitted from the sender to the receiver. This could be done in a number of ways. The most intuitive way would be to store additional copies of the same data and cross-reference them with each other. If one bit gets flipped, you'll be able to tell it's wrong by looking at the other copies of the data. This works, but it requires an extremely large portion of your data to be used on redundancy only. Even with only two additional copies, 66% of your data would be redundant. Ultimately, the goal is to look for a solution that uses the minimum amount of data on redundancy while still being able to ensure that every meaningful bit is correct.`,
        howTheyWork: `While working at Bell Labs in the 1940s, Richard Hamming was trying to find an efficient solution to this exact problem. In doing so, he thought of applying a very useful mathematical principle - <strong>parity</strong>. Parity (in mathematics) means the state of being either even or odd. Then, if we add up all the bits in a piece of data, we can check its parity. For example, if there are seven 1s, it would have an odd parity. If you add another 1 into the data somewhere, it would then have an even parity. This is an important principle: <strong>changing a bit anywhere changes the parity of the group</strong>.<br><br>
        This was a good start - if you use one bit for redundancy to make the parity always even, you can detect if an error occurred. If a bit was flipped, you could tell just by looking at the parity of the group. Hamming built on this further, aiming to find a way to isolate an error's location. To do this, he implemented a clever trick: he arranged the data into a grid and used parity checks on different parts of the data to narrow down where the error could be. For a 4 × 4 grid, the groups would be arranged like so:
        <div class="introImageContainer">
            <div class="introImage" style="background-image: url(assets/parity1.png);"></div>
            <div class="introImage" style="background-image: url(assets/parity2.png);"></div>
            <div class="introImage" style="background-image: url(assets/parity3.png);"></div>
            <div class="introImage" style="background-image: url(assets/parity4.png);"></div>
        </div>
        With the grid split up like this, we can run a parity check on each group by reserving the top leftmost bit in the group for redundancy, setting it to 0 or 1 as needed to make the parity of its corresponding group even. If this is done correctly, every group should have even parity - this is the state the grid should be in if there are no errors. If there is an error, we can pinpoint its location by checking <strong>which of the parity groups are affected</strong>. Consider the following example with one error:
        <div class="introImageContainer introImageContainerLarge">
            <div class="introImage introImageLarge" style="background-image: url(assets/parityExample.png);"></div>
        </div>
        Let's work through the groups one at a time in the same order as shown above. The first group contains four 1s, so it has an even parity. This means there is either no error, or the error lies in a position not covered by this parity group. The second parity group contains five 1s, so it has an odd parity. This means there is an error and its position must be located somewhere within the parity group. The third parity group has four 1s, so the error lies outside of it. Lastly, the fourth parity group has five 1s, so the error lies somewhere within it. Looking at everything, there only exists one position that meets all of these criteria (in groups 2 and 4 but not in 1 and 3) - the 11th square in the grid. Flip that 1 to a 0, and everything is back to what it should be. This works for any position on the grid!<br><br>
        By using this search-based method, we are able to track a 4 × 4 grid of data while only using 4 of the bits (1 per parity group) for redundancy purposes.`,
        drawbacks: `[insert description here]`,
        zeroBit: `[insert description here]`,
        sidebarTitle: "A Brief Guide",
        sidebarDescription: `<strong>Basic Hamming Codes:</strong><br>
        This section contains a valid 4 × 4 Hamming code. Click a square to create an error and see how it affects each of the parity groups.<br><br>
        <strong>Extending to n × n:</strong><br>
        This section allows you to create larger Hamming codes and explore the algorithm's efficiency in scaling. Click the menu at the top to change the size of the grid.<br><br>
        <strong>Applying Hamming Codes in Programming:</strong><br>
        This section goes over the basics of translating the visual representation of a Hamming Code to a binary, computer-friendly representation.<br><br>
        <strong>The Magic of XOR:</strong><br>This section shows how using the XOR logic operator lets us identify errors in a Hamming Code with low amounts of computation.<br><br>
        This project was heavily inspired by a great series of videos by <strong>3Blue1Brown</strong> on the topic. Check them out here:<br>
        <div class="videoButton"><a href="https://www.youtube.com/watch?v=X8jsijhllIA">Part 1</a></div>
        <div class="videoButton"><a href="https://www.youtube.com/watch?v=b3NxrZOu_CE">Part 2</a></div>`
    },
    bhc: {
        title: "Visualizing",
        description: "[insert description here]"
    },
    nxn: {
        title: "Scaling",
        description: "Despite their already low amount of redundancy bits, the efficiency of Hamming Codes only gets better as the size of the grid increases.\n\nFor the 4 × 4 grids we have explored so far, 4 (or 5 if you count the first bit) redundancy bits are required to identify an error in any position on the grid. For an 8 × 8 grid with four times as many positions, one may expect to need four times as many redundancy bits. With Hamming Codes, this is not the case - an 8 × 8 grid only requires 6 redundancy bits.\n\nIn general, an n × n grid can be perfectly tracked by only 2 × log2(n) redundancy bits. This means that the larger of a grid we use, the more efficient the Hamming Code process becomes.\n\nDespite this, it is not always optimal to use the largest grid possible. Recall that Hamming Codes have trouble detecting the positions of more than one error - a larger grid also increases the chance that there will be more than one error in the grid. Due to this, many choose to use multiple smaller grids to strike the right balance between efficiency and likeliness of multiple errors occurring."
    },
    introprog: {
        title: "Translation",
        description: "While Hamming Codes are easy to understand visually, they are a bit impractical to work out by hand. Thankfully, there is a very elegant way to represent everything we have explored so far.\n\nThe trick is simple - we just have to label every bit in order, and critically, in binary. For example, the upper leftmost bit in a 4 × 4 grid would be 0000, the one to the right would be 0001, the one to the right of that would be 0010, and so on until we reach the last bit labeled 1111.\n\nThis may seem arbitrary, but it actually tells us a lot of information. Notably, each parity bit's label will consist of all zeros and a singular 1. The position of the 1 represents the parity group the parity bit corresponds to, meaning any other bit with a position label containing a 1 in that position belongs to that parity group.\n\nUsing this, we can accurately identify which parity groups any given position on the grid belongs to just by analyzing the bits of its position.\n\nClick on a bit to see its binary position in the grid."
    },
    xor: {
        title: "Exclusive OR",
        description: "The exclusive OR (XOR) operator compares the bits in two numbers position by position, producing a 1 in the result if exactly one of the numbers in that position is a 1. As an example, 1011 XOR 0110 would produce 1101.\n\nComparing more than two numbers with XOR can be thought of as checking for an odd number of 1s in each bit position. So, 1010 XOR 1001 XOR 0111 would produce 0100 since there are two 1s in the first, second, and fourth positions and one 1 in the second position.\n\nAs it turns out, if we take the positions of all the 1s in a valid Hamming Code and combine them with the XOR operator, it always returns 0. This is an interesting and very useful feature - we can leverage this to figure out both whether or not there is an error and also where the error is in the grid.\n\nTo identify the position of an error, all we have to do is look at the value produced by the XOR operation. If it's 0, there's nothing wrong. If it's anything other than 0, the number that it returns is the position of the bit that contains the error.\n\nThis trick makes correcting Hamming Codes so much easier for computers. We don't have to worry about parity groups, counting 1s, or anything else. It all gets streamlined into one simple process - XOR the positions of the 1s and check if it's 0.\n\nFlip a bit and see how it all works."
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
    //Create sub-sections for the main intro page
    const makeSection = (title, content) => {
        let sectionDiv = document.createElement("div");
        sectionDiv.classList.add("sectionDiv");
        let sectionTitle = document.createElement("div");
        sectionTitle.classList.add("sectionTitle");
        sectionTitle.innerHTML = title;
        let sectionContent = document.createElement("div");
        sectionContent.classList.add("sectionContent");
        sectionContent.innerHTML = content;
        sectionDiv.appendChild(sectionTitle);
        sectionDiv.appendChild(sectionContent);
        return sectionDiv;
    };
    const populateMainArea = () => {
        let introWrapper = document.createElement("div");
        introWrapper.classList.add("introWrapper");
        let sectionTitle = document.createElement("div");
        sectionTitle.classList.add("introTitle");
        sectionTitle.innerHTML = descriptions.intro.mainTitle;
        introWrapper.appendChild(sectionTitle);
        introWrapper.appendChild(makeSection("1 - Data storage", descriptions.intro.basicIntro));
        introWrapper.appendChild(makeSection("2 - Introducing: Hamming Codes", descriptions.intro.howTheyWork));
        introWrapper.appendChild(makeSection("3 - Drawbacks", descriptions.intro.drawbacks));
        introWrapper.appendChild(makeSection("4 - The Zero Bit", descriptions.intro.zeroBit));
        main.appendChild(introWrapper);
    };
    toggle = true;
    binary = false;
    main.innerHTML = "";
    sidebarTitle.innerText = descriptions.intro.sidebarTitle;
    sidebarDesc.innerHTML = descriptions.intro.sidebarDescription;
    populateMainArea();
    toggle = false;
};

const loadBHC = () => {
    toggle = true;
    binary = false;
    main.innerHTML = "";
    let gridParent = document.createElement("div");
    gridParent.id = "gridParent";
    main.appendChild(gridParent);
    generateBoxes(4, "gridParent");
    sidebarTitle.innerText = descriptions.bhc.title;
    sidebarDesc.innerText = descriptions.bhc.description;
};

const loadNXN = () => {
    //Produce the option elements for the n x n select menu
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
        generateBoxes(num, "gridParent");
    });
    selectParent.appendChild(selectMenu);
    main.appendChild(selectParent);
    main.appendChild(gridParent);
    generateBoxes(4, "gridParent");
    sidebarTitle.innerText = descriptions.nxn.title;
    sidebarDesc.innerText = descriptions.nxn.description;
};

const loadIntroProg = () => {
    binary = false;
    toggle = true;
    main.innerHTML = "";
    sidebarTitle.innerText = descriptions.introprog.title;
    sidebarDesc.innerText = descriptions.introprog.description;
    let gridParent = document.createElement("div");
    gridParent.id = "gridParent";
    let flipAll = document.createElement("div");
    flipAll.id = "flipAll";
    flipAll.onclick = function () {
        let boxes = document.getElementsByClassName("box");
        for (let i = 0; i < boxes.length; i++) {
            toggleBox(i);
        };
    };
    flipAll.innerHTML = "Flip All";
    main.appendChild(flipAll);
    main.appendChild(gridParent);
    generateBoxes(4, "gridParent");
    addPositions();
    toggle = false;
    binary = true;
};

const loadXOR = () => {
    toggle = true;
    binary = false;
    main.innerHTML = "";
    let xorParent = document.createElement("div");
    xorParent.classList.add("xorParent");
    let xorGrid = document.createElement("div");
    xorGrid.id = "xorGrid";
    let gridParent = document.createElement("div");
    gridParent.id = "gridParent";
    xorGrid.appendChild(gridParent);
    let xorList = document.createElement("div");
    xorList.id = "xorList";
    xorParent.appendChild(xorGrid);
    xorParent.appendChild(xorList);
    main.appendChild(xorParent);
    generateBoxes(4, "gridParent");
    makeXORList();
    addXORListeners();
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
    for i (starting at 0) columns:
    Math.floor(i / (n / 2^(i + 1))) % 2 === 1

ROW GENERAL FORMULA:
    for i (starting at 0) rows:
    Math.floor(i / (n * 2^i)) % 2 === 1
*/

//Generate n x n Hamming square (n must be power of 2)
const generateBoxes = (n, p) => {
    let result = [];
    let parent = document.getElementById(p);
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

//Adds functionality to show the binary position of a given tile when clicked - only works for 4 x 4
const addPositions = () => {
    let boxes = document.getElementsByClassName("box");
    for (let i = 0; i < boxes.length; i++) {
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

//Create a list of the positions in the grid that contain a 1
const makeXORList = () => {
    let boxes = document.getElementsByClassName("box");
    let list = document.getElementById("xorList");
    list.innerHTML = "";
    let valueContainer = document.createElement("div");
    valueContainer.classList.add("xorValueContainer");
    list.appendChild(valueContainer);
    //grab all boxes containing 1, append position to list
    for (let i = 0; i < boxes.length; i++) {
        if (parseInt(boxes[i].dataset.num) === 1) {
            let binaryRepresentation = convertToBinary(i, 4).split("");
            let xorBox = document.createElement("div");
            xorBox.classList.add("xorBox");
            for (let j = 0; j < 4; j++) {
                let innerBox = document.createElement("div");
                innerBox.classList.add("xorNumber");
                innerBox.style.backgroundImage = `url(assets/inverted${binaryRepresentation[j]}.png)`;
                xorBox.appendChild(innerBox);
            };
            valueContainer.appendChild(xorBox);
            xorBox.dataset.num = i;
        };
    };
    //calculate result and append to bottom
    let xorValues = document.getElementsByClassName("xorBox");
    let total = 0;
    for (let i = 0; i < xorValues.length; i++) {
        total = total ^ parseInt(xorValues[i].dataset.num);
    };
    let resultBinary = convertToBinary(total, 4).split("");
    let xorResult = document.createElement("div");
    xorResult.classList.add("xorResult");
    for (let j = 0; j < 4; j++) {
        let innerBox = document.createElement("div");
        innerBox.classList.add("xorNumber");
        innerBox.style.backgroundImage = `url(assets/inverted${resultBinary[j]}.png)`;
        xorResult.appendChild(innerBox);
    };
    list.appendChild(xorResult);
};

//Update XOR list whenever a box gets clicked
const addXORListeners = () => {
    let boxes = document.getElementsByClassName("box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("click", makeXORList);
    };
};

loadIntro();

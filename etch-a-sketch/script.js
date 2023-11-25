// Base etch-a-sketch code
let etchASketch = document.querySelector('.paint-a-taint');
let maxWidth = 100;

let sketchHandler = (event) => {
    if (event.target.secretOpacityValue < 1)
    event.target.secretOpacityValue += 0.1;
    
    event.target.style = `background-color: rgba(0, 0, 0, 
    ${event.target.secretOpacityValue});`;
}

function createEtchGrid(width) {
    etchASketch.setAttribute('style', `grid-template-columns: repeat(${width}, 1fr);`);

    for (let i = 0; i < width**2; i++) {
        let div = etchASketch.appendChild(document.createElement('div'));
        
        div.addEventListener('mouseover', sketchHandler);
        div.secretOpacityValue = 0;
    }
}

// Now the grid resetting code
let newGridButton = document.querySelector('.grid-button');
let gridWidthInput = document.querySelector('.grid-w');

function clearEtchGrid() {
    etchASketch.innerHTML = '';
}

function validateWidth(inputValue) {
    if (inputValue > maxWidth) {
        alert('Max value of 100.');
        return false;
    }
    else if (inputValue < 1) {
        alert('Minimum value of 1.');
        return false;
    }
    else if (isNaN(inputValue)) {
        alert("I don't know what the fuck you put " +
        "in there but that shit's NOT a number.");
        return false;
    }
    else return true;
}

newGridButton.addEventListener('click', (event) => {
    let newWidth = validateWidth(Number(gridWidthInput.value)) ?
    Number(gridWidthInput.value) : maxWidth;

    clearEtchGrid();
    createEtchGrid(newWidth);
});

createEtchGrid(maxWidth);
import { toCN } from '/CN.js';

export let board = new Array(8);
for (let i=0; i<8; i++) {
    board[i] = new Array(8);
    for (let j=0; j<8; j++) {
        board[i][j] = '';
    }
}

export let HTMLboard = document.querySelector('.board');

for (let i=0; i<8; i++) {
    let row = document.createElement('div');
    row.classList.add('row');
    for (let j=0; j<8; j++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');

        if (i===0) cell.classList.add('border-U');
		else cell.classList.add('border-u');
		if (j===0) cell.classList.add('border-L');
		else cell.classList.add('border-l');
		if (i===7) cell.classList.add('border-D');
		else cell.classList.add('border-d');
		if (j===7) cell.classList.add('border-R');
        else cell.classList.add('border-r');
        
        let image = document.createElement('div');
        image.classList.add('imageDiv');
        image.id = String(i) + ' ' + String(j);
        image.ondragstart = () => false;
        cell.appendChild(image);

        row.appendChild(cell);
    }
    HTMLboard.appendChild(row);
}

for (let i=0; i<8; i++) {
    for (let j=0; j<8; j++) {
        Object.defineProperty(Array.prototype, toCN(i, j), {
            get() {
                return this[i][j];
            },
            set(value) {
                this[i][j] = value;
            }
        });
    }
}
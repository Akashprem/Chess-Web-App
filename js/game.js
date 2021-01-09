import { Bishop, Rook, Queen, Knight, King, Pawn, pawnInitialSquares } from '/js/piece.js';
import { board, HTMLboard } from '/js/board.js';
import { fromCN, toCN } from '/js/CN.js';
import { checkCheck, checkCheckMate, checkStaleMate } from '/js/check.js';

// Initialize The Board:
export let allPieces = [], turn = 'white', selected = null;

allPieces.push(new Bishop('white', 'c1'));
allPieces.push(new Bishop('white', 'f1'));
allPieces.push(new Bishop('black', 'c8'));
allPieces.push(new Bishop('black', 'f8'));
allPieces.push(new Rook('white', 'a1'));
allPieces.push(new Rook('white', 'h1'));
allPieces.push(new Rook('black', 'a8'));
allPieces.push(new Rook('black', 'h8'));
allPieces.push(new Queen('white', 'd1'));
allPieces.push(new Queen('black', 'd8'));
allPieces.push(new Knight('white', 'b1'));
allPieces.push(new Knight('white', 'g1'));
allPieces.push(new Knight('black', 'b8'));
allPieces.push(new Knight('black', 'g8'));
allPieces.push(new King('white', 'e1'));
allPieces.push(new King('black', 'e8'));
for (let square of pawnInitialSquares['white'])
    allPieces.push(new Pawn('white', square));
for (let square of pawnInitialSquares['black'])
    allPieces.push(new Pawn('black', square));

allPieces.forEach(elem => {
    board[elem.square] = elem;
    elem.imageSrc = '/images/' + elem.color + '-' + elem.type + '.png';
});

function drawBoard() {
    allPieces.forEach(elem => elem.updateLegalMoves());
    for (let i=0; i<8; i++) {
        for (let j=0; j<8; j++) {
            document.getElementById(String(i)+' '+String(j)).innerHTML = '';
            let cell = document.getElementById(String(i)+' '+String(j)).parentElement;
            if (!((i+j)%2)) cell.style.backgroundColor = 'rgb(232, 235, 239, 0.5)';
            else cell.style.backgroundColor = 'rgb(125, 135, 150, 0.5)';
        }
    }
    for (let i=0; i<8; i++) {
        for (let j=0; j<8; j++) {
            if (board[i][j] !== '') {
                let div = document.getElementById(String(i)+' '+String(j));
                let image = document.createElement('img');
                image.src = board[i][j].imageSrc;
                image.classList.add('image');
                div.appendChild(image);
                image.classList.add(board[i][j].type);
                image.classList.add(board[i][j].color);
            }
        }
    }
}

drawBoard();

function toggleMoves(cur) {
    if (cur) {
        cur.parentElement.classList.toggle('selected');
        let legalMoves = board[Number(cur.id[0])][Number(cur.id[2])].legalMoves;
        if (legalMoves) {
            legalMoves.forEach(CN => {
                let i = fromCN(CN)[0];
                let j = fromCN(CN)[1];
                let cell = document.getElementById(String(i)+' '+String(j)).parentElement
                cell.classList.toggle('legalMoves');
                if (cell.classList.contains('legalMoves')) {
                    cell.appendChild(document.createElement('span'));
                }
                else {
                    cell.removeChild(cell.children[1]);
                }
            })
        }
    }
}

HTMLboard.addEventListener('click', e => {
    e.preventDefault();
    let cur = e.target;
    if (cur.classList.contains('cell')) cur = cur.children[0];
    if (cur.classList.contains('imageDiv')) {
        if (cur.children[0])
            cur = cur.children[0];
        else {
            // Making A Move To An Unoccupied Location:
            if (cur.parentElement.classList.contains('legalMoves')) {
                let currentPiece = board[Number(selected.id[0])][Number(selected.id[2])];
                let move_i = Number(cur.id[0]);
                let move_j = Number(cur.id[2]);
                makeMove(board, currentPiece, move_i, move_j);
                e.stopPropagation();
            }
        }
    }
    if (cur.classList.contains('image')) {
        if (cur.classList.contains(turn)) {
            if (selected) toggleMoves(selected);
            if ((!selected) || (selected !== cur.parentElement)) {
                toggleMoves(cur.parentElement);
                selected = cur.parentElement;
            }
            else selected = null;
            e.stopPropagation();
        }
        // Making A Move To An Occupied Location:
        if (cur.parentElement.parentElement.classList.contains('legalMoves')) {
            let currentPiece = board[Number(selected.id[0])][Number(selected.id[2])];
            let move_i = Number(cur.parentElement.id[0]);
            let move_j = Number(cur.parentElement.id[2]);
            makeMove(board, currentPiece, move_i, move_j);
            e.stopPropagation();
        }
    }
})

document.addEventListener('click', e => {
    e.preventDefault();
    if (selected) {
        toggleMoves(selected);
        selected = null;
    }
})

function toggleTurn() {
    turn = (turn === 'black') ? 'white' : 'black';
}

export function makeMove(board, piece, i, j, draw=true) {
    let capturedPiece = null, castling = null;

    // Checking for Castling
    if ((piece.type === 'King') && (Math.abs(piece.col - j) === 2)) {
        castling = true;
    }

    if (board[i][j] !== '') {
        capturedPiece = board[i][j];
    }

    if (piece.type === 'Rook' || piece.type === 'King') {
        piece.hasMoved = true;
    }

    allPieces.forEach(elem => {
        if ((elem.color === piece.color) && (elem.type === 'Pawn'))
            elem.enpassant = false;
    });
    
    if ((piece.type === 'Pawn') && (Math.abs(piece.row - i) === 2)) {
        piece.enpassant = true;
    }

    if ((piece.type === 'Pawn') && (board[i][j] === '') && (j !== piece.col)) {
        // Capture for En Passant Move:
        let capturedPiece;
        if (piece.color === 'white') {
            capturedPiece = board[i+1][j];
            board[i+1][j] = '';
        }
        if (piece.color === 'black') {
            capturedPiece = board[i-1][j];
            board[i-1][j] = '';
        }
        let left = allPieces.slice(0, allPieces.indexOf(capturedPiece));
        let right = allPieces.slice(allPieces.indexOf(capturedPiece)+1);
        allPieces = left.concat(right);
    }

    board[piece.square] = '';
    board[i][j] = piece;
    piece.square = toCN(i, j);
    piece.row = i;
    piece.col = j;
    toggleTurn();
    toggleMoves(selected);
    selected = null;
    document.querySelectorAll('.legalMoves').forEach(cell => cell.classList.remove('legalMoves'));
    
    // Checking for Pawn Promotion
    if ((piece.type === 'Pawn') && ((piece.row === 0) || (piece.row === 7))) {
        let newDialog = document.createElement('dialog');
        let askForPiece = document.createElement('p');
        askForPiece.innerText = 'Select which piece you want to promote as?';
        newDialog.appendChild(askForPiece);
        let options = [
            {'name': 'Bishop'},
            {'name': 'Queen'},
            {'name': 'Rook'},
            {'name': 'Knight'}
        ];
        options.forEach(option => {
            let button = document.createElement('button');
            button.innerText = option.name;
            newDialog.appendChild(button);
            option.button = button;
        });
        document.body.appendChild(newDialog);
        newDialog.show();
        let promotedPiece;
        options.forEach(option => {
            option.button.addEventListener('click', () => {
                switch(option.name) {
                    case 'Bishop': promotedPiece = new Bishop(piece.color, piece.square); break;
                    case 'Queen': promotedPiece = new Queen(piece.color, piece.square); break;
                    case 'Rook': promotedPiece = new Rook(piece.color, piece.square); break;
                    case 'Knight': promotedPiece = new Knight(piece.color, piece.square); break;
                }
                newDialog.close();
                promotedPiece.imageSrc = '/images/' + piece.color + '-' + option.name + '.png';
                allPieces.push(promotedPiece);
                board[piece.square] = promotedPiece;
                let left = allPieces.slice(0, allPieces.indexOf(piece));
                let right = allPieces.slice(allPieces.indexOf(piece)+1);
                allPieces = left.concat(right);
                if (draw) drawBoard();
                checkCheck(allPieces);
                setTimeout(() => checkStaleMate(allPieces), 0);
                setTimeout(() => checkCheckMate(allPieces), 0);
            });
        });
    }
    
    // Checking for Castling
    if (castling) {
        if (j === 2) {
            board[i][j+1] = board[i][j-2];
            board[i][j-2] = '';
            board[i][j+1].row = i;
            board[i][j+1].col = j+1;
            board[i][j+1].square = toCN(i, j+1);
        }
        if (j === 6) {
            board[i][j-1] = board[i][j+1];
            board[i][j+1] = '';
            board[i][j-1].row = i;
            board[i][j-1].col = j-1;
            board[i][j-1].square = toCN(i, j-1);
        }
    }

    if (capturedPiece) {
        let left = allPieces.slice(0, allPieces.indexOf(capturedPiece));
        let right = allPieces.slice(allPieces.indexOf(capturedPiece)+1);
        allPieces = left.concat(right);
    }

    if (draw) drawBoard();
    checkCheck(allPieces);
    setTimeout(() => checkStaleMate(allPieces), 0);
    setTimeout(() => checkCheckMate(allPieces), 0);
}
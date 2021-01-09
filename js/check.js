import { board } from '/js/board.js'
import { capture, pawnMove } from '/js/game.js'

export let boardsHistory = {}, move = 0;

export function checkCheck(allPieces) {
    let color = null;
    allPieces.forEach(piece => {
        if (piece.type === 'King' && piece.kingCheck()) {
            let cell = document.getElementById(piece.row + ' ' + piece.col).parentElement;
            cell.style.backgroundColor = 'rgb(255, 0, 0)';
            color = piece.color;
        }
    });
    return color;
}

export function checkCheckMate(allPieces) {
    let moveExists = {
        'white': false,
        'black': false
    }
    allPieces.forEach(piece => {
        if (piece.legalMoves.length !== 0) {
            moveExists[piece.color] = true;
        }
    });
    let checkedKingColor = checkCheck(allPieces);
    if (checkedKingColor && !moveExists[checkedKingColor]) {
        alert(checkedKingColor + ' king has been checkmated!!!');
        location.reload();
    }
}

export function checkStaleMate(allPieces) {
    let moveExists = {
        'white': false,
        'black': false
    }
    allPieces.forEach(piece => {
        if (piece.legalMoves.length !== 0) {
            moveExists[piece.color] = true;
        }
    });

    let checkedKingColor = checkCheck(allPieces);
    if (!checkedKingColor && !(moveExists['white'] && moveExists['black'])) {
        alert('Stalemate!!!');
        location.reload();
    }

    // Check for 3 Repeated Positions:
    if (boardsHistory[JSON.stringify(board)]) {
        boardsHistory[JSON.stringify(board)] += 1;
    }
    else {
        boardsHistory[JSON.stringify(board)] = 1;
    }
    Object.keys(boardsHistory).forEach(key => {
        if (boardsHistory[key] >= 3) {
            alert('Stalemate by 3-fold repetition!!!');
            location.reload();
        }
    })

    // Check for 50 Move Rule:
    if (!(capture || pawnMove)) {
        move += 1;
    }
    else {
        move = 0;
    }
    if (move === 50*2) {
        alert('Stalemate by 50 move rule!!!');
        location.reload();
    }
}

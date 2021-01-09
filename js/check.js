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
}

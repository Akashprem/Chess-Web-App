import { fromCN, toCN } from '/js/CN.js';
import { board } from '/js/board.js';

export let pawnInitialSquares = {};
pawnInitialSquares['white'] = ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'];
pawnInitialSquares['black'] = ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'];

function valid(i, j) {
    return (i>=0 && i<8) && (j>=0 && j<8);
}

class Piece {
    constructor(color, square) {
        this.color = color;
        this.square = square;
        this.type = 'Piece';
        this.row = fromCN(square)[0];
        this.col = fromCN(square)[1];
        this.legalMoves = [];
    }

    kingCheck() {
        let i, j;

        for (let t_i=0; t_i<8; t_i++) {
            for (let t_j=0; t_j<8; t_j++) {
                if (board[t_i][t_j].type === 'King') {
                    if (board[t_i][t_j].color === this.color) {
                        i = t_i; j = t_j;
                        break;
                    }
                }
            }
        }

        // Checking The Diagonals:
        for (let k=1; k<=8; k++) {
            if (valid(i+k, j+k) && board[i+k][j+k] !== '') {
                if (board[i+k][j+k].color !== this.color)
                    if ((board[i+k][j+k].type === 'Bishop') || (board[i+k][j+k].type === 'Queen'))
                        return true;
                break;
            }
        }
        for (let k=1; k<=8; k++) {
            if (valid(i+k, j-k) && board[i+k][j-k] !== '') {
                if (board[i+k][j-k].color !== this.color)
                    if ((board[i+k][j-k].type === 'Bishop') || (board[i+k][j-k].type === 'Queen'))
                        return true;
                break;
            }
        }
        for (let k=1; k<=8; k++) {
            if (valid(i-k, j+k) && board[i-k][j+k] !== '') {
                if (board[i-k][j+k].color !== this.color)
                    if ((board[i-k][j+k].type === 'Bishop') || (board[i-k][j+k].type === 'Queen'))
                        return true;
                break;
            }
        }
        for (let k=1; k<=8; k++) {
            if (valid(i-k, j-k) && board[i-k][j-k] !== '') {
                if (board[i-k][j-k].color !== this.color)
                    if ((board[i-k][j-k].type === 'Bishop') || (board[i-k][j-k].type === 'Queen'))
                        return true;
                break;
            }
        }

        // Checking The Files & Ranks:
        for (let k=1; k<=8; k++) {
            if (valid(i+k, j) && board[i+k][j] !== '') {
                if (board[i+k][j].color !== this.color)
                    if ((board[i+k][j].type === 'Rook') || (board[i+k][j].type === 'Queen'))
                        return true;
                break;
            }
        }
        for (let k=1; k<=8; k++) {
            if (valid(i-k, j) && board[i-k][j] !== '') {
                if (board[i-k][j].color !== this.color)
                    if ((board[i-k][j].type === 'Rook') || (board[i-k][j].type === 'Queen'))
                        return true;
                break;
            }
        }
        for (let k=1; k<=8; k++) {
            if (valid(i, j+k) && board[i][j+k] !== '') {
                if (board[i][j+k].color !== this.color)
                    if ((board[i][j+k].type === 'Rook') || (board[i][j+k].type === 'Queen'))
                        return true;
                break;
            }
        }
        for (let k=1; k<=8; k++) {
            if (valid(i, j-k) && board[i][j-k] !== '') {
                if (board[i][j-k].color !== this.color)
                    if ((board[i][j-k].type === 'Rook') || (board[i][j-k].type === 'Queen'))
                        return true;
                break;
            }
        }

        // Checking The Knight Moves:
        if (valid(i+1, j+2) && board[i+1][j+2] !== '')
            if (board[i+1][j+2].color !== this.color)
                if (board[i+1][j+2].type === 'Knight')
                    return true;
        if (valid(i+1, j-2) && board[i+1][j-2] !== '')
            if (board[i+1][j-2].color !== this.color)
                if (board[i+1][j-2].type === 'Knight')
                    return true;
        if (valid(i-1, j+2) && board[i-1][j+2] !== '')
            if (board[i-1][j+2].color !== this.color)
                if (board[i-1][j+2].type === 'Knight')
                    return true;
        if (valid(i-1, j-2) && board[i-1][j-2] !== '')
            if (board[i-1][j-2].color !== this.color)
                if (board[i-1][j-2].type === 'Knight')
                    return true;
        if (valid(i+2, j+1) && board[i+2][j+1] !== '')
            if (board[i+2][j+1].color !== this.color)
                if (board[i+2][j+1].type === 'Knight')
                    return true;
        if (valid(i-2, j+1) && board[i-2][j+1] !== '')
            if (board[i-2][j+1].color !== this.color)
                if (board[i-2][j+1].type === 'Knight')
                    return true;
        if (valid(i+2, j-1) && board[i+2][j-1] !== '')
            if (board[i+2][j-1].color !== this.color)
                if (board[i+2][j-1].type === 'Knight')
                    return true;
        if (valid(i-2, j-1) && board[i-2][j-1] !== '')
            if (board[i-2][j-1].color !== this.color)
                if (board[i-2][j-1].type === 'Knight')
                    return true;

        // Checking The Neighbour Cells:
        if (valid(i+1, j) && board[i+1][j] !== '')
            if (board[i+1][j].color !== this.color)
                if (board[i+1][j].type === 'King')
                    return true;
        if (valid(i-1, j) && board[i-1][j] !== '')
            if (board[i-1][j].color !== this.color)
                if (board[i-1][j].type === 'King')
                    return true;
        if (valid(i+1, j+1) && board[i+1][j+1] !== '')
            if (board[i+1][j+1].color !== this.color)
                if (board[i+1][j+1].type === 'King')
                    return true;
        if (valid(i, j+1) && board[i][j+1] !== '')
            if (board[i][j+1].color !== this.color)
                if (board[i][j+1].type === 'King')
                    return true;
        if (valid(i-1, j+1) && board[i-1][j+1] !== '')
            if (board[i-1][j+1].color !== this.color)
                if (board[i-1][j+1].type === 'King')
                    return true;
        if (valid(i+1, j-1) && board[i+1][j-1] !== '')
            if (board[i+1][j-1].color !== this.color)
                if (board[i+1][j-1].type === 'King')
                    return true;
        if (valid(i, j-1) && board[i][j-1] !== '')
            if (board[i][j-1].color !== this.color)
                if (board[i][j-1].type === 'King')
                    return true;
        if (valid(i-1, j-1) && board[i-1][j-1] !== '')
            if (board[i-1][j-1].color !== this.color)
                if (board[i-1][j-1].type === 'King')
                    return true;
        
        // Checking for Pawn Attacks:
        if (this.color === 'black') {
            if (valid(i+1, j-1) && board[i+1][j-1] !== '')
                if (board[i+1][j-1].color === 'white')
                    if (board[i+1][j-1].type === 'Pawn')
                        return true;
            if (valid(i+1, j+1) && board[i+1][j+1] !== '')
                if (board[i+1][j+1].color === 'white')
                    if (board[i+1][j+1].type === 'Pawn')
                        return true;
        }
        if (this.color === 'white') {
            if (valid(i-1, j-1) && board[i-1][j-1] !== '')
                if (board[i-1][j-1].color === 'black')
                    if (board[i-1][j-1].type === 'Pawn')
                        return true;
            if (valid(i-1, j+1) && board[i-1][j+1] !== '')
                if (board[i-1][j+1].color === 'black')
                    if (board[i-1][j+1].type === 'Pawn')
                        return true;
        }

        return false;
    }

    addLegalMovesDirection(opp1, opp2) {
        let i = this.row;
        let j = this.col;
        for (let k=1; k<=8; k++) {
            let p1, p2;
            switch (opp1) {
                case '+': p1 = i + k; break;
                case '-': p1 = i - k; break;
                case '' : p1 = i; break;
            }
            switch (opp2) {
                case '+': p2 = j + k; break;
                case '-': p2 = j - k; break;
                case '' : p2 = j; break;
            }
            this.addLegalMove(p1, p2);
            if (valid(p1, p2) && board[p1][p2] !== '')
                    break;
        }
    }

    addLegalMovesDirection(opp1, opp2) {
        let i = this.row;
        let j = this.col;
        for (let k=1; k<=8; k++) {
            let p1, p2;
            switch (opp1) {
                case '+': p1 = i + k; break;
                case '-': p1 = i - k; break;
                case '' : p1 = i; break;
            }
            switch (opp2) {
                case '+': p2 = j + k; break;
                case '-': p2 = j - k; break;
                case '' : p2 = j; break;
            }
            this.addLegalMove(p1, p2);
            if (valid(p1, p2) && board[p1][p2] !== '')
                    break;
        }
    }

    addLegalMove(p1, p2) {
        // check if square is within the bounds:
        if (valid(p1, p2)) {
            if ((board[p1][p2] === '') ||
                (board[p1][p2] !== '' && board[p1][p2].color !== this.color)) {
                let oldSquare = this.square;
                let newSquare = toCN(p1, p2);
                let capturedPiece = board[newSquare];
                board[oldSquare] = '';
                board[newSquare] = this;
                this.square = newSquare;
                this.row = fromCN(newSquare)[0];
                this.col = fromCN(newSquare)[1];
                
                if (!this.kingCheck())
                    this.legalMoves.push(newSquare);
                
                board[oldSquare] = this;
                board[newSquare] = capturedPiece;
                this.square = oldSquare;
                this.row = fromCN(oldSquare)[0];
                this.col = fromCN(oldSquare)[1];
            }
        }
    }
}

export class Bishop extends Piece {
    constructor(color, square) {
        super(color, square);
        this.type = 'Bishop';
    }

    updateLegalMoves() {
        this.legalMoves = [];

        this.addLegalMovesDirection('+', '+');
        this.addLegalMovesDirection('+', '-');
        this.addLegalMovesDirection('-', '+');
        this.addLegalMovesDirection('-', '-');

        this.legalMoves = [...new Set(this.legalMoves)];
    }
}

export class Rook extends Piece {
    constructor(color, square) {
        super(color, square);
        this.type = 'Rook';
        this.hasMoved = false;
    }

    updateLegalMoves() {
        this.legalMoves = [];

        this.addLegalMovesDirection('+', '');
        this.addLegalMovesDirection('', '+');
        this.addLegalMovesDirection('-', '');
        this.addLegalMovesDirection('', '-');

        this.legalMoves = [...new Set(this.legalMoves)];
    }
}

export class Queen extends Piece {
    constructor(color, square) {
        super(color, square);
        this.type = 'Queen';
    }

    updateLegalMoves() {
        this.legalMoves = [];

        // The Bishop Moves:
        this.addLegalMovesDirection('+', '+');
        this.addLegalMovesDirection('+', '-');
        this.addLegalMovesDirection('-', '+');
        this.addLegalMovesDirection('-', '-');

        // The Rook Moves:
        this.addLegalMovesDirection('+', '');
        this.addLegalMovesDirection('', '+');
        this.addLegalMovesDirection('-', '');
        this.addLegalMovesDirection('', '-');

        this.legalMoves = [...new Set(this.legalMoves)];
    }
}

export class Knight extends Piece {
    constructor(color, square) {
        super(color, square);
        this.type = 'Knight';
    }

    updateLegalMoves() {
        this.legalMoves = [];

        let i = this.row;
        let j = this.col;
        this.addLegalMove(i+2, j+1);
        this.addLegalMove(i+2, j-1);
        this.addLegalMove(i-2, j+1);
        this.addLegalMove(i-2, j-1);
        this.addLegalMove(i+1, j+2);
        this.addLegalMove(i+1, j-2);
        this.addLegalMove(i-1, j+2);
        this.addLegalMove(i-1, j-2);

        this.legalMoves = [...new Set(this.legalMoves)];
    }
}

export class King extends Piece {
    constructor(color, square) {
        super(color, square);
        this.type = 'King';
        this.hasMoved = false;
    }

    updateLegalMoves() {
        this.legalMoves = [];

        let i = this.row;
        let j = this.col;
        this.addLegalMove(i+1, j+1);
        this.addLegalMove(i+1, j);
        this.addLegalMove(i+1, j-1);
        this.addLegalMove(i, j+1);
        this.addLegalMove(i, j-1);
        this.addLegalMove(i-1, j+1);
        this.addLegalMove(i-1, j);
        this.addLegalMove(i-1, j-1);

        // Checking whether Castling is Legal:
        if (!this.hasMoved)
            if (valid(i, j+3) && !board[i][j+3].hasMoved)
                if (board[i][j+1] === '' && board[i][j+2] === '')
                    if (!this.kingCheck() && this.legalMoves.includes(toCN(i, j+1)))
                        this.addLegalMove(i, j+2);
        if (!this.hasMoved)
            if (valid(i, j-4) && !board[i][j-4].hasMoved)
                if (board[i][j-1] === '' && board[i][j-2] === '' && board[i][j-3] === '')
                    if (!this.kingCheck() && this.legalMoves.includes(toCN(i, j-1)))
                        this.addLegalMove(i, j-2);

        this.legalMoves = [...new Set(this.legalMoves)];
    }
}

export class Pawn extends Piece {
    constructor(color, square) {
        super(color, square);
        this.type = 'Pawn';
        this.enpassant = false;
    }

    updateLegalMoves() {
        this.legalMoves = [];
        
        let p1i = (this.color === 'white') ? this.row-1 : this.row+1;
        let p2i = (this.color === 'white') ? this.row-2 : this.row+2;
        let p1j = this.col;
        let p2j = this.col;
        
        // Pawn Usual Move:
        if (valid(p1i, p1j))
            if (board[p1i][p1j] === '')
                this.addLegalMove(p1i, p1j);
        
        // Pawn Initial Double Move:
        if (valid(p2i, p2j))
            if ((board[p1i][p1j] === '') && (board[p2i][p2j] === ''))
                if (pawnInitialSquares[this.color].includes(this.square))
                    this.addLegalMove(p2i, p2j);
        
        // Pawn Capture:
        if (valid(p1i, p1j-1))
            if ((board[p1i][p1j-1] !== '') && (board[p1i][p1j-1].color !== this.color))
                this.addLegalMove(p1i, p1j-1);
        if (valid(p1i, p1j+1))
            if ((board[p1i][p1j+1] !== '') && (board[p1i][p1j+1].color !== this.color))
                this.addLegalMove(p1i, p1j+1);
        
        // Pawn En Passant Move:
        if (valid(p1i, p1j-1) && (valid(this.row, p1j-1))) {
            if ((board[this.row][p1j-1] !== '') && (board[this.row][p1j-1].color !== this.color)) {
                if ((board[this.row][p1j-1].type === 'Pawn') && (board[this.row][p1j-1].enpassant)) {
                    if (board[p1i][p1j-1] === '') {
                        let enPassantPawn = board[this.row][p1j-1];
                        board[this.row][this.col] = '';
                        board[this.row][p1j-1] = '';
                        board[p1i][p1j-1] = this;
                        if (!this.kingCheck()) this.legalMoves.push(toCN(p1i, p1j-1));
                        board[this.row][this.col] = this;
                        board[this.row][p1j-1] = enPassantPawn;
                        board[p1i][p1j-1] = '';
                    }
                }
            }
        }
        if (valid(p1i, p1j+1) && (valid(this.row, p1j+1))) {
            if ((board[this.row][p1j+1] !== '') && (board[this.row][p1j+1].color !== this.color)) {
                if ((board[this.row][p1j+1].type === 'Pawn') && (board[this.row][p1j+1].enpassant)) {
                    if (board[p1i][p1j+1] === '') {
                        let enPassantPawn = board[this.row][p1j+1];
                        board[this.row][this.col] = '';
                        board[this.row][p1j+1] = '';
                        board[p1i][p1j+1] = this;
                        if (!this.kingCheck()) this.legalMoves.push(toCN(p1i, p1j+1));
                        board[this.row][this.col] = this;
                        board[this.row][p1j+1] = enPassantPawn;
                        board[p1i][p1j+1] = '';
                    }
                }
            }
        }
        
        this.legalMoves = [...new Set(this.legalMoves)];
    }
}
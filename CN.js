export function toCN(i, j) {
    return String.fromCharCode(97+j) + (8-i);
}

export function fromCN(CN) {
    return [8-CN[1], CN.charCodeAt(0)-97];
}
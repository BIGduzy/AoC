export function IsNumber(value) {
    return typeof value == 'number' && isFinite(value);
}

export function Sum(arr) {
    return arr.reduce((total, current) => total + current, 0);
}

export function Zip(...arrays) {
    return arrays[0].map((_, i) => arrays.map(array => array[i]));
}

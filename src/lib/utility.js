export function IsNumber(value) {
    return typeof value == 'number' && isFinite(value);
}

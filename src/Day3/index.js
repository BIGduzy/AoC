import { Sum } from "../lib/utility";

function ParseInput(input) {
    return input.split('\n').map(
        line => {
            const ExtractPositions = matched => [...matched].map(match => ({ name: match[0], position: { start: match.index, end: match.index + match[0].length } }));
            return { parts: ExtractPositions(line.matchAll(/\d+/g)), symbols: ExtractPositions(line.matchAll(/[^\w\s.]+|_+/g)) };
        },
    );
}
function IsAdjacent(a, b) {
    return a.start <= b.end && a.end >= b.start;
}

export function SumEnginePartNumbers(input) {
    return ParseInput(input)
        .map((currentLine, index, array) =>
            currentLine.parts.reduce((adjacentParts, currentPart) => [
                ...adjacentParts,
                (currentLine.symbols
                    // Previous and next lines
                    .concat(array[index - 1]?.symbols ?? [], array[index + 1]?.symbols ?? [])
                    .filter(symbol => IsAdjacent(currentPart.position, symbol.position))
                    .length
                    > 0
                )
                    ? parseInt(currentPart.name, 10)
                    : 0,
            ], []))
        .reduce((sum, partsPerLine) => sum + Sum(partsPerLine), 0);
}

export function SumGearRatios(input) {
    const CalculateGearRatios = ((gearRatios, adjacentParts) =>
        adjacentParts.length > 1
            ? [...gearRatios, adjacentParts.reduce((gearRatio, current) => gearRatio * parseInt(current.name, 10), 1)]
            : gearRatios);
    return ParseInput(input)
        .map((currentLine, index, array) =>
            currentLine.symbols
                .filter(symbol => symbol.name === '*')
                .reduce((gearRatios, currentSymbol) =>
                    CalculateGearRatios(
                        gearRatios,
                        currentLine.parts
                            .concat(array[index - 1]?.parts ?? [], array[index + 1]?.parts ?? [])
                            .filter(part => IsAdjacent(part.position, currentSymbol.position)))
                    , []))
        .reduce((sum, partsPerLine) => sum + Sum(partsPerLine), 0);
}

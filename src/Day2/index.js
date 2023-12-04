function ParseInput(input) {
    const data = [];
    for (const line of input.split('\n')) {
        if (line.length === 0) { continue; }
        const [game, results] = line.split(':');
        const ID = game.split(' ')[1];
        const matches = [];
        for (const entryString of results.split(';')) {
            const match = [];
            for (const color of entryString.split(',')) {
                const [, count, name] = color.split(' ');
                match.push({ ID, name, count: parseInt(count, 10) });
            }
            matches.push(match);
        }
        data.push(matches);

    }
    return data;
}

export function CountValidGames(input) {
    const data = ParseInput(input);
    const cubeCount = {
        "red": 12,
        "green": 13,
        "blue": 14,
    };

    const IsGameValid = entry =>
        !entry.some(color => color.count > cubeCount[color.name]);


    return data
        .map(game => game.reduce(
            (result, match) =>
                (!result.isValid)
                    ? result
                    : { isValid: IsGameValid(match), ID: parseInt(match[0].ID, 10) }
            , { isValid: true, ID: -1 }),
        )
        .reduce((total, current) => total + (current.isValid ? current.ID : 0), 0);
}

export function CalculateFewestPossibleCubes(input) {
    const Dot = obj => Object.values(obj).reduce((a, b) => a * b, 1);

    return ParseInput(input)
        .map(game =>
            game.reduce(
                (minimumRequiredCubes, match) =>
                    match.reduce((colorCounts, { name, count }) => ({
                        ...colorCounts,
                        [name]: Math.max(colorCounts[name] ?? 0, count),
                    }), minimumRequiredCubes),
                {}))
        .reduce((total, current) =>
            total + Dot(current), 0);
}

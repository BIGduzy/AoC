function ParseInput(input) {
    return input
        .split('\n')
        .filter(line => line.length > 1)
        .map(line => ({
            ID: parseInt([...line.matchAll(/(\d+):/g)][0][1], 10),
            winningNumbers: line
                .split(':')[1]
                .split('|')[0]
                .split(' ')
                .filter(number => number.length > 0)
                .map(number => parseInt(number, 10)),
            myNumbers: line
                .split('|')[1]
                .split(' ')
                .filter(number => number.length > 0)
                .map(number => parseInt(number, 10)),
        }));
}

export function CalculateScratchCardPoints(input) {
    return ParseInput(input)
        .map(card => card.myNumbers
            .filter(number => card.winningNumbers.includes(number))
            .reduce(total => (total > 0) ? total * 2 : 1, 0),
        ).reduce((sum, cur) => sum + cur, 0);
}

export function CalculateNumberOfScratchCards(input) {
    const lookUp = {};
    const data = ParseInput(input);
    const CountNumberOfScratchCards = (cards, count) => {
        if (cards.length === 0) { return count; }

        const winningCards = cards
            .flatMap(card => {
                if (lookUp[card.ID] !== undefined) {
                    return lookUp[card.ID];
                }
                const result = card.myNumbers
                    .filter(number => card.winningNumbers.includes(number))
                    .map((_, index) => card.ID + index + 1)
                    .map(cardIndex => cards.find(c => c.ID === cardIndex));
                lookUp[card.ID] = result;
                return result;
            });

        return CountNumberOfScratchCards(winningCards, count + winningCards.length);
    };

    return CountNumberOfScratchCards(data, data.length);
}

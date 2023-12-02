import { IsNumber } from "../lib/utility";

export function RecoverCalibration(input) {
    return input
        .split("\n")
        .map(string => {
            const numbers = string.match(/\d/g);
            // In case file has newline at end
            return (numbers === null || numbers.length === 0) ? 0 : parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`)
        })
        .reduce((sum, cur) => sum + cur);
}

function ReverseString(str) {
    return (str === undefined) ? str : [...str].reverse().join('');
}

export function RecoverCalibrationWithWords(input) {
    const words = {
        "zero": 0,
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9,
    };

    const MatchFirstAndLast = string => {
        const matchString = `(\\d)|${Object.keys(words).join('|')}`;
        const first = string.match(new RegExp(matchString, 'g'))?.[0];
        const reverseMatchString = `(\\d)|${Object.keys(words).map(word => ReverseString(word)).join('|')}`;
        const last = ReverseString(ReverseString(string).match(new RegExp(reverseMatchString, 'g'))?.[0]);
        // In case file has newline at end
        return (first === undefined || last === undefined) ? 0 : parseInt(`${words[first] || first}${words[last] || last}`);
    }

    return input
        .split("\n")
        .map(MatchFirstAndLast)
        .reduce((sum, cur) => sum + cur, 0);
}

import { RecoverCalibration, RecoverCalibrationWithWords } from "./Day1";
import { CountValidGames, CalculateFewestPossibleCubes } from "./Day2";
import { ReadFile } from "./lib/io";

const solutions = {
    "Day1": { "A": RecoverCalibration, "B": RecoverCalibrationWithWords },
    "Day2": { "A": CountValidGames, "B": CalculateFewestPossibleCubes },
};

async function PrintSolutions(solutions) {
    for (const [name, day] of Object.entries(solutions)) {
        console.log(`${name}: `);
        for (const [part, solution] of Object.entries(day)) {
            await ReadFile(`src/${name}/input_${part}.txt`)
                .then(data => console.log(`${part}: `, solution(data)))
                .catch(err => console.error(err));

        }
    }
}

PrintSolutions(solutions);

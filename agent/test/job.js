
import { expect } from 'chai';
import Job from '../lib/job.js';

let exampleJob = {
    jobId: 1,
    tasks: [
        {
            name: "Generate Words",
            id: "generate-words",
            text: `Generate {totalWords} words of {types} in {topic} that no longer than {gridSize} characters and choose a one word that easy to place the first on the crossword grid and put on the first item`,
            output: "array", // array, string
        },
        {
            name: "Generate Clues",
            id: "generate-clues",
            text: `And from the list {generateWords} return the clue for crossword game for all items, the string must be in this format "this is a clue"`,
            output: "array", // array, string 
        }
    ],
    variables: {
        totalWords: "40",
        types: "character name",
        topic: "The Matrix movies",
        gridSize: "15",
        generateWords: "output:generate-words",
        generateClues: "output:generate-clues"
    },
    output: "HTML",
    outputPackage: "html-crossword"
}

let job

describe('#job()', function () {

    // add a test hook
    before(function () {

        job = new Job(
            exampleJob.jobId,
            exampleJob.tasks,
            exampleJob.variables
        )

    })

    // test a functionality
    it('should add numbers', function () {



    })



})
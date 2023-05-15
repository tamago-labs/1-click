import { expect } from 'chai';
import Task from '../lib/task.js';

import 'dotenv/config'

let taskInstance

let variables

const EXAMPLE_1 = {
    name: "Generate Words",
    id: "generate-words",
    model: "chat",
    text: `Generate {totalWords} words of {types} in {topic} that no longer than {gridSize} characters and choose a one word that easy to place the first on the crossword grid and put on the first item`,
    output: "array", // array, string
}

const EXAMPLE_2 = {
    name: "Generate Clues",
    id: "generate-clues",
    model: "chat",
    text: `And from the list {generateWords} return the clue for crossword game for all items`,
    output: "array", // array, string 
}

const EXAMPLE_3 = {
    name: "Generate Images",
    id: "generate-images",
    model: "image",
    text: `{topic}, game background`
}

const VARIABLES = {
    totalWords: "10",
    types: "character name",
    topic: "The Matrix movies",
    gridSize: "15",
    generateWords: "output:generate-words",
    generateClues: "output:generate-clues"
}

describe('#task()', function () {

    before(function () {
        taskInstance = new Task({
            apiKey: process.env.OPENAI_API_KEY,
            variables: VARIABLES,
            ...EXAMPLE_1
        })
    })

    // test a functionality
    it('prompt is correct', async function () {

        const prompt = taskInstance.prompt()
        expect(prompt).equal(`Generate 10 words of character name in The Matrix movies that no longer than 15 characters and choose a one word that easy to place the first on the crossword grid and put on the first item`)

    })

    it('execute a first task', async function () {

        await taskInstance.execute()
        expect(taskInstance.executed).equal(true)

        const updatedVariable = taskInstance.variables
        expect(updatedVariable["output:generate-words"].length).to.equal(10)

        variables = taskInstance.variables
    })

    it('execute a second task', async function () {

        const newTask = new Task({
            apiKey: process.env.OPENAI_API_KEY,
            variables: taskInstance.variables,
            ...EXAMPLE_2
        })

        await newTask.execute()
        expect(newTask.executed).equal(true)

        const updatedVariable = newTask.variables
        expect(updatedVariable["output:generate-clues"].length).to.equal(10)

        variables = updatedVariable
    })

    it('execute a third task', async function () {

        const newTask = new Task({
            apiKey: process.env.HF_ACCESS_KEY,
            variables: taskInstance.variables,
            ...EXAMPLE_3
        })

        await newTask.execute()
        expect(newTask.executed).equal(true)

        const updatedVariable = newTask.variables
        console.log("updatedVariable --> ", updatedVariable)

    })

})
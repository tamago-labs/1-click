

// import { expect } from 'chai';
// import OpenAI from '../lib/openai.js';

// import 'dotenv/config' 

// let openaiInstance

// describe('#openai()', function () {

//     // add a test hook
//     before(function () {
//         openaiInstance = new OpenAI(process.env.OPENAI_API_KEY, process.env.OPENAI_API_MODEL)
//     })

//     // test a functionality
//     it('ask basic question', async function () {

//         const answer = await openaiInstance.execute("Who was the first man on the Moon?")
//         expect(answer).includes("Neil Armstrong")

//     })

//     it('return an array', async function () {

//         const answer = await openaiInstance.executeForArray("Who were the Apollo 11 astronauts?")
//         expect(answer.length).equal(3)
//     })

//     it('return only a single string', async function () {

//         const answer = await openaiInstance.executeForSingleString("Who was the first man on the Moon?")
//         expect(answer).equal("Neil Armstrong.")

//     })



// })
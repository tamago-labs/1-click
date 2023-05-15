

const TEMPLATES = [
    // {
    //     name: "Automate Brainstorming",
    //     slug: "automate-brainstorming",
    //     description: "A template for brainstorming on a specific objective in a BabyAGI-styled context",
    //     cost: 1,
    //     output: "HTML",
    //     prompts: [

    //     ]
    // },
    {
        name: "Crossword Game",
        slug: "crossword-game",
        description: "A template for creating a custom crossword game on a specific topic that can run within a browser",
        cost: 1,
        tasks: [
            {
                name: "Generate Words",
                id: "generate-words",
                model: "chat",
                text: `Generate {totalWords} words of {types} in {topic} that no longer than 10 characters and choose a one word that easy to place the first on the crossword grid and put on the first item`,
                variables: {
                    types: {
                        name: "Types",
                        placeholder: "Character",
                        description: "cities name,  characters name"
                    },
                    topic: {
                        name: "Topic",
                        placeholder: "The Matrix Movies",
                        description: "Bitcoin whitepaper, children book"
                    },
                    totalWords: {
                        name: "Total Words",
                        placeholder: "20",
                        description: "Total words to generate"
                    },
                },
                output: "array", // array, string
            },
            {
                name: "Generate Clues",
                id: "generate-clues",
                model: "chat",
                variables: {},
                text: `And from the list {generateWords} return the clue for crossword game for all items`,
                output: "array", // array, string 
            },
            // {
            //     name: "Generate Images",
            //     id: "generate-images",
            //     model: "image",
            //     variables: {},
            //     text: `{topic}, game background`
            // }
        ], 
        globalVariables: {
            generateWords: "output:generate-words",
            generateClues: "output:generate-clues"
        },
        output: "HTML",
        outputPackage: "html-crossword"
    },
    // {
    //     name: "Virtual Gallery",
    //     slug: "virtual-gallery",
    //     description: "A template for making a virtual gallery that can showcase your artworks ",
    //     cost: 1,
    //     output: "HTML",
    //     tasks: []
    // }
]

export default TEMPLATES


const TEMPLATES = [
    {
        name: "Automate Brainstorming",
        slug: "automate-brainstorming",
        description: "A template for brainstorming on a specific objective in a BabyAGI-styled context",
        cost: 1,
        output: "HTML",
        prompts: [
            
        ]
    },
    {
        name: "Crossword Game",
        slug: "crossword-game",
        description: "A template for creating a custom crossword game on a specific topic that can run within a browser",
        cost: 1,
        tasks: [
            {
                taskName: "Generate Words",
                text: `Generate {totalWords} words of {types} in {topic} that no longer than {gridSize} characters and choose a one word that easy to place the first on the crossword grid and put on the first item`,
                variables: ["totalWords", "types", "topic", "gridSize"],
                output: "array", // array, string
            },
            {
                taskName: "Generate Clues",
                text: `And from the list {generateWords} return the clue for crossword game for all items, the string must be in this format "this is a clue"`,
                variables: ["output:generate-words"],
                output: "array", // array, string 
            }
        ],
        output : "HTML",
        outputPackage : "html-crossword"
    },
    {
        name: "Virtual Gallery",
        slug: "virtual-gallery",
        description: "A template for making a virtual gallery that can showcase your artworks ",
        cost: 1,
        output: "HTML",
        prompts: []
    }
]

export default TEMPLATES
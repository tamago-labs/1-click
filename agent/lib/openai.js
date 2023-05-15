import { Configuration, OpenAIApi } from "openai"

class OpenAi {

    model
    openai

    constructor(apiKey, model = "gpt-3.5-turbo") {
        // Configure OpenAI
        const configuration = new Configuration({
            apiKey,
        });
        this.model = model
        this.openai = new OpenAIApi(configuration);
    }

    delay = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 3000);

        })
    }

    execute = async (prompt, temperature = 0.5, maxTokens = 2000) => {
        const messages = [{ "role": "system", "content": prompt }]

        const response = await this.openai.createChatCompletion({
            model: this.model,
            messages: messages,
            max_tokens: maxTokens,
            temperature: temperature,
            n: 1,
            stop: null
        })

        await this.delay()
        // console.log(response.data.choices[0].message.content.trim())
        return response.data.choices[0].message.content.trim()
    }

    executeForArray = async (prompt) => {
        const extendedPrompt = `
            You're an AI agent and can only answer in a single string JSON array.
            For example: ["A", "B", "C"]
            ${prompt}
        `
        let retry = 0
        let output
        while (true) {
            try {
                let result = await this.execute(extendedPrompt)
                output = JSON.parse(result.substring(result.indexOf("["), result.indexOf("]") + 1))
            } catch (e) {
                console.log("retry : ", retry+1)
            }
            if (retry > 5 || output) {
                break
            }
            retry += 1
        }
        return output
    }

    executeForSingleString = async (prompt) => {
        const extendedPrompt = `
            You're an AI agent and can only answer in a single string.
            ${prompt}
        `
        return await this.execute(extendedPrompt)
    }

}

export default OpenAi
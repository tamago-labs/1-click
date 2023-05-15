
import OpenAi from "./openai.js"
import HuggingFace from "./huggingface.js"

class Task {

    openai
    hf
    text
    variables
    output
    id
    result
    executed = false
    model

    constructor({
        apiKey,
        id,
        text,
        model,
        variables,
        output
    }) {

        if (model === "chat") {
            this.openai = new OpenAi(apiKey)
        } else if (model === "image") {
            this.hf = new HuggingFace(apiKey)
        }

        this.model = model

        this.id = id
        this.text = text
        this.variables = variables
        this.output = output
    }

    prompt = () => {
        return this.parse(this.text)
    }

    parse = (text) => {
        for (let variable of Object.keys(this.variables)) {
            if (text.indexOf(`{${variable}}`) !== -1) {
                text = text.replace(`{${variable}}`, this.variables[variable])
            }
        }
        return text
    }

    executeChat = async (prompt) => {
        if (this.output === "array") {
            return (await this.openai.executeForArray(prompt))
        } else if (this.output === "string") {
            return (await this.openai.executeForSingleString(prompt))
        } else {
           return (await this.openai.execute(prompt))
        }

    }

    execute = async () => {
        
        const prompt = this.prompt()
        let result

        
        // chat model
        if (this.model === "chat") {
            result = await this.executeChat(prompt)
        } 

        if (this.model === "image") {
            result = await this.hf.executeAndUpload(prompt)
        }

        this.result = result
        this.updateVariables(result)
        this.executed = true
    }

    updateVariables = (result) => {
        this.variables[`output:${this.id}`] = result
        for (let variable of Object.keys(this.variables)) {
            if (variable.includes("output:")) {
                for (let v of Object.keys(this.variables)) {
                    if (this.variables[v] === variable) {
                        this.variables[v] = this.variables[variable]
                    }
                }
            }
        }
    }

}

export default Task
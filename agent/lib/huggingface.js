import { HfInference } from "@huggingface/inference"
import fetch from "node-fetch";
import Blob from 'cross-blob';

globalThis.fetch = fetch
globalThis.Blob = Blob;

class HuggingFace {

    inference
    model

    constructor(accessToken, model = "stabilityai/stable-diffusion-2") {
        this.inference = new HfInference(accessToken)
        this.model = model
    }

    delay = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 3000);

        })
    }

    blobToBase64 = async (blob) => {
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return buffer.toString('base64')
    }

    execute = async (prompt) => {
        const blob = await this.inference.textToImage({
            model: this.model,
            inputs: prompt,
            // parameters: {
            //     negative_prompt: 'blurry' 
            // }
        })

        const base64 = await this.blobToBase64(blob)

        await this.delay()

        return base64
    }

    executeAndUpload = async (prompt) => {
        const base64 = await this.execute(prompt)

        const payload = {
            image: `data:image/png;base64,${base64}`
        }

        const response = await fetch(`https://api.tamagonft.xyz/v1/image`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        const json = await response.json();

        const { filename } = json
        return `https://img.tamagonft.xyz/${filename}`
    }

}

export default HuggingFace
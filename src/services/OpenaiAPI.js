import OpenAI from "openai";
const OPENAI_KEY = "Your api key"

const openai = new OpenAI({ apiKey: OPENAI_KEY, dangerouslyAllowBrowser: true });


export const OpenaiAPI = async (userMessage,guidedMessage) => {

    const prompt = `${guidedMessage}\n ${userMessage}`;

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "assistant",
            content: prompt
        }]
    })

    const message = response.choices[0];

    return message.message.content;

}
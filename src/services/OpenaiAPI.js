import OpenAI from "openai";
const openai = new OpenAI({ apiKey: "Your openai key", dangerouslyAllowBrowser: true });


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
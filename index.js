// import OpenAI from 'openai';

// // Create an instance of the OpenAI class

// const openAi = new OpenAI({
//     apiKey: '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',
// });

// const response = await openAi.chat.completions.create({
//     model: "gpt-3.5-turbo-0125",
//     messages: [
//         {
//             role: "user",
//             content: "What is the meaning of life?"
//         },
//     ],
//     temperature: 1,
//     max_tokens: 100,
//     top_p: 1,
//     frequency_penalty: 0,
//     presence_penalty: 0,
// });
// console.log(response.choices[0].message.content);

// // Path: server.js
import express from 'express';
import OpenAI from 'openai';

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static('public'));

const openAi = new OpenAI({
    apiKey: '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',
});

app.post('/ask', async (req, res) => {
    console.log(req.body); 
    const { message } = req.body; 
    console.log(message); 
    if (!message || typeof message !== 'string') { 
        return res.status(400).json({ error: "Invalid message format" });
    }

    const response = await openAi.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: [
            {
                role: "user",
                content: message
            },
        ],
        temperature: 1,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    console.log(response.choices[0].message.content);
    res.json(response.choices[0].message.content);
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}
);
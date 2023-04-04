import { Configuration, OpenAIApi } from 'openai';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv'

dotenv.config()

const config = new Configuration({
    organization: 'org-JKbmXUwvaBF4pTT33doEHiuc',
    apiKey: process.env.GPT_API_KEY,
});

const openai = new OpenAIApi(config);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {

    const { message } = req.body

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: `${message}` }
            ]
        });

        res.json({
            completion: completion.data.choices[0].message
        })
    }
    catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }

});

app.listen(port, () => {
    console.log('Listning on port', port)
})
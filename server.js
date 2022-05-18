const express = require('express')
const app = express()
const port = process.env.PORT || 3000

require('dotenv').config();//This will allow you to get env key

const OpenAI = require('openai-api');

// Load your key from an environment variable or secret management service
// (do not include your key directly in your code)

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI(OPENAI_API_KEY);

app.listen(port, () => {
    console.log(`Example app listening on port`)
  })

app.use(express.static(__dirname + "/public"));

app.use(express.json());//need this to be able to pass json

app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname +"/public/index.html")
})

app.post("/api",(req,res)=>{
    let serverString=req.body["body"];

    let engineChoice=req.body["selectEngine"];

    (async () => {
        const gptResponse = await openai.complete({
            engine: engineChoice,
            prompt: serverString,
            maxTokens: 100,
            temperature: 0.9,
            topP: 1,
            presencePenalty: 0,
            frequencyPenalty: 0,
            bestOf: 1,
            n: 1,
            stream: false,
            stop: ['\n', "testing"]
        });
        console.log(gptResponse.data);
        res.send(gptResponse.data);
    })();   
})



  
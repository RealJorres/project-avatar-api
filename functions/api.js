const express = require("express")
const serverless = require("serverless-http")
const Chance = require("chance")
const cors = require("cors");


const corsOptions = {
    origin: "https://relatorres-avatar-codex.netlify.app/",
};

const app = express();
app.use(cors(corsOptions));
const router = express.Router();
// create dummy data
const chance = new Chance();

const users = [...Array(250).keys()].map((id)=>{
    return{
        id,
        name: chance.name(),
        avatar: chance.avatar(),
        company: chance.company(),
        email: chance.email(),
    };
});

router.get("/", (req, res)=>{
    const q = req.query.q?.toLocaleLowerCase() || '';
    const results = users.filter((user)=>user.name.toLowerCase().includes(q));
    res.send(results)
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
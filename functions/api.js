const express = require("express")
const serverless = require("serverless-http")
const Chance = require("chance")

const app = express();
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
    res.json({
        users
    });
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
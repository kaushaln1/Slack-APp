var express = require('express')
var request = require('request')
var bodyParser = require('body-parser')
var app = express()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var YOUR_APP_VERIFICATION_TOKEN="PflxW3p2XoDpeKAlxWQV5dkX";
var fs=require('fs');
var dialog={
    "attachments": [
        {
            "callback_id": "select_simple_1234",
            "actions": [
                {
                    "name": "games_list",
                    "text": "Pick a game...",
                    "type": "select",
                    "options": [
                        {
                            "text": "Chess",
                            "value": "chess"
                        },
                        {
                            "text": "Falken's Maze",
                            "value": "maze"
                        },
                        {
                            "text": "Thermonuclear War",
                            "value": "war"
                        }
                    ],
                    "selected_options": [
                        {
                            "text": "Falken's Maze",
                            "value": "maze"
                        }
                    ]
                }
            ]
        }
    ]
}
function createdialog(responseURL,dialog)
{
    var postOptions = {
        uri: responseURL,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        json: dialog
    }
    request(postOptions, (error, response, body) => {
        if (error){
            // handle errors as you see 
            console.log(error)
            return 
        }
    })
}  
  
app.post('/slack/slash-commands/send-me-buttons', urlencodedParser, (req, res) =>{
    res.status(200).end() // best practice to respond with empty 200 status code
    var reqBody = req.body
    var responseURL = reqBody.response_url
    if (reqBody.token != YOUR_APP_VERIFICATION_TOKEN){
        res.status(403).end("Access forbidden")
    }else{
        var message = {
            "text": "This is your first interactive message",
            "attachments": [
                {
                    "text": "Building buttons is easy right?",
                    "fallback": "Shame... buttons aren't supported in this land",
                    "callback_id": "button_tutorial",
                    "color": "#3AA3E3",
                    "attachment_type": "default",
                    "actions": [
                        {
                            "name": "Who",
                            "text": "Who took PAR",
                            "type": "button",
                            "value": "yes"
                        },
                        {
                            "name": "Create",
                            "text": "Create Event",
                            "type": "button",
                            "value": "no"
                        }
                    ]
                }
            ]
        }
        sendMessageToSlackResponseURL(responseURL, message)
    }
})

function sendMessageToSlackResponseURL(responseURL, JSONmessage){
    var postOptions = {
        uri: responseURL,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        json: JSONmessage
    }
    request(postOptions, (error, response, body) => {
        if (error){
            // handle errors as you see fit
        }
    })
}
var today=new Date();


app.post('/slack/actions', urlencodedParser, (req, res) =>{
    res.status(200).end() // best practice to respond with 200 status
    var actionJSONPayload = JSON.parse(req.body.payload) // parse URL-encoded payload JSON string
    if (actionJSONPayload.actions[0].name=="Create")
    {   console.log(actionJSONPayload.response_url)
        data=actionJSONPayload.user.name+" took Access for  "+ today;
        fs.writeFileSync("paraccess.txt",data);

    }
    
        var data1=fs.readFileSync("paraccess.txt").toString();
        var message = {
            "text": data1,
            "replace_original": false
        }
        sendMessageToSlackResponseURL(actionJSONPayload.response_url,message)
    
})

app.post('/connect',(req,res)=>{
    res.json('Connected U in PAL!!');
})

app.listen(3000);
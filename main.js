'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {

   var  resjson={
        "text": "Choose One option",
        "attachments": [
            {
                "text": "",
                "fallback": "You are unable to choose a game",
                "callback_id": "wopr_game",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "option",
                        "text": "Whos took PAR",
                        "type": "button",
                        "value": "getdata"
                    },
                    {
                        "name": "option",
                        "text": "Create",
                        "type": "button",
                        "value": "postdata"
                    }
                ]
            }
        ]
    }

    res.json(resjson);

  });


app.get('/show_det',(req,res)=>{

 res.json(" <THIS GUY> Took PAR ACCESS from <THIS> to <THAT> time ");

})  

app.post('/create',(req,res)=>{

    res.json("FETCH form and update to DB ");

});

const server = app.listen(3000, () => {  
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);});

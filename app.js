/* eslint-disable no-undef */
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

let cards = ['wild', '+2r', '+4', 'reverser', 'skipr', '1r', '2r', '3r', '4r', '5r', '6r', '7r', '8r', '9r', '+2g', 'reverseg', 'skipg', '1g', '2g', '3g', '5g', '6g', '7g', '8g', '9g', '+2b', 'reverseb', 'skipb', '1b', '2b', '3b', '5b', '6b', '7b', '8b', '9b', '+2y', 'reversey', 'skipy', '1y', '2y', '3y', '5y', '6y', '7y', '8y', '9y']
console.log(cards.length)
const mysql = require('mysql2');







// Create a connection to the database
const connection = mysql.createConnection({
    host: 'mysql-fd2db12-ezioauditoredefinerz-0aca.a.aivencloud.com',
    user: 'avnadmin',
    port: 24359,
    password: 'AVNS_F-t_5J8xCYo1xscvEqW',
    database: 'defaultdb'
})
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }

    console.log('Connected to database as id ' + connection.threadId);
});


connection.query(`CREATE TABLE IF NOT EXISTS uno1 (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nopl INT,
  state VARCHAR(255),
  p1  VARCHAR(255),
  p2  VARCHAR(255),
  p3 LONGTEXT,
  p4 LONGTEXT,
  p1id VARCHAR(255),
  p2id VARCHAR(255),
  p3id VARCHAR(255),
  p4id VARCHAR(255),
  restdeck LONGTEXT,
  firstcard VARCHAR(255),
  currentp VARCHAR(255),
  nextp VARCHAR(255),
  roomid VARCHAR(255)
)`, (error, results, fields) => {
    if (error) {
        console.error('Error creating table: ' + error.message);
    } else {
        console.log('Table created successfully');
    }
});


const fs = require('node:fs');



data = fs.readFileSync('index.html', 'utf8');
app.get('/', (req, res) => {
    res.send(data)
})

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


/*
app.post('/', (req, res) => {
	let a = req.body.nopl
	console.log(req.body) 
	if (req.body.roomid == "")
		req.body.roomid = Math.floor(Math.random() * 10000)
		
	crds=shuff(a)
	 data = {
		p1: JSON.stringify(crds.plcards.p1),
		p2: JSON.stringify(crds.plcards.p2),
		p3: JSON.stringify(crds.plcards.p3),
		p4: JSON.stringify(crds.plcards.p4),
		nopl: a,
		state: "pregame",
		p1id: "",
		p2id: "",
		p3id: "",
		p4id: "",
		restdeck: JSON.stringify(crds.restdeck),
		firstcard:crds.firstcard,
		currentp: "p1",
		nextp: "p2",
		roomid: req.body.roomid
	};

	


	res.send('')
})
*/
app.get('/gen_name', (req, res) => {

    res.send({ userId: String.fromCharCode(Math.floor(Math.random() * 1000)) + Math.floor(Math.random() * 1000000) })

})

app.post('/gen_room', (req, res) => {

    let botflag = req.body.nopl
    if (!Number.isInteger((req.body.nopl)))

        req.body.nopl = 2



    let a = Number.parseInt(req.body.nopl)
    crds = shuff(a)


    rmid = Math.floor(Math.random() * 1000000)



    data = {
        p1: JSON.stringify(crds.plcards.p1),
        p2: JSON.stringify(crds.plcards.p2),
        p3: JSON.stringify(crds.plcards.p3),
        p4: JSON.stringify(crds.plcards.p4),
        nopl: a,
        state: "pregame",
        p1id: req.body.userId,
        p2id: "",
        p3id: "",
        p4id: "",
        restdeck: JSON.stringify(crds.restdeck),
        firstcard: crds.firstcard,
        currentp: req.body.userId,
        nextp: "p1",
        roomid: rmid
    };


    if (!Number.isInteger(botflag)) {
        data.p2id = "BOT"
        req.body.nopl = 2
    }
    connection.query('INSERT INTO uno1 SET ?', data, (error, results, fields) => {
        if (error) {
            console.error('Error inserting data: ' + error.message);
        } else {
            console.log('Data inserted successfully');
        }
    });
    res.send({ "roomid": rmid })

})

app.post('/join_room', (req, res) => {

    sql = `SELECT * FROM uno1 WHERE ?? = ?`;
    values = ["roomid", req.body.rmid];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error searching for row:', err);
            return;
        }
        result = result[0]
            //console.log(result.p2id)
        if (result.p2id == '')

            result.p2id = req.body.userId
        else if (result.p3id == '')
            result.p3id = req.body.userId
        else if (result.p4id == '')
            result.p4id = req.body.userId



        //        console.log(result)
        sql = `UPDATE uno1 SET ? WHERE ?? = ?`;
        values = [result, "roomid", req.body.rmid];

        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error updating column:', err);
                return;
            }
            console.log('Column updated successfully');
        });
    })



    res.send({ body: "connected to room " + req.body.rmid, rmid: req.body.rmid })


})


app.post('/btnclik', (req, res) => cardsortmain(req, res))

/////////////////////////////////////

app.post('/strt', (req, res) => {
    rmid = (req.body.rmid)
    sql = `SELECT * FROM uno1 WHERE ?? = ?`;
    values = ["roomid", rmid];
    //console.log(rmid)
    //curplrdeck = JSON.parse(result[result.nextp])
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error searching for row:', err);
            return;
        }
        result = result[0]
            //console.log(JSON.parse(curplrdeck))

        result.state = "ingame"

        sql = `UPDATE uno1 SET ? WHERE ?? = ?`;
        values = [result, "roomid", rmid];

        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error updating column:', err);
                return;
            }
            console.log('Column updated successfully');
        });
        res.send("done")
    })


})

app.post('/chkserv', (req, res) => {
    rmid = req.body.rmid
    userid = req.body.userId
        //console.log(rmid)
    sql = `SELECT * FROM uno1 WHERE ?? = ?`;
    values = ["roomid", rmid];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error searching for row:', err);
            return;
        }
        result = result[0]
        if (result == undefined) {
            res.send("ROOM NO FOUND")
            return
        }
        //console.log(result.state)
        if (result.state == "pregame")
            res.send({ body: "game hasnt started" })
        else if (result.state == "ingame") {

            data = {
                body: "good",
                firstcard: result.firstcard,
                currentp: result.currentp,
                nextp: result.nextp,
                p1: "",
                p1c: result.p1.split(',').length,
                p2c: result.p2.split(',').length,
                p3c: result.p3.split(',').length,
                p4c: result.p4.split(',').length,
            }



            //sometimes js sending other player cards for no reason

            userid = req.body.userId
            if (result.p1id == userid) {
                data.p1 = result.p1
            } else if (result.p2id == userid) {
                data.p1 = result.p2
            } else if (result.p3id == userid) {
                data.p1 = result.p3
            } else if (result.p4id == userid) {
                data.p1 = result.p4
            }
            //console.log(result)
            res.send(data)
        } else if (result.state == "endgame") {
            a = [result.p1.split(',').length,
                result.p2.split(',').length,
                result.p3.split(',').length,
                result.p4.split(',').length
            ]
            b = ["p1", "p2", "p3", "p4"]
            a.sort()

            s = []

            for (i = 0; i < 4; i++) {
                np = a[i]
                for (j = 0; j < 3; j++) {
                    if (s.length == 4)
                        break
                    console.log(s, np)
                    if (result[b[j]].split(',').length == np) {
                        if (np == 52) {
                            s[i] = '-'
                            b.splice(j, 1)
                        } else
                            s.push(b.splice(j, 1))
                        break;
                    }
                }
            }
            console.log(s)
            data = {
                body: "finished",
                ranks: s
            }
            res.send(data)
        }

    })
})



app.use(express.static('public'))
app.use(express.static('public/large'))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})







// Insert data into the table
























function cardsortmain(req, res) {
    rmid = (req.body.rmid)
    sql = `SELECT * FROM uno1 WHERE ?? = ?`;
    values = ["roomid", rmid];
    //console.log(req)
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error searching for row:', err);
            return;
        }
        console.log(result)
        result = result[0]
        topcrd = result.firstcard
        plcard = req.body.card

        nextpl = ""
        curpl = result.nextp
        restcard = JSON.parse(result.restdeck)
        switch (result.nopl) {

            case 2:
                console.log('heyooo')
                if (curpl[1] == '2') {
                    nextpl = "p1"
                    console.log('heyooo')
                } else {
                    nextpl = "p" + (Number.parseInt(curpl[1]) + 1)

                }
                break;
            case 3:
                if (curpl[1] == '3')
                    nextpl = "p1"
                else {
                    nextpl = "p" + (Number.parseInt(curpl[1]) + 1)

                }
                break
            case 4:
                if (curpl[1] == '4')
                    nextpl = "p1"
                else {
                    nextpl = "p" + (Number.parseInt(curpl[1]) + 1)
                }
                break;




        }


        nexp = nextpl.substring(0)

        topcrd = String(topcrd)
            //['wild', '+2r', '+4', 'reverser', 'skipr', '1r', '2r', '3r', '4r', '5r', '6r', '7r', '8r', '9r', '+2g',  'reverseg', 'skipg', '1g', '2g', '3g',  '5g', '6g', '7g', '8g', '9g',  '+2b',  'reverseb', 'skipb', '1b', '2b', '3b',  '5b', '6b', '7b', '8b', '9b',  '+2y',  'reversey', 'skipy', '1y', '2y', '3y', '5y', '6y', '7y', '8y', '9y']
            //console.log(result)
        console.log(result[nextpl + "id"], "BOT")
        if (result[nextpl + "id"] == "BOT") {
            console.log(nextpl, "BOT")

            function BOT(rm) {

                c = curpl
                curpl = nextpl
                nextpl = c

                //nextpl = "p1"

                botcards = JSON.parse(result.p2)
                plcard = (botcards)[0]

                for (let k = 0; k < (botcards).length; k++) {
                    acrd = (botcards)[k]
                    if (acrd[0] == 's' && topcrd[0] == 's') {



                    } else if (acrd == '+4') {
                        plcard = acrd
                        break

                    } else if (acrd[(botcards)[k].length - 1] == topcrd[topcrd.length - 1]) {
                        plcard = acrd
                        break
                    } else if (acrd[0] == 'w') //wild
                    {
                        plcard = acrd
                        break
                    } else if (acrd.substring(0, 2) == topcrd.substring(0, 2)) //+2/+4/reverse/skip
                    {
                        plcard = acrd
                        break
                    } else if (acrd[0] == topcrd[0]) {
                        plcard = acrd
                        break
                    }
                    console.log(topcrd, acrd, "this")
                }

                req = {

                    method: "POST",
                    body: {
                        userId: "BOT",
                        rmid: rm,
                        card: plcard

                    },
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }
                res = ""
                cardsortmain(req, res)

            }
            setTimeout(() => BOT(rmid), 5000)
        }









        curplrdeck = JSON.parse(result[curpl])
        nexplrdeck = JSON.parse(result[nextpl])
        if (curplrdeck.indexOf(plcard) == -1) {
            if (res != "")
                res.send("no no")
            console.log("help")
            return;
        }
        if (topcrd == 'wild' || topcrd == '+4' || plcard == 'wild') {
            result.firstcard = plcard
            curplrdeck.splice(curplrdeck.indexOf(plcard), 1)
                //console.log(curplrdeck)
                //console.log(curplrdeck)
        } else if (plcard == '+4') {
            result.firstcard = plcard
            curplrdeck.splice(curplrdeck.indexOf(plcard), 1)

            nexplrdeck.push(restcard.pop())
            nexplrdeck.push(restcard.pop())
            nexplrdeck.push(restcard.pop())
            nexplrdeck.push(restcard.pop())
        } else if (plcard.substring(0, 2) == '+2') {
            if (topcrd.substring(0, 2) == '+2') {
                console.log(266)
                if (topcrd.substring(0, 2) == '+2') {
                    result.firstcard = plcard
                    console.log(plcard)
                    curplrdeck.splice(curplrdeck.indexOf(plcard), 1)

                    nexplrdeck.push(restcard.pop())
                    nexplrdeck.push(restcard.pop())
                }

            } else if (plcard[plcard.length - 1] == topcrd[topcrd.length - 1]) {
                result.firstcard = plcard
                curplrdeck.splice(curplrdeck.indexOf(plcard), 1)

                nexplrdeck.push(restcard.pop())
                nexplrdeck.push(restcard.pop())
            } else {
                crd264 = (restcard).pop()
                curplrdeck.push(crd264)

            }

        } else if (plcard.includes('reverse')) {
            if (topcrd.includes('reverse')) {
                result.firstcard = plcard
                curplrdeck.splice(curplrdeck.indexOf(plcard), 1)
                    //reverse code

            } else if (plcard[plcard.length - 1] == topcrd[topcrd.length - 1]) {
                result.firstcard = plcard
                curplrdeck.splice(curplrdeck.indexOf(plcard), 1)
                    //reverse code
            } else {
                crd264 = (restcard).pop()
                curplrdeck.push(crd264)

            }
        } else if (plcard.includes('skip')) {
            if (topcrd.includes('skip') || plcard[plcard.length - 1] == topcrd[topcrd.length - 1]) {
                result.firstcard = plcard
                curplrdeck.splice(curplrdeck.indexOf(plcard), 1)
                if (result[curpl + 'id'] == 'BOT') {
                    setTimeout(() => BOT(rmid), 5000)
                }
                switch (result.nopl) {

                    case 2:
                        console.log('heyooo')
                        if (nextpl[1] == '2') {
                            nextpl = "p1"
                            console.log('heyooo')
                        } else {
                            nextpl = "p" + (Number.parseInt(nextpl[1]) + 1)

                        }
                        break;
                    case 3:
                        if (nextpl[1] == '3')
                            nextpl = "p1"
                        else {
                            nextpl = "p" + (Number.parseInt(nextpl[1]) + 1)

                        }
                        break
                    case 4:
                        if (nextpl[1] == '4')
                            nextpl = "p1"
                        else {
                            nextpl = "p" + (Number.parseInt(nextpl[1]) + 1)
                        }
                        break;




                }
                //p1
                console.log(nextpl)
                    //nexp = nextpl.substring(0)
            } else {
                crd264 = (restcard).pop()
                curplrdeck.push(crd264)

            }

        } else if (plcard[plcard.length - 1] == topcrd[topcrd.length - 1] || plcard[0] == topcrd[0]) {
            result.firstcard = plcard
            curplrdeck.splice(curplrdeck.indexOf(plcard), 1)
        } else {
            crd264 = (restcard).pop()
            curplrdeck.push(crd264)

        }

        result.currentp = result[nextpl + "id"]
        if (nextpl == nexp) { result[nextpl] = JSON.stringify(nexplrdeck) }

        result[curpl] = JSON.stringify(curplrdeck)
        result.nextp = nextpl
        result.restdeck = JSON.stringify(restcard)
        console.log(curpl, nextpl)


        l1 = (result.p1).length
        l2 = (result.p2).length
        l3 = (result.p3).length
        l4 = (result.p4).length
        console.log(l1, l2, l3, l4)
        if (l3 === 2) {
            console.log("this works")
        }

        if (l1 == 2 || l2 == 2 || l3 == 2 || l4 == 2 || result.restdeck.length == 2) {
            result.state = "endgame"
        }

        console.log(result)


        sql = `UPDATE uno1 SET ? WHERE ?? = ?`;
        values = [(result), "roomid", rmid];
        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error updating column:', err);
                return;
            }
            console.log('Column updated successfully');
        });
        if (res != "")
            res.send("done")
    })
}


























































































//shuffle



function shuffle(n) {
    var cardse = JSON.parse(JSON.stringify(cards))
    switch (n) {
        case 2:
            p1 = []
            p2 = []
            p3 = new Array(52);
            p4 = new Array(52);
            for (i = 0; i < 7; i++) {
                c = Math.floor(Math.random() * cardse.length)
                a = cardse[c]
                cardse.splice(c, 1)

                p1.push(a)

                d = Math.floor(Math.random() * cardse.length)
                b = cardse[d]
                cardse.splice(d, 1)

                p2.push(b)
            }
            return { "p1": p1, "p2": p2, "p3": p3, "p4": p4 };
        case 3:
            p1 = [];
            p2 = [];
            p3 = [];
            p4 = new Array(52);
            for (i = 0; i < 7; i++) {
                c = Math.floor(Math.random() * cardse.length);
                a = cardse[c];
                cardse.splice(c, 1);
                p1.push(a);

                d = Math.floor(Math.random() * cardse.length);
                b = cardse[d];
                cardse.splice(d, 1);
                p2.push(b);

                e = Math.floor(Math.random() * cardse.length);
                f = cardse[e];
                cardse.splice(e, 1);
                p3.push(f);
            }
            return { "p1": p1, "p2": p2, "p3": p3, "p4": p4 };
        case 4:
            p1 = [];
            p2 = [];
            p3 = [];
            p4 = [];
            for (i = 0; i < 7; i++) {
                c = Math.floor(Math.random() * cardse.length);
                a = cardse[c];
                cardse.splice(c, 1);
                p1.push(a);

                d = Math.floor(Math.random() * cardse.length);
                b = cardse[d];
                cardse.splice(d, 1);
                p2.push(b);

                e = Math.floor(Math.random() * cardse.length);
                f = cardse[e];
                cardse.splice(e, 1);
                p3.push(f);

                g = Math.floor(Math.random() * cardse.length);
                h = cardse[g];
                cardse.splice(g, 1);
                p4.push(h);
            }

            return { "p1": p1, "p2": p2, "p3": p3, "p4": p4 };

    }

}


function shuff(n) {
    var cardse = JSON.parse(JSON.stringify(cards))
    console.log(n)
    plcards = shuffle(n)
    let plc = []
    restdeck = []

    for (i = 0; i < 4; i++) {
        console.log(plcards["p" + (i + 1)].length)
        if (plcards["p" + (i + 1)].length == 7)
            plc = plc.concat(plcards["p" + (i + 1)])
    }

    console.log(plc)
    for (i = 0;
        (cards.length - plc.length) != restdeck.length;) {

        c = Math.floor(Math.random() * cardse.length);
        randc = cardse[c]

        if (plc.indexOf(randc) == -1 && restdeck.indexOf(randc) == -1) {

            restdeck.push(randc)
            cardse.splice(c, 1)
        }
    }
    firstcard = restdeck.pop()


    return { "plcards": plcards, "restdeck": restdeck, "firstcard": firstcard }
}


console.log(shuff(2))
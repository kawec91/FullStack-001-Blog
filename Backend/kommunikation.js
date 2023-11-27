//Express
const express = require("express");

//Cors
const cors = require("cors");

//App
const app = express();

//App use Cors
app.use(cors());

//dateisystem
const dateisystem = require("fs");

//SQL
const sqlite3 = require("sqlite3").verbose();

//SQL Conection
let db = new sqlite3.Database("./datenBestand.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    } else {
        console.log("DB: Connected [--- Status: OK ---]");
    }
});

//PortNummer
const PortNummer = 8801;

//Listener
app.listen(PortNummer, () => {
    console.log(`SVR: Enabled [--- Status: is working ---] at http://localhost:${PortNummer}`);
});

//Routes

// /login/:name/:pass
app.get("/login/:name/:pass", (req, res) => {
    const sql = `SELECT * FROM BenutzerKonto WHERE Benutzer='${req.params.name}' AND Kennwort='${req.params.pass}'`;

    db.all(sql, (error, zeilen) => {
        if (error) {
            console.error(error.message);
        }
        zeilen.length > 0 ? res.send(JSON.stringify(zeilen)) : res.send('0');

    });
});

// /logout
app.get("/logout", (req, res) => {
    res.send("0");
});

// /datenLesen/:objekt
app.get("/datenLesen/:uid", (req, res) => {
    const sql = `SELECT * FROM BenutzerKonto WHERE KontoNr='${req.params.uid}'`;

    db.all(sql, (error, zeilen) => {
        if (error) {
            return console.error(error.message);
        }
        if (zeilen) {
            let myObject = {
                KontoNr: zeilen[0].KontoNr,
                Kennwort: zeilen[0].Kennwort,
                Vorname: zeilen[0].Vorname,
                Nachname: zeilen[0].Nachname,
                Telefon: zeilen[0].Telefon,
                Email: zeilen[0].Email,
                Adresse: zeilen[0].Adresse,
                PLZ: zeilen[0].PLZ,
                Ort: zeilen[0].Ort,
                Benutzer: zeilen[0].Benutzer
            }
            zeilen.length > 0 ? res.send(JSON.stringify(myObject)) : res.send("Error data lesen :(");
        }
    })

    res.send(myObject);

});

// /datenSchreiben/:objekt
app.get("/datenSchreiben/:objekt", (req, res) => {
    const myObj = JSON.parse(req.params.objekt);
    myObj.PLZ === "" ? myObj.PLZ = 0 : Number(myObj.PLZ);

    const sql = `UPDATE BenutzerKonto SET Benutzer= ?, Kennwort= ?, Vorname= ?, Nachname = ?, Telefon = ?, Email = ?, Adresse = ?, PLZ = ?, Ort = ? WHERE KontoNr = ?`;

    db.run(sql, [`${myObj.Benutzer}`, `${myObj.Kennwort}`, `${myObj.Vorname}`, `${myObj.Nachname}`, `${myObj.Telefon}`, `${myObj.Email}`, `${myObj.Adresse}`, `${myObj.PLZ}`, `${myObj.Ort}`, `${myObj.KontoNr}`,], (err) => {
        if (err) {
            return console.log(err.message);
        }


    });
    res.send('Success');

});

// /registrieren/:objekt
app.get("/registrieren/:objekt", (req, res) => {
    const sqlReg = `INSERT INTO BenutzerKonto (Benutzer, Kennwort, Vorname, Nachname, Email) VALUES(?,?,?,?,?)`
    let myObj = JSON.parse(req.params.objekt);
    db.run(sqlReg, [`${myObj.benutzer}`, `${myObj.kennwort}`, `${myObj.vorname}`, `${myObj.nachname}`, `${myObj.email}`], function (err) {
        if (err) {
            return console.log(err.message);
        } else {
            res.send('Success');
        }
    });
});

// /blog/abrufen/:konto
app.get("/blog/abrufen/:konto", (req, res) => {
    const sql = `SELECT * FROM BlogDaten WHERE KontoNr='${req.params.konto}'`;

    db.all(sql, (err, result) => {
        if (err) return console.error(err.message);
        //JSON.stringyfy deleted
        result.length > 0 ? res.send(result) : res.send("0");
    });
});

// /blog/erstellen/:konto/:titel/:text
app.get("/blog/erstellen/:konto/:titel/:text", (req, res) => {
    const sql = `INSERT INTO BlogDaten (KontoNr, Titel, Text) VALUES(?,?,?)`;

    db.run(sql, [`${req.params.konto}`, `${req.params.titel}`, `${req.params.text}`], function (err) {
        if (err) {
            return console.error(err.message);
        } else {
            res.send("Success");
        }
    });
});

//Blog Edit
app.get("/blog/edit/:dnr/:titel/:text", (req, res) => {
    const sql = `UPDATE BlogDaten SET Titel='${req.params.titel}', Text='${req.params.text}' WHERE id='${req.params.dnr}'`;

    db.run(sql, function (err) {
        if (err) {
            return console.error(err.message);
        } else {
            res.send('Success');
        }
    })
});

//Blog Delete
app.get("/blog/entf/:dnr", (req, res) => {
    const sql = `DELETE FROM BlogDaten WHERE id=${req.params.dnr}`;

    db.run(sql, function (err) {
        if (err) {
            return console.error(err.message);
        } else {
            res.send('Success');
        }
    })
});
//Blog read last 3
app.get("/blog/leatest/:kontoNr", (req, res) => {
    const sql = `SELECT * FROM BlogDaten WHERE KontoNr='${req.params.kontoNr}' ORDER BY id DESC LIMIT 3`

    db.all(sql, function (err, result) {
        if (err) return console.error(err.message);
        if (result.length > 0) res.send(result);
    });
})

//
app.get("/freunde/finden/:konto/:begriff", (req, res) => { });

//
app.get("/freundschaft/:k1/:k2", (req, res) => {
    const sql = `INSERT INTO Freunde (KontoNr, FreundKontoNr) VALUES (?,?)`;

    db.run(sql, [`${req.params.k1}`, `${req.params.k2}`], function (err) {
        if (err) {
            console.error(err.message);
        } else {
            res.send('Success');
        }
    })
});

//
app.get("/freund/entf/:k1/:k2", (req, res) => {
    const sql = `DELETE FROM Freunde WHERE KontoNr='${req.params.k1}' AND FreundKontoNr='${req.params.k2}'`;
    db.run(sql, function (err) {
        if (err) {
            return console.error(err.message)
        } else {
            res.send('Success');
        }
    })
});

// 
app.get("/freunde/auflisten/:konto", (req, res) => {
    let acc = req.params.konto
    const sql = `SELECT * FROM BenutzerKonto WHERE KontoNr='${acc}' OR Benutzer LIKE '${acc}%' OR Benutzer LIKE '%${acc}%' OR Benutzer LIKE '%${acc}' OR Email LIKE '${acc}%' OR Email LIKE '%${acc}%' OR Email LIKE '%${acc}' OR Vorname LIKE '${acc}%' OR Vorname LIKE '%${acc}%' OR Vorname LIKE '%${acc}' OR Nachname LIKE '${acc}%' OR Nachname LIKE '%${acc}%' OR Nachname LIKE '%${acc}'`;

    db.all(sql, function (err, result) {
        if (err) {
            return console.error(err.message);
        } else {
            res.send(result);
        }
    })
});

//
app.get("/freund/liste/:id", (req, res) => {
    const sql = `SELECT * FROM Freunde WHERE KontoNr='${req.params.id}'`;

    db.all(sql, function (err, result) {
        if (err) {
            return console.error(err.message)
        } else {
            res.send(result);
        }
    })
});

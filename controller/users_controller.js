const User = require("../models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//npm i google-auth-library

//GET ************************************
const userGetController = (req, res, next) => {

    User.find((err, docs) => {
        if (err) {
            res.status(500).send("Fehler bei GET auf /User/:" + err);
        } else {
            res.status(200).send(docs);
        }
    });

}
//POST ************************************
const userPostController = async (req, res, next) => {
    try {
        const neueDaten = req.body
        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(422).json({
        //         fehlerBeiValidierung: errors.array()
        //     })
        // }

        let schonVorhandenUser = await User.find({ email: neueDaten.email })
        if (schonVorhandenUser.length >= 1) {
            return res.status(409).send('Es gib schon einen Nutzer mit dieser Email')
        }

        let passwortGehashed = await bcrypt.hash(neueDaten.password, 10)
        let erstelleNutzer = await User.create({ ...neueDaten, password: passwortGehashed })
        res.status(201).send(erstelleNutzer);

    } catch (fehler) {
        next(fehler)
    }
}



// Login ***********************************

const userEinloggen = async (req, res, next) => {
    let nutzer = req.body
    let mailklein = nutzer.email
    try {
        let userVonDatenbank = await User.findOne({ email: mailklein })
        if (userVonDatenbank === null) {
            return res.status(401).send('You are not registered. Pls sign up')
        }
        let vergleichVonPasswort = await bcrypt.compare(nutzer.password, userVonDatenbank.password)
        if (vergleichVonPasswort) {
            let token = jwt.sign({
                email: userVonDatenbank.email,
                userId: userVonDatenbank._id,
                name: userVonDatenbank.name
            }, process.env.JWT, { expiresIn: '3h' });
            res.status(200).json({
                nachricht: 'You are logged in',
                token: token,
                name: userVonDatenbank.name
            })
        } else {
            res.status(401).send('Passwort ist ungültig.')
        }
    } catch (error) {
        res.status(401).send('Du konntest nicht eingeloggt werden. error von catch' + error);
    }
}




module.exports = { userGetController, userPostController, userEinloggen }

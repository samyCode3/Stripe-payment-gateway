const express = require("express");
const app = express()
const PORT = process.env.PORT || 3000
require("dotenv").config()
const stripe = require('stripe')(process.env.SECRET_KEY)
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.set("view engine", "ejs")
app.get("/", (req, res) => {
   res.render('index', {
   key: process.env.PUBLISHABLE_KEY 
   })
})
app.post("/payment", (req,res) => {
        stripe.customers.create({
        email: req.body.Email,
        source: req.body.stripeToken,
        name: 'Samson Adeboyega',
        address: {
            line1: '23 Mountain Valley New Delhi',
            postal_code:  '110092',
            city: 'New Delhi',
            state: 'Delhi',
            country :'India'
        }
    }).then((customer) => {
        return stripe.charges.create({
            amount : 7000,
            description: "Web Development Product",
            currency : 'USD',
            customer: customer.id
        })
    })
    .then((charge) => {
        console.log(charge)
        res.send("Success")
    }).catch((err) => {
        console.log(err)
    })
})

app.listen(PORT, console.log(`Server running on port ${PORT}`))

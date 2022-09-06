const express = require("express");
const app = express()
const PORT = process.env.PORT || 3000
const PUBLISHABLE_KEY = "pk_test_51La7SyJgAz5aZk768IBtjoEK73bsO8jbjlLxAmCjlNnz9ftSO80LGSoHEvzuGxeGIHMCuRIswAZkMhxfajQrs25v0087uWENB8"
const SECRET_KEY = "sk_test_51La7SyJgAz5aZk76kMO1MLMM4FOj6BEptzM0pvXjDR44KXzhhJtTaZ47RnfuJQ5dwrJ0tmOHwvwgYo7CVQzCzvZW00hlGuqh8E"
const stripe = require('stripe')(SECRET_KEY)
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.set("view engine", "ejs")
app.use("/home", (req, res) => {
   res.render('home', {
   key: PUBLISHABLE_KEY 
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

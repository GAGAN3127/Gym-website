const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers");

const port = process.env.PORT || 3000;
const static_path = path.join(__dirname,"../public");
// console.log(path.join(__dirname));
const tempelate_path = path.join(__dirname,"../tempelates/views");
const partials_path = path.join(__dirname,"../tempelates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",tempelate_path);
hbs.registerPartials(partials_path);

app.get("/",(req, res) => {
    res.render("index");
})

app.get("/admin", (req, res) => {
    Register.find((err, docs) => {
        if (!err) {
            console.log(docs);
            res.render("admin", {
                'userlist': docs
            });
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });
});
// creating new users
app.post("/register",async(req,res)=>{
    // res.send("hello from this side");
    try {
        // console.log(req.body.name);
        // res.send(req.body.name);
        const registerUser = new Register({
            name :req.body.name,
            email :req.body.email,
            phone :req.body.phone,
            gender :req.body.gender,
            age :req.body.age,
            plan :req.body.plan,
            // message:req.body.message
        })
        const registered= await registerUser.save();
        if(req.body.plan == 30){
            res.redirect("https://buy.stripe.com/test_4gw7wofzC03Y3fO8ww");
        } else {
            res.redirect("https://buy.stripe.com/test_6oE4kcafig2W9Ec001");
        }
        res.status(201).render("index");
    } catch (error) {
        res.status(400).send(error);
    }
})
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})
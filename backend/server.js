const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const path = require("path")

app.use(express.json());
app.use(express.static('dist'));
app.use(express.urlencoded({ extended: true}));

const AuthRoutes = require("./routes/authRoutes.js");
app.use("/auth", AuthRoutes);

const SpotRoutes = require("./routes/spotify.js");
app.use("/spotify", SpotRoutes);

const DiscoveryRoutes = require("./routes/discovery.js");
app.use("/discovery", DiscoveryRoutes);

app.use(express.static(path.join(__dirname, '../dist')))

app.get('*', (req, res) => {
    console.log("ok");
    res.sendFile(path.join(__dirname, '../dist/index.html'));
})
const uri = "mongodb+srv://mukil:BreakFromToronto15@cis197.hdld0.mongodb.net/teams?retryWrites=true&w=majority"

try {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("made it");
} catch (e) {
    console.log("could not connect");
}


app.listen(PORT, () => {
    console.log("Started on port " + PORT);
})
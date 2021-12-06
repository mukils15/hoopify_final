let mongoose = require('mongoose');
const uri = "mongodb+srv://mukil:BreakFromToronto15@cis197.hdld0.mongodb.net/teams?retryWrites=true&w=majority"

mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const TeamSchema = new mongoose.Schema({
    starting_pg: {
        type: Number,
        required: true
    },
    starting_sg: {
        type: Number,
        required: true
    },
    starting_sf: {
        type: Number,
        required: true
    },
    starting_pf: {
        type: Number,
        required: true
    },
    starting_c: {
        type: Number,
        required: true
    },
    team_name: {
        type: String,
        required: true
    },
    comp: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
});

module.exports = Team = mongoose.model('Team', TeamSchema);
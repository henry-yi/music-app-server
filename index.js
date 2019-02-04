const express = require("express");
const bodyParser = require("body-parser");

const API_PORT = 3001;
const app = express();
const router = express.Router();

var Spotify = require('spotify-web-api-node');

var spotify = new Spotify({
  accessToken: 'BQCenLk6w_cPXmCpuyIFctg_lljTk5SvhI-H6z43LuW0jQG7CT6JqZ6oH1frQeTABBosU7fT9T9V5fZfg9SHF011xsO6xuXOKZ-ThKPcK-P-qpNBP7tYlpuAJidXNSrW1k-wSyCNinifwqHAJQmiwX3vLAJld-SZyPY4K7zBJDmB',
  clientId: '422363845c7a48ff908af44f247ddca7',
  clientSecret: 'ee10cf18b2184ef7974e05c13323212d',
  //redirectUri: 'http://www.example.com/callback'
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post("/getData", (req, res) => {
    spotify
        .searchTracks('album:'+req.body.query)
        .then(function(data) {
            return res.json(data.body);
        }, function(err) {
          console.error(err);
        });
});

app.use("/api", router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
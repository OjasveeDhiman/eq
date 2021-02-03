const express = require('express');
require('dotenv').config();
const app = express();
const {datahourly,datadaily} = require('./controller/events');
const {statshourly, statsdaily} = require('./controller/stats');
const {datapoi} = require('./controller/poi');
const {queryhandler} = require('./middleware/queryhandler');
const path = require('path');

// app.get('/', (req, res) => {
//   res.send('Welcome to EQ Works 😎')
// })
app.use(express.static('build'));

app.get('/events/hourly', datahourly, queryhandler);

app.get('/events/daily', datadaily, queryhandler)

app.get('/stats/hourly', statshourly, queryhandler)

app.get('/stats/daily', statsdaily, queryhandler)

app.get('/poi', datapoi, queryhandler)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
})

app.listen(process.env.PORT || 5555, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(`Running on ${process.env.PORT || 5555}`)
  }
})

// last resorts
process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`)
  process.exit(1)
})
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  process.exit(1)
})

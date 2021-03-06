// Express setup
import express from "express";
import cors from 'cors'
const app = express()
const PORT = 3000

app.use(cors());
// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', 'true');

//   // Pass to next layer of middleware
//   next();
// });
//app.options('*', cors());

// Importing for the algorithm
import mode from './logic/Mode';
import note from './logic/Note';
import chord from './actions/chord.action';
import vamp from './actions/vamp.action';
import small from './actions/small.action';
import transpose from './actions/transpose.action';
import octave from './actions/octave.action';
import harmony from './actions/harmony.action';

// Music algorithm init
note.lastRecorded = "C3"
mode.init();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pg = require('knex')({
  client: 'pg',
  searchPath: ['knex', 'public'],
  connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://user:pass@localhost:5432/db'
});


// Users route with KNEX.JS

app.get('/users', async (req, res) => {
  const dbTest = await pg.select().table('stats');
  res.json(dbTest)
})

app.post('/users', async (req, res) => {
  
  const dbTest = await pg('users').insert([{username: 'test'}], {session_stat: 2})
  res.status(200).json(dbTest)
})

app.delete('/users', async (req, res) => {
  const dbTest = await pg('stats').where('id', 1).del();
  res.json(dbTest)
})

app.put('/users', async (req, res) => {
  const dbTest = await pg('stats').where({id: 1}).update('initial', 'C3')
  res.json(dbTest)
})



// UPDATE route
app.put('/update', (req, res) => {
  console.log(req.body)
})

// GET endpoints, giving back various combinations of sounds.

/**
 * GET Route - Note
 * Generates a note in the current key and mode.
 * @returns a single note in the form of a string, ie. "C3"
 */
app.get('/note', async (req, res) => {
  const note = await small.onPress()
  
  res.json(note)
})

/**
 * GET Route - Chord
 * Generates a 3-note or 4-note chord in  the current key, while also changing the music's mode.
 * @returns an array of 3 or 4 strings
 */
app.get('/chord', (req, res) => {
  const notes = chord.onPress()
  res.send(notes)
})

/**
 * GET Route - Vamp
 * Generates a 3-note or 4-note chord in the current key and mode.
 * @returns an array of 3 or 4 strings
 */
app.get('/vamp', (req, res) => {
  const notes = vamp.onPress()
  res.send(notes)
})

/**
 * GET Route - Octave
 * Generates a note and an additional one an octave higher or lower
 * @returns an array of two strings
 */
app.get('/octave', async (req, res) => {
  const notes = await octave.onPress()
  res.send(notes)
})

/**
 * GET Route - Octave
 * Generates a note and an additional one that is the first one's harmonic.
 * @returns an array of two strings
 */
app.get('/harmony', async (req, res) => {
  const notes = await harmony.onPress()
  res.send(notes)
})

/**
 * GET Route - Transpose
 * Changes the whole feel of the generated music. Changes the current key and mode and then generates a chord, an octave tone and an harmony tone. Big sound boom. Yay!
 * @returns an array of 5-6 strings.
 */
app.get('/transpose', async (req, res) => {
  const notes = await transpose.onPress()
  res.status(200).json(notes)
})


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

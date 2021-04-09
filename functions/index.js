const admin = require('firebase-admin');
admin.initializeApp();
const functions = require("firebase-functions");

const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());

const users = require("./users").users;

app.get('/:id', (req, res) => users.get(req, res));
app.post('/', (req, res) => users.create(req, res));
app.put('/:id', (req, res) => users.update(req, res));
app.delete('/:id', (req, res) => users.delete(req, res));
app.get('/', (req, res) => users.list(req, res));

exports.users = functions.https.onRequest(app);

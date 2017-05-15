var express = require('express');
var jwt = require('jsonwebtoken');

const authApi = (req, res, next) => {

  console.log("authenticating api request")

// Query is a Postman thing
  const key = req.body.key || req.query.key || req.headers['x-access-token'];

  var decoded = jwt.verify(key, 'secretcode');
  console.log(decoded.email)
  let found = false;
  if (decoded.email === 'divij.mehra.16@gmail.com') {
    found = true;
  }

  if (found) {
    next();
  } else {
    res.json(401, {
      success: false,
      message: 'Not Authorized',
    });
  };
};

module.exports = authApi;

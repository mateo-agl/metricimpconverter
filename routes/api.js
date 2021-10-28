'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const num = convertHandler.getNum(req.query.input);
    const unit = convertHandler.getUnit(req.query.input);
    const result = convertHandler.convert(num, unit);
    if (result === 'invalid number') return res.send(result);
    if (result === 'invalid unit') return res.send(result);
    if (result === 'invalid number and unit') return res.send(result);
    const string = convertHandler.getString(num, unit, result.rNum, result.rUnit);
    res.json({initNum: num, initUnit: unit, returnNum: Number(result.rNum), returnUnit: result.rUnit, string: string});
  });
};

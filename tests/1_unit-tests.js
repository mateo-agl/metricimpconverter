const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Num', () => {
    test('1', () => {
      assert.equal(convertHandler.getNum('1'), 1);
    });
    test('2', () => {
      assert.equal(convertHandler.getNum('1.1'), 1.1);
    });
    test('3', () => {
      assert.equal(convertHandler.getNum('1/2'), 1/2);
    });
    test('4', () => {
      assert.equal(convertHandler.getNum('2.2/2'), 2.2/2);
    });
    test('5', () => {
      assert.equal(convertHandler.getNum('2.2/2/2'), 'invalid number');
    });
    test('6', () => {
      assert.equal(convertHandler.getNum(''), 1);
    });
  });

  const units = ['kg','lbs','L','km','mi','gal'];

  suite('Unit', () => {
    test('7', () => {
      units.map(u => {
        assert.equal(convertHandler.getUnit(u), u);
      });
    });
    test('8', () => {
      assert.equal(convertHandler.getUnit('ss'), 'invalid unit');
    });
    test('9', () => {
      units.map(u => {
        let unit;
        switch(u) {
          case 'gal':
          unit = 'L';
          break;
          case 'L':
          unit = 'gal';
          break;
          case 'mi':
          unit = 'km';
          break;
          case 'km':
          unit = 'mi';
          break;
          case 'lbs':
          unit = 'kg';
          break;
          case 'kg':
          unit = 'lbs';
        }
        assert.equal(convertHandler.getReturnUnit(u), unit);
      });    
    });
    test('10', () => {
      units.map(u => {
        let unit;
        switch(u) {
          case 'gal':
          unit = 'gallons';
          break;
          case 'L':
          unit = 'liters';
          break;
          case 'mi':
          unit = 'miles';
          break;
          case 'km':
          unit = 'kilometers';
          break;
          case 'lbs':
          unit = 'pounds';
          break;
          case 'kg':
          unit = 'kilograms';
        }
        assert.equal(convertHandler.spellOutUnit(u), unit);
      });  
    });
    
    units.map((u, i) => {
      let unit;
      switch(u) {
        case 'gal':
        unit = 'L';
        break;
        case 'L':
        unit = 'gal';
        break;
        case 'mi':
        unit = 'km';
        break;
        case 'km':
        unit = 'mi';
        break;
        case 'lbs':
        unit = 'kg';
        break;
        case 'kg':
        unit = 'lbs';
      }
      let num = 11 + i + '';
      test(num, () => {
        assert.equal(convertHandler.convert('', u).rUnit, unit);
      });
    });
  });
});
function ConvertHandler() {
  const that = this;
  this.getNum = function(input) {
    let result = 'invalid number';
    const regex = /^[^a-z]+/i;
    let num = input.match(regex);
    if (num === null) return 1;
    const split = num[0].split('/');
    if (split.length === 2) {
      const op = split[0] / split[1];
      if (Number.isFinite(op) && op > 0) {
        result = op;
      }
    } else if (split.length === 1) {
      if (Number(split[0]) > 0) {
        result = Number(split[0]);
      }
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result = 'invalid unit';
    const regexp = /[a-z]+$/i;
    const match = input.match(regexp);
    if (match === null) return result;
    const inputUnit = match[0].toLowerCase();
    const units = ['kg','lbs','l','km','mi','gal'];
    units.map(u => {
      if (inputUnit === u) result = inputUnit;
    });
    if (result === 'l') result = 'L';
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit) {
      case 'gal':
      result = 'L';
      break;
      case 'L':
      result = 'gal';
      break;
      case 'mi':
      result = 'km';
      break;
      case 'km':
      result = 'mi';
      break;
      case 'lbs':
      result = 'kg';
      break;
      case 'kg':
      result = 'lbs';
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit) {
      case 'gal':
      result = 'gallons';
      break;
      case 'L':
      result = 'liters';
      break;
      case 'mi':
      result = 'miles';
      break;
      case 'km':
      result = 'kilometers';
      break;
      case 'lbs':
      result = 'pounds';
      break;
      case 'kg':
      result = 'kilograms';
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    const returnUnit = that.getReturnUnit(initUnit);
    let returnNum = initNum;
    if (returnNum === 'invalid number' && initUnit !== 'invalid unit') {
      return returnNum;
    } else if (returnNum !== 'invalid number' && initUnit === 'invalid unit') {
      return initUnit;
    } else if (returnNum === 'invalid number' && initUnit === 'invalid unit') {
      return 'invalid number and unit';
    }
    switch(returnUnit) {
      case 'gal':
      returnNum /= galToL;
      break;
      case 'L':
      returnNum *= galToL;
      break;
      case 'mi':
      returnNum /= miToKm;
      break;
      case 'km':
      returnNum *= miToKm;
      break;
      case 'lbs':
      returnNum /= lbsToKg;
      break;
      case 'kg':
      returnNum *= lbsToKg;
    }
    returnNum = returnNum.toFixed(5);
    result = {rNum: returnNum, rUnit: returnUnit};
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    const iUnit = that.spellOutUnit(initUnit);
    const rUnit = that.spellOutUnit(returnUnit);
    result = `${initNum + ' ' + iUnit} converts to ${returnNum + ' ' + rUnit}`
    return result;
  };
}
module.exports = ConvertHandler;
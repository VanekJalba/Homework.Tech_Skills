var app = require('../js/app.js');

describe("Возведение целого числа в целую степень", function() {
  var result;
  it("Основание только целое число", function() {
    result = app.pow(0.2, 2);
    expect(result).toBeNaN();
  });
  it("Степень только целое число", function() {
    result = app.pow(2, 0.2);
    expect(result).toBeNaN();
  });
  it("Возведение в степень 0 дает 1 при любом основании, кроме 0", function() {
    for (var i = -5; i < 5; i++) {
      if (i !== 0) {
        result = app.pow(i, 0);
        expect(result).toBe(1);
      }
    }
  });
  it("Если степень отрицательная, то 1/result", function() {
    result = app.pow(3, -3);
    var check = (1/(3*3*3)).toFixed(2);
    expect(result).toEqual(check);
  });
  it("2 в 3 степени равно 8", function() {
    result = app.pow(2, 3);
    expect(result).toBe(8);
  });
  it("5 в 6 степени равно 15625", function() {
    result = app.pow(5, 6);
    expect(result).toBe(15625);
  });
});

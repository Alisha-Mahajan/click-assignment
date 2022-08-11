const { filterClicksIfMoreThanTen, expensiveClick } = require("..");
const clickSet = require("../clicks.json");

describe("My Test Suite", () => {
  it("should discard the click set if corresponding ip repeated more than 10 times", () => {
    const set = filterClicksIfMoreThanTen(clickSet);
    const isExist = set.some(obj => obj.ip === '22.22.22.22');
    expect(isExist).toBe(false);
  });

  it('should return expensive click', () => {
    let click1 = { "ip": "22.22.22.22", "timestamp": "3/11/2020 07:02:45", "amount": 11.0 };
    let click2 = { "ip": "44.44.44.44", "timestamp": "3/11/2020 06:32:42", "amount": 5.0 };
    let click = expensiveClick(click1, click2);
    expect(click).toBe(click1);
    click2.amount = 11.0;
    click = expensiveClick(click1, click2);
    expect(click).toBe(click2);
  })
});

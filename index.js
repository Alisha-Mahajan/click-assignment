const clickSet = require("./clicks.json");
const fs = require("fs");

function init() {
  // 3 point covered
  let unique = filterClicksIfMoreThanTen(clickSet);

  // 1st and 2nd point covered
  dict = unique.reduce((acc, item) => {
    const date = new Date(item.timestamp);
    const hour = date.getHours().toString();
    if (!acc[hour]) {
      acc[hour] = [item];
    } else {
      acc[hour].push(item);
    }
    return acc;
  }, {});

  unique = Object.entries(dict).reduce((acc, [key, arr]) => {
    let obj = arr[0];
    for (let i = 1; i < arr.length; i++) {
      obj = expensiveClick(obj, arr[i]);
    }
    acc.push(obj);
    return acc;
  }, []);

  fs.writeFileSync("result-set.json", JSON.stringify(unique, null, 2), {
    encoding: "utf-8",
  });
}

function filterClicksIfMoreThanTen(clicks) {
  let dict = clicks.reduce((acc, item) => {
    if (!acc[item.ip]) {
      acc[item.ip] = [item];
    } else {
      acc[item.ip].push(item);
    }
    return acc;
  }, {});

  return Object.values(dict).reduce((acc, item) => {
    if (item.length <= 10) {
      acc.push(...item);
    }
    return acc;
  }, []);
}

/**
 * Returns expensive click if amount is greater,
 * else early timestamp click will return
 * @param {*} click1
 * @param {*} click2
 * @returns
 */
function expensiveClick(click1, click2) {
  if (click1.amount < click2.amount) {
    return click2;
  } else if (click1.amount === click2.amount) {
    const [timestamp1, timestamp2] = [
      new Date(click1.timestamp).getTime(),
      new Date(click2.timestamp).getTime(),
    ];
    return timestamp1 > timestamp2 ? click2 : click1;
  }
  return click1;
}

init();

module.exports = {
  filterClicksIfMoreThanTen,
  expensiveClick,
}
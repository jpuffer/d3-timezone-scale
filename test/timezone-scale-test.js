var tape = require("tape"),
    scaleTimezone = require("../");
    moment = require('moment-timezone');

tape("scaleTimezone will correctly create a scale in the provided timezone.", function(test) {
  test.equal(scaleTimezone.scaleTimezone("UTC").testOutput(), 42);

  domain = [moment.utc('2017-03-10T00:00:00Z'), moment.utc('2017-03-14T00:00:00Z')];
  testScale = scaleTimezone.scaleTimezone('UTC').domain(domain).range([0, 100]);

  test.equal(moment.isMoment(testScale.ticks(5)[0]), true);
  test.equal(testScale.ticks(5)[0].valueOf(), domain[0].valueOf());

  test.end();

});

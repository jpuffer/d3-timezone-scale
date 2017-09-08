var tape = require("tape"),
    scaleTimezone = require("../");
    moment = require('moment-timezone');

tape("scaleTimezone will correctly create a scale in the provided timezone.", function(test) {
  test.equal(scaleTimezone.scaleTimezone("UTC").testOutput(), 42);

  domain = [moment.utc('2017-03-10T00:00:00Z'), moment.utc('2017-03-14T00:00:00Z')];
  testScale = scaleTimezone.scaleTimezone('UTC').domain(domain).range([0, 100]);

  test.equal(moment.isMoment(testScale.ticks(5)[0]), true);
  test.equal(testScale.ticks(5)[0].valueOf(), domain[0].valueOf());
  test.equal(testScale.ticks(10)[0].valueOf(), domain[0].valueOf());

  domain2 = [moment.utc('2017-03-10T05:00:00Z'), moment.utc('2017-03-14T010:00:00Z')];
  testScale2 = scaleTimezone.scaleTimezone('UTC').domain(domain).range([0, 100]);
  test.notEqual(testScale2.ticks(5)[0].valueOf(), domain2[0].valueOf());
  test.equal(testScale2.ticks(5)[0].valueOf(), moment(domain2[0]).startOf('d').valueOf());

  test.end();

});

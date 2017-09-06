// this is heavily copied from Thomas Coats'
// [d3-chronological](https://github.com/metocean/d3-chronological)
// but updated for use with D3 V4

import {scaleLinear} from "d3";

export default function(tz) {

  var moment = require('moment');
  var chrono = require('chronological');
  moment = chrono(moment);

  var rebind = function(target, source) {
    var i = 1, n = arguments.length, method;
    while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
    return target;
  };
  // Method is assumed to be a standard D3 getter-setter:
  // If passed with no arguments, gets the value.
  // If passed with arguments, sets the value and returns the target.
  function d3_rebind(target, source, method) {
    return function() {
      var value = method.apply(source, arguments);
      return value === source ? target : value;
    };
  }

  var chrono_scale, domainextent, formats, ms, niceunitnumbers, powround, selectnice, selectunit, units;
  ms = function(d) {
    if (moment.isMoment(d)) {
      return d.valueOf();
    } else if (moment.isDate(d)) {
      return d.getTime();
    } else {
      return d;
    }
  };
  domainextent = function(domain) {
    return [domain[0], domain[domain.length - 1]];
  };
  units = ['y', 'M', 'w', 'd', 'h', 'm', 's'];
  selectunit = function(domain, count) {
    var diff, i, len, unit;
    for (i = 0, len = units.length; i < len; i++) {
      unit = units[i];
      diff = domain[1].diff(domain[0], unit);
      if (diff >= count / 2) {
        return unit;
      }
    }
    return 'ms';
  };
  powround = function(num) {
    if (num < 1) {
      return 1;
    }
    return Math.pow(10, Math.round(Math.log(num) / Math.LN10));
  };
  niceunitnumbers = {
    s: [1, 5, 15, 30, 60],
    m: [1, 5, 15, 30, 60],
    h: [1, 3, 6, 12, 24],
    d: [1, 2, 3, 5, 10],
    w: [1, 2, 3, 4, 5, 6],
    M: [1, 3, 6, 12],
    y: [1, 5, 10, 25, 50, 100, 250, 500, 1000]
  };
  selectnice = function(n, unit) {
    var i, len, num, numbers;
    if (unit === 'ms') {
      return powround(n);
    }
    numbers = niceunitnumbers[unit];
    for (i = 0, len = numbers.length; i < len; i++) {
      num = numbers[i];
      if (n < num + num * 2) {
        return num;
      }
    }
    return numbers[numbers.length - 1];
  };
  formats = {
    ms: function(d) {
      return (d.valueOf()) + "ms";
    },
    s: function(d) {
      return d.format('HH:mm:ss');
    },
    m: function(d) {
      return d.format('h:mma');
    },
    h: function(d) {
      return d.format('D MMM ha');
    },
    d: function(d) {
      return d.format('D MMM');
    },
    w: function(d) {
      return d.format('D MMM');
    },
    M: function(d) {
      return d.format('D MMM');
    },
    y: function(d) {
      return d.format('D MMM');
    }
  };

  chrono_scale = function(linear, tz) {
    var scale;
    if (tz == null) {
      tz = 'UTC';
    }
    scale = function(x) {
      return linear(ms(x));
    };
    scale.invert = function(x) {
      return linear.invert(x);
    };
    scale.domain = function(x) {
      if (!arguments.length) {
        return linear.domain().map(function(t) {
          return moment(t).tz(tz);
        });
      }
      linear.domain(x.map(ms));
      return scale;
    };
    scale.nice = function(every) {
      var extent;
      extent = domainextent(linear.domain());
      linear.domain([every.before(moment(extent[0])), every.after(moment(extent[1]))]);
      return scale;
    };
    scale.ticks = function(count) {
      var anchor, diff, domain, endindex, every, i, results, startindex, unit;
      domain = scale.domain();
      unit = selectunit(domain, count);
      anchor = moment().tz(tz).startOf('s').startOf(unit);
      diff = domain[1].diff(domain[0], unit);
      diff /= count;
      diff = selectnice(diff, unit);
      every = anchor.every(diff, unit);
      startindex = Math.ceil(every.count(domain[0]));
      endindex = Math.floor(every.count(domain[1]));
      if (startindex > endindex) {
        return [];
      }
      return (function() {
        results = [];
        for (var i = startindex; startindex <= endindex ? i <= endindex : i >= endindex; startindex <= endindex ? i++ : i--){ results.push(i); }
        return results;
      }).apply(this).map(every.nth);
    };
    scale.tickFormat = function(count) {
      var domain, unit;
      domain = scale.domain();
      unit = selectunit(domain, count);
      return formats[unit];
    };
    scale.copy = function() {
      return chrono_scale(linear.copy(), tz);
    };

    scale.testOutput = function(){
      return 42;
    };

    //return scale;
    return rebind(scale, linear, 'range', 'rangeRound', 'interpolate', 'clamp');
  };

  return chrono_scale(scaleLinear(), tz);

};

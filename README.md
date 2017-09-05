# d3-timezone-scale
Heavily copied from Thomas Coats' [d3-chronological](https://github.com/metocean/d3-chronological) but updated for D3 V4.

d3-timezone-scale allows creating scales locked into a specified timezone name from [momentjs timezone](http://momentjs.com/timezone/) (such as "UTC" or "US/East"). 

## Installing

If you use NPM, `npm install d3-timezone-scale`. Otherwise, download the [latest release](https://github.com/d3/d3-foo/releases/latest).

## API Reference

Use just like D3's [scaleTime](https://github.com/d3/d3-scale/blob/master/README.md#scaleTime), except you pass a timezone name into the constructor.  Intelligent boundary-drawing will follow the natural boundaries in the specified timezone.  This is especially useful when a scale spans a daylight savings time change (see example).  

Pass a [chronological](https://github.com/metocean/chronological) time schedule to the nice function to round to the nearest schedule. example:
```js
myScale = d3.scaleTimezone('US/Eastern')
.domain([moment('2017-03-10T00:00:00Z'), moment('2017-03-14T00:00:00Z')])
.nice(moment().tz('US/Eastern').startOf('d').every(1, 'd'))
.range([0, 500])
```


## Dependencies

- [moment](https://github.com/moment/moment)
- [moment-timezone](https://github.com/moment/moment-timezone)
- [chronological](https://github.com/metocean/chronological)
- [d3-scale](https://github.com/d3/d3-scale)

## Contributing

First things first: 

```npm install```

Running the example locally:
1) ``npm install -g watchify``
2) ``watchify examples/index.js -o examples/bundle.js``
3) open `examples/index.html` in a browser

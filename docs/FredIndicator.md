# FRED indicator

This indicator obtains data from the FRED website as indicator. Whatever historical time series are made available on the Federal Reserve (FRED) website can be charted or used otherwise in WL8.

## How to use
From the Indicators tab, drag and drop the *Fred* indicator onto a chart - or use it in Strategy code or a strategy from Building Blocks. The data will be obtained and updated dynamically behind the scenes.

**Get description** is an optional parameter and is disabled by default to speed up things slightly. The **Units** parameter controls the series' presentation:

1. Levels (No transformation) [*default*]
2. Change
3. Change from Year Ago
4. Percent Change
5. Percent Change from Year Ago
6. Compounded Annual Rate of Change
7. Continuously Compounded Rate of Change
8. Continuously Compounded Annual Rate of Change
9. Natural Log

*Example*: **UNRATE** returns the historical unemployment rate. To look up time series please use this website:

* [**Federal Reserve Economic Data**](https://fred.stlouisfed.org/)

## Examples

See examples of FRED data item for Fed Funds Rate in action:

[![Fed Funds Rate Indicator](http://img.youtube.com/vi/1uJRp2dy_40/0.jpg)](https://www.youtube.com/watch?v=1uJRp2dy_40&t=44s "Fed Funds Rate Indicator")

[![Fed Rates Position Sizing](http://img.youtube.com/vi/1uJRp2dy_40/0.jpg)](https://www.youtube.com/watch?v=1uJRp2dy_40&t=354s "Fed Rates Position Sizing")

*Source*: BLS via FRED.
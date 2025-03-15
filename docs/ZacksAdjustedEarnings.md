# Zacks Adjusted Earnings

This is a an event provider for the free historical **earnings and EPS surpise** data for U.S. stocks available at [Zacks](https://www.zacks.com) website.

## Fundamental data

Zacks provides earnings data going several years back. For each item's reported EPS value there are extra fields available in a popup when mousing over an *Earnings* item on a stock chart and in code-based Strategies via *Detail* method of an *EventDataPoint* object. Available field names for the extra details are: 
- 	**PeriodEnding**
- 	**Estimate** - EPS estimate
- 	**Surprise** - EPS surprise $
- 	**SurprisePct** - EPS surprise %
- 	**Time** - release Time (of day)
 
### Example

The extension comes with built-in sample strategies in *Fundamental* folder:

1. "**EPS Surprises**": trading stocks with a strong history of positive earnings surprises
2. "**Rising EPS trend**": buys stocks with positive quarterly EPS (earnings per share)
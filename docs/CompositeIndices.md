### Composite market indices

Here are some examples of what you can do with Index-Lab:

- **CompAboveBelow** - Number or percent of symbols whose price or indicator is above or below another price or indicator
- **CompAdvDec** - Number or percent of advancers, decliners, or unchanged symbols
- **CompAdvDecLine** - Advance/Decline Line, ```cumulative total of advancers minus decliners```
- **CompAdvDecRatio** - Advance/Decline Ratio, ```advancers divided by decliners```
- **CompAdvDecSpread** - Advance/Decline Spread, ```advancers minus decliners```
- **CompBreadthThrust** - Moving average of advancers divided by moving average of advancers plus decliners
- **CompCrossovers** - Number or percent of symbols where a specified Indicator crosses above or below a threshold value
- **CompCrossovers2** - Number or percent of symbols whose Indicator (or Price) crosses above or below the second Indicator (or Price)
- **CompInd** - Select any Wealth-Lab indicator, returns the average indicator value across the Universe
- **CompInd%** - Returns the percentage of symbols for which a selected indicator is above or below a specified value
- **CompIndPctStdDev** - Percentage of symbols having an indicator value N standard deviations above (below) its norm
- **CompMarketStrength** - Ratio (or percent) of the number of stocks which increased N% divided by the number of stocks which decreased N%
    - *Ratio* = ```(total number of the stock which increase N% / total number of the stock which decrease N%)```
    - *Oscillator* = ```100 - 100/( 1+(total number of the stock which increase N% / total number of the stock which decrease N%))```
- **CompMarketThrust** - Tushar Chande's *Market Thrust Oscillator*, a powerful measure of internal strength or weakness.
    - Formula = ```((AI*AV - DI*DV)/(AI*AV + DI*DV))*100```, where AI = advancers, AV = advancing volume, DI = decliners, DV = declining volume.
- **CompMcClellan** - McClellan Oscillator, ```19 period EMA of advancers minus decliners divided by the 39 period EMA of same``` 
    - Its interpretation is similar to many oscillators: pay attention to its overbought/oversold readings and note its crossings with the zero line which can signal trend changes.
- **CompNewHighLow** - Number or percent of symbols that made new highs or lows, specify a lookback or across the entire history
- **CompNHNLO** - High Low New Low Oscillator is ```19 period EMA of New Highs minus New Lows minus the 39 period EMA of New Highs minus New Lows```
- **CompHighLowLogic** - Fosback's High Low Logic Index is ```the lesser of the number of new highs or new lows divided by the total issues```. High indicator readings indicate that many stocks are reaching new highs and new lows at the same time so the market appears to be inconsistent (bearish signal). Extreme low indicator readings are considered to be a bullish signal. 
- **CompSTIX** - STIX (*Short Term Trading Indicator*) is an exponentially smoothed breadth-momentum indicator developed by *The Polymetric Report* that compares the amount of volume flowing into advancing and declining stocks. STIX typically oscillates between +42 and +58, with low readings (< 45) being bearish and high readings (> 56) being bullish.
    - Formula = ```STIX = EMA(21) of A/(A+D)*100```, where A = advancing issues and D = declining issues
- **CompSDR** - Speculative Demand Ratio (SDR) by David Varadi measures the ratio of money flow into the most volatile stocks versus the least volatile stocks within a given DataSet. Ratio greater than 1 indicates a greater than average demand for risk and the market is about to do well, and the ratio less than 1 is a sign that large investors are getting increasingly cautious and the market is likely to do poorly. Extreme values are a contrarian signal � ratios well above 1 or well below 1 indicate market tops and bottoms, respectively.
- **CompTrendExhaustion** - Trend Exhaustion Index by Clifford Creel is ```10 period EMA of new highs divided by advancers```.
    - In a bull market, many stocks are setting new highs, also causing a large number of advancers to make new highs as well, causing a high TEI reading. When the market is topping, less new highs are being made despite many advancing issues, which make TEI decline. For a market bottom, look for readings above 0.15.
- **CompTRIN** - Arms Index (TRIN), ```Advancers over decliners divided by advancing volume over declining volume```
- **CompUnchanged** - Unchanged Issues Index, ```unchanged / total issues```

Besides, the Settings dialog of certain composite indicators (such as CompAdvDecLine, CompAdvDecRatio, CompAdvDecSpread, CompBreadthThrust, CompMcClellan, CompTRIN) exposes extra options that *may* apply to some of them:

- *Take volume*. When enabled, the formula is adjusted to take the *volume* amount instead of the number of stocks. For example, original formula takes the number of declining stocks. By enabling "Take volume" the calculation is modified to account for the *volume* of declining stocks on given bar.

- *Adjusted (for total issues)*. This turns the Advance Decline Ratio into *Adjusted Advance Decline Ratio* by Richard Russell. It is calculated as the *sum of ((advancers - decliners) / total issues)*

- *Big movers only*. This is a modification of the Advance Decline Line by Greg Morris. The value is calculated using only days when either the advancers, decliners or both were above a predetermined percentage of total issues. When enabled, the corresponding threshold can be set in the field "*Big move: adv/dec/both above this % of total*".
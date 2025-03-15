# WLMA (Wealth-Lab Moving Average)

Parameter  | Description
------ | ------
Bars   | A BarHistory object for building the Adaptive Lookback
Source   | TimeSeries to apply WLMA to
Number of Swings     | How many recent swing points to take when computing the indicator
Fast swing detection	| When true, takes 1 bar after a swing point (vs. 2 bars by default aka "Gann swing")
Precise detection	| *Note:* applicable only when *fastSwing* is true. When true, the high of the bar preceding a swing high or the low of the bar preceding a swing low can not be equal to the swing bar's high/low, respectively.
Parameterless | See below

### Description

**WLMA (Wealth-Lab Moving Average)** is an adaptive, market-driven simple moving average 
created by Gene Geren. Its lookback period is dynamically changing with market 
conditions, driven by the Adaptive Lookback Period indicator.

The WLMA is calculated just like SMA, but the key difference is that there's no fixed 
lookback period. WLMA's lookback period is variable-length and is determined by the 
Adaptive Lookback value obtained using the specified "*Number of Swings*" parameter.

Since WLMA heavily depends on Adaptive Lookback, it's advised to review the indicator's 
chapter to understand its construction and interpretation guidelines.

### Example

Check out the built-in sample strategy "WLMA Bands" (*AdvancedSmoothers* folder).

See how more responsive is WLMA (10 last swings) when compared to a short-term 10-bar SMA.

![WLMA vs SMA](http://www2.wealth-lab.com/WL5WIKI/GetFile.aspx?File=/Community.Indicators/WLMA.png)
# Adaptive Lookback

### What it is

The Adaptive Lookback (period finder) created by Gene Geren is truly a market-driven 
indicator used to determine the variable lookback period for many different indicators, 
instead of a traditional, fixed figure.

It is based on the **frequency of market swings** - the time between swing highs or 
swing lows. A swing high is defined as two consecutive higher highs followed by two 
consecutive lower highs; a swing low is defined by two consecutive lower lows followed 
by two consecutive higher lows. As swing points typically accompany reversals, they 
occur more frequently in choppier and volatile markets than in trends.

With the *fastSwing* option enabled, it takes two consecutive bars before the swing 
point and just one after - for faster detection. The high of the bar preceding a swing 
high or the low of the bar preceding a swing low can be equal to the swing bar's 
high/low, respectively.

Here is how the variable lookback period is determined:

1. Determine the initial number of swing points to use in the calculation.
2. Count the number of price bars it takes for the n swing points to form.
3. Divide step 2 by step 1 and round the result.

### Parameters

Parameter  | Description
------ | ------
Source   | A BarHistory object
Number of Swings     | How many recent swing points to take when computing the indicator
Fast swing detection	| When true, takes 1 bar after a swing point (vs. 2 bars by default aka "Gann swing")
Precise detection	| *Note:* applicable only when *fastSwing* is true. When true, the high of the bar preceding a swing high or the low of the bar preceding a swing low can not be equal to the swing bar's high/low, respectively.
Parameterless | See below

### Parameterless adaptive lookback

This is a special logic that does not require averaging over previous N swing points 
and thus ignores *Fast swing detection*. This makes the already self-adjusting, adaptive 
indicator parameterless.

The adaptive lookback period is determined simply as the distance between two swing 
points of the same direction, i.e. between two latest Swing Highs or between two 
latest Swing Lows.

### Interpretation

This makes the variable lookback period grow in calm or trending markets, and shorten 
in range-bound and volatile markets. For a trend-following system you would like the 
opposite to prevent being whipsawed, therefore this indicator is more suitable for 
short-term traders and counter-trend systems.

Experiment with applying the adaptive lookback period to different indicators and 
you'll see how more responsive they become in volatile markets.

### Example

Included sample strategy "Adaptive RSI" (see *AdvancedSmoothers* folder) illustrates 
how to construct and plot the "traditional" Adaptive RSI indicator. The lookback period 
is based on the Adaptive Lookback readings. This technique can be easily applied to 
other indicators such as price channels and oscillators.

Notice how much responsive can the Adaptive RSI be compared to its traditional 
14-bar version on this 30-minute chart of Cisco Systems:

![Adaptive RSI on 30-min chart of CSCO](https://www.wealth-lab.com/Images/WLHelp/AdaptiveLookback.png)

Parameterless Adaptive RSI:

![Parameterless Adaptive RSI](
https://www.wealth-lab.com/Images/WLHelp/AdaptiveLookback-Parameterless.png)
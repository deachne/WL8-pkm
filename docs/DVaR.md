# D-VaR

The D-VaR position sizing method was created by [David Varadi](http://cssanalytics.wordpress.com/). It's based on the concept of Value at Risk (VaR) - a widely used measure of the risk of loss in a portfolio based on the statistical analysis of historical price trends and volatilities.

The PosSizer will:

1. Take the "rolling" daily returns for an instrument, according to the specified sample period
2. Calculate the 5th percentile of returns (aka "max tail loss")
3. Accept a risk level expressed as a maximum daily loss. The default value is 1% (conservative), risk seekers can enter higher values e.g. 1.5% (aggressive)
4. Calculate the position size as the risk level divided by the absolute value of the "max tail loss"


Additionally, there are two options: to set a maximum percentage size the position may not exceed, and the ability to treat the "max tail loss" differently for long or short trades. If you believe that for *short* positions, the risk of price going in the opposite direction is represented by the *positive* price changes only (and vice versa for longs), enable this option. Otherwise, the PosSizer will be looking for the absolute value of daily changes regardless of the position type.

Note: for a reason, with the option to differentiate between long and short trades, Alerts are zero sized.

For more information, review the original article by D.Varadi:
* [**Introduction to D-VaR Position Sizing** (Part 1)](http://cssanalytics.wordpress.com/2010/02/04/introduction-to-d-var-position-sizing-part-1/)
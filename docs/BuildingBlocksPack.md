# Building Blocks

The PowerPack comes with an ever expanding selection of _powerful_ Building Blocks:

## Entry and Exit Blocks

### Buy/Sell/Short/Cover Next Bar At Close
WealthLab can create signals only for the next bar; AtClose signals are not an exception. You can attach the **1 Bar in Future** Qualifier to Entries and Exits at Market Close, but the Blocks-based rule can be backtested only. It's not possible to generate a signal since "tomorrow's Close" cannot be known in advance. In practice, the strategy would have to be traded manually or converted to an intraday strategy to estimate thea closing price for Auto-Trade. 

Another popular end-of-day strategy is to place an AtClose order based on movement from the market's Opening price. Again, the strategy can be backtested with the **1 Bar in Future** Qualifier. In practice, this strategy can be converted to a C#-coded Auto-Trade strategy that implements *ExecuteSessionOpen*. 

### Exiting on the Same Bar as Entry
The Market Close Sell and Cover Blocks support same-bar Exits, using the **same-bar exit check box**, just like other Exit Building Blocks in the WL8 base. Unlike the base WL8 same-bar Exit Blocks, the Market Close same-bar Exit supports Conditions. Combined with the 1 Bar in Future Qualifier, you can model an exit at market close of the entry bar based on any kind of price/indicator action on that bar.

> %{color:blue}**Note**%  
> **Same-bar exits** have limitations **in backtests** after a limit or stop entry. *In general*, the same-bar's closing price needs to be at a level that would have triggered the exit. Specific trade scenarios also work in a backtesting, such as a Buy on Stop and then Sell at Limit at a higher price.

[![Same-bar Exits on Market Close Building Blocks](http://img.youtube.com/vi/diqU9q5UlzE/0.jpg)](https://www.youtube.com/watch?v=diqU9q5UlzE&t=657s "Same-bar Exits on Market Close Building Blocks")

### Sell/Cover at Stop to Break Even
These signals apply a break even stop order once the Position's *Most Favorable Excursion (MFE)* has reached the specified percentage on an intraday basis (high or low of the bar). The rule uses MFE in the trade currency, i.e., the non-base currency for Multi-Currency backtests. 

### Sell/Cover At Limit/Stop at Entry Lookback
These signals calculate a *Limit* or *Stop* price the specified percentage *Above* or *Below* the value of an indicator *n bars* before the bar of trade. 1 bar before entry is the signal bar. 

Example: *Sell at limit X% above the Highest High of 20 bars as it was 2 bars before the entry bar*
 
### Sell/Cover At Profit Target/Stop Loss at a Multiple of Signal Bar Range
These signals add the range, high to low, of the signal bar, applies the specified multiple, and adds or substracts it to the entry price to calculate a profit target or stop loss.   

Example: *Sell at limit of 3 times the range of the bar before entry*

### Sell/Cover At Trailing Stop
These trailing stop signals let you *activate* one of several trailing Stop Sypes (ATR, PercentC, PercentHL, PointC, or PointHL) when the trade reaches a specified MFE % (Most Favorable Excursion %) or an ATR multiple with respect to the entry price. The ATR Period parameter is ignored if ATR is not used for the Stop or Activation Type.  

**Trailing Stop Type**  
- PercentC - based on a percentage above/below price, calculated using closing price.
- PercentHL - based on a percentage above/below price, calculated using highs (long) or lows (short)
- PointC - based on a fixed amount above/below price, calculated using closing price.
- PointHL - based on a fixed amount above/below price, calculated using highs (long) and lows (short).
- ATR - based on a variable amount above/below price, calculated using highs and lows. For a Chandelier exit, the distance from the highest/lowest point to the trailing stop is measured in units of 22-period Average True Range by default.

Example:  *Sell at 3.00 PercentHL Trailing Stop @ 2.00 ATR(10)*  
This trailing stop activates when the highest High after the Buy reaches the Entry Price + 2.0 x ATR(10), where the ATR is evaluated at the entry bar. Once activated, the trailing stop level is 3% below the highest High. 

---
## Condition Blocks

### Bar of Day  
For intraday charts, detect the first, last, or next to last bar of the day. 
### Bars Since Last Entry/Exit
Use this rule to inhibit trading until a specified number of bars have passed since the last Entry or Exit, as specified. When "Entry" and "Check Only Active Positions" specified, the condition will always return *true* if no positions are open. Applies to trades for the current symbol only. NSF Positions are not included.
### Consecutive Peaks/Troughs
Specify peak/troughs by percentage, points, ATR, or ATR Percent. Create a setup rule, for example, to enable a trade after detecting 3 consecutive falling (lower) troughs. Note that the rule triggers when the trough is found after the 3rd lower peak.
### Date Filter
If "Ignore Years" is checked, condition is evaluated on a daily/monthly basis e.g. "Buy in October, sell in May - every year". Otherwise it links strictly to the day, month and year.
### Day of Week
Day of Week uses the **DayOfWeek** C# enumeration for which Sunday corresponds to the first day of the week, 0, and Saturday is last, or 6. Day of week detection occurs on the signal bar. To avoid a trade entry on Friday only, for example, specify Day *is not equal to* Day of Week *Thursday*;
### Days Since Last Entry/Exit
Like the "Bars Since" condition, "Days Since" inhibits trading until a specified number of *full trading days* have passed since the last Entry or Exit, as specified. NSF Positions are not included. Unlike the "Bars Since" condition, you can specify if the Last Entry/Exit applies only to the *Current Symbol* or to the last Entry/Exit for *All Symbols* in the backtest. 

This condition can be used in any configuration with any Entry or Exit signal. Though not recommended, you can use "Since Last Exit" as a Exit condition for the current position. The rule will find the last exit for the current symbol if it exists, otherwise the "last exit" is the date of the entry for the first position. 

For intraday scales, the condition allows a signal to trigger on the last bar of the day to place the trade at the open of the next trading day.
### Gaps
The following gap definitions are used: 
- **Gaps up** - Open is greater than the previous bar's **High**
- **Gaps down** - Open is less than the previous bar's **Low**
### Market Moving News Ahead
The condition block's will be *true* for an upcoming market moving release ahead i.e. from the signal bar until the next trading session. This Block **cannot** be used for backtesting (*but you can use a dedicated Wealth-Lab strategy to backtest Fed meetings*). The following reports and events are evaluated by the Condition: 

* FOMC (Fed) interest rate decision
* FOMC (Fed) minutes
* FOMC (Fed) chair speaks
* CPI (consumer price index
* Retail sales
* Building permits
* Nonfarm payrolls
* Unemployment rate
* Initial jobless claims

The goal should be no new signals on the day of such news and close open trades on the day of this news. 

### One Entry Per Day
For use with intraday strategies to allow only one entry per day for attached Signal blocks. For example, assume a Strategy with two BuyAtMarket Signal blocks, A and B. To limit trading to one entry per day for the entire Strategy, use *One Entry Per Day* in both blocks. If attached to block A only, block B will still be able to enter more than once each day.
### Position's Profit/Loss Value
The last (most-recent) open position's Profit/Loss is *greater/less/equal/not equal than* X percent/dollar/points.
### Price/Indicator Divergence
Divergences are detected by applying a **PeakTroughCalculator** to the indicator and comparing the relationship between the indicator Peaks or Troughs with the Price Close at those PeakTroughs. Regular divergences signal a trend reversal, whereas hidden divergences indicate trend continuation.  For example, *Bullish* divergence occurs when the indicator's most recent Trough is higher than the previous trough, but Price action is lower. The table below summarizes each type of divergence. 

| **DivergenceType** | Indicator PeakTrough Action | Current Price Action | Prediction |
| -- | -- | -- | -- |
| Bullish | Recent Trough > Previous Trough|  Lower Prices | Prices to reverse higher |
| Hidden Bullish | Recent Trough < Previous Trough|  Higher Prices | Continue trend higher |
| Bearish | Recent Peak < Previous Peak|  Higher Prices | Prices to reverse lower |
| Hidden Bearish | Recent Peak > Previous Peak |  Lower Prices | Continue trend lower  |

### Price Compare to Entry Bar
Comparison between current price and a price at entry bar/bar preceding the entry. 
### Time Of Day
Hour and minute of day is greater/less/equal/not equal to a given time value. You can use multiple instances of this condition to limit trading to specific hours of the day.  For example, 1) greater than 1000, and, 2) less than 1400.
### Trading Days in Trade
Especially for intraday scales, this condition lets you work with the number of *trading days* that the position has been active. Intraday scales count full trading days with respect to the *time of day*. For example, if a Position is opended at 11:45AM on day 0, the first trading day is counted at 11:45 on day 1. 

Add a check mark to *Exit at Market Open* to trigger on the final bar of the trading day for an exit at the open on the N^th^ day. 
### Weeks Since Last Entry/Exit
Like the "Bars Since" and "Days Since" conditions, "Weeks Since" disables trading until a specified number of calendar weeks (Sunday through Saturday) have passed since the last entry or exit, as selected. The condition allows a signal to trigger on the last bar of the week before the next trading week. 

Example:  
Assume *1 Week since last Exit* is applied to an entry condition. If a trade exits on a Wednesday, no trades will be allowed the rest of the calendar week. However, the final bar's close on the last trading session of the week, usually Friday, could signal a trade to occur for the opening session of the next week, usually Monday. 

## Within N Bars to [Session] Close
Useful for any intraday interval, this condition is true on or after the N^th^ bar prior to the regular session close. 

## X Winners/Losers Within Y Days
When used with *Logical Inverter* Qualifier, this condition *prevents* trading when applied to an entry block once the set of conditions specified occurs. In the image below with the Logical Inverter applied, the block would prevent additional entries if 3 trades in the past 1 day lost more than ($50). For *intraday* bars, "1" Trading Day is the current day. 

![X Wins/Losses Y Days](http://www.wealth-lab.com/images/WLHelp/PowerPack_XwinlossYdays.png)

## Qualifiers

### Bars In Future 
Specifies how many bars ahead the attached Condition should be evaluated. Use this in conjunction with Power Pack's **AtClose** Building Blocks to model strategies that use the next day's opening price in rules to trade at the market's close. 

%{color:red}**Warning!**%  
> As implied, **Bars In Future** *peeks into the future*. Signals cannot be generated for rules using this qualifier, therefore it's not possible to Auto-Trade a strategy that uses **Bars In Future**

If the purpose is to use the market opening price, the C#-coded Strategy version can be modified to use **ExecuteSessionOpen()** for Auto-Trading.  See an example in the QuickRef > Class: UserStrategyBase > Strategy Execution > ExecuteSessionOpen. 
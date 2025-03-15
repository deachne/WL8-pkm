# Extended ScoreCard

Extended Scorecard is a library of performance metrics used in various tools across Wealth-Lab: backtesting, optimization etc. It is part of the PowerPack extension. Typically, these can be strategy performance or especially reward/risk metrics. 

## Available metrics

### Trade statistics
- Max Consecutive Wins
- Max Consecutive Losses
- T-Test
- Luck Coefficient
- Performance Ratio
- Pessimistic Rate of Return
- E-Ratio
- Median Profit
- Median Profit %
- Symbols Traded

### Trade efficiency
- Average Entry Efficiency %
- Average Exit Efficiency %
- Average Total Efficiency %

### Outlier analysis
- Standard Deviation Of Profits
- Total Outliers
- Positive Outliers
- Negative Outliers
- Outlier Profit
- Select Net Profit
- Select Net Profit as % of starting capital
            
### Outlier analysis (adjusted by percent)*
- Standard Deviation Of Profits
- Total Outliers
- Positive Outliers
- Negative Outliers
- Outlier Profit
- Select Net Profit
- Select Net Profit, Adjusted

> Classic outlier analysis considers a trade to be an outlier if its profit/loss is greater than three standard deviations away from the average, using standard deviation of trade dollars. Because the trade size gets larger over time this leads to a problem. Trades near the start of the backtest will never be seen as outliers because the initial trade size is relatively small. The second outlier report is based on percentage profit rather than dollars (i.e. standard deviation of profit percent).

### Drawdown
- Longest Drawdown
- Average Drawdown %
- Percent New Highs
- Number Of Drawdowns

### Risk/reward
- MAR Ratio
- K-Ratio
- Seykota Lake Ratio
- Ulcer Index
- Ulcer Performance Index
- APD Ratio
- APAD Ratio
- MEGAN Ratio
- Tail Ratio
- Upside Capture Ratio
- Downside Capture Ratio
- Capture Ratio

### Risk of ruin
- Risk of ruin = -10%
- Risk of ruin = -25%
- Risk of ruin = -50%
- Risk of ruin = -75%

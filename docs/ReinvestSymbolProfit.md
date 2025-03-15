# Reinvest Symbol Profit

Percent of Equity sizing naturally reinvests trading profits. As the portfolio value increases, the trade size for *every symbol* increases. 

This **Reinvest Symbol Profit** sizer finds the current backtest profit on a per symbol basis and applies it to the next trade for that symbol. Profitable instruments get increasing larger sizing and vice-versa. 

Simply set the starting cash size ($5000 default) and the minimum number of shares to return for each trade. 

**Example:**  
Your test DataSet has symbols ABC, DEF, and GHZ, and you start with a $5000 size.  Assume ABC gained 20% and DEF lost 10% on their first trades, respectively. The next position size would be $6000 for ABC and $4500 for DEF. Since GHZ hadn't traded yet, its next position size would still be $5000.

**Note!**  
*This sizer slows down backtests that open many positions.*
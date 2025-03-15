# Control Drawdown

This money management method allows risk-averse traders to have good control over their equity drawdowns. The idea of the technique is to not let drawdown exceed some value that a trader can tolerate. The formula for position size is:
 
> % Risk \* (Equity \– (1 \– Max DD %) \* Highest Equity) / initial risk per share / 100

Initial risk per share is expressed in units of volatility (e.g., 0.50 * 14-day ATR). Consequently, the initial risk taken when creating a position is equal to a fixed fraction of maximum allowed equity drawdown.
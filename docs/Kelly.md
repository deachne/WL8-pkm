# Kelly criterion

This money management method implements the Kelly criterion. The formula is:

> Kelly % = W - \[(1 – W) / R\]

where: *W = Winning probability, R = Win/loss ratio*

Since the Kelly method is known to be risky, there are two additional safeguards: option to specify a Kelly fraction (percentage) to use, and to cap the maximum size at a certain percentage.

The calculation is rolling, based on the user-specified number of last trades (30 by default). To determine the position size for the first trades, the PosSizer uses a percentage of equity (Default % equity). The PosSizer operates on closed positions only.

**Note**: if trading suddenly stops, increase the Window size to exceed your system's largest winning/losing streak (whichever is greater). (There's a higher chance to notice it with intraday backtests).

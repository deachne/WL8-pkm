# Fixed Ratio

The fixed ratio money management technique was presented by Ryan Jones in his book "The Trading Game". The number of contracts is proportional to the square root of profit, but neither trade risk nor account balance are considered. Here's the formula:

	No. of contracts = (Square root of ( 2 * Net Profit/Delta + 0.25 ) )

The key parameter is the Delta, which is the amount of capital it takes to increase by one contract. For example, a $1,000 delta means you can increase the position size by 1 contract (Jones' book is futures-centric) when the account's net profit grows by this amount. Note that this method is quite risky for small accounts, because the profit required to go from trading 1 to 2 contracts is the same required to increase from 10 to 11 contracts. Because of this feature, Fixed Ratio becomes less effective when the account grows rather large, after which Jones suggests switching to the "fixed fraction" method (i.e. percent equity).

Determining the Delta, unfortunately, is a subjective process. Try setting it to some multiple of the system's the maximum historical drawdown or biggest historical losing trade. In addition to manually setting the Delta value, the PositionSizer allows you to "tweak" the Fixed Ratio by either switching to fixed fractional (% equity) or reducing the size X times once the portfolio's drawdown gets deepers than N%.

Finally, as Ryan Jones suggests, you can switch to fixed fractional (i.e., % equity) once portfolio grows rather large. 

***Note***: since Fixed Ratio starts with 1 contract (share), stock trading backtests can have trouble seeing the position size going above 1 share, ever, regardless of the Delta - *if* commissions are enabled. 
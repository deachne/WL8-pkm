# Larry Williams method

This simple money management technique was presented by Larry Williams in his book "The Right Stock At The Right Time". The formula is based on the assumption that the largest losing trade is the trader's worst enemy.

    (Account balance x Risk percent)/Largest loss = Contracts or shares to trade

where

- Largest Loss = Peak/Valley Drawdown
- Risk percent = personal risk/reward expectation (5% to 18%)


Author suggests that conservative traders should use 5% of their account, ~10% as a normal value, ~15% for risk-seekers and risking more than that increases the possibility of deep drawdowns. The other option allows to set the largest allowed dollar loss.

**Note:** the PositionSizer is using the largest dollar loss *by instrument* vs. a peak-to-valley drawdown, as suggested by Williams. In this case, it would make the formula useless for portfolio trading where different instruments have different volatilities and prices. 
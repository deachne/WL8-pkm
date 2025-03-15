# Drawdown / Runup 

This money management method is a combination of two money management approaches:

1. Increase/decrease trade size when the portfolio equity is setting new highs
2. Increase/decrease trade size when the portfolio equity is in drawdown

And in between, one of the three Wealth-Lab's standard position sizing choices are applied: fixed dollar, percent of equity, or maximum risk percent.

You have the option to increase or reduce trade size during equity runups. Setting it to 0 effectively disables this behavior, letting the PosSizer control downside risks only.

Another option lets you specify the drawdown depth after which the PosSizer will start altering the size (to the upside or to the downside). (Enter 0% to disable the position sizing adjustment during drawdowns.) By default, position size is reduced but you can direct the PosSizer to increase the size during drawdowns (see: *Streaks Winning and Losing*)

The checkbox "Per each % of drawdown" changes the logic of adjustment in that you keep risking less and less if your drawndown is getting bigger and bigger (or more and more, if you select the "Increase size" option). In other words, activating this option makes you risk *progressively* less: for example, when your position size is 10% equity and 10% reduction is specified after reaching a 10% drawdown, for every 10% of drawdown you will risk 10% less, so at 10% drawdown and below the position size is 9%, after reaching a 20% drawdown the size is further cut to 9% - (10% of 9%) = 8.1% and so on.
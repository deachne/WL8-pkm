# Equity momentum)

This money management method increases the position size by the user-selected percentage if the equity curve had certain gain over the past N bars (i.e. the "equity momentum"). Otherwise it sets the position size to an initial size.

As with most other PositionSizers, the basic position size can be determined using either fixed dollar, percent of equity, or maximum risk percentage approach. The "equity momentum" can be either the N-trade momentum of the equity curve or the N-bar change: select some equity increase percentage over the last rolling N bars or last rolling N trades to make the PosSizer bump up your trade size by a defined percent value.
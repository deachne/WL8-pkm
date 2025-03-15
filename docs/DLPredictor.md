# DLPredictor Indicator

Deep Learning enables your Model for use in Wealth-Lab Strategies via an Indicator named **DLPredictor**. You'll find it in the [Indicators](Indicators) list, under a tree node "Deep Learning". DLPredictor takes a BarHistory as its first parameter, and a Model name as the second. The last parameter controls which Output to use. It returns the predicted Output along each bar of data in the source BarHistory.

The output of DLPredictor is the predicted Output value, and falls within that Output's range. For example, if the Model was trained to predict ROC(5) with a 5 bar Look Ahead, then the DLPredictor values might range from some small negative value to a small positive value, the predicted percentage profit after 5 bars.

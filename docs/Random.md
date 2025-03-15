# Random

This auxiliary provider can quickly create large DataSets with randomized historical data for blind testing purposes. Hopefully, this special will help you fight over-optimization and design better trading systems without curve-fitting.


### How it works

Each time a dummy history is built, provider randomly selects a randomization method:
* **Simple** random data generator
* **Random walk** generator. The choice for market bias (i.e. bull, bear or neutral market) is again made randomly.

Like in real life (the April 2020 drop in oil prices being the exception), synthetic prices can not go below zero: when the price gets "close enough", the provider will make its best to not allow the market to lose its value, usually by forming a basing period or doing a "V" reversal.

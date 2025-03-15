# Candle Pattern Evolver

This tool uses a genetic algorithm to generate new and profitable Candlestick patterns based on 
the **DataSet** and **Data Range** you selected in the top level toolbar. The Evolver controls 
are contained in the second toolbar along the top of the window.

---
## What it Does
The Pattern Evolver first loads the historical data if needed. It then generates 20 random 
Candlestick patterns, and runs an evaluation. Each such analysis run is called a **Generation**.

After each Generation, the Evolver sorts the patterns by the target criterion you selected in 
the **Evolve for** dropdown. You can target the Evolver to find the best patterns based on 
these options:

 - **Bullish Patterns** (highest N-Bar Percentage Return)
 - **Bearish Patterns** (lowest N-Bar Percentage Return)
 - **White Candles** (highest chance of the following bar having a close greater than its open)
 - **Black Candles** (highest chance of the following bar having a close less than its open)

After sorting the patterns, the Evolver keeps the ones that performed best, discarding the rest.  The Evolver will also discard patterns that do not have enough **Observations**. You control this threshold via the **Minimum Observations** control in the second toolbar. It mutates some of the best patterns by introducing small changes. It fills out the list by generating some new completely random patterns.

---
## Controlling the Evolver
The Evolver will continue to run Generation after Generation until you click the **Stop** button. You can monitor the results visually in the **Genetically Evolved Patterns** list, and stop the analysis when you see that the results are to your liking. To continue the analysis, click the **Resume** button. Clicking **Start** again will start from the beginning at Generation 1 with a new set of completely randomized patterns.

---
## Working with the Results
You can explore the **Genetically Evolved Patterns** in the same way as with the [Pattern Evaluator's](CandlePatternEvaluator) Library patterns. In addition, you can do the following:

 - Right click to add one of the genetically evolved patterns to the **Pattern Library**.

After you add a new pattern to the Library, it is available in the **Candlesticks Condition** [Building Block](BuildingBlocks), and in the CandleGeneDecoder for [C#-Coded Models](CSharpCodeBased).


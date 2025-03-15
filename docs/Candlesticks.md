# Candlesticks Extension

 - [take me there now](extension:Candlesticks)


The **Candlesticks extension** provides a wealth of analysis tools based on 
[Japanese Candlestick](https://en.wikipedia.org/wiki/Candlestick_pattern) chart patterns. 
The extension contains several levels of analysis support:

 1. A Candlestick **Building Block Condition** that lets you easily apply Japanese Candlestick analysis to your [Building Block Models](BuildingBlock). This new Condition appears in the **Conditions** folder of the [Building Blocks](BuildingBlocks) tree ([take me there now](action:BB)), under the **Candlesticks** folder.
 2. Several Candlestick based [Indicators](CandleIndicators), which appear in the [Indicators](Indicators) list , under the **Candlesticks** folder.
 3. The C# static class **CandleMethods**, that lets you use candlestick concepts in your C# Coded Strategies. This class is documented in the [QuickRef](QuickRef).
 4. A C# class called **CandleGeneDecoder** that lets you detect patterns from your candlestick pattern library in a [C#-Coded Strategy](C#CodeBased). This class is also documented in the [QuickRef](QuickRef).

The following items are part of the **Candlestick Genetic Evolver** tool that is available under 
the Wealth-Lab **Extensions** menu ([take me there now](action:extension:Candlesticks)).
- The [Pattern Evaluator](CandlePatternEvaluator) that lets you evaluate the library of Japanese Candlestick patterns against historical data.
- The [Genetic Evolver](CandlePatternEvolver) that uses a genetic algorithm to produce new Candlestick patterns based on the targets you establish. You can add profitable new patterns to your pattern library.


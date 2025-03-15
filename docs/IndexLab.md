
# Index-Lab®

### What is Index-Lab?

The **Index-Lab** extension lets you create composite breadth indicators and aggregate 
indicators on any DataSet simply by configuring a Wealth-Lab indicator. Index-Lab does the 
heavy lifting of synchronizing the data, performing the calculations, and keeping the composite 
indicator up to date as needed, all behind the scenes. Simply drag and drop an Index-Lab 
indicator, use it in a Building Block Model, or create one via C# code.

Here are some examples of what you can do with Index-Lab:

- Create a Market Index that tracks the average gain/loss of any group of symbols that you select.
- Create custom Advance/Decline Lines to measure broad market performance, and create other Market Breadth indicators.
- Create Aggregate Indicators, such as the average RSI for all symbols in the Index. Take action when the Aggregate Indicator reaches oversold or overbought levels.

### How Does Index-Lab Work?

Index-Lab for Wealth-Lab 8 is all-new, easier, and more versatile than ever.  Index-Lab is now 
a collection of **Indicators** whose parameters allow you to identify a target DataSet, lookback 
period, an indicator basis, etc. - as required by the definition of the index. 

The calculation and update processes occur automatically and on-demand whenever the Index-Lab 
index/indicator is referenced in a chart or Strategy. 

### Index-Lab Cache
Unlike previous integrations of Index-Lab, Index symbols *do not* appear in the DataSet Tree. 
Instead, you use indices as if they were indicators, which they now are!

%{color:blue}**Note!**% 
> Currently, all indices are created using the Daily scale by default.  Support for additional scales is planned after Release 1.

### Build an Index
Index-Lab indices are indicators, but you can pre-populate the cache and inspect the result 
using this simple process:
1. Drag an Index-Lab "Comp" (short for Composite) indicator into a chart, and,
2. Configure it.  

The index will be calculated immediately but could take several seconds depending on the number 
of symbols involved and if the underlying data is up-to-date. 

![Create Index Using Drag & Drop](https://www.wealth-lab.com/Images/WLHelp/IndexLabDragDrop.png)

### Index Symbols in Building Blocks
Recalling that Index-Lab symbols are simply indicators, find the indicator condition you want 
to use and drag it into an entry or exit block.  Finally, click the configuration button to 
set up the Index-Lab symbol just as you would had you dragged it into a chart.

![Index-Lab Indicator in Building Blocks](https://www.wealth-lab.com/Images/WLHelp/IndexLabIndicatorBlock.png)

### Index-Lab Contructor in C# Code
The following sample code demonstrates creating an Index-Lab indicator for use in C# Strategy 
code.  It declares a private variable *_compInd* (you would it use later in the Strategy's 
`Execute()` rules) and the syntax for Index-Lab's Composite Indicator index, `CompInd`.  

Don't forget to add the directive: `using WealthLab.IndexLab;`

	private IndicatorBase _compInd;
    public override void Initialize(BarHistory bars)
    {
		StartIndex = 14 * 3;
		
		_compInd = new CompInd(bars,"Dow 30", 2000, new RSI(bars.Close,14));
		PlotIndicator(_compInd, Color.Black);
    }

### Split Effects
Index-Lab indicators won't spike as long as the source data is split adjusted. **CompIndex** 
itself is initialized with split-corrected data and uses raw gains going forward, so splits 
won't affect the ongoing calculations.

### Refresh/Re-Calculate an Index Indicator
If you need to start anew with an Index calculation, open Windows Explorer, navigate to your 
Index-Lab data folder (..\AppData\Roaming\WealthLab8\IndexLab), locate the indicator, delete it, 
and finally restart Wealth-Lab.  A more integrated solution for this action is planned after 
Release 1.

---
## Current Limitations

- CompInd used in Code-Based Strategies does not support indicators whose source is a 
 dynamically constructed TimeSeries. Only the standard PriceComponents Open, High, Low, Close, 
 Volume, etc... will work. For example:
```csharp
CompInd ci = new CompInd(bars, "Yahoo Data", 2000, new SMA(bars.Close * bars.Volume, 20));
```
will resolve to an SMA based on Close, not Close * Volume.

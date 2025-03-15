# Chart Patterns Extension
The Chart Pattern Extensions contains a plethora of tools related to detecting **Classic** **Chart Patterns** as well as **Grid-Based** **Chart Patterns** that are defined by the price action within a window of time. 
## Classic Chart Patterns
As prices unfold in the chart, they often form patterns that paint a picture of the supply and demand of the underlying market. When these patterns are **confirmed**, they signal either a bullish or bearish move. Some examples of classic chart patterns are the [Head & Shoulders Top](https://en.wikipedia.org/wiki/Head_and_shoulders_%28chart_pattern%29) and the [Symetrical Triangle](https://en.wikipedia.org/wiki/Triangle_%28chart_pattern%29).
## Grid-Based Patterns
Grid-Based patterns are based on a variable sized window of data, dividing it up into a 2D grid. If there is a price point in a cell of the grid, it is marked, otherwise it is left blank. This functionality is provided via the **PriceGrid** class available in WealthLab.Core, and the Extension extends this core class.
## Components of the Extension
### Classic Chart Pattern Related

 - An [Event Provider](EventProvidersTab) that lets you select which Classic Chart Patterns to display on the chart.
 - A mechanism to define your own Classic Chart Patterns, by entering their rules in the **MyChartPatterns.txt** text file in the [WL8 Data Folder](action:DataFolder). See [this help entry](DefiningChartPatterns) for more details.
 - A **Chart Patterns Condition Building Block** that lets you test for Classic Chart Patterns in your [Building Block Strategies](BuildingBlock).
 - A new page in the [Preferences](Preferences) tool that lets you tune all of the [settings](ChartPatternsPreferences) involved in detecting Classic Chart Patterns.
### Grid-Based Chart Pattern Related
 - The [PriceGrid Editor](PriceGridEditor) tool that lets you create your own Grid-Based Patterns by selecting areas in the chart. Using this tool, you can maintain your own library of Grid-Based Chart Patterns.
 - A **PriceGrid Condition Building Block** that lets you test for Grid-Based Chart Patterns in your [Building Block Strategies](BuildingBlock).
 - The **PriceGridCF** [Indicator](Indicators), that lets you visualize how close the chart is to a specified Grid-Based Pattern on a bar-by-bar basis.
 - The [PriceGrid Genetic Evolver](PriceGridGeneticEvolver) tool that generated bullish or bearish Grid-Based Patterns from the source data that you select. You can add the generated Grid-Based Chart Patterns to your library and further manage them in the PriceGrid Editor.
 - Several new C# classes in the new **WealthLab.ChartPatterns** namespace, including **ChartPatternEngine**, and **ChartPatternRule**. These are documented in the [QuickRef](QuickRef).

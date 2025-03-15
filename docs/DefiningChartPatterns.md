# Defining Chart Patterns
The Chart Pattern Extension defines its patterns using simple text-based rules. There are two pattern files, one for the library patterns that come with the Extension, and one containing patterns that you can encode yourself.

 - Library Patterns - [WL8 Data Folder](action:DataFolder)\ChartPatterns.txt
 - Your Patterns - [WL8 Data Folder](action:DataFolder)\MyChartPatterns.txt

> Note: If you edit the MyChartPatterns.txt folder and encode your own patterns, restart WL8 to see your changes take effect.
## Chart Pattern Format
The pattern files can contain multiple chart patterns, each separated by a blank line. The first line of each pattern is the pattern's **name**. Each subsequent line contains a **Chart Pattern Rule**. A blank line denotes the end of the pattern.

## Chart Pattern Rules
A **Chart Pattern** is composed of one or more **Chart Pattern Rules**. Each Rule is expressed as a line of text in the pattern file. Each line consists of the **Rule Name** followed by one or more string token **Parameters**. Patterns are analyzed at a reference point which is a specific index in a BarHistory source data. This is called the **analysis point**.

Some Rules let you specify a **Peak** or **Trough** as a target. The format is Peak|Trough(N), where N represents which Peak/Trough. For example, Peak(0) will return the most recent Peak detected as of the analysis point, while Trough(1) will return the previous Trough.

Some Rules work off of **Trend Lines**. These lines are generated using the PeakTroughCalculator, using Peaks for Upper Trendlines and Troughs for Lower Trendlines.

The available Rules are detailed below. Chart Pattern Rules are discoverable, and it's possible to create extension libraries that inject new Rules. Contact us on [www.wealth-lab.com](https://www.wealth-lab.com) if you're interested in more details about this process.

 ### Peak/Trough Compare
 ```
 format:  PeakTroughCompare Peak|Trough(N) VeryNear|Near|Above|Below|NotFar|Far Peak|Trough(N)
 example: PeakTroughCompare Trough(0) Near Trough(1)
 ```

 ### Price Crosses a Peak/Trough Level
 ```
 format:  PriceCrosses Open|High|Low|Close Above|Below Peak|Trough(N)
 example: PriceCrosses Close Above Peak(0)
 ```
 ### Price Crosses a Line formed by two Peak/Troughs
 ```
 format:  PriceCrossesPeakTroughLine Open|High|Low|Close Above|Below Peak|Trough(N) Peak|Trough(N)
 example: PriceCrossesPeakTroughLine Close Below Trough(0) Trough(1)
 ```
 ### Price Crosses a Trend Line
 ```
 format:  PriceCrossesTrendLine Open|High|Low|Close Above|Below Upper|Lower
 example: PriceCrossesTrendline Close Above Upper
 ```
 ### Price Grid
```
format:  PriceGrid ConfidenceFactor PriceGridPersistString
example: PriceGrid 84 6,10,X,1,5,1,5,1,5,1,5,1,5,1,5,1,5,3,3,9,3
```
The Rule creates a PriceGrid with the same dimensions as the one specified in **PriceGridPersistString**, at the analysis point. It then compares the two PriceGrid instances, and resolves to true of the result is greater than or equal to the specified **ConfidenceFactor**.
 ### Trend
```
format:  Trend Up|Neutral|Down
example: Trend Up
```
 ### Chart Pattern Rule - Trend Line
```
format:  Trendline Lower|Upper Rising|Flat|Falling
example: Trendline Upper Falling
```
 ### Chart Pattern Rule - Trend at Peak/Trough
```
format:  TrendAtPeakTrough Peak|Trough(N) Up|Neutral|Down
example: TrendAtPeakTrough Trough(1) Down
```
 ### Chart Pattern Rule - Trend Line Converge
```
format:  TrendlineConvergence Converging|Diverging
example: TrendlineConvergence Converging
```
Tests if the most recent Upper and Lower Trend Lines are converging or diverging.

## Confirmation Token
You can add a **Confirmation** token to the end of the rule to indicate that the rule represents confirmation of a pattern. For example, the **Head and Shoulders Top** pattern has a confirmation rule for the closing price crossing below the neckline.

The Chart Pattern **Condition Building Block** allows you to select whether to detect **confirmed** or **unconfirmed** patterns. A pattern must have at least one if its "Confirmation" rules resolve to true to count as being **confirmed**.
```
Head and Shoulders Top
PeakTroughCompare Peak(0) Below Peak(1)
PeakTroughCompare Peak(1) Above Peak(2)
PeakTroughCompare Peak(0) Near Peak(2) NoDraw
PriceCrossesPeakTroughLine Close Below Trough(0) Trough(1) Confirmation
TrendAtPeakTrough Peak(1) Up
TrendAtPeakTrough Peak(2) Up
```

## NoDraw Token
You can add a NoDraw token to the end of a rule to indicate that WL8 should not render this rule when it renders a detected pattern on the chart.

## Passes Token
The Chart Pattern Extension runs each chart patternt through a number of **passes**, ranging from 1 to 5. Each pass analyzes a wider section of data, allowing patterns of varying scopes to be detected. You can add the **Passes** token at the end of a rule to limit the processing to specific passes. For example, the **Bullish and Bearish Flag** patterns limit the processing to passes 1 and 3 since they are typically small patterns:
```
Bullish Flag
PriceGrid 84 FlagsPennants 5,10,X,11,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4 Passes(1,3)
Trend Up
```
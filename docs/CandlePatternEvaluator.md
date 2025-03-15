# Candle Pattern Evaluator

This tool allows you to evaluate the performance of the Japanese Candlestick patterns in the **Pattern Library**. These patterns are displayed in the **Pattern Library** tab, and the Evaluator controls are located along the first toolbar at the top of the window. Press the green **Evaluate** button to perform the evaluation.
## What it Does
The Pattern Evaluator first loads historical data based on the **DataSet** and **Data Range** you selected in the top level toolbar. It then looks for Candlestick patterns in the historical data, and tracks the following information:

 - The percentage return after a certain number of trading days, based on the value you set for **N-Bar Return** in the toolbar.
 - Whether the candle immediately following the pattern is a **White Candle** (close greater than open).
 - Whether the candle immediately following the pattern is a **Black Candle** (close less than open).
## Results
After the evaluation, the list is updated to reflect the following:
 - The number of **Observations** (occurrences of the pattern in the historical data).
 - The **Average N-Bar Percentage Return** after the pattern occurred. You should compare this value to the **DataSet Average N-Bar Return** reported in the bottom status bar to see how well the pattern performed compared to the market.
 - The percentage of times the bar following a pattern was a **White Candle**, and a **Black Candle**. Note that the sum of these percentages might be less than 100% because of **Neutral Candles** (open and close nearly the same).
## Exploring the Results
 - Click on a pattern to see details of its composition along the right of the window.
 - Click the various column headers to sort the date.
 - Right click to copy the results to the clipboard.
 - Go to the **Chart** tab to view patterns on a chart.
 - Experiment with different **DataSets**, **N-Bar Returns**, and **Data Ranges**.


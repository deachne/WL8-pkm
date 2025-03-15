# Indicator Evaluator
The **Indicator Evaluator** provides a deep dive into the performance profile of any single [Indicator](Indicators). You choose the Indicator you want to analyze from the drop down list. You can also double click an indicator in the [Analyze all Indicators](AnalyzeAllIndicators) list. If you want to change the default parameters of the Indicator, press the gear icon button. The **Evaluator** analyzes data based on the [DataSet](DataSets), **Scale**, and **Analysis Range** configured in the top toolbar.

---
## Chart View
The chart contains five line-series, each one representing the **Average Percentage Return** after a certain number of bars, plotted against the Indicator value range. The number of bars used to determine Average Profit is determined by the **Analysis Range** that you selected in the toolbar. In this example we can see that the **RSI** Indicator exhibited a clear edge when its values were in the classic oversold territory (30-40).

![Wealth-Lab's Indicator Evaluator](https://www.wealth-lab.com/images/WLHelp/IndicatorEvaluator.png)

---
## Left Axis
You can change the left axis to display **Alpha** instead of **Average Return**.

---
## Bottom Axis
The bottom axis can display one of the following:

 - The Indicator's **value** range.
 - The percentage the Indicator was above or below its **Signal Line**. The Signal Line is constructed based on the [Analyze all Indicators](AnalyzeAllIndicators) **Signal Line** toolbar field.
 - The number of **consecutive bars** that the Indicator moved down or up.
 - The Indicator's **period**. When you select this option, the Evaluator creates 5 different versions of the Indicator with **different periods**, based on the **Evaluator Range** that you selected in the toolbar.

---
## Tabular View
The tabular view displays details of each of the analysis result points. Each row contains the range of values, the number of **Observations** (occurrences), the **Average Profit %**, and **Alpha** for that range. The green and red bars in the tabular view let you easily visualize which range of values performed better or worse than the overall market. Use the **Select Run** dropdown to select which of the five analysis runs to examine.

---
## Filtering Tails
If you enable the **Filter Tails** check box, the table will repopulate, leaving out the beginning and ending rows where the number of Observations was less than the value you specified next to the check box. Additionally, the graph will regenerate, and any lines that are the result of a number of Observations less than this threshold will be rendered in a fainter color.

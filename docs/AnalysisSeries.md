# Analysis Series

This Visualizer lets you see the effects of filtering the trades by a specific Indicator value. Select the Indicator from the **Indicators drop down**. Any installed Indicator is available for selection. You can configure the Indicator Parameters by clicking the gear icon next to the Indicators drop down. If your Strategy plotted any specific Indicators or TimeSeries, these will be available for selection at the top of the Indicators drop down list.

## Position Metric by Indicator Value
The top graph shows a specific Position metric (default is % Profit) by the Indicator value as of the point in time when the entry signal was triggered. A number of different metrics are available for plotting in the **Metric drop down**. The graph also shows the linear regression, letting you see if there is any clear trend around an indicator's value and the metric value.

## Average Trade Metric by Indicator Filter
The bottom graph shows the average metric value per Position for all of the trades that occured when the Indicator value was less than or greater than a specific value. This can help clarify a relationship between a metric such as Position Profit % and an Indicator. For example, you might see a much larger average Profit % when an RSI oscillator is in the lower range bins, showing you that it pays to filter your Strategy and only take entries when the RSI is in an oversold range.

[![New Performance Visualizers in Power Pack](http://img.youtube.com/vi/7QSAyNUTe_E/0.jpg)](https://www.youtube.com/watch?v=7QSAyNUTe_E&t=144s "New Performance Visualizers in Power Pack")


# Indicator Profile Results
When conducting this analysis, first select the desired [DataSet](DataSets), **Scale**, and **Analysis Range** from the top level toolbar. Then press the green **Run** button to perform a ranking on all the [Indicators](Indicators) that are checked. After the analysis, refer to the **Calc Time** column to identify Indicators that took a prohibitively long time to calculate. You can disable these for future runs by unchecking them.

## Controlling Indicator Period
You cannot explicitly set the parameters of each of the Indicators in the list. But you can set an overall value for each Indicator's **Period parameter** by changing the value in the **Period** field in the toolbar.

## Analysis Results
The analysis is based off the **N-Bar Average Return** of the selected [DataSet](DataSets). You specify the number of bars in the **N-Bar Return** field. The first column in the result grid shows the **Average N-Bar Return** of the entire [DataSet](DataSets).

The remaining columns show the **Average N-Bar Return** for the cases where the Indicator was in one of several **signal states**. It also shows the **Alpha**, which is the **signal state Average N-Bar Return** minus the **Average N-Bar Return** of the overall market. **Alpha** represents how much of an edge the Indicator had when it was in the **signal state**.

**Signal States**

The analysis looks at six different signal states (refer to image below):

 1. **Oversold** - results will appear for Indicators that are **oscillators** (such as **CMO** or **RSI**). The signal state occurs when the Indicator value is at or below its standard **oversold level**.
 2. **Overbought** - occurs when the **oscillator** Indicator value is at or above its standard **overbought value**.
 3. **Below Signal Line** - occurs when the Indicator is below a signal line, which is a smoothed version of the Indicator itself, created based on the **Signal Line** field in the toolbar. Typical smoothers such as **SMA** or **EMA** can be selected for Signal Line.
 4. **Above Signal Line** - occurs when the Indicator is above its **signal line**.
 5. **Consec Down** - occurs when the Indicator has made a certain number of consecutive bars moving lower. The number of consecutive bars is controlled by the **Consec Up/Down Bars** field in the toolbar.
 6. **Consec Up** - occurs when the Indicator has made a certain number of consecutive bars moving higher.

> **Signal Line Notes**
> * Set the Signal Line smoothing period or other parameters in the settings dialog by clicking gear icon. 
> * Ignore the 'source' series.  The source is always the indicator being profiled.

![Signal States Demonstrated](https://www.wealth-lab.com/images/WLHelp/SignalStates.png)

## Exploring the Results
Click on any of the column headers to sort.  Double-click a row to open that Indicator in the [Indicator Evaluator](IndicatorEvaluator) page.

## Activating and Deactivating Indicators
Each Indicator can be **activated** or **deactivated** via its check box. Deactivated Indicators do not participate in the analysis, and afterward their results will be empty. You can use the right click options to bulk activate or deactivate all, or a group of, Indicators.

Before activating and deactivating Indicators, you might want to remember the current setup. To do so, use the right click option to save the current state as a **baseline**. After any activation changes, you can always go back to your **baseline** via the right click menu.

Wealth-Lab flags certain indicators internally as not being useful to run in the Profiler. For example, the **Fundamental** indicator, and fundamental based Indicators like USTYield. If you want to restore the activation state to WL8's recommended setup, use the corresponding right click menu.

## Result Dimming
After an analysis, you'll see the list populated with cells of values, showing you how each Indicator performed under different conditions. For example, two of the cells show you how the Indicator performed when it was in an oversold state (meaning its value was below its oversold level.) If the number of times this occurred (called Observations) is below a certain threshold, the Profiler will render that cell at one half opacity. You control the Observation threshold for this dimming via the **Dim Results** field in the toolbar.

# Deep Learning Evaluation

Use this page to evaluate a Model on the data loaded in the **Evaluation Data** area in the toolbar. The evaluation results are divided into two areas, in-sample and out-of-sample. After [Training](DL.Training) a Model, the Evaluation view automatically loads the training data and provides in-sample and out-of-sample results. Afterwards, if you load new data into Evaluation Data, only out-of-sample results will be available.

The first column of data is the **Predicted Output** range, expressed as a range of values Min-Max. The minimum value is inclusive, and the maximum is exclusive. Next, we have three columns each for in-sample and out-of-sample results.

 1. **Count** - The number of data points where the Model's predicted value was within that row's Predicted Output range.
 2. **Actual Avg** - The average actual Output value for the data points in the predicted range.
 3. **Visual Gauge** - Displays a graphical representation of how this **range's actual output** compares to the **predicted output**.

*Note: If the output layer contains more than one Output, you select which one to analyze in the Evaluation tab's toolbar.*

## How to Interpret the Results

Let's assume we have one Output ROC(5), with a 5 bar Look Ahead. Consequently, the Model is aiming to predict percentage profit five bars (trading days, for daily data) into the future. Since the predicted output is percentage return, the further down we go in the results view, the higher the predicted profit in the Predicted Output range. 

For the rows near the top of the result view, where predicted profit will be lower and possibly even negative, we would like to see red bars, which would be a clear visual indication that the actual results are lining up with the predicted ranges. The further down we go, we'd like to see the width of the red bars decrease, until we get into the lower half of the result list. There, our predicted profit range will be increasing, so we would like to see green bars appearing with greater widths as we progress down the list.

We would expect this result in the **in-sample** columns, since this is the data that was used to train the Model. If we see a similar pattern in the **out-of-sample** columns, we can be more confident that the Model has some predictive value and is not simply overfitted to the training data.

![enter image description here](https://www.wealth-lab.com/images/extensions/DeepLearning/DLEval.png)


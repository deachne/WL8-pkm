# Deep Learning Architecture
When you create a new Model, you're presented with a dialog where you enter the Model's name and select which **Learning Engine** will power it. The Architecture page is where you establish the **Input(s)**, **Output(s)**, and **Hidden Layer(s)** contained in the Model.
## Inputs
The **Inputs** list contains [Indicators](Indicators) that represent Inputs to the Model. You can drag and drop Indicators from the WL8 Indicators list to define Inputs or use the "Add Input" button. Double-click an Input or use the right click context menu to configure an Input.

Each Indicator in the Inputs list produces one or more Inputs to the Model, depending on the value of **Depth**. At Depth 1, an Input is created that corresponds to the current bar of Indicator data. For every Depth above 1, an Input is created that many bars in the past. For example, if the Input is RSI(14), and the Depth is 3, then 3 Inputs will be produced. The first Input is RSI(14) at the current bar, the second Input is RSI(14) one bar ago, and the third is RSI(14) two bars ago.

**DepthIncrement**, which defaults to 1, determines how many bars to go back for each Depth beyond 1.

By using Depth, you can train a Model on patterns that Indicators make over time, instead of a snapshot of the Indicator at a single moment in time.

## Outputs
The **Outputs** list, like Inputs, contains Indicators that can be dropped in or added using the "Add Output" button. These define the values that the Model will be trained to predict and typically will point to data in the future.

**Look Ahead** determines how many bars in the future the Output is based on. You can use an Indicator like ROC (Rate of Change) to predict future profitability. For example, an Output of ROC(5) with a Look Ahead of 5 will result in an Output trained to predict the percentage change 5 bars in the future.


## Statistics and Locked Status

The Input and Output lists contain statistical information for the underlying Indicator, compiled based on the data you've loaded in the [Training](DL.Training) page. The statistics display the **Minimum**, **Maximum**, **Mean**, and **Standard Deviation** of the data. You can use these values as a quick sanity check to ensure that the Input/Output is loaded with the data you expect.

If the Model is locked, Inputs and Outputs cannot be changed in any way. To make changes, you'll first need to **Unlock** the Model.

## Hidden Layers
**Hidden Layers** are layers of processing that occur between the Input and Output layers of a Model. Some Learning Engines employ Hidden Layers, but some do not. If the Model's Learning Engine supports Hidden Layers, you'll be able to configure them in this section.

You can add and delete Hidden layers using the corresponding buttons. Each Hidden Layer has configurable parameters that vary based on the Learning Engine that the Model is using.

The built-in Learning Engines Encog and TorchSharp utilize Hidden Layers, while the TorchSharp LSTM Learning Engine does not since it has hidden layers pre-built. 

The Encog and TorshSharp hidden Layers expose a single parameter that lets you control how many **Nodes** the Hidden Layer should contain. Neural Networks establish connections between each Input and each Hidden Layer Node, and ultimately between each Node of the final Hidden Layer and each Output.

![Deep Learning](https://www.wealth-lab.com/images/extensions/DeepLearning/DL.png)
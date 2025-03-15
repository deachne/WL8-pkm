
# Deep Learning Extension

 - [take me there now](extension:DeepLearning)
 - [watch the demo video](https://youtu.be/MAUcOcEsKEU)

The WealthLab **Deep Learning Extension** allows you to easily build and train complex machine learning **Models** without using code. These Models are composed of a series of **Inputs**, an associated **Learning Engine**, and one or more **Outputs** that the Model is intended to predict.

The Model **Inputs** are expressed as WealthLab [Indicators](Indicators). In the Model [Architecture](DL.Architecture) page, you can drag and drop Indicators from the WealthLab Indicator List to add them to your Models.

Each Model is associated with one of several **Learning Engines** that Deep Learning supports. The Learning Engine aspect of Deep Learning is itself extendable, and WealthLab, or even third parties, can build and release new Learning Engines that support the Learning Engine API. The following Learning Engines come pre-installed:

 - [Encog Neural Network](https://www.heatonresearch.com/encog/) - A pure C# neural network framework created by Heaton Research, Inc. in 2008.
 - [TorchSharp Neural Network](https://github.com/dotnet/TorchSharp) - A backpropagation neural network using the TorchSharp library, which is a wrapper for the native libraries used in Python's popular "pytorch" package.
 - TorchSharp LSTM - A LSTM (Long Short-Term Memory) implementation in TorchSharp.

The Model **Outputs** are, like the Inputs, expressed as WealthLab Indicators. You'll typically introduce a "look ahead" in the Outputs when you configure them. This causes the Model to train on future Output data, training the Model on how the current Inputs relate to the future Outputs.

## Locked Models
**Locked** Models are indicated with a lock icon next to their name in the Models list. These Models have already completed training, and their internal state has been saved. Locked (trained) Models can be used for prediction and cannot be modified. If you want to edit a locked Model, you must first unlock it, however this causes the previously saved internal state information to be lost.

## Deep Learning Workflow
Open Deep Learning from the WealthLab Extensions menu. The resulting window contains tabs that correspond to each step in the development workflow.

 - [Architecture](DL.Architecture) - Define the Inputs, Hidden Layers, and Output.
 - [Parameters](DL.Parameters) - Adjust the parameters to use in the Model's Learning Engine.
 - [Training](DL.Training) - Train the Model using in-sample training data.
 - [Evaluation](DL.Evaluation) - Evaluate the performance of a trained Model on out-of-sample data.
 - [Chart](DL.Chart) - Observe the DLPredictor Indicator applied to a chart.

## DLPredictor Indicator
The end result of this process is the [DLPredictor](D_L_Predictor) Indicator. Just like any other Indicator in WealthLab, it can be dropped onto a chart or used in [Building Block Strategies](BuildingBlock). The values returned by the DLPredictor are the predicted values of the specified Output. For example, if you trained your Model with an output of ROC (Rate of Change) over 4 bars, with a lookahead of 4 bars, the DLPredictor returns its predicted 4-bar percentage gain.

## Learning Engine API
Deep Learning can be extended with new Learning Engines. See our [Learning Engine Extension API](https://www.wealth-lab.com/extension/detail/DeepLearning) reference for details on how to build a new Learning Engine for Deep Learning.

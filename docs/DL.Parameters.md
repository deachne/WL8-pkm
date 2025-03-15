# Deep Learning Parameters

Each **Learning Engine** has a set of parameters that can be configured at a Model-by-Model basis on this page. These parameters cover things like the learning rate and momentum of the underlying neural network, as well as the activation function and optimizer used.

### Encog 
([Encog reference](https://www.heatonresearch.com/encog/))

Encog is a pure C# neural network framework created by Heaton Research, Inc. in 2008.

- **Activation Function** - Determines which mathematical function to apply to the Inputs during training.
 - **Learning Rate** - Controls how much the network updates its internal weights during each training iteration. In practice, a default value of 0.0001 or less works well. The default value Encog provides is 0.0001244245365.
 - **Momentum** - Accelerates learning by smoothing weight updates, preventing oscillations, and improving convergence speed by incorporating a fraction of the previous weight update into the current update. Encog's default is 0.9.
 - **Use Resilient Propagation** - When enabled, uses Encog's Resilient Propagation Training (RPROP) instead of its standard Backpropagation Training. Learning Rate and Momentum are not used with this setting, as these values are determined during the training process.
 - **Use Smart Learning Rate Strategy** - Dynamically adjusts the Learning Rate during training based on network performance, increasing it when progress is steady and decreasing it when oscillations or divergence are detected, helping to optimize convergence speed and stability.
 - **Use Smart Momentum Strategy** - Similar to the Smart Learning Rate Strategy but applies to Momentum.
 - **Batch Size** - Controls how many data points are batched and trained during each Epoch. For example, with an in-sample training data set of 10,000 data points, and a Batch Size of 1,024, each Epoch would wind up training 10 batches of data.

### TorchSharp 

[TorchSharp reference](https://github.com/dotnet/TorchSharp)

TorchSharp is a .NET wrapper around the C++ libtorch library which is a high-performance, flexible framework for deep learning and tensor computations. TorchSharp's interface is designed to mimic that of PyTorch, a popular python-based open-source deep learning framework for building and training neural networks.

Many of the TorchSharp parameters are specific to the selected training optimizer. Hover over the labels to see which training optimizer(s) each parameter applies to.

- **Activation Function** - Determines which mathematical function to apply to the Inputs during training.
- **Optimizer** - Determines which training optimizer to use.
- **Learning Rate** - The only parameter used by all TorchSharp optimizers. Controls how much the network updates its internal weights during each training iteration.
- - **Batch Size** - Controls how many data points are batched and trained during each Epoch. For example, with an in-sample training data set of 100,000 data points, and a Batch Size of 16,384, each Epoch would wind up training 7 batches of data.

The remaining parameters are each specific to one or more TorchSharp optimizers. Please consult the [TorchSharp reference](https://github.com/dotnet/TorchSharp) or the [PyTorch reference](https://pytorch.org/) for details on how each parameter can affect the training process.

### TorchSharp LSTM

[LSTM reference](https://pytorch.org/docs/stable/generated/torch.nn.LSTM.html)

The TorchSharp LSTM (Long Short-Term Memory) Learning Engine uses the same parameters as the TorchSharp engine with a few changes. The Activation Function parameter is removed since the LSTM Model creates its own internal structure with activation functions. Also, the LTSM Engine does not support customizable Hidden Layers. Instead, it exposes two new parameters, **Hidden Layers** and **Hidden Layer Size** that let you configure the hidden layers of the Model. 

LSTM Models create sequences of historical data for each Input, so using the Depth parameter in your Inputs is not recommended. Instead, the **Sequence Count** parameter controls how much history to use for each Input.

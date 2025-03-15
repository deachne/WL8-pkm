# Deep Learning Training
## Preparing to Train

The first step of training a Model is loading the training data, which can be a single symbol or a DataSet. Once the data is loaded, decide how much of the data to use for in-sample training, and how much to use for out-of-sample evaluation, using the numeric input control in the toolbar. Note that you can only train Models that are not locked. Unlock a Model to re-train it.

## Conducting the Training
Click the **Start** button to begin the training process. You can pause it at any time using the **Stop** button. You can then **Resume** the training, or start over completely by Unlocking the Model and pressing **Start** again. 

Each training pass is called an **Epoch**. In each Epoch, Deep Learning processes the Model Inputs in-sample data and uses its internal weights to predict the Output values. It returns a **loss** value that indicates how well the predicted Outputs correspond to the actual. Next, the Model makes a prediction based on the out-of-sample data and returns an out-of-sample **loss** value.

As training continues, Deep Learning updates two sets of **graphs**, one showing the training **loss** for the in-sample data and another for the out-of-sample. Each set is composed to two graphs. One is updated each Epoch, and a second is updated at 100 Epoch intervals.

Once the graphs become populated with a large quantity of data they can start to degrade the overall performance of the user interface. You can **Prune** the graphs, which removes the first 100 data points, or **Clear** them altogether. You can also configure the graphs to **Auto-Prune**, which is recommended when you plan to run lengthy unsupervised training sessions.

## Auto-Save
Enable the **Auto-Save** feature to save automatically save the Model every 100 Epochs, provided the out-of-sample loss has achieved a new low at that point. If you have Auto-Save enabled, when training has ended, Deep Learning will reload the most recent save point. This provides you a version of the Model that performed best in out-of-sample data, helping to avoid overtraining.

## Ending the Training
The training will continue indefinitely until you click the **Stop** button. Alternatively, enable the **Auto-Stop** option, which will automatically stop training if a configurable number of Epochs have elapsed without an improvement in out-of-sample performance.

![Deep Learning](https://www.wealth-lab.com/images/extensions/DeepLearning/DLTrain.png)
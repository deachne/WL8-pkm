# FOMC (Fed) indicator

Prior to build 23 of DataExtensions (WL7), FomcIndicator was used to obtain FOMC (Fed) meetings as indicator data from FOMC or FRED websites. 

From this build on you can accomplish the same goal by using the built-in **Fundamental** indicator. From the Indicators tab, drag and drop the *Fundamental* indicator onto a chart, choose  **"FOMC"** as Item, uncheck *Carry forward*.

Similarly, the *Fundamental* indicator is usable in Strategy code or a strategy from Building Blocks. The data will be obtained and updated dynamically behind the scenes.

### Data sources

* FOMC website (since 2013)
* FRED website (since the 1930s)
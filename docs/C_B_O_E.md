# CBOE

This is a historical data provider for daily data by [Chicago Board Options Exchange (CBOE)](http://www.cboe.com/). The data includes Put/Call Ratio, certain Volatility Indices.

## Available symbols

When you start WL8 having installed the DataExtensions library, two DataSets with prefilled symbols will be available in the DataSets tree:

### Put/Call Ratios

* CBOE Total Put/Call Ratio and Exchange Volume (1995 to present) - **TOTALPC**
* CBOE Index Put/Call Ratio and Volume (2003 to present) - **INDEXPC**
* CBOE Equity Put/Call Ratio and Volume (2003 to present) - **EQUITYPC**
* CBOE S&P 500 Index (SPX) Put/Call Ratio (2010 to present) - **SPXPC**
* CBOE Volatility Index (VIX) Put/Call Ratios (2006 to present) - **VIXPC**
* CBOE OEX Put/Call Ratio (2019 to present) - **OEXPC**
* CBOE Exchange traded products Put/Call Ratio (2019 to present) - **ETPPC**

### CBOE volatility indices

* CBOE S&P 500 1-Day Volatility Index - **VIX1D**
* CBOE S&P 500 9-Day Volatility Index - **VIX9D**
* CBOE S&P 500 3-Month Volatility Index - **VIX3M**
* CBOE S&P 500 6-Month Volatility Index - **VIX6M**
* CBOE Volatility Index - **VIX**
* CBOE Nasdaq-100 Volatility Index - **VXN**
* CBOE DJIA Volatility Index - **VXD**
* CBOE Expected Volatility of VIX - **VVIX**

### VIX Premium Strategy and other indices

* CBOE VIX Premium Strategy Index - **VPD**
* CBOE Capped VIX Premium Strategy Index - **VPN**
* CBOE S&P 500 Risk Reversal Index - **RXM**

## Indicator

The data for Put/Call ratios can also be plotted without creating a DataSet. From the Indicators tab, drag and drop the **PutCallRatio* indicator onto a chart - or use it in Strategy code or a strategy from Building Blocks. The data will be obtained and updated dynamically behind the scenes.

### Limitations

* Note that the symbol names are fixed and can not be changed. The DataSet composition can't be changed after creating. Individual symbols cannot be deleted.
* The Put/Call Ratios only contain the closing price but volume is not supported.

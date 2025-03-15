# InsiderCow insider transactions

This is a an event provider for the free **insider transactions** data for U.S. stocks by [InsiderCow](https://www.insidercow.com).

The provider only considers meaningful transactions. Gifts, grants, are automatically filtered out. Each insider transaction record comes with extra details attached: *actual trade date, filed date, insider name/firm, relationship (i.e. job title), total proceeds*. 

They are available in a popup when mousing over an Insider Transaction item on a stock chart and in code-based Strategies via *Detail* method of an *EventDataPoint* object. Available field names for the extra details are: 
- 	**Insider**
- 	**Relationship**
- 	**Proceeds**
- 	**TradeDate**

### Reported vs. actual dates

Unlike the many sources of insider transaction information out there, this provider is using "filed dates" i.e. the actual date of reporting the transaction by the insider. According to a regulation, insiders have two business days to report their trades. However, to use the widely available elsewhere "trade date" in backtesting you'd have to look over the insider's shoulder when she closes the deal. Obviously, this is virtually impossible to know before they actually file their trades with the SEC. Consequently, accurate backtesting of insider transactions implies that you rely on filed dates.

### Example

Please use the built-in "Insider Buying and Selling" strategy (Fundamental folder) as an example.
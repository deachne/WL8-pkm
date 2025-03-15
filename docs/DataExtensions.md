# DataExtensions

The Data Extensions aims to fulfil the task of powering Wealth-Lab with all the data you ever needed. It''s comprised of several instruments to cover your requirements in various data types:

**Historical** data providers

- [**CBOE**](CBOE) - Put/Call Ratio, volatility indices (U.S.)
- [**FinancialModelingPrep**](FinancialModelingPrep) - intraday and daily stock data for U.S. exchanges and more by [FinancialModelingPrep]((https://financialmodelingprep.com/developer/docs/)) (free and subscription-based)
- [**Nasdaq**](Nasdaq) - free daily data for U.S. stocks
- [**QuoteMedia**](QuoteMedia) - daily data for U.S. and overseas stocks, indexes, funds, futures, options, Forex and cryptocurrencies
- [**Stooq**](Stooq) - free daily data for world stocks, futures, and indices
- [**Tiingo**](Tiingo) - intraday and daily data for U.S. and Chinese stocks, mutual funds and ETFs (free and subscription-based)
- [**Random**](Random) data provides you with a unique opportunity for blind testing your strategy on a truly random data

**Real-time** streaming data

- [**Nasdaq**](Nasdaq) - free delayed streaming data for U.S. stocks
- [**QuoteMedia**](QuoteMedia) - free delayed streaming data for U.S. stocks
- [**Tiingo**](Tiingo) - provides free real-time data for U.S. stocks by IEX

**Fundamentals and news** (Events)

- [**FOMC** (Fed) meetings](FomcEventProvider) - free calendar of all Fed meetings since the 1930s
- [**QuoteMedia**](QuoteMedia) - free split and dividend data for U.S. stocks
- [**Nasdaq**](Nasdaq) - free dividend and short interest data for U.S. stocks
- [**Quandl**](Quandl) free split and dividend data for U.S. stocks
- [**Tiingo**](Tiingo) - history of company splits and dividends

**Market sentiment**, economic and other **non-price** data

Indicators can be easily dragged and dropped onto a chart (or referred to in a strategy). They download historical data by itself and get updated automatically:

- [**Market Sentiment**](MarketSentimentIndicator) indicators by Wealth-Data for advancing, declining and unchanged items from NYSE, NASDAQ and AMEX and the new highs/lows
- Thousands of **economic** time series by the [**Federal Reserve (FRED)**](FredIndicator)
- **Economic** monthly time series for S&P 500, U.S. economy along with U.S. Treasury and real interest rates by [**Multpl**](MultplIndicator)
- Visualize countless core financial and alternative data sets from [**Quandl**](QuandlIndicator)
- Historical **Put/Call** ratios by [**CBOE**](CBOE)
- Historical [**FOMC** (Fed) meetings](FomcEventProvider) to backtest Fed rate decisions

Dynamic **symbol universes**

- Automatically updated [DataSets](IPODataSets) of recent and historical **IPOs**(IPODataSets), most recent stocks with **high short interest**, stocks with **splits, dividends and earnings** for today, and stocks **gapping up an down** in premarket trading
- Historical **Put/Call ratios and Volatility** (VIX) indices by [CBOE](CBOE)

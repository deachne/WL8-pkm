# YCharts

This is a an event provider for the fundamental data for U.S. stocks by [YCharts](https://www.ycharts.com).

The full set of data is available to YCharts paid subscribers only. Some fundamental items are downloadable for free and limited to the last 2-3 years even if you don't have a subscription.

## Setting up

If you're a paid subscriber, you must paste your API key (obtain it on their website's user profile section) in the Data Manager's *Event providers* tab > YCharts.

Be patient while the provider is downloading the data. Although data downloads are multi-threaded, it could be a lengthy process for large portfolios. Since new fundamental data items become available every 3 months, it's recommended that you uncheck the provider's entry in the Data Manager for daily updates! Failure doing so will result in running out of the monthly quota pretty quickly. Alternatively, switch to the limited free download mode.

## Fundamental data

YCharts makes available up to 30 years worth of quarterly fundamental items for the U.S. securities. The complete list of the available fundamental items is included:

* **Free**: *Accounts Payable, Accounts Receivable, Assets, Cash Financing, Cash Investing, Cash On Hand, Cash Operations, Debt Equity Ratio, Dividend, <del>Dividend Yield, Earning Yield</del>, Enterprise Value, EPS, Free Cash Flow, Gross Profit, Gross Profit Margin, Liabilities, <del>Market Cap</del>, Net Income, <del>P/E Ratio, PEG Ratio, Price To Book Value</del>, Profit Margin, R&D Expense, Revenues, SGA Expense, Shareholders Equity, Shares Outstanding*
* **Pro** (paid subscribers only): all of the "free" items listed above + *Accruals, Asset Utilization, Book Value Of Equity, Book Value Of Tangible Equity, Book Value Per Share, Capex, Capex Annual, Cash And Equivalents, Cash Conversion Cycle, Cash Dividend Payout Ratio, Current Ratio, Days Inventory Outstanding, Days Payables Outstanding, Days Sales Outstanding, Depreciation Amortization Depletion, EBITDA, EBITDA Margin, Effective Tax Rate, EPS Growth, Estimated EPS / Estimated EBIDTA / Estimated Revenue (these 3 items are available for current quarter and 1/2/3 quarters forward), Expenses, <del>Free Cash Flow Yield</del>, Free Cash Flow Per Share, FFO Per Share, Gain and Loss on Sale of PPE, Gain and Loss on Investment Securities, Gross Profit Annual, Income Before Ex Items And Disc Ops, Interest Expense, Interest Income, Inventories Net, Long Term Debt, Long Term Investments, Net PPE, Net Total Long Term Debt, <del>Operating Earning Yield</del>, Operating Margin, <del>Operating P/E Ratio</del>, Other Comp Income, Payout Ratio, Quick Ratio, Receivables Turnover, Retained Earnings, Retained Earnings Growth, Return On Assets, Return On Equity, Return On Invested Capital, Revenue Growth, Revenue Per Share, Stock Buyback, Tangible Book Value Per Share, Tangible Common Equity Ratio, Times Interest Earned, Total Changes In Assets Liabilities, Total Depreciation And Amortization, Total Long Term Assets*

Items in <del>strikethrough</del> have been excluded due to a big consumption of the download quota. They can be easily reconstructed in Strategy code. In pseudo-code:

- *Price-To-Book Ratio* = Close / "book_value_of_equity"
- *P/E Ratio* = Close / "eps"
- *Earnings Yield* = FundamentalDataSeriesAnnual("eps") / Close
- *Market Capitalization* = Close * "shares_outstanding"
- *Dividend Yield* = FundamentalDataSeriesAnnual("dividend") / Close
- *Free Cash Flow Yield* = "free_cash_flow_per_share" / Close
- *P/EG Ratio* = (Close / "eps") / "eps_growth"

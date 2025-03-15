# Interactive Brokers
This extension provides the ability to request/receive data from your Interactive Brokers account subscriptions and manually or automatically trade contracts using WealthLab. 

**An IBKR PRO account is required**  
- IBKR LITE Accounts **cannot** access the API. 

**Min. Version Required:**  
- IB Provider is compatible with TWS 10.23 and higher.
- To avoid launching the wrong version of TWS, we recommend that you **uninstall previous versions**. 
- IB's **TWS API** software installation is not required. This extension installs the necessary components.
---
## Broker Connection
It's required that you are logged in and running IB TWS or the IB Gateway to connect with IB. To make the connection you must perform this one-time setup:

### Step 1
When logging in and before entering you credentials, select More Options > at bottom of the login dialog.  
Specify a Time Zone that matches your Windows time zone.  
Continue to log in to TWS and enable the following settings in the **TWS Configuration > API > Settings**:   

- [x] **Enable ActiveX and Socket Clients** - checked
- **Socket Port** - default is **7496**.  You only need to change this number for additional instances of TWS.  WealthLab will connect to only one instance at a time. 
- [ ] **Use Account Groups with Allocation Methods** - unchecked (if you have multiple linked accounts).
- [x] **Send market data in lots for US stocks for dual-mode API clients** - checked (correct historical volume for stocks).
- [ ] **Allow conections from localhost only** - to connect to TWS running on a different virtual machine or network uncheck this and enter the Trusted IP.  For example, if you're using the Mac version of TWS, open your Mac's Network app and enter the IP for the wireless/cabled connection here, e.g., 192.168.1.10. 
- Send instrument-specific attributes for dual-mode API client in **UTC format**. 

Optional setting in **TWS Configuration > API > Precautions** 
- [x] **Bypass Order Precautions for API Orders** - check this option if you don't want orders from WealthLab to be delayed or canceled due to exceeding a size limit or another precaution. 

### Step 2
Configure the WealthLab connection settings for IB in the **Data Manager > Historical (or Streaming) Provider tab** or use the **Order Manager > Interactive Brokers > Configure**.  Specify the following: 

- **Host IP Address** - default: 127.0.0.1.  Alternatively, enter the IP address you configured in TWS if not the localhost.
- **Port** - default: 7496.  Use the Socket Port configured in TWS.
- **Client ID** - default: 1.  No need to change this unless you have multiple data clients that are connecting to the same instance of TWS.  Enter 0 (zero) if you wish to retrieve manual orders from TWS upon connection. 
- **Delayed Data** - check this only if you're evaluating TWS with delayed data. 
- **Auto Launch IB TWS** - check to allow WealthLab to automatically launch IB TWS on the same machine when 1) IB TWS or Gateway is not detected to be running locally and IB connection is required for data or trading.
- **Option Chart WhatToRequest** - *Trades* provides a chart based on option trading, whereas *MidPoint* provides a chart of the  Bid/Ask MidPoint throughout the day. Because option trading most often is illiquid, when developing strategies that do not rely on contract trade volume, *MidPoint* is recommended. It's not currently possible to see both Trades and MidPoint, so you must decide which data you wish to retain. With the *Trades* selection, Streaming charts will update with both Trades (with volume) and *Mark price* (no volume). The Mark price is the current theoretical calculated value of an instrument and typically has many digits of precision.

- **Final Order Delay** - orders placed immediately upon or after the market close will be rejected. **Final Order Delay** is an instruction for WealthLab's Order Manager to hold orders that occur at the session close and place them after a specified number of minutes. For example, placing orders 10 minutes after the market close will be accepted and activated by the broker for the next session. 

> **Note!**  
> Disable Pre/Post Trading in [Trading Preferences](TradingPreferences) when placing orders for the next session with **Final Order Delay**. 

- **TWS/IBG not local** - Check this option if you run TWS/IB Gateway on a machine different than the one where WealthLab runs. You must restart WealthLab after a TWS/IBG restart to reconnect.

- **Adaptive Algo** - Select a *priority* other than *None* to use the Adaptive Algo for market and limit orders. Adaptive Algo is not compatible with OCO orders and therefore will not be applied to limit orders that are part of a bracketed stop/limit exit.

 > Per Interactive Brokers documentation, the **Adaptive Algo** combines IB's Smartrouting capabilities with user-defined priority settings in an effort to achieve further cost efficiency at the point of execution. Using the Adaptive algo leads to better execution prices on average than for regular limit or market orders. The Priority selector determines the time taken to scan for better execution prices. *Urgent* scans only briefly while *Patient* works more slowly and has a higher chance of achieving a better overall fill for your order. 

 **Note!**  
 *Normal* and *Patient* selections can result in large delays to fill market orders, which could interfere with Auto-trading. Consider enabling *Use Live Positions* in [Trading Preferences](TradingPreferences).

### Establish Connection
Explicitly connect by selecting Interactive Brokers as the broker in the Order Manager and click **Connect**.  Otherwise, WealthLab automatically opens a connection with IB TWS: 
a. upon requesting data from IB, or, 
b. when performing % of equity sizing for a Strategy's Signals when: 
    - the Trading Preference to Use Broker-reported Account Value is enabled, and, 
    - IB was the last-selected broker in the Order Manager.

If TWS (or IB Gateway) isn't running, WealthLab will automatically launch the IB TWS Login screen (Windows O.S. only).  You can disable this behavior in the IB Configuration by unchecking **Auto Launch IB TWS**. 

#### Active Orders
When connecting, WealthLab  will *request* all active orders, which per IB's API can occur only once per API session. You must restart WealthLab to establish a new API session to repeat the request for open orders. See **Client IB** above for important information. 


---  
## Identifying Instruments/Contracts
Just as you are required to identify contracts to trade in TWS, a symbol in WealthLab must map uniquely to a contract at Interactive Brokers. If required, identify contracts in non-U.S. markets by manually editing the **IBContracts.txt** file in the User Data folder. Restart WealthLab after making changes to IBContracts.txt. 

%{color:blue}**Note!**% 
> If you damage IBContracts.txt, close WealthLab and restore it from a backup or simply delete the file and it will be regenerated from the installation. 

If a symbol is not found in IBContracts.txt and doesn't map to an IB futures or option format (see below), the contract will default to a "USD" "STK" instrument on "SMART". The exception is when you use a 1 or 2-character symbol "dot suffix" that identifies a non-U.S. stock market. These correspond to the symbols that can be found in Yahoo! and Norgate DataSets.

| Suffix | Country/City|Market | Currency | Examples (not recommendations) |
|---------|-----------|------|------------------------------|
|.AX|AUS/NZ|ASX|AUD|FEX.AX|
|.au|AUS/NZ|ASX|AUD|FEX.au (Norgate Data)|
|.VI|VIENNA|VSE|EUR|ANDR.VI|
|.PA|PARIS|SBF|EUR|AIR.PA|
|.L|LONDON|SE|GBP|ABF.L|
|.BR|BELGIUM|ENEXT.BE|EUR|ABI.BR|
|.AS|NETHERLANDS|AEB|EUR|ABN.AS|
|.TO|CANADA|TSE|CAD|ABX.TO|
|.DE|GERMANY|IBIS|EUR|BMW.DE|
|.FB|GERMANY|FWB|EUR|HJUE.FB|
|.SB|GERMANY|SWB|EUR|STG.SB|
|.OL|NORWAY|VSE|NOK|ABG.OL|
|.MC|MADRID|BM|EUR|LOG.MC|
|.MI|MILAN|BVME|EUR|BGN.MI|
|.SW|SWITZERLAND|EBS|CHF|ABBN.SW|
|.ST|SWEDEN OMX|SFB|SEK|ABB.ST|
|.NS|INDIA|NSE|INR|BPCL.NS|
|.SA|BRAZIL|BOVESPA|EUR|TOTS3.SA|
|.WS|WARSAW|WSE|PLN|GRN.WS|
|.CP|COPENHAGEN|CPH|DKK|DFDS.CP|
|.TA|TEL AVIV|TASE|ILS|BRMG.TA|

### IBContracts.txt Record Format
If a symbol does not identify an contract at IB, use following information to enter a record in IBContracts.txt manually after closing WealthLab first. The format for each record is as follows, using the pipe delimiter. 

BIPC=BIPC|USD|STK|SMART|NYSE|BIPC| | |0|

 **Tokens:**  
 0 - The symbol to identify the contract in WealthLab.  
 1 - IB's underlier symbol
 2 - Currency (3-letter abbreviation)  
 3 - Security type (STK, FUT, OPT, CFD,	IND, FUND, CRYPTO, CASH)  
 4 - Exchange (Destination for orders)  
 5 - Primary Exchange  
 6 - Local Symbol  
 7 - LastTradeDateOrContractMonth  
 8 - Right - Call or Put, C or P  
 9 - Strike  
 10 - Multiplier (Point value)  

The following two records identify different contracts for BMW. The first, BMW, trades to SMART whereas BMW.I trades on IBIS.     
BMW=BMW|EUR|STK|SMART|IBIS|BMW|||0|  
BMW.I=BMW|EUR|STK|IBIS|IBIS|BMW|||0|  

Generally, records for futures and U.S. options are created automatically by simply using the symbol for data or trading.  

*Futures*  
ESH24=ES|USD|FUT|CME||ESH4|202403||0|50
CLZ23=CL|USD|FUT|NYMEX||CLZ3|202312||0|1000

*Options*  
TTD240621C80=TTD|USD|OPT|SMART||TTD   240621C00080000|20240621|C|80|100

To keep the number of records in IBContracts.txt to a minimum, optionally add the following record at the top of IBContracts.txt to remove option contract records (not cached data) that expired more than one month ago. You'll still be able to recall cached option BarHistory data for old date ranges.
- #REMOVE=EXPIRED OPT

*Futures Options*  
E2AN3 P4500=|USD|FOP|CME||E2AN3 P4500|202307|P|4500|

*Crypto*  
BTC.USD=BTC|USD|CRYPTO|PAXOS||BTC.USD|||0|

### IBDefaultMarkets.txt
So that the time zone and market hours are correct for intraday data in world markets, it's required to identify the correct Market for contracts, e.g., *US Stocks*, *Frankfurt Stock Exchange*, etc. This is imperative to properly scheduling runs in the Strategy Monitor. 

For many Exchanges, the IB Provider is able to map to a market, but in cases that the wrong market is identified, you can specify default markets by contract currency using the IBDefaultMarkets.txt file in the User Data folder (File menu > Open WealthLab User Data Folder).

To use this feature, you must adopt the 2-character extension shown above in *Identifying Instruments/Contracts*. For example, the underlying symbol for "ENGIE BRASIL ENERGIA SA" in IB TWS is *EGIE3*. Even without creating a record in IBContracts.txt, you can request data and trade this contract using symbol *EGIE3.SA*.

---
## Trading  
Special order types `OrderType.MarketClose` (MOC) and `OrderType.LimitClose` (LOC) as well as execution of a `OrderType.Market` On Open (MOO) are available only for *stocks* and *CFDs*. For other asset classes (futures, options, cryptos, etc.) use of these special orders will result in transmitting the basic OrderType.Market or OrderType.Limit to IB.  

%{color:blue}**Example**% 
> You checked to Use Market On Close when possible in the [Trading Preferences](TradingPreferences), where you also selected 600 seconds (10 minutes) for the order to be placed before the market close. If you use a **MarketClose** order with a futures or options contract, the [Order Manager](OrderManager) will place a regular Market (not MOC) order 10 minutes before the market close. 


### Time-In-Force (TIF)
By default, WealthLab orders for Intraday and Daily scales use TIF "Day", which means that active orders will be automatically canceled when the market session ends. TIF "GTC" (Good Till Canceled) is applied to orders based on Weekly and higher scales. 

Additional TIFs are available for strategy orders directed to Interactive Brokers by adding specific strings to the order's *signalName* as shown below. Some TIFs may not be available for all instrument types.

**IOC - Immediate Or Cancel**  
TIF IOC will be applied if the *signalName* contains *TIF:IOC*. For example, a Buy at Limit with TIF IOC would likely be canceled immediately if the limit trigger were below the Ask price. 

**Example:**  
```csharp

//Specify that the order be filled at the limit price immediately, otherwise cancel
PlaceTrade(bars, TransactionType.Buy, OrderType.Limit, lmt, "TIF:IOC");

```

**GTD - Good Till Date**  
TIF GTD will be applied if the *signalName* contains *GTD:yyyyMMdd HH:mm:ss*, where the good till date/time is specified in the market's time zone with the precise format shown. The order will error out and not be placed if market's current time is later than the date/time specified.

**Example:**  
```csharp

//Specify that the order be canceled "today" at 2:44:55 PM in the market's time zone
PlaceTrade(bars, TransactionType.Buy, OrderType.Limit, lmt, $"GTD:{DateTime.Now:yyyyMMdd} 14:44:55");

```

### All Or None
In addition to the TIF strings, you can apply the *All Or None* order attribute by including *AON:T* in the *signalName*. 

```csharp

//Add the AON order attribute to the previous order example
PlaceTrade(bars, TransactionType.Buy, OrderType.Limit, lmt, $"AON:T, GTD:{DateTime.Now:yyyyMMdd} 14:44:55");

```

### OrderType: MIDPRICE 
For U.S. stocks (only) limit orders may be placed as *Midprice* order types by including *OT:MIDPRICE* in the *signalName*. 
```csharp

//place an All Or None MIDPRICE order
PlaceTrade(bars, TransactionType.Buy, OrderType.Limit, lmt, "AON:T, OT:MIDPRICE");

```

---
## Historical Data
The IB extension supports historical and streaming data.  ***You must have the appropriate IB data subscription for the data you request.*** 

Generally speaking, IB will provide the data you need for **trading**.  There are limits on the amount of data that you can download, and IB severely throttles requests for long intraday data histories. It can take dozens of minutes (*even hours*) to retrieve a year of 1-minute data from IB. Per IB API documentation: *Requesting too much historical data can lead to throttling and eventual disconnect of the API client*, i.e., WealthLab. The good news is that since WealthLab caches the data locally, you only have to wait for the data once.

You can retrieve many years of 1-Minute intraday data and higher (May 2004 seems to be the limit), but tick and seconds history data requests are limited to the last 2 months. *It's best to request long histories after market hours.*

### Timestamps
Intraday charts will use the market's time zone defined in [Markets and Symbols](MarketsAndSymbols). WealthLab's convention is to use the time at the end-of-bar. Keep this in mind when comparing charts with TWS, which uses start-of-bar timestamps. 

---
## Data
### Streaming
A basic IB streaming subscription allows you to stream 100 symbols simultaneously. This number is the sum of the symbols you're viewing in WealthLab ***and*** any active TWS Quote page.  To stream more symbols you'll need to buy additional "quote bundles" at IB.

IB streaming data is **not tick-by-tick** and is updated no faster than 250msec (4 times per second). For this reason WealthLab's IB-powered bars from streaming can have minor differences from true historical bars. While there is a minimal practical difference for an intraday trader, strategy trades can be different than when using IB's historical bars in backtest, which come from tick-by-tick, full-lot trading.  

### Streaming Bars
**Streaming Bars** is the preferred alternative when using IB data in the [Strategy Monitor](StrategyMonitor) for intraday scales. **Streaming Bars** will result in a nearly exact match for price and volume data when compared to historical data and has the added advantage of reduced cpu load.

%{color:blue}**Important!**% 
IB's documentation indicates:
1. a Streaming Bar subscription will use one of the "market data lines" (typically 100).  However, WealthLab will subscribe only once per symbol, so the same symbol in multiple timeframes will count as only 1 subscription.
2. No more than 60 ***new*** requests for Streaming Bars can be made in 10 minutes. 

### Polling
Use Polling for Daily and higher scales. Because of excessive delays we generally do not recommend the Polling option for IB data in the Strategy Monitor for any intraday scale *when trading more than a few symbols*. Polling can be a good choice when trading 1 or 2 symbols for 5 minute intervals and higher. 

---
## Symbology
IB supports many markets and symbols can conflict between them. IB requires that WealthLab specifies an exact contract for trading or when requesting data. Contracts are found by specifying symbol, instrument type, currency, etc., but we've simplified the specifications for U.S. futures and options contracts as outlined below.  

Symbols may conflict with other markets if they don't match one of the formats described below. In this case, see the **Explicit Contract Specification** section.  

---  
### Forex 
For forex data simply enter the currency pair separated with a period, e.g., EUR.USD, USD.CAD, GBP.USD, etc.  The IB Provider will automatically identify the *Currencies* market (bars.MarketDetails) for symbols with this format, excluding supported Cryptocurrencies. 

%{color:blue}**Note!**%    
> Real cash balances are not considered tradable **Positions**, and WealthLab cannot exit **Positions** that are not reported by the account. Forex Positions are those that appear in TWS Accounts > Virtual FX Positions. For example, if you have a EUR.USD "Real FX Balance" of 100,000, you cannot **sell** EUR.USD unless you have a "Virtual FX Balance" with EUR.USD. 

**Forex Trading**  
IB does not allow negative currency balances. For example, with a 10K USD position you could easily buy a 200K EUR position with typical forex leverage. However, IB will reject the trade since it would result in a large negative USD balance. Instead, unless you're a resident of USA, Canada, and Hong Kong, you can use **CFDs** (Contract For Difference) to make this trade. [See this article (click) for details](https://ibkr.info/article/2707). To Auto-Trade currencies with WealthLab, currency futures contracts are the best option.  Note! futures and cash contracts can have different dynamics, especially in volatile trading.

To set up a Currency CFD for trading, enter record(s) as follows for each CFD contract in IBContracts.txt. The WealthLab symbol on the left side is arbitrary, but must be different than the CASH Local Symbol, which uses a period "." separator and is found on the right side. To avoid confusion, we recommend using a hypen separator as shown for the Cash CFD.
- **GBP-CAD=GBP|CAD|CFD|SMART||GBP.CAD|||0|**
- **EUR-USD=EUR|USD|CFD|SMART||EUR.USD|||0|**

*Market data for CFDs comes from the underlying Cash contract.*

---  
### Crypto
Currently, IB supports the following pairs:  
- **BTC.USD** 
- **BCH.USD**
- **ETH.USD** 
- **LTC.USD**

Market data permissions for PAXOS Cryptocurrency are required and these symbols will be automatically recognized as security type **CRYPTO** and assigned to the *Cryptocurrencies* market.  

Order types supported are Market and Limit orders with Time-in-Force IOC (Immediate Or Cancel) only. The IB Provider will automatically assign IOC to Market and Limit orders. Stop and MarketClose (MOC) orders will be rejected. LimitClose (LOC) orders will be processed as normal Limit orders, so you shouldn't use them for Cryptos. 

---  
### Stocks
This IB extension installs the U.S. S&P 500 symbols pre-defined, and therefore it is sufficient to refer to these companies by their common U.S. symbol. 

%{color:blue}**Note!**%  
> A/B shares at IB use a **white space** separator, e.g., **BRK B**. Nonetheless, this provider will automatically interpret A/B shares separated by a period too.

For any ad-hoc symbol requested from IB that doesn't conform to a recognizable format for Futures, Options, Currency, or Crypto, WealthLab will assume type STK and currency USD unless you specify otherwise. 

#### CFDs
To trade CFDs for a particular stock, create records (examples follow) in IBContracts.txt. For the WealthLab symbol name you must use the IB's "Local Symbol", which typically has a lower-case letter following the regular stock symbol name. (See Forex above for Cash CFDs.) Check the contract Details to get the correct Local Symbol.  

- **IBMn=IBM|USD|CFD|SMART||IBMn|||0|1**
- **Xn=X|USD|CFD|SMART||Xn|||0|1**
- **VOW3d=VOW3|EUR|CFD|SMART||VOW3d|||0|1**

*Market data for CFDs comes from the underlying Cash contract.*

For more information about trading CFDs with IB: https://www.ibkrguides.com/kb/article-2707.htm

---  
### Futures
IB Provider installs an *IBFutures.txt* file in the WealthLab User Data folder containing specifications to identify most U.S. futures contracts. The IB Provider matches your futures-formatted symbol with the specifications to attempt to identify the specific contract. This removes the need to create records manually in IBContracts.txt. Follow the instructions at the top of *IBFutures.txt* to add records for missing contracts, save the file, and restart WealthLab.

You can request data for current and expired futures contracts up to 2 years old using the format:  
**[Underlying Symbol][Month Letter][1 or 2-digit year]**

**The 2-digit format is recommended** - see *Symbol Mapping for Futures* below. Years with 1 digit will match the current year, 2 years in the future, and back to 7 years in the past. You must specify a correct letter-month and year for which the contract trades.  

F = JAN  
G = FEB  
H = MAR  
J = APR  
K = MAY  
M = JUN  
N = JUL  
Q = AUG  
U = SEP  
V = OCT  
X = NOV  
Z = DEC

**Examples:**  
- MESZ22 or MESZ2 - S&P 500 E-mini micro contract for December (Z) 2022
- HOG22 or HOG2 - Heating Oil contract for February (G) 2022
- EURU22 or EURU2 - Euro FX contract for September (U) 2022
- VIXV23 or VIXV3 - VIX contract for October (V) 2023

**Continuous Contracts**  
You can request data for the continuous contract by adding a **#C suffix** to the contract symbol. Continuous contracts return **historical data only** and cannot be traded without mapping to a specific 2-digit year contract symbol. The front month symbol is added to the Security Name for continuous contracts. At rollover, you should refresh your continuous contract charts to back adjust the history for the new contract, though doing so will result in losing data due to IB's 2-year historical limit for futures. 

**Examples:**  
ES#C, GC#C, CL#C, EUR#C, etc. 

> **Note!**  
> IB does not support Streaming data for continous contracts. Use the month/year contract symbols for streaming and trading.

**Symbol Mapping for Futures**  
When using single-digit year symbols (not recommended) or an alternate data feed to trade futures, e.g. IQFeed, map the symbol to the *2-digit year symbol* in the Order Manager for IB. For example, for the S&P E-mini December 2024 contract these mappings are correct: 
- ESZ4=ESZ24  (single-digit to IB 2-digit year symbol)
- @ESZ24=ESZ24 (IQFeed month/year to IB 2-digit year symbol)
- @ES#=ESZ24 (IQFeed continuous contract to IB 2-digit year symbol)

If using IB data feed for trading, it's recommended that you always use the 2-digit contract symbol so that symbol mapping is not required. 

If there's a problem retrieving data for a contract: 
 1. **You must have permissions for the data you request.**
 2. Check IBFutures.txt for a contract specification record. If it doesn't exist, add a new record following the instructions at the top of the file (and the many examples). 
 3. Ensure you're specifying the underlying symbol as defined in a matching record for IBContracts.txt. If the record doesn't exist, you can create a new one carefully following the format examples.
 
 > *Restart WealthLab after editing either IBFutures.txt or IBContracts.txt.*
 
**For contracts not found in IBContracts.txt** or non-U.S. contracts, use the **Explicit Contract Specification**.  Use all fields the first time requesting a contract. Thereafter, you can simply use the symbol.  

#### Futures Margin
If you create a record in the Markets & Symbols tool that matches the contract you're backtesting, its margin value will be used by the Backtester. Otherwise, the IB Provider will use [IB's published intraday initial margin](https://www.wealth-lab.com/a/IBFuturesMargin2) for futures contracts, which can change daily. 

---  
### Options (U.S.)
Currently, the IB Provider supports only **U.S. Stock and Futures options**. IB will return only **intraday data** for **non-expired** contracts.  *Daily bars are not available for options.*  Please refer to *WhatToRequest* in the IBProvider configuration above to 

Stock options should have the following format to trade and request intraday data for active contracts:  **[Underlying][yyMMdd][R][Strike]**, where,

- **Underlying** - Underlying symbol, e.g., AAPL
- **yyMMdd** - 2-digit year, month, day expiration date
- **R (Right)** - either **C** (Call) or **P** (Put)
- **Strike** - Strike price with decimal, if required

%{color:blue}**Example**% 
> The following symbol represents the June 17, 2022 ATVI $67.5 Call:  **ATVI220617C67.5**

This notation automatically assigns the **SMART** exchange. If you wish to specify a trading exchange, use the Explicit specification (see below). The contract will be cached with the exchange you specify. 

Futures options must use IB's "Local Name", e.g. QN1V2 C0910, where "QN1" is the Local Class, "V2" is the month code and year digit, following by a space, C or P for Call or Put, and the 4-digit strike with leading zeros.  You can find future option symbols in TWS or by calling **GetOptionsSymbol()**.

#### GetOptionsSymbol()  
You can obtain the exact option symbol required using the *GetOptionsSymbol* method in WealthLab.InteractiveBrokers.IBHistorical.Instance. This method returns a symbol that is a valid contract from the option chain or *null* if not found.
```csharp
public string GetOptionsSymbol(BarHistory undBars, OptionType optionType, double price, DateTime expiryDate, int minDaysAhead = 0, bool useWeeklies = false, bool closestStrike = false, string multiplier = "")
```
- undBars - the stock or futures underlying BarHistory
- OptionType - OptionType.Call or OptionType.Put
- price - the current price of the underlier or a price closer to the desired strike 
- expiryDate - a reference date or the date closer to the desired expiry; used with *minDaysAhead*
- minDaysAhead - a value greater than 0 will look for an expiry at least N days past the expiryDate passed to the method
- useWeeklies - applies to *stock options only* and if true, daily and weekly expirations are searched
- closestStrike - if true, the strike closest to *price* is used. Otherwise, the next strike higher/lower than *price* is used for calls/puts, respectively. Because IB's option chain includes all strikes for all expirations, it's possible that the *closestStrike: true* will return the *next/previous valid strikes* for calls/puts, respectively, where 'valid' means that the contract has traded at least once, historically. 
- multiplier - (optional) some option chains may have multiple multipliers for the same underlying id and expiration. If not specified, the first chain received is used.

%{color:blue}**Example**%  
The script finds the symbol and plots the closest monthly strike that is at least 10 days out from the current date. **Note!** Downloading intraday data from IB can cause a long delay for the first run. 
```csharp
using WealthLab.Backtest;
using System;
using WealthLab.Core;
using WealthLab.Indicators;
using System.Collections.Generic;
using WealthLab.InteractiveBrokers;

namespace WealthScript2 
{
    public class IBOptionDemo : UserStrategyBase
    {
		public override void Initialize(BarHistory bars)
		{
			double price = bars.Close[bars.Count - 1];
			DateTime currentDate = bars.DateTimes[bars.Count - 1];
			string optSym = IBHistorical.Instance.GetOptionsSymbol(bars, OptionType.Call, price, currentDate, 10, false, true);
			if (optSym != null)
			{				
				BarHistory obars = GetHistory(bars, optSym);
				PlotBarHistory(obars, optSym);
			}
        }

        //execute the strategy rules here, this is executed once for each bar in the backtest history
        public override void Execute(BarHistory bars, int idx)
        {
        }
    }
}
```
#### The Greeks
You can access two versions of option greeks, which are contained in the `OptionGreeks` class.  

For the fields that aren't self-explanatory: 
- FieldType - will be either one of two values.  "13" = Computed Greeks and implied volatility based on the underlying stock price and the option model price. "53" = Greek values are based off a user customized price - result of  CalculateOptionPrice() or CalculateIV()  
- PVDividends - the present value of dividends expected on the option's underlying

```csharp
public OptionGreek IBHistorical.Instance.GetGreeks(string optionSymbol)
```  
This "live" version returns the current greeks for an option contract if possible, otherwise **null** after approximately a 2-second timeout. These are the greeks displayed in TWS and may be available only during trading hours because they are updated *when the market in an option or its underlier moves*. To access this version pass only the option contract's symbol to the IBHistorical.Instance.Greeks() method.  **Note!** To receive live greek values it's necessary to have market data subscriptions for both the option and the underlying contract. 

```csharp
public OptionGreek IBHistorical.Instance.GetGreeks(string optionSymbol, double impVolatility, double priceUnderlying)
```  
This alternate version returns a *calculated* version of the greeks based on user-specified implied volatility and price of the underlying instrument. You can use this to get the greeks in an ad-hoc way during a backtest. 

***Note!** Each call takes about 1/2 second to return, so calls for greeks should be used sparringly.* 

```csharp
public double CalculateIV(string optionSymbol, double priceOption, double priceUnderlying)
```
You can also get an ad-hoc implied volatility for an option if you know its price and the price of the underlying. You can use the result to obtain the *calculated Greeks* at any point in the contract's lifetime.

```public double CalculateOptionPrice(string optionSymbol, double impVolatility, double priceUnderlying)```  
Given the price of the underlying and an implied volatility, this function is convenient to calculate and return a *hypothetical* option price. 


```csharp
using WealthLab.Backtest;
using System;
using WealthLab.Core;
using WealthLab.Indicators;
using System.Collections.Generic;
using WealthLab.InteractiveBrokers;     /* using required */

namespace WealthScript123
{
	public class IBOptionDemo : UserStrategyBase
	{
		public override void Initialize(BarHistory bars)
		{
			WLColor textColor = WLColor.NeonGreen;
			double price = bars.Close[bars.Count - 1];
			DateTime currentDate = bars.DateTimes[bars.Count - 1];
			int minDaysToExpiry = 10;
			bool weeklies = false;
			bool allowExpired = false;
			string optSym = IBHistorical.Instance.GetOptionsSymbol(bars, OptionType.Call, price, currentDate, minDaysToExpiry, weeklies, allowExpired, true);
			DrawHeaderText(optSym, textColor, 14);
		
			if (optSym != null)
			{
				if (bars.Scale.IsIntraday)
				{
					BarHistory obars = GetHistory(bars, optSym);
					if (obars != null)
					{
						PlotBarHistory(obars, optSym);
						double iv = IBHistorical.Instance.CalculateIV(optSym, obars.Close[obars.Count - 1], price);
						DrawHeaderText($"Implied Volatility = {iv:N2}", textColor, 14);

						if (iv > 0)
						{
							double op = IBHistorical.Instance.CalculateOptionPrice(optSym, iv, price);
							DrawHeaderText($"Option Price Calculated = {op:N2}", textColor, 14);
						}
					}
				}
				else
					DrawHeaderText("Intraday required for option data", textColor, 14);

				OptionGreek greek = IBHistorical.Instance.GetGreeks(optSym);
				if (greek != null)
				{
					DrawHeaderText($"MidPoint = {greek.OptionPrice:N2}", textColor, 14);
					DrawHeaderText($"IV = {greek.IV:N2}", textColor, 14);
					DrawHeaderText($"Delta = {greek.Delta:N2}", textColor, 14);
					DrawHeaderText($"Gamma = {greek.Gamma:N2}", textColor, 14);
					DrawHeaderText($"Theta = {greek.Theta:N2}", textColor, 14);
					DrawHeaderText($"Vega = {greek.Vega:N2}", textColor, 14);
					DrawHeaderText($"Underlying = {greek.UnderlyingPrice:N2}", textColor, 14);
				}
				else
					DrawHeaderText("The Greeks returned a null", textColor, 14);				

				// Given IV and underlying price, calculate Option price and Greeks
				DrawHeaderText("* * * * * * * * *", textColor, 14);
				textColor = WLColor.NeonRed;
				DrawHeaderText("** Calculated **", textColor, 14);
				greek = IBHistorical.Instance.GetGreeks(optSym, 0.3, bars.Close[bars.Count - 1]);
				if (greek != null)
				{
					DrawHeaderText($"MidPoint = {greek.OptionPrice:N2}", textColor, 14);
					DrawHeaderText($"IV = {greek.IV:N2}", textColor, 14);
					DrawHeaderText($"Delta = {greek.Delta:N2}", textColor, 14);
					DrawHeaderText($"Gamma = {greek.Gamma:N2}", textColor, 14);
					DrawHeaderText($"Theta = {greek.Theta:N2}", textColor, 14);
					DrawHeaderText($"Vega = {greek.Vega:N2}", textColor, 14);
					DrawHeaderText($"Underlying = {greek.UnderlyingPrice:N2}", textColor, 14);
				}
				else
					DrawHeaderText("The Greeks returned a null", textColor, 14);				
			}
		}

		//execute the strategy rules here, this is executed once for each bar in the backtest history
		public override void Execute(BarHistory bars, int idx)
		{ }
	}
}
```

#### GetOptionChain
```csharp
public OptionChain GetOptionChain(string symbol)
```
Returns WealthLab's `OptionChain` object for the underlier.  The symbol can be the underlier or any option contract symbol.

- symbol - the underlier or an option symbol. 

```csharp
using WealthLab.Backtest;
using System;
using WealthLab.Core;
using System.Collections.Generic;
using WealthLab.InteractiveBrokers;

namespace WealthScript71
{
    public class IBOptionChainDemo : UserStrategyBase
    {
        public override void Initialize(BarHistory bars)
        {
			OptionChain chain = IBHistorical.Instance.GetOptionChain(bars.Symbol);

			if (chain == null)
			{
				WriteToDebugLog("null chain"); 
				return;
			}

			List<DateTime> regExpirations = chain.Expirations(weeklies: false); 
			WriteToDebugLog("All regular Expirations in chain"); 
			WriteToDebugLog(string.Join('\n', regExpirations));

			List<DateTime> weeklyExpirations = chain.Expirations(weeklies: true); 
			WriteToDebugLog("\nAll non-regular Expirations in chain");
			WriteToDebugLog(string.Join('\n', weeklyExpirations));

			//for IB, strikes will be the same for all expirations, so we'll just pick the first one
			//see GetOptionChainSnapshot() for "tradable" contracts
			OptionSymExp ose = chain.GetOptionSymExp(regExpirations[0], false);
			WriteToDebugLog("\nAll strikes in chain");
			WriteToDebugLog(string.Join(',', ose.Strikes));
        }
		
        public override void Execute(BarHistory bars, int idx)
        { }
    }
}
```

#### GetOptionChainSnapshot
```csharp
public List<OptionGreek> GetOptionChainSnapshot(string underlier, DateTime expiration, OptionType optionType = OptionType.Call, double lowStrike = 0, double highStrike = 0, double timeoutSeconds = 10)
```
Returns a list of `OptionGreek` objects corresponding to the parameters list. Use the result to identify tradable contracts accordingly to their greeks. 

- underlier - the stock or futures symbol.
- expiration - the chain's expiration date.
- OptionType - OptionType.Call or OptionType.Put.
- lowStrike - (Optional) the lowest price of interest. A precise strike is not required.
- highStrike - (Optional) the highest price of interest. A precise strike is not required. Pass *0* to return all strikes.
- timeoutSeconds - (Optional) the maximum timeout to wait for data to return. 

To obtain this snapshot, IB subscribes to each of the symbols in the low/high price range specified and returns immediately when each contract has data. The IB response is proportional to the number of contracts returned - approximately 1 second for every 2 contracts, but will use the full timeout if non-traded contracts are found. Only contracts that are have traded are returned. 

```csharp
using WealthLab.Backtest;
using System;
using WealthLab.Core;
using WealthLab.Data;
using WealthLab.Indicators;
using System.Collections.Generic;
using WealthLab.InteractiveBrokers;
using System.Diagnostics;

namespace WealthScript4 
{
    public class OCSnapshotIBDemo : UserStrategyBase
    {        
        public override void Initialize(BarHistory bars)
        {
			Stopwatch sw = new();

			sw.Start();
			double C = bars.Close.LastValue;
			double s1 = C - 6;
			double s2 = C + 6;
			
			//get the Put chain $6 below/above the current price for the next regular expiration
			List<OptionGreek> chain = IBHistorical.Instance.GetOptionChainSnapshot(bars.Symbol, bars.NextOptionExpiryDate(bars.Count - 1), OptionType.Put, s1, s2);
			sw.Stop();
			WriteToDebugLog($"GetOptionChainSnapshot returned in {sw.Elapsed.TotalSeconds:N2} seconds");
			
			if (chain?.Count == 0)
			{ 
				WriteToDebugLog($"No data");
				return; 
			}
			else
			{
				foreach (var og in chain)
					WriteToDebugLog($"{og.UpdatedAt:HH:mm:ss.fff} {og.Symbol} {og.UnderlyingPrice:N2} {og.OptionPrice:N2}, {og.Delta}, {og.Gamma}");
			}
        }

        public override void Execute(BarHistory bars, int idx)
        {	
        }
    }
}
```

---  
### Indices
Always recalling that you need permissions for the data you request, the following index symbols are pre-configured in IBContracts.txt and can be requested using the symbol only: 
**INDU, NDX, SPX, VIX, VIX1Y, VIX3M, VIX6M, VIX9D, VIXC, VIXM.IV, VIXMO, VIXY**

Request data for other index contracts using the explicit specification, e.g., SPX;IND;USD;CBOE to add the contract record in IBContracts.txt. Thereafter you can just use the symbol, e.g., SPX.  

More examples for explicit specifications for some popular indices:  
RUT;IND;USD;RUSSELL  
NYA;IND;USD;PSE  
DJX;IND;USD;CBOE  
DAX;IND;EUR;EUREX

## Explicit Contract Specification
The explicit convention can be used ad-hoc as a shortcut to identify a contract without modifying IBContracts.txt. The symbol is the only required field. Often, only *symbol*, *type*, and *currency* are sufficient to define a contract. If required, futures and option symbols can be defined for their first request using this format. Thereafter, only the common symbol is required.

**[symbol];[type];[currency];[exchange];[multiplier];[Local Class]**

**type** - the type of instrument
- STK - stock or ETFs
- FUT - futures, future IND
- OPT - option
- IND - index
- FOP - futures option
- CASH - forex pair
- FUND - mutual fund
- CFD - Cash for Difference
- CRYPTO - Cryptocurrency

**currency** - the underlying's currency
e.g. USD, EUR, CHF, etc.

**exchange** - the destination exchange
e.g., SMART, NYSE, NASDAQ, GLOBEX, NYMEX, etc.  (PAXOS for all Cryptocurrencies.)

%{color:blue}**Tip!**% 
> You can find the currency, exchange, and multiplier by inspecting the contract description in TWS by double clicking a symbol.  SMART is recommended for SMART-traded contracts.

**multiplier** - the contract's multiplier
e.g., 50 - for the S&P 500 e-mini
e.g., 100 - for most U.Soption contracts

**Local Class** - from IB's contract details page
The Local Class must be specified when it is different from the IB Symbol. 
e.g. VX - for VIX futures (see full example below)

### Examples

**Example German Stocks**  
Volkswagen: **VOW3;STK;EUR;IBIS** - IBIS or SMART

**Example French Stocks**  
Jacquet Metals: **JCQ;STK;EUR;SMART**  (SMART or SDF)

**Example MGC** - enter the following for the mini gold contract, expired December 2021:  
**MGCZ21;FUT;USD;NYMEX;10**,  
where MGC is the underlying symbol, Z is the month letter code, and 21 is the 2-digit year.  Use this format for all futures contracts.  Once the a contract has been established in a successful request, you can recall the data by entering the symbol only: MGCZ21. 

**Example VIX:**  
The Symbol for VIX futures is VIX, but the Local Class is VX, which doesn't match the Symbol so it must be specified. The first time you enter the symbol for the VIX November 2021 futures, it should be: **VIXX21;FUT;USD;CFE;1000;VX** 
Once the contract has been established, enter just VIXX21. 

**Example CBOE option**  
The following symbol indicates the March 19, 2021 AAPL $132.50 Call: **AAPL210319C192.5;OPT;USD;CBOE**.  

## Events
If the Interactive Brokers Event Provider is checked in *Data Manager > Events*, event data are requested once each day per [stock] symbol, adding about a 2 second data delay per symbol. For bulk updates, the IB Provider throttles requests to prevent an IB data pacing violation. Like most Event providers, updating many symbols is a slow process. For example, the S&P 500 can take more 15 minutes to update all the Events. 
> *IB Events come from an undocumented method and could stop functioning without warning.*

### Revenue and EPS
Provides historical (6+ years) of quarterly *Revenue* and *EPS* actuals and preliminaries (*Revenue-P*, *EPS-P*). Dates for these events are not *timely* (they do not correspond to earnings reports) and appear to align with the end of fiscal quarter months. Preliminary events may contain one more quarter (the most-recent period) than actuals.

**Tip!** 
Use the `Fundamental` indicator to plot Revenue and EPS. 

### Fundamental Ratios
The following table of IB events are available from a "Snapshot Report" and are expected to update with new events by date when new data are available. As long as Events are not deleted/refreshed, your local cache will retain a history of the previous snapshots. The frequency of snapshots is unknown.


|Ratio|Description|
|----------|--------------------------------------------------|
|TTMREV| TTM Revenue |
|TTMEPSXCLX| TTM Earnings Per Share Excluding Extraordinary (one-time or non-recurring) Items |
|TTMNIAC| TTM Net Income After Charges|
|TTMEBITD| TTM EBITDA|
|TTMREVPS| Total revenue for the last 12 months divided by the number of shares |
|QBVPS| Quarterly Book Value Per Share (total assets minus liabilities) for the most recent quarter |
|QCSHPS| Quarterly Cash (and cash equivalents) Per Share for the most recent quarter |
|TTMCFSHR| TTM Cash Flow from operations Per Share for the last 12 months |
|TTMDIVSHR| Total dividends paid out over the last 12 months per share |
|TTMGROSMGN| TTM Gross Margin - gross profit margin over the last 12 months, expressed as a percentage |
|TTMROEPCT| TTM Return on Equity Percentage |
|TTMPR2REV| TTM  Price to Revenue Ratio |
|PEEXCLXOR| Price to Earnings Ratio Excluding Extraordinary Items |
|PRICE2BK| Price to Book Ratio |

**Example: **  
Calculate the current yield with TTMDIVSHR, also show the market capitalization (MKTCAP).
```

using WealthLab.Backtest;
using WealthLab.Core;
using WealthLab.Data;
using System.Linq;

namespace WealthScript124
{
	public class IBRatios : UserStrategyBase
	{
		public override void Initialize(BarHistory bars)
		{
			string ratio = "TTMDIVSHR";			
			double ttmDivPerShare = GetLastRatio(bars, ratio);
			double yield = 100 * ttmDivPerShare / bars.LastValue;
			DrawHeaderText($"Yield: {yield:N1}%", WLColor.NeonGreen, 14);

			ratio = "MKTCAP";
			double mktcap = GetLastRatio(bars, ratio);
			DrawHeaderText($"{ratio} {mktcap:N2} (millions)", WLColor.NeonGreen, 14);			
		}

		private double GetLastRatio(BarHistory bars, string ratio)
		{ 
			return bars.EventDataPoints.LastOrDefault(eventData => eventData.Name == ratio)?.Value ?? 0;
		}
		
		public override void Execute(BarHistory bars, int idx)
		{ }
	}
}

```


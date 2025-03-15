# Candle Gene Codes
The Candlestick Evolver uses coded genes, defined in the tables below, to represent single and multi-candle patterns. You can create your own Candle Patterns using the gene codes by adding records to the CandlePatterns.txt file in the User Data folder.

### Generate the CandlePatterns.txt file
The first one-time step to adding your own patterns is to generate the CandlePatterns.txt file.

**Procedure:**  
1. Install the [Candlestick Evolver](extension:Candlesticks)
2. Run the Evolver and save one (any) of the genetically-evolved Patterns
3. Click File > Open WealthLab User Data folder
4. Close WealthLab
5. Open CandlePatterns.txt
6. Add your patterns to the  file according to the instructions below and save it

### Building Candle Patterns
A single candlestick has the following format, "where CG" is a Candle Gene followed by a colon that separates its gene code "c":
> Name Can Have Spaces=CG1:c1.CG2:c2.CG3:c3

The equals sign separates the pattern name from the Candle Gene codes, each of whose combinations are *separated by a period*.

Multi-candlestick patterns have two or more single candlestick pattern codes *separated by commas*. The leftmost candle is first and the rightmost is last. 

> Three Candle Pattern=CG1:c1.CG2:c2.CG3:c3,CG4:c4,CG5:c5.CG6:c6

A good way to see many examples of candle patterns is to simply run the [Candlestick Genetic Evolver](extension:Candlesticks). 

### Example 1:  
> Neutral Spinning Top=BL:S.P:HfT.P:LfB  

The neutral spinning top is a single candle with 3 genes: 
1. Body Length: Short
2. Price Comparison: the High is far from the body top
3. Price Comparison: the Low is far from the body bottom

### Example 2: 
> Bullish Three White Soldiers=BL:L.BC:W.P:CnH,BL:L.BC:W.P:CnH.P-:1O<T.P-:1O>B,BL:L.BC:W.P:CnH.P-:1O<T.P-:1O>B  

As the name suggests, this pattern has 3 candles each of which has Long Body Length (BL:L), White Body Color (BC:W), and the Close near its candle High (P:CnH). The second and third candles also have relative price constraints - their Open is below/above the previous candle's body Top/Bottom, respectively (P-:1O<T.P-:1O>B).


## Candle Genes
| Gene | Name     | Codes / Meaning | Description | Example | 
|------|------------|---------------|------------------------------|
|BC |Body Color |(W)hite, (B)lack |Close > Open = White Body, Close < Open = Black Body|BC:W = white body |
|BL |Body Length |(L)ong, (S)hort|Candle Body Length is Long or Short |BL:S = short body |
|CONSEC |Consecutive Up/Down | nUPy; nDOWNy |Closing Price moves Up or Down a consecutive number of bars |CONSEC:2UP4 = 2 consecutive bar up since the close 4 bars ago |
|CON |Contained Within | (B)ody, (R)ange |Candle completely Contained Within a previous Candle |CON:1R = Contained within Range 1 bar back |
|ENG |Engulfs | (number of bars ago) |Candle **body** completely engulfs a previous Candle |ENG:1 = Candle body completely engulfs the candle 1 bar ago |  
|GAP |Gap at Open |(+)=Up, (-)=Down |Open Price Gaps Above or Below the previous Close |GAP:+ = Opening gap higher from previous close |  
|HA |Heikin-Ashi Body |(W)hite, (B)lack | Heikin-Ashi Close > Open = White Body, Close < Open = Black Body |HA:W = White Heikin-Ashi body |
|M |Price Move | (+)=Above, (-)=Below; (S)mall, (L)arge|Price closes above or below the previous Close by a Small or Large margin |M:+L = Price closes above the previous Close by a Large margin |
|P |Price Comparison | See: Price Codes and Operators |Price Component compared to another from the same Candle |P:CnO = Close is near the Open|
|P- |Indexed Price Comparison | See: Price Codes and Operators |Price Component compared to another from a previous Candle |P-:2C<M = Close is less than the midpoint 2 bars ago
|RL |Range Length |(L)ong, (S)hort | Range of entire Candle |RL:L = Candle range is Long|
|SL |Shadow Length |(+) or (-)=Upper or Lower Shadow; (L)ong, (S)hort, (N)one|Length of Upper or Lower Shadow |SL:+N = No Upper Shadow |
|V | Volume Strength |Volume, quantified as (L)ight, (M)edium, or (H)eavy |10-bar avg volume is L < 50% < M < 200% < H |V:H = volume is more than 200% average volume |  


## Market Context Genes 
The following table of codes allow you to provide a market context for a candle pattern. For example, a "bullish bottom" candlestick pattern could include that the 8 period RSI is below 20, as in the example. 

| Gene | Name     | Codes | Description | Example |
|------|------------|---------------|------------------------------|
|T |Market Trend  |(U)ptrends, (D)owntrend, or (N)eutral market |Market Trend   |T:N = Market Trend is neutral |
|RSI |RSI Above/Below Value | >=Above; <=Below |A 2-digit-n-period RSI is above or below a specified **3-digit** value |RSI:<020-08 = RSI(8) below 20; *use leading zeroes* |  


### Price Codes
| Price Code | Description |
|--|--|
| O | Open |
| H | High|
| L | Low |
| C | Close |
| T | Body Top |
| M | Body Midpoint |
| B | Body Bottom |  


## Operators 
| Operator | Description |
|--|--|
| > | greater than|
| < | less than |
| = | equals |
| n | near |
| f | far from |
| M | Body Midpoint |
| B | Body Bottom |

Thresholds for modifying the objective measures for subjective qualities like "short/far" and "long/short" can be controlled in [Preferences (F12) > Candlesticks](CandlestickPreferences). 

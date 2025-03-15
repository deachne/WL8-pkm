# Candlesticks Extension Preferences
These settings let you tune the values that determine how candlestick patterns are qualified.

---
## Thresholds
The **Equality Threshold** is the percentage value that two prices must be within in order to 
be considered **equal** for candlestick pattern purposes. The default is 0.05%.

The **Near Threshold** determines the percentage difference that two prices must be within in 
order to be considered **near** each other. The default is 0.5%.

---
## Use Legacy Calculations
The Candlesticks Extension uses an improved method to determine the **size** 
of various parts of the candle. The new method involves using the new indicators 
**CandleRangeFactor**, **CandleBodyFactor**, and **CandleShadowFactor** that are part of 
the Extension. It results in more flexible determination across various time scales. If 
you want to match legacy results, enable this option to use the old calculation method.

---
## Long and Short Thresholds
Parts of the candle are distinguished as **long** or **short** based on how 
that compare to the average lengths of the respective elements in a 40-bar window.

The **Long Threshold** determines the percentage value that the element length must be above 
the 40-bar average length. The default value is 175%.

Likewise, the **Short Threshold** default is 75%.

### Example
The 40-bar **CandleShadowFactor** indicator returns a value of 1.00 for bar number N. The 
upper shadow of the candle at bar N resolves to a value of 0.5 (High - the greater of 
Open/Close). Since this is 50% of the indicator value, the upper shadow of this candle is 
considered **short**.

## Volume Thresholds
These thresholds determine if a Candle's Volume is "Light", "Medium" or "Heavy." The calculation is based on comparing the Candle Volume to the average Volume of the past 10 Candles. If the Volume is less than the Light Threshold percentage, it's considered a **Light Volume** Candle. If the Volume is greater than the Heavy Volume Threshold percentage, it's considered a **Heavy Volume** Candle. If the Volume is between the two Thresholds, it's considered a **Medium Volume** Candle.
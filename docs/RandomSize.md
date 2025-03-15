# Random sizing

This helper PositionSizer randomizes the selected position size according to the specified factor. One of the three "Basic" choices are available - Fixed Value, Share/Contracts, or Percent of Equity.

It has a single option - position size randomization percentage. For example, let's say you selected "percent equity" and "25%" for the random factor. Your position(s) will be still sized based on the underlying option (% equity), but the final size will be randomly modified between -25% of the initial size to +25% of the initial size.
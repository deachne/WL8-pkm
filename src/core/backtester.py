from typing import Optional, List
from .base import UserStrategyBase

class Backtester:
    """Backtesting engine for trading strategies"""
    
    def __init__(self):
        self._strategy: Optional[UserStrategyBase] = None
        self._results: List[dict] = []
    
    def set_strategy(self, strategy: UserStrategyBase) -> None:
        """Set the trading strategy to backtest"""
        self._strategy = strategy
    
    def run(self) -> List[dict]:
        """Run the backtest"""
        if not self._strategy:
            raise ValueError("No strategy set for backtesting")
        
        try:
            self._strategy.execute()
            # Add basic backtesting logic here
            return self._results
        except Exception as e:
            print(f"Error during backtesting: {e}")
            return []

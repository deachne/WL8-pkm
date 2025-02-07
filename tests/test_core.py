import pytest
from src.core.base import UserStrategyBase, PlotBase, IndicatorBase
from src.core.backtester import Backtester

class TestStrategy(UserStrategyBase):
    def execute(self):
        pass

def test_strategy_base():
    strategy = TestStrategy()
    assert strategy.name == "TestStrategy"

def test_backtester():
    backtester = Backtester()
    strategy = TestStrategy()
    backtester.set_strategy(strategy)
    results = backtester.run()
    assert isinstance(results, list)

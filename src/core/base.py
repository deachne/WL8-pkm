from abc import ABC, abstractmethod
from typing import List, Optional, Dict, Any

class UserStrategyBase(ABC):
    """Base class for user-defined trading strategies"""
    
    def __init__(self):
        self._parameters: Dict[str, Any] = {}
        self._name: str = self.__class__.__name__
    
    @property
    def name(self) -> str:
        """Get strategy name"""
        return self._name
    
    @abstractmethod
    def execute(self) -> None:
        """Execute the trading strategy"""
        pass

class PlotBase(ABC):
    """Base class for plotting functionality"""
    
    def __init__(self):
        self._data: List[float] = []
        self._name: str = ""
    
    @property
    def data(self) -> List[float]:
        """Get plot data"""
        return self._data
    
    @abstractmethod
    def draw(self) -> None:
        """Draw the plot"""
        pass

class IndicatorBase(ABC):
    """Base class for technical indicators"""
    
    def __init__(self, name: str):
        self._name: str = name
        self._values: List[float] = []
    
    @property
    def values(self) -> List[float]:
        """Get indicator values"""
        return self._values
    
    @abstractmethod
    def calculate(self) -> None:
        """Calculate indicator values"""
        pass

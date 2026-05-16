from enum import Enum
from dataclasses import dataclass

class TransactionType(Enum):
    EXPENSE = 1
    INCOME = 2
    RETIREMENT = 3

@dataclass
class Transaction:
    date: str
    vendor: str
    amount: float
    category: str
    subCategory: str
    type: TransactionType

@dataclass
class UploadResponse:
    expenses: list[Transaction]
    income: list[Transaction]
    retirement: list[Transaction]



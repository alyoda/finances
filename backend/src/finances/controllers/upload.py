from finances.model.transactions import UploadResponse, Transaction, TransactionType
import io, csv

def serialize(t):
    return {**vars(t), "type": t.type.name}

async def handle_upload(transactions, retirement):
    expenses, income = await parse_transactions(transactions)
    retirement = await parse_retirement(retirement)
    return {
        "expenses": [serialize(t) for t in expenses],
        "income": [serialize(t) for t in income],
        "retirement": [serialize(t) for t in retirement]
    }

async def process_file(file):
    file_contents = await file.read()
    text = file_contents.decode("utf-8")
    lines = text.splitlines()
    start = next(i for i, line in enumerate(lines) if "Date" in line)
    return io.StringIO("\n".join(lines[start:]))

async def parse_transactions(file):
    contents = await process_file(file)
    reader = csv.DictReader(contents)

    income, expenses = [], []

    for row in reader:
        # End early because CSV from Fidelity is formatted weirdly
        if not row['Transaction Type']:
            break
        
        if row['Transaction Type'] == 'Income':
            income.append(Transaction(row['Date'], row['Description'], float(row['Amount (in $)']), row['Category'], row['Subcategory'], TransactionType.INCOME))
        else:
            expenses.append(Transaction(row['Date'], row['Description'], float(row['Amount (in $)']), row['Category'], row['Subcategory'], TransactionType.EXPENSE))

    return (expenses, income)


async def parse_retirement(file):
    contents = await process_file(file)
    reader = csv.DictReader(contents)
    retirement = []

    for row in reader:
        if not row['Description'] and not row['Amount ($)']:
            break
        print(row)
        retirement.append(Transaction(row['Run Date'], row['Description'], row['Amount ($)'], 'Retirement', row['Account'], TransactionType.RETIREMENT))
    
    return retirement

from fastapi import FastAPI, UploadFile

INCOME_PATH="/income.csv"
EXPENSES_PATH="/expenses.csv"


app = FastAPI()

@app.post("/upload")
async def upload(file: UploadFile):
    print("MADE IT TO THE BACKEND!!")
    contents = parse_transactions(file)
    return

def parse(transactions, retirement):

    # Parse the transaction file into two separate files, income.csv and expenses.csv
    parse_transactions(transactions)

    # If provided, add the retirement transactions to income.csv
    if retirement:
        parse_retirement(retirement)

def read_csv(file):
    with open(file, mode='r', newline='') as file:

        # Skip the first line
        next(file)

        # Attempt to parse as CSV
        reader = csv.DictReader(file)

        for row in reader:
            print(row)


def parse_transactions(file):
    with open(file, mode='r', newline='') as file, \
        open(INCOME_PATH, mode='w', newline='') as income_file, \
        open(EXPENSES_PATH, mode='w', newline='') as expenses_file:
        

        # Skip the first line
        next(file)

        # Attempt to parse as CSV
        reader = csv.DictReader(file)

        for row in reader:    
            # Write to correct CSV file
            if row['Transaction Type'] == 'Income':
                income_file.writerow(row)
            elif row['Transaction Type'] == 'Expenses':
                expenses_file.writerow(row)
            elif row['Transaction Type'] == None:
                # Exit early because Fidelity exports all this extra junk at the end
                break
            else:
                print("Unhandled transaction type for %s", row)
    return


def parse_retirement(file):
    read_csv(file)
    return

if __name__ == '__main__':
    parse()
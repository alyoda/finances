from fastapi import FastAPI, UploadFile
from finances.controllers.upload import handle_upload

app = FastAPI()

@app.post("/upload")
async def uploadRoute(transactions: UploadFile, retirement: UploadFile):
    return await handle_upload(transactions, retirement)

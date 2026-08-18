from fastapi import FastAPI

app = FastAPI(title="Unified AI Platform API", version="0.1.0")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Unified AI Platform API"}

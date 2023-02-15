import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import operations_controller

app = FastAPI()
app.include_router(operations_controller.router)
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])


@app.get("/")
async def root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run("main:app", host='0.0.0.0', port=8080, reload=True, workers=1)

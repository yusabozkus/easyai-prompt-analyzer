from fastapi import FastAPI
from pydantic import BaseModel
from prompt_analyzer.score import score

app = FastAPI()


class PromptRequest(BaseModel):
    prompt: str


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/score")
def score_endpoint(body: PromptRequest):
    return score(body.prompt)
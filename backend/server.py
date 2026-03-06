from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from prompt_analyzer.score import score
from estimate_token.estimate import calculate_ewk_dto

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PromptRequest(BaseModel):
    prompt: str


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/score")
def score_endpoint(body: PromptRequest):
    return score(body.prompt)


@app.post("/analyze")
def analyze(body: PromptRequest):
    dto = calculate_ewk_dto(body.prompt)
    return dto
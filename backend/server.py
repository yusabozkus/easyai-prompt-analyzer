from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from prompt_analyzer.score import score
from estimate_token.estimate import calculate_ewk_dto


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://easyai-prompt-analyzer.vercel.app"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PromptRequest(BaseModel):
    prompt: str


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/health")
def health_check(response: Response):
    response.headers["Cache-Control"] = "no-store"
    return {"status": "ok"}


@app.post("/score")
def score_endpoint(body: PromptRequest):
    return score(body.prompt)


@app.post("/analyze")
def analyze(body: PromptRequest):
    dto = calculate_ewk_dto(body.prompt)
    return dto
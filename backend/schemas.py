from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

# ============ REQUEST DTOs ============

class PromptRequest(BaseModel):
    """DTO para recibir el prompt del usuario"""
    prompt: str = Field(..., min_length=1, description="Texto del prompt a analizar")
    
    class Config:
        json_schema_extra = {
            "example": {
                "prompt": "Explica qué es machine learning de forma simple para un principiante"
            }
        }


# ============ FEATURE DTOs ============

class PromptFeatures(BaseModel):
    """DTO con las features extraídas del prompt"""
    char_len: int
    word_count: int
    sent_count: int
    avg_word_len: float
    avg_sent_len: float
    unique_words: int
    lexical_diversity: float
    has_question: int
    question_count: int
    has_code: int
    has_numbered_list: int
    has_bullet_list: int
    has_context: int
    has_explicit_task: int
    has_formatting_req: int
    has_role_play: int
    has_constraints: int
    has_examples: int
    log_char_len: float
    log_word_count: float
    optimal_score: float
    bad_signal: int
    too_short: int
    too_vague: int


# ============ ANALYSIS DTOs ============

class QualityScore(BaseModel):
    """DTO para el score de calidad del prompt"""
    score: float = Field(..., ge=0.0, le=1.0, description="Score de 0 a 1")
    rating: str = Field(..., description="Calidad interpretada: 'Poor', 'Fair', 'Good', 'Excellent'")
    
    class Config:
        json_schema_extra = {
            "example": {
                "score": 0.85,
                "rating": "Good"
            }
        }


class EnergyImpact(BaseModel):
    """DTO para el impacto energético del prompt"""
    estimated_tokens: int = Field(..., description="Tokens aproximados del prompt")
    estimated_kwh: float = Field(..., description="Consumo estimado en kWh")
    co2_grams: float = Field(..., description="Emisiones CO2 estimadas en gramos")
    equivalence: str = Field(..., description="Equivalencia interpretable")
    
    class Config:
        json_schema_extra = {
            "example": {
                "estimated_tokens": 150,
                "estimated_kwh": 0.00025,
                "co2_grams": 0.125,
                "equivalence": "Espacio equivalente a enviar 5 emails"
            }
        }


class PromptAnalysis(BaseModel):
    """DTO para el análisis completo del prompt"""
    prompt: str = Field(..., description="El prompt original analizado")
    quality: QualityScore
    energy: EnergyImpact
    features: PromptFeatures
    analysis_timestamp: datetime = Field(default_factory=datetime.now)
    
    class Config:
        json_schema_extra = {
            "example": {
                "prompt": "Explica cualquier cosa",
                "quality": {
                    "score": 0.75,
                    "rating": "Good"
                },
                "energy": {
                    "estimated_tokens": 50,
                    "estimated_kwh": 0.00008,
                    "co2_grams": 0.04,
                    "equivalence": "Equivalente a 1 email"
                },
                "features": {
                    "char_len": 100,
                    "word_count": 20,
                    "sent_count": 2,
                    "avg_word_len": 5.0,
                    "avg_sent_len": 10.0,
                    "unique_words": 18,
                    "lexical_diversity": 0.9,
                    "has_question": 0,
                    "question_count": 0,
                    "has_code": 0,
                    "has_numbered_list": 0,
                    "has_bullet_list": 0,
                    "has_context": 0,
                    "has_explicit_task": 1,
                    "has_formatting_req": 0,
                    "has_role_play": 0,
                    "has_constraints": 0,
                    "has_examples": 0,
                    "log_char_len": 4.6,
                    "log_word_count": 3.0,
                    "optimal_score": 0.9,
                    "bad_signal": 0,
                    "too_short": 0,
                    "too_vague": 0
                },
                "analysis_timestamp": "2025-03-05T10:30:00Z"
            }
        }


# ============ RESPONSE DTOs ============

class PromptResponse(BaseModel):
    """DTO de respuesta para el análisis completo"""
    id: Optional[int] = Field(None, description="ID único del análisis")
    analysis: PromptAnalysis
    created_at: datetime = Field(default_factory=datetime.now)
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": 123,
                "analysis": {
                    "prompt": "Ejemplo de prompt",
                    "quality": {"score": 0.8, "rating": "Good"},
                    "energy": {
                        "estimated_tokens": 100,
                        "estimated_kwh": 0.00016,
                        "co2_grams": 0.08,
                        "equivalence": "Equivalente a 3 emails"
                    },
                    "features": {},
                    "analysis_timestamp": "2025-03-05T10:30:00Z"
                },
                "created_at": "2025-03-05T10:30:00Z"
            }
        }


# ============ ERROR DTOs ============

class ErrorResponse(BaseModel):
    """DTO para respuestas de error"""
    error: str = Field(..., description="Mensaje de error")
    detail: Optional[str] = Field(None, description="Detalles adicionales del error")
    timestamp: datetime = Field(default_factory=datetime.now)
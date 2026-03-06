# Prompt Efficiency Model

## Overview
We trained an AI model to evaluate the efficiency of prompts.  
The model was trained using a dataset containing **100,000 prompt samples**.

The goal of the model is to determine how efficient or well-structured a prompt is.

## Dataset
For training, we used the following dataset:

https://huggingface.co/datasets/agentlans/prompt-quality

From this dataset, we specifically used the **`Transformed_Quality`** field.

## Quality Score
The `Transformed_Quality` value represents the quality of a prompt on a **scale from 0.0 to 1.0**.

- **0.0** → Very poor prompt quality  
- **1.0** → Highest possible prompt quality

This value was used as the **target label** during model training.

## Model Purpose
The trained AI model analyzes prompts and predicts a **quality score** based on the structure and efficiency of the prompt.

The output of the model is a score between **0.0 and 1.0**, which indicates how efficient the prompt is.

## Interpretation of the Score

| Score Range | Meaning |
|-------------|--------|
| 0.0 – 0.3 | Poor prompt quality |
| 0.3 – 0.6 | Average prompt quality |
| 0.6 – 0.8 | Good prompt quality |
| 0.8 – 1.0 | Excellent prompt quality |

## Summary
Using the prompt-quality dataset, we trained a machine learning model capable of evaluating the **efficiency and quality of prompts**.  
This allows automatic scoring and analysis of prompts based on learned patterns from the training data.
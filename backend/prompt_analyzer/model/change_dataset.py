import json

with open("quality.jsonl", "r", encoding="utf-8") as f:
    data = [json.loads(line) for line in f]

for item in data:
    transformed_quality = item["transformed_quality"]

    if transformed_quality > 0.5:
        item["transformed_quality"] += 0.15
    elif transformed_quality < 0.5:
        item["transformed_quality"] += 0.10

    item["transformed_quality"] = max(0, min(1, item["transformed_quality"]))

with open("quality_updated.jsonl", "w", encoding="utf-8") as f:
    for item in data:
        f.write(json.dumps(item) + "\n")

# with open("quality_updated.jsonl", "r", encoding="utf-8") as f:
#     for line in f:
#         item = json.loads(line) s
#         print(item['transformed_quality'])

print("Dataset updated and saved to quality_updated.jsonl")
# Technical Report: Environmental and Economic Impact of LLMs (2025/2026)

This report outlines the calculation methods for the water footprint and energy costs associated with Large Language Model (LLM) inference, based on current scientific benchmarks.

---

## 1. Water Consumption per Token (Direct & Indirect)

To calculate the water footprint, we utilize a conservative baseline derived from the leading research in AI sustainability. While modern efficiency measures vary, we apply a standard value of **0.5 ml per token** to account for both direct cooling and indirect water usage.

### The Calculation Formula
To determine the total water impact for any given AI interaction or project:

$$Water\,Consumption\,(ml) = Total\,Tokens \times 0.5\,ml$$

### Scientific Reference
* **Source:** Li, P., Yang, J., Islam, M. A., & Ren, S. (2023/2025 update). *Making AI Less "Thirsty": Uncovering and Addressing the Secret Water Footprint of AI Models*.
* **Context:** This value represents the "Water Usage Effectiveness" (WUE). It includes the water evaporated for cooling servers on-site (Scope 1) and the water consumed during electricity generation (Scope 2).

> **Example:** A response containing 1,000 tokens results in a consumption of 500 ml of water—equivalent to a standard 0.5L water bottle.

---

## 2. Electricity Cost Analysis and Calculation

The operational costs of AI infrastructure are primarily driven by energy consumption. Costs are calculated based on the energy required for inference multiplied by the global industrial average electricity price.

### The Cost Formula
Based on global data center pricing trends for 2025/2026, we utilize the following formula:

$$Total\,Cost\,(€) = Energy\,Consumed\,(kWh) \times 0.15\,€/kWh$$

### Price Benchmark (2025/2026 Status)
The value of **€0.15 per kWh** is a reliable global average for the industrial sector. While prices in regions like the EU (approx. €0.21 - €0.30) are higher, the global average is balanced by lower rates in North America (approx. €0.12) and the Middle East/Nordics (approx. €0.10).

| Region | Avg. Industrial Electricity Price |
| :--- | :--- |
| **Global AI Data Center Average** | **€0.15 / kWh** |
| North America | ~ €0.12 / kWh |
| European Union (Average) | ~ €0.21 / kWh |

### Data Sources for Electricity Pricing
* **IEA (International Energy Agency):** *Electricity 2025/2026 Analysis and Forecast*.
* **GlobalPetrolPrices (2025):** *Global Industrial Electricity Price Index*.
* **EESI (2026):** *Data Center Power Demands and Energy Rate Trends*.

---
*Generated on: March 6, 2026*
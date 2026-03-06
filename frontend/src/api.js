const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export async function checkHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`, { method: "GET" });
        if (!response.ok) return false;
        const data = await response.json();
        return data.status === "ok";
    } catch {
        return false;
    }
}

export async function fetchScore(prompt) {
    const response = await fetch(`${API_BASE_URL}/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
        throw new Error(`Score API error: ${response.status}`);
    }

    return response.json();
}

export async function fetchAnalysis(prompt) {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
        throw new Error(`Analyze API error: ${response.status}`);
    }

    return response.json();
}

export async function fetchAllData(prompt) {
    const [scoreData, analysisData] = await Promise.all([
        fetchScore(prompt),
        fetchAnalysis(prompt),
    ]);

    return { scoreData, analysisData };
}

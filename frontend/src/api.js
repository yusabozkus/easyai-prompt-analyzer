const API_BASE_URL = (
    import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

const HEALTH_RETRY_DELAYS = [0, 1500, 3000];

const wait = (milliseconds) => (
    new Promise((resolve) => setTimeout(resolve, milliseconds))
);

export async function checkHealth() {
    for (const retryDelay of HEALTH_RETRY_DELAYS) {
        if (retryDelay > 0) await wait(retryDelay);

        try {
            const response = await fetch(`${API_BASE_URL}/health`, {
                method: "GET",
                mode: "cors",
                cache: "no-store",
                headers: { Accept: "application/json" },
            });

            if (!response.ok) continue;

            const data = await response.json();
            if (String(data.status).toLowerCase() === "ok") return true;
        } catch {
            // Render may briefly reject requests while a free instance wakes up.
        }
    }

    return false;
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

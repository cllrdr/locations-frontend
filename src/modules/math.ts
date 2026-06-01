export function cosineSimilarity(vecA: number[], vecB: number[]): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }

    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function normalizeSimilarity(similarity: number, temperature: number = 0.5): number {
    // Temperature scaling для больше разброса значений
    // Меньше temperature = большее расхождение между близкими значениями
    const scaled = similarity / temperature;
    const softmax = Math.exp(scaled) / (Math.exp(scaled) + Math.exp(-scaled));
    return Math.round(softmax * 100);
}
import { useState, useRef, useEffect } from 'react';
import type { Locations } from '../modules/mock';
import { cosineSimilarity, normalizeSimilarity } from '../modules/math';

export interface IProcessedLocation extends Locations {
    score: number;
    isVisible: boolean;
    embedding?: number[];
}

export const useLocationSearch = (initialItems: Locations[]) => {
    const [items, setItems] = useState<IProcessedLocation[]>([]);
    const [imageEmbedding, setImageEmbedding] = useState<number[] | null>(null);
    const [ready, setReady] = useState(false);
    const [progress, setProgress] = useState(0);
    const [textEmbeddings, setTextEmbeddings] = useState<Record<number, number[]>>({});

    const workerRef = useRef<Worker | null>(null);

    // Инициализация worker'а и получение текстовых embeddings
    useEffect(() => {
        try {
            workerRef.current = new Worker(new URL('../workers/search.worker.ts', import.meta.url), {
                type: 'module'
            });

            workerRef.current.onmessage = (e) => {
                const { type, data } = e.data;
                console.log('Worker message received:', type, data);

                switch (type) {
                    case 'progress':
                        setProgress(data.progress || 0);
                        break;

                    case 'text_embeddings_ready':
                        console.log('Text embeddings ready, count:', Object.keys(data).length);
                        setTextEmbeddings(data);
                        setReady(true);
                        break;

                    case 'image_embedding_ready':
                        console.log('Image embedding ready, length:', data.length);
                        setImageEmbedding(data);
                        break;

                    case 'error':
                        console.error('Worker error:', data);
                        break;
                }
            };

            workerRef.current.onerror = (error) => {
                console.error('Worker error event:', error.message);
            };

            if (initialItems.length > 0) {
                const items_data = initialItems.map(item => ({
                    id: item.id || item.locationId,
                    description: item.shortDescription || item.description
                }));
                console.log('Sending items to worker:', items_data);
                workerRef.current.postMessage({ type: 'init', data: items_data });
            }
        } catch (error) {
            console.error('Failed to initialize worker:', error);
        }

        return () => workerRef.current?.terminate();
    }, [initialItems]);

    // Обновление items при изменении initialItems
    useEffect(() => {
        const processedItems = initialItems.map(item => ({
            ...item,
            score: 0,
            similarity: item.similarity || 0,
            isVisible: true,
            embedding: textEmbeddings[item.id || item.locationId]
        }));
        setItems(processedItems);
    }, [initialItems]);

    // Вычисление similarity и сортировка при получении image embedding
    useEffect(() => {
        if (!imageEmbedding || Object.keys(textEmbeddings).length === 0) return;

        setItems(prevItems => {
            const processed = prevItems.map(item => {
                const textEmbedding = textEmbeddings[item.id || item.locationId];

                if (!textEmbedding) {
                    return { ...item, score: 0, similarity: 0, isVisible: true };
                }

                const similarity = cosineSimilarity(imageEmbedding, textEmbedding);
                // Temperature = 0.3 дает больший разброс значений
                const similarityPercent = normalizeSimilarity(similarity, 0.3);

                console.log(`${item.locationName}: raw=${similarity.toFixed(3)}, percent=${similarityPercent}`);

                return {
                    ...item,
                    score: similarity,
                    similarity: similarityPercent,
                    isVisible: true
                };
            });

            processed.sort((a, b) => b.similarity - a.similarity);
            return processed;
        });
    }, [imageEmbedding, textEmbeddings]);

    const searchByImage = (file: File) => {
        console.log('Searching by image:', file.name);
        workerRef.current?.postMessage({ type: 'image', data: file });
    };

    const resetSearch = () => {
        setImageEmbedding(null);
        setItems(prev => {
            const reset = prev.map(item => ({
                ...item,
                score: 0,
                similarity: 0,
                isVisible: true
            }));
            reset.sort((a, b) => (a.id || a.locationId) - (b.id || b.locationId));
            return reset;
        });
    };

    return {
        items,
        ready,
        progress,
        imageEmbedding,
        searchByImage,
        resetSearch
    };
};

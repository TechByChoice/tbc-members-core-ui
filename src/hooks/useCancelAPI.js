import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useApiCancellation() {
    const abortControllerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        abortControllerRef.current = new AbortController();

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    const wrappedNavigate = (...args) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        navigate(...args);
    };

    return {
        signal: abortControllerRef.current?.signal,
        navigate: wrappedNavigate,
    };
}

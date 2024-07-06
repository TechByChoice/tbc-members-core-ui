import { useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useApiCall() {
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

    const makeApiCall = useCallback(async (url, options = {}) => {
        try {
            const response = await fetch(url, {
                ...options,
                signal: abortControllerRef.current.signal,
            });
            if (!response.ok) {
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('Fetch error:', error);
                throw error;
            }
        }
    }, []);

    return makeApiCall;
}

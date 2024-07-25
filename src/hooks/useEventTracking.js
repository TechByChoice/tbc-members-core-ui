import { useCallback, useEffect } from 'react';

const useEventTracker = () => {
    useEffect(() => {
        // Ensure Fathom is loaded
        if (typeof window.fathom === 'undefined') {
            console.warn('Fathom Analytics not loaded');
        }
    }, []);

    const trackEvent = useCallback((eventName, eventValue = 0) => {
        if (typeof window.fathom !== 'undefined') {
            // Fathom's trackGoal function expects an event ID (string) and a value (number)
            window.fathom.trackEvent(eventName, eventValue);
        } else {
            console.warn('Fathom Analytics not loaded, event not tracked:', eventName);
        }
    }, []);

    return trackEvent;
};

export default useEventTracker;

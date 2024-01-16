import { useStatus } from '../providers/MsgStatusProvider';

export function useStatusMessage() {
    const { setStatusType, setStatusMessage, setIsAlertOpen } = useStatus();

    const success = message => {
        setStatusType('success');
        setStatusMessage(message);
        setIsAlertOpen(true);
    };

    const error = message => {
        setStatusType('error');
        setStatusMessage(message);
        setIsAlertOpen(true);
    };

    const info = message => {
        setStatusType('info');
        setStatusMessage(message);
        setIsAlertOpen(true);
    };

    const hide = () => {
        setIsAlertOpen(false);
    };

    return {
        success, error, info, hide 
    };
}

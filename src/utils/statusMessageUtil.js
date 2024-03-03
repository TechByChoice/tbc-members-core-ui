import { useStatus } from '@/providers/MsgStatusProvider';

export const useStatusMessageSetter = () => {
    const { setStatusMessage } = useStatus();
    return setStatusMessage;
};

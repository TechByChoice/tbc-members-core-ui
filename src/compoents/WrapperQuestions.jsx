import React, { Suspense } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useStatusMessage } from '@/hooks/useStatusMessage';
import { useNavigate } from 'react-router-dom';

const SurveyQuestions = React.lazy(() => import('open_doors/SurveyQuestions'));
export default function WrapperQuestions() {
    const { user } = useAuth();
    const userId = user?.[0]?.user_info?.id;
    const statusMessage = useStatusMessage();
    const history = useNavigate();

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <SurveyQuestions history={history} statusMessage={statusMessage} userId={userId} />
            </Suspense>
        </>
    );
}

import React, { Suspense } from 'react';
import { useAuth } from '@/providers/AuthProvider';

const SurveyQuestions = React.lazy(() => import('open_doors/SurveyQuestions'));
export default function WrapperQuestions() {
    const { user } = useAuth();
    const userId = user?.[0]?.user_info?.id;

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <SurveyQuestions userId={userId} />
            </Suspense>
        </>
    );
}

import { getMemberData } from '@/api-calls';

function apiJoin(...endpoints) {
    return endpoints.join('/');
}

export const routes = {
    api: {
        base: import.meta.env.VITE_APP_API_BASE_URL,
        auth: {
            checkToken: localToken => apiJoin(routes.api.base, `reviews/check/${localToken}`),
            verifyToken: token => apiJoin(routes.api.base, `reviews/verify-token/${token}`),
            newMembers: {
                create: () => apiJoin(routes.api.base, 'user/new-member/profile/create'),
                profileData: () => apiJoin(routes.api.base, 'user/details/new-member'),
            },
        },
        events: { list: () => apiJoin(routes.api.base, 'event') },
        jobs: {
            list: () => apiJoin(routes.api.base, 'company/new/jobs/all-jobs'),
            pull: () => apiJoin(routes.api.base, 'company/pull/remote'),
            createReferral: () => apiJoin(routes.api.base, 'company/new/jobs/create-referral'),
            publish: id => apiJoin(routes.api.base, `company/new/jobs/${id}/referral/publish`),
            pause: id => apiJoin(routes.api.base, `company/new/jobs/${id}/referral/pause`),
            close: id => apiJoin(routes.api.base, `company/new/jobs/${id}/referral/closed`),
            activate: id => apiJoin(routes.api.base, `company/new/jobs/${id}/referral/active`),
            details: id => apiJoin(routes.api.base, `company/new/jobs/${id}/get-job`),
        },
        mentors: {
            list: () => apiJoin(routes.api.base, 'mentorship'),
            signup: {
                commitmentLevel: () => apiJoin(routes.api.base, 'mentorship/update/support'),
                career: () => apiJoin(routes.api.base, 'mentorship/update/career'),
                values: () => apiJoin(routes.api.base, 'mentorship/update/value'),
                profile: () => apiJoin(routes.api.base, 'mentorship/update/profile'),
            },
        },
        users: {
            signUp: () => apiJoin(routes.api.base, 'user/new'),
            updateProfile: () => apiJoin(routes.api.base, 'user/new-member/profile/create'),
            getProfile: () => apiJoin(routes.api.base, 'user/details/new-member'),
            connectWithMentor: id => apiJoin(routes.api.base, `mentorship/mentor/${id}/connect/roster/add`),
            getMemberData: id => apiJoin(routes.api.base, `member/member-details/${id}`),
            basicSystemInfo: () => apiJoin(routes.api.base, 'user/details/new-member'),
        },
    },
};

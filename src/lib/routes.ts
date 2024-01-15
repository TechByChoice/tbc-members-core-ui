function apiJoin(...endpoints) {
    return endpoints.join('/');
}

export const routes = {
    api: {
        base: import.meta.env.VITE_APP_API_BASE_URL,
        auth: {
            newMembers: {
                create: () => apiJoin(routes.api.base, 'user/new-member/profile/create'),
                profileData: () => apiJoin(routes.api.base, 'user/details/new-member'),
            },
        },
        events: {list: () => apiJoin(routes.api.base, 'event'),},
        jobs: {
            list: () => apiJoin(routes.api.base, 'company/new/jobs/all-jobs'),
            pull: () => apiJoin(routes.api.base, 'company/pull/remote'),
        },
    },
};

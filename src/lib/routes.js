function apiJoin(...endpoints) {
    return endpoints.join('/');
}

/** @type {Record<string, string>} routes */
export const routes = {
    api: {
        base: import.meta.env.VITE_APP_API_BASE_URL,
        auth: {
            newMembers: {
                create: apiJoin(routes.api.base, 'user/new-member/profile/create'),
                profileData: apiJoin(routes.api.base, 'user/details/new-member'),
            },
        },
    },
};

console.log(routes.api.auth.newMembers.create);

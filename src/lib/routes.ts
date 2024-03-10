import ConfirmAccountPage from '@/pages/onboarding/company/ConfirmAccountPage';

function apiJoin(...endpoints) {
    return endpoints.join('/');
}

export const routes = {
    api: {
        base: import.meta.env.VITE_APP_API_BASE_URL,
        talent: import.meta.env.VITE_APP_API_TALENT_CHOICE_URL,
        auth: {
            checkToken: localToken => apiJoin(routes.api.base, `reviews/check/${localToken}`),
            verifyToken: token => apiJoin(routes.api.base, `reviews/verify-token/${token}`),
            newMembers: {
                create: () => apiJoin(routes.api.base, 'user/new-member/profile/create'),
                profileData: () => apiJoin(routes.api.base, 'user/details/new-member'),
            },
        },
        events: { list: () => apiJoin(routes.api.base, 'event/') },
        jobs: {
            list: () => apiJoin(routes.api.base, 'company/new/jobs/all-jobs/'),
            createReferral: () => apiJoin(routes.api.base, 'company/new/jobs/create-referral/'),
            publish: id => apiJoin(routes.api.base, `company/new/jobs/${id}/referral/publish/`),
            pause: id => apiJoin(routes.api.base, `company/new/jobs/${id}/referral/pause/`),
            close: id => apiJoin(routes.api.base, `company/new/jobs/${id}/referral/closed/`),
            activate: id => apiJoin(routes.api.base, `company/new/jobs/${id}/referral/active/`),
            details: id => apiJoin(routes.api.base, `company/new/jobs/${id}/get-job/`),
            match: () => apiJoin(routes.api.base, 'company/new/jobs/job-match/'),
        },
        mentors: {
            list: () => apiJoin(routes.api.base, 'mentorship/'),
            signup: {
                commitmentLevel: () => apiJoin(routes.api.base, 'mentorship/update/support/'),
                career: () => apiJoin(routes.api.base, 'mentorship/update/career/'),
                values: () => apiJoin(routes.api.base, 'mentorship/update/value/'),
                profile: () => apiJoin(routes.api.base, 'mentorship/update/profile/'),
            },
            connect: {
                // We can add other paths here like booking sessions once cal.com integration is done
                add: id => apiJoin(routes.api.base, `mentorship/mentor/${id}/connect/roster/add`),
            },
            match: () => apiJoin(routes.api.base, 'mentorship/mentor-match/'),
            review: programId => apiJoin(routes.api.base, `mentorship/reviews/${programId}`),
            // TODO: this is the same as signup.profile
            updateDetails: () => apiJoin(routes.api.base, 'mentorship/update/profile/'),
            updateCalLink: () => apiJoin(routes.api.base, 'mentorship/update/calendar-link'),
            getDetails: details => apiJoin(routes.api.base, `mentorship/details/?fields=${details}`),
        },
        users: {
            signUp: () => apiJoin(routes.api.base, 'user/new/'),
            companySignUp: () => apiJoin(routes.api.base, 'user/new/company'),
            updateProfile: () => apiJoin(routes.api.base, 'user/new-member/profile/create'),
            getProfile: () => apiJoin(routes.api.base, 'user/details/new-member'),
            getUsersDetails: () => apiJoin(routes.api.base, 'user/details/'),
            connectWithMentor: id => apiJoin(routes.api.base, `mentorship/mentor/${id}/connect/roster/add`),
            getAllMembers: () => apiJoin(routes.api.base, `app/member/all/`),
            getAdmin: () => apiJoin(routes.api.base, `app/all-breakdowns/`),
            getMemberData: id => apiJoin(routes.api.base, `member/member-details/${id}/`),
            basicSystemInfo: () => apiJoin(routes.api.base, 'user/details/new-member'),
            basicSystemInfoUpdate: details => apiJoin(routes.api.base, `app/details/?fields=${details}`),
            updateAccountDetails: () => apiJoin(routes.api.base, 'user/profile/update/account-details'),
            updateProfileIdentity: () => apiJoin(routes.api.base, 'user/profile/update/idenity'),
            updateSkills: () => apiJoin(routes.api.base, 'user/profile/update/skills-roles'),
            profileNotifications: () => apiJoin(routes.api.base, 'user/profile/update/notifications'),
            socialAccounts: () => apiJoin(routes.api.base, 'user/profile/update/social-accounts'),
            workplace: () => apiJoin(routes.api.base, 'user/profile/update/work-place'),
        },
        announcements: { list: () => apiJoin(routes.api.base, 'user/details/announcement') },
        companies: {
            get: id => apiJoin(routes.api.base, `company-profile/companies/${id}/`),
            activateAccount: (id, token) => apiJoin(routes.api.base, `talent-choice/company/confirm-email/${id}/${token}/`),
            confirmAgreement: () => apiJoin(routes.api.base, `talent-choice/company/confirm-agreement/`),
        },
    },
};

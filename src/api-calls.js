import { routes } from '@/lib/routes';

export const getMemberData = async memberId => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
    };
    const response = await fetch(routes.api.users.getMemberData(memberId), {
        method: 'GET',
        headers: defaultHeaders,
    });
    return response.json();
};

export const getDropDrownItems = async details => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
    };

    const response = await fetch(routes.api.users.basicSystemInfoUpdate(details), {
        method: 'GET',
        headers: defaultHeaders,
    });
    return response.json();
};
export const getJobDetails = async jobId => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
    };

    const response = await fetch(routes.api.jobs.details(jobId), {
        method: 'GET',
        headers: defaultHeaders,
    });
    return response.json();
};
export const getCompanyDetails = async companyId => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
    };

    const response = await fetch(routes.api.companies.get(companyId), {
        method: 'GET',
        headers: defaultHeaders,
    });
    return response.json();
};
export const deleteCompanyProfile = async companyId => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
    };

    const response = await fetch(routes.api.admin.deleteCompany(companyId), {
        method: 'POST',
        headers: defaultHeaders,
    });
    return response.json();
};
export const deleteUser = async (userId, reason) => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
    };

    const response = await fetch(routes.api.admin.deleteUser(userId), {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({ reason }),
    });
    return response.json();
};
export const getChannels = async () => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
    };

    const response = await fetch(routes.api.admin.slack.getChannels(), {
        method: 'GET',
        headers: defaultHeaders,
    });
    return response.json();
};
export const postSlackQuestions = async (formData) => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
    };

    const response = await fetch(routes.api.admin.slack.postBulkChannelQuestions(), {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(formData)
    });
    return response.json();
};

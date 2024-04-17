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

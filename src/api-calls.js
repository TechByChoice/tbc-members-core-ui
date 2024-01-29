import { routes } from '@/lib/routes';

const API_BASE_URL = 'http://127.0.0.1:8000/reviews/';

export const getCompanyList = async () => {
    const response = await fetch(API_BASE_URL + 'companies/');
    return response.json();
};
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
    const response = await fetch(routes.api.jobs.details(jobId));
    return response.json();
};

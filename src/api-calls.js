import { routes } from '@/lib/routes';

const API_BASE_URL = 'http://127.0.0.1:8000/reviews/';

export const getCompanyList = async () => {
    const response = await fetch(API_BASE_URL + 'companies/');
    return response.json();
};
export const getMemberData = async memberId => {
    const response = await fetch(routes.api.users.getMemberData(memberId));
    return response.json();
};
export const getBasicSystemInfo = async memberId => {
    const response = await fetch(routes.api.users.basicSystemInfoUpdate());
    return response.json();
};
export const getDropDrownItems = async details => {
    const response = await fetch(routes.api.users.basicSystemInfoUpdate(details));
    return response.json();
};
export const getJobDetails = async jobId => {
    const response = await fetch(routes.api.jobs.details(jobId));
    return response.json();
};

const API_BASE_URL = 'http://127.0.0.1:8000/reviews/';
const API_BASE_URL_REAL = 'http://127.0.0.1:8000/';

export const getCompanyList = async () => {
    const response = await fetch(API_BASE_URL + 'companies/');
    return response.json();
};
export const getMemberData = async memberId => {
    const response = await fetch(API_BASE_URL_REAL + `member/member-details/${memberId}/`);
    return response.json();
};
export const getBasicSystemInfo = async memberId => {
    const response = await fetch(`${API_BASE_URL_REAL}user/details/new-member`);
    return response.json();
};
export const getJobDetails = async jobId => {
    const response = await fetch(`${API_BASE_URL_REAL}company/new/jobs/${jobId}/get-job/`);
    return response.json();
};

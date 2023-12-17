// Helper function to get cookie by name
// export const getCookie = (name) => {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// };

export const isValidToken = token => {
    const TOKEN_LENGTH = 64; // Replace with your token's length
    const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]+$/;

    return token.length === TOKEN_LENGTH && ALPHANUMERIC_REGEX.test(token);
};

export const handleUrlChange = event => {
    let inputValue = event.target.value;

    if (!inputValue.startsWith('http://') && inputValue !== '') {
        inputValue = 'http://' + inputValue;
    }

    return inputValue;
};

export default function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';')
        .shift();
}

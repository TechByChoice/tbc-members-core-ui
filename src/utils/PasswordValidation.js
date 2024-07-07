const MIN_PASSWORD_LENGTH = 8;
const COMMON_PASSWORDS = [
    'password',
    '12345678',
    'qwerty',
    '123456789'
];

/**
 * @param {string} password
 * @param {string} confirmPassword
 */

export function validatePassword(password, confirmPassword) {
    const errors = [];

    if (password !== confirmPassword) {
        errors.push('Passwords much match');
    }

    if (!password) {
        errors.push('Password cannot be empty');
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
        errors.push(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`);
    }

    if (COMMON_PASSWORDS.includes(password)) {
        errors.push('Password is too common');
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one digit');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }

    return errors;
}

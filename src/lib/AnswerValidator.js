export class AnswerValidator {
    /**
     * Validates an answer and sets an error message if it fails, or removes the error message if it passes.
     * Note: it mutates the errors object!
     * @example AnswerValidator.validate(answers, errors, 'name', 'Name is required.');
     *
     * @param {object} answers
     * @param {object} errors
     * @param {string} itemName
     * @param {string} failureMessage
     * @returns {boolean}
     */
    static validate(answers, errors, itemName, failureMessage) {
        if (!answers[itemName]) {
            errors[itemName] = failureMessage;
            return false;
        }

        if (typeof answers[itemName] !== 'undefined') {
            delete errors[itemName];
        }

        return true;
    }

    /**
     * Validate many items at once using a map of item names to failure messages.
     * @example AnswerValidator.validateMany(answers, errors, { 'name': 'Name is required.', 'age': 'Age is required.' });
     *
     * @param {object} answers
     * @param {object} errors
     * @param {Record<string, string>} itemMap
     * @returns {boolean}
     */
    static validateMany(answers, errors, itemMap) {
        let result = true;

        Object.keys(itemMap).forEach(itemName => {
            result &= this.validate(answers, errors, itemName, itemMap[itemName]);
        });

        return result;
    }
}

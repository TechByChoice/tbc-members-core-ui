export class AnswerValidator {
    /**
     * Validates an answer and sets an error message if it fails, or removes the error message if it passes.
     * To validate an answer, the `answers[name]` value must be truthy. If validation fails, the `errors[name]` value
     * will be set to the `failureMessage` value.
     *
     * Note: it mutates the `errors` argument!
     *
     * @example if (! AnswerValidator.validate(answers, errors, 'name', 'Name is required.')) { console.log(errors); }
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
     * To validate an answer, the `answers[name]` value must be truthy. If validation fails, the `errors[name]` value
     * will be set to the `failureMessage` value.
     * Note: it mutates the `errors` argument!
     *
     * @see AnswerValidator.validate
     * @example if (! AnswerValidator.validateMany(answers, errors, { name: 'Name is required.', age: 'Age is required.' })) { console.log(errors); }
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

const ValidDigits = '0123456789';
const ValidCharacters = 'abcdefghijklmnopqrstuvwxyz';
const ValidUppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ValidSpecialCharacters = '.,/-&?$#@!*<>';

const blockGenerator = (length = 14, charset) => {
    let text = "";
    for (let i = 0; i < length; i++) {
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return text;
}

const validate = (length, uppercase, digits, special) => {

    if (isNotInteger(length)) {
        return "password length should be integer";
    }

    if (isNotInteger(uppercase) || uppercase < 0) {
        return "number of uppercase characters should be positive integer";
    }

    if (isNotInteger(digits) || digits < 0) {
        return "number of digits should be positive integer";
    }

    if (isNotInteger(special) || special < 0) {
        return "number of special characters should be positive integer";
    }
    const chars = length - uppercase - digits - special;

    if (length < 8) {
        return "minimal password length is 8 characters";
    }

    if (chars < 0) {
        return `password length cannot be less than ${uppercase + digits + special}`;
    }
}

const isNotInteger = (data) => {
    if (typeof data === 'number') {
        const remainder = (data % 1);
        if (remainder === 0) {
            return false
        }
    };
    return true;
}

const shuffle = (str) => {
    let a = str.split("")
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a.join("");
}

const generate = (length = 14, uppercase = 1, digits = 1, special = 1) => {
    const pass = {};

    const errorMessage = validate(length, uppercase, digits, special)
    if (errorMessage) {
        pass.success = false;
        pass.errorMessage = errorMessage;
        return pass;
    }

    const password = blockGenerator(uppercase, ValidUppercaseCharacters) +
        blockGenerator(digits, ValidDigits) +
        blockGenerator(special, ValidSpecialCharacters) +
        blockGenerator(length - uppercase - digits - special, ValidCharacters);
    pass.success = true;
    pass.password = shuffle(password);
    return pass;
}

module.exports = {
    generate
}
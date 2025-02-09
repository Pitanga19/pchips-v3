// pchips-v3/client/js/script.js

const socket = io();    // Client web socket

// ---------------- GLOBAL SCRIPTS  ---------------------------- //
const clearInputs = (inputList) => {
    inputList.forEach(i => {
        i.value = '';
    });
};

const clearLogs = (logList) => {
    logList.forEach(l => {
        l.innerHTML = '';
    });
};

const printInputs = (inputList) => {
    inputList.forEach(i => {
        console.log(i.value);
    });
};

const printCheckboxes = (checkboxList) => {
    checkboxList.forEach(cb => {
        console.log(cb.checked);
    });
};

// ---------------- REGISTER SCRIPTS    ------------------------ //
const registerForm = document.getElementById('register-form');
const registerUsernameInput = document.getElementById('register-username-input');
const registerUsernameLog = document.getElementById('register-username-log');
const registerEmailInput = document.getElementById('register-email-input');
const registerEmailLog = document.getElementById('register-email-log');
const registerPasswordInput = document.getElementById('register-password-input');
const registerPasswordLog = document.getElementById('register-password-log');
const registerRepeatPasswordInput = document.getElementById('repeat-password-input');
const registerRepeatPasswordLog = document.getElementById('register-repeat-password-log');
const registerSubmitButton = document.getElementById('register-submit');
const registerBackButton = document.getElementById('register-back');

const registerInputs = [registerUsernameInput, registerEmailInput, registerPasswordInput, registerRepeatPasswordInput];
const registerLogs = [registerUsernameLog, registerEmailLog, registerPasswordLog, registerRepeatPasswordLog];

const registerFormSubmit = () => {
    const username = registerUsernameInput.value;
    const email = registerEmailInput.value;
    const password = registerPasswordInput.value;
    const repeatPassword = registerRepeatPasswordInput.value;

    fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, repeatPassword }),
    })
    .then(response => response.json())
    .then(({ user, errors, message }) => {
        let userLog;
        let errorsLog = '';

        user ? userLog = JSON.stringify(user) : userLog = user;
        if (errors) { errors.forEach(e => {
            const errorLog = document.getElementById(`register-${e.field}-log`);
            errorLog.classList.add('error')
            errorLog.innerHTML = `${(e.message)}`;
            errorsLog += `\n${JSON.stringify(e)}`;
        })} else { errorsLog = errors };
        if (user) {
            alert('Successfully Register! :D');
            clearInputs(registerInputs);
        };
        console.log(`[Script.js] user: ${userLog}`);
        console.log(`[Script.js] errors: ${errorsLog}`);
        console.log(`[Script.js] message: ${message}`);
    });
};

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    printInputs(registerInputs);
    clearLogs(registerLogs);
    registerFormSubmit();
})

// ---------------- LOGIN SCRIPTS   ---------------------------- //
const loginForm = document.getElementById('login-form');
const loginUsernameInput = document.getElementById('login-username-input');
const loginUsernameLog = document.getElementById('login-username-log');
const loginPasswordInput = document.getElementById('login-password-input');
const loginPasswordLog = document.getElementById('login-password-log');
const loginSubmitButton = document.getElementById('login-submit');
const loginRegisterButton = document.getElementById('login-register');
const loginVerifyButton = document.getElementById('login-verify');

const loginInputs = [loginUsernameInput, loginPasswordInput];
const loginLogs = [loginUsernameLog, loginPasswordLog];

const loginFormSubmit = () => {
    const username = loginUsernameInput.value;
    const password = loginPasswordInput.value;

    fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }), // Convertimos a string para poder enviar en el POST
    })
    .then(response => response.json())
    .then(({ user, errors, message }) => {
        let userLog;
        let errorsLog;

        user ? userLog = JSON.stringify(user) : userLog = user;
        if (errors) { errors.forEach(e => {
            const errorLog = document.getElementById(`login-${e.field}-log`);
            errorLog.classList.add('error')
            errorLog.innerHTML = `${(e.message)}`;
            errorsLog += `\n${JSON.stringify(e)}`;
        })} else { errorsLog = errors };
        if (user) {
            alert('Successfully Login! :D');
            clearInputs(loginInputs);
        };
        console.log(`[Script.js] user: ${userLog}`);
        console.log(`[Script.js] errors: ${errorsLog}`);
        console.log(`[Script.js] message: ${message}`);
    })
};

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    printInputs(loginInputs);
    clearLogs(loginLogs);
    loginFormSubmit();
});

// ---------------- RECOVERY SCRIPTS    ------------------------ //
const recoverForm = document.getElementById('recover-form');
const recoverUsernameCheckbox = document.getElementById('recover-username-checkbox');
const recoverEmailCheckbox = document.getElementById('recover-email-checkbox');
const recoverInput = document.getElementById('recover-input');
const recoverFindedTypeLog = document.getElementById('recover-finded-type-log');
const recoverFindedValueLog = document.getElementById('recover-finded-value-log');
const recoverUsernameLog = document.getElementById('recover-username-log');
const recoverEmailLog = document.getElementById('recover-email-log');
const recoverSubmitButton = document.getElementById('recover-submit');
const recoverBackButton = document.getElementById('recover-back');

const recoverInputs = [recoverInput];
const recoverLogs = [recoverFindedTypeLog, recoverFindedValueLog, recoverUsernameLog, recoverEmailLog];
const recoverCheckboxes = [recoverUsernameCheckbox, recoverEmailCheckbox];

const switchCheckboxes = (desactiveCheckboxes) => {
    desactiveCheckboxes.forEach(cb => cb.checked = false);
};

recoverUsernameCheckbox.addEventListener('change', () => {
    if (recoverUsernameCheckbox.checked) {
        switchCheckboxes([recoverEmailCheckbox]);
    };
});

recoverEmailCheckbox.addEventListener('change', () => {
    if (recoverEmailCheckbox.checked) {
        switchCheckboxes([recoverUsernameCheckbox]);
    };
});

const recoverFormSubmit = () => {
    let findedType = 'null';
    const findedValue = recoverInput.value;
    const recoverUsernameChecked = recoverUsernameCheckbox.checked;
    const recoverEmailChecked = recoverEmailCheckbox.checked;
    
    if (recoverUsernameChecked) findedType = 'username';
    if (recoverEmailChecked) findedType = 'email';
    
    console.log('finded type:', findedType);
    fetch('/api/auth/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ findedType, findedValue }), // Convertimos a string para poder enviar en el POST
    })
    .then(response => response.json())
    .then(({ user, errors, message }) => {
        let userLog;
        let errorsLog;

        console.log(`errors: ${JSON.stringify(errors)}`)

        user ? userLog = JSON.stringify(user) : userLog = user;
        if (errors) { errors.forEach(e => {
            console.log('error field: ',e.field)
            const errorLog = document.getElementById(`recover-${e.field}-log`);
            errorLog.classList.add('error')
            errorLog.innerHTML = `${(e.message)}`;
            errorsLog += `\n${JSON.stringify(e)}`;
        })} else { errorsLog = errors };
        if (user) {
            alert('Successfully Recover! :D');
            clearInputs(loginInputs);
        };
        console.log(`[Script.js] user: ${userLog}`);
        console.log(`[Script.js] errors: ${errorsLog}`);
        console.log(`[Script.js] message: ${message}`);
    })
};

recoverForm.addEventListener('submit', (e) => {
    e.preventDefault();

    printInputs(recoverInputs);
    printCheckboxes(recoverCheckboxes);
    clearLogs(recoverLogs);
    recoverFormSubmit();
});

// ---------------- LOGIN SCRIPTS   ---------------------------- //
// pchips-v3/client/js/script.js

const socket = io();    // Client web socket
let lsUser;

// ---------------- GLOBAL SCRIPTS  ---------------------------- //

const updateLsUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    lsUser = JSON.parse(localStorage.getItem('user'));
};

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

const hideAll = (itemsList) => {
    itemsList.forEach(i => i.classList.add('invisible'));
};

const showItem = (item) => {
    item.classList.remove('invisible');
};

const navigateToScreen = (screen) => {
    hideAll(allScreens);
    showItem(screen);
};

// ---------------- CONTAINERS  -------------------------------- //
const registerScreen = document.getElementById('register-container');
const loginScreen = document.getElementById('login-container');
const recoverScreen = document.getElementById('recover-container');
const menuScreen = document.getElementById('menu-container');
const profileScreen = document.getElementById('profile-container');
const friendsScreen = document.getElementById('friends-container');
const friendToPartyScreen = document.getElementById('friend_to_party-container');
const newFriendScreen = document.getElementById('new_friend-container');
const partiesScreen = document.getElementById('parties-container');
const partyScreen = document.getElementById('party-container');
const partyAddFriendScreen = document.getElementById('party_add_friend-container');
const createNewPartyScreen = document.getElementById('create_new_party-container');
const settingsScreen = document.getElementById('settings-container');
const gameScreen = document.getElementById('game-container');
const allScreens = [registerScreen, loginScreen, recoverScreen, menuScreen, profileScreen, friendsScreen, friendToPartyScreen, newFriendScreen, partiesScreen, partyScreen, partyAddFriendScreen, createNewPartyScreen, settingsScreen, gameScreen];

// ---------------- INIT FUNCTIONS  ---------------------------- //

localStorage.removeItem('user');
navigateToScreen(loginScreen);

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
const registerBackButton = document.getElementById('register-back-button');

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
            navigateToScreen(menuScreen);
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
});

registerBackButton.addEventListener('click', e => {
    e.preventDefault();
    navigateToScreen(loginScreen);
});

// ---------------- LOGIN SCRIPTS   ---------------------------- //
const loginForm = document.getElementById('login-form');
const loginUsernameInput = document.getElementById('login-username-input');
const loginUsernameLog = document.getElementById('login-username-log');
const loginPasswordInput = document.getElementById('login-password-input');
const loginPasswordLog = document.getElementById('login-password-log');
const loginSubmitButton = document.getElementById('login-submit');
const loginRegisterButton = document.getElementById('login-register-button');
const loginRecoverButton = document.getElementById('login-recover-button');
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
            updateLsUser(user);
            clearInputs(loginInputs);
            navigateToScreen(menuScreen);
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

loginRegisterButton.addEventListener('click', e => {
    e.preventDefault();
    navigateToScreen(registerScreen);
});

loginRecoverButton.addEventListener('click', e => {
    e.preventDefault();
    navigateToScreen(recoverScreen);
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
const recoverBackButton = document.getElementById('recover-back-button');

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
            navigateToScreen(loginScreen);
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

recoverBackButton.addEventListener('click', e => {
    e.preventDefault();
    navigateToScreen(loginScreen);
});

// ---------------- MENU SCRIPTS    ---------------------------- //
menuNewGameButton = document.getElementById('menu-new_game-button');
menuPartiesButton = document.getElementById('menu-parties-button');
menuFriendsButton = document.getElementById('menu-friends-button');
menuProfileButton = document.getElementById('menu-profile-button');

menuNewGameButton.addEventListener('click', e => {
    e.preventDefault();
    navigateToScreen(settingsScreen);
});

menuPartiesButton.addEventListener('click', e => {
    e.preventDefault();
    navigateToScreen(partiesScreen);
});

menuFriendsButton.addEventListener('click', e => {
    e.preventDefault();
    navigateToScreen(friendsScreen);
});

menuProfileButton.addEventListener('click', e => {
    e.preventDefault();
    updateProfileInfo();
    navigateToScreen(profileScreen);
});


// ---------------- PROFILE SCRIPTS ---------------------------- //
const profileUsernameStrong = document.getElementById('profile-username-strong');
const profileNewUsernameInput = document.getElementById('profile-new_username-input');
const profileEditUsernameButton = document.getElementById('profile-edit_username-button');
const profileConfirmEditUsernameButton = document.getElementById('profile-confirm_edit_username-button');
const profileEmailStrong = document.getElementById('profile-email-strong');
const profileNewEmailInput = document.getElementById('profile-new_email-input');
const profileEditEmailButton = document.getElementById('profile-edit_email-button');
const profileConfirmEditEmailButton = document.getElementById('profile-confirm_edit_email-button');
const profileLogOutButton = document.getElementById('profile-log_out-button');
const profileBackButton = document.getElementById('profile-back-button');

const updateProfileInfo = () => {
    profileUsernameStrong.innerHTML = lsUser.username;
    profileEmailStrong.innerHTML = lsUser.email;
};

profileLogOutButton.addEventListener('click', e => {
    e.preventDefault();
    updateLsUser('');
    navigateToScreen(loginScreen);
});

profileBackButton.addEventListener('click', e => {
    e.preventDefault();
    navigateToScreen(menuScreen);
});

// ---------------- LOGIN SCRIPTS   ---------------------------- //
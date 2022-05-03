// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'normal',
    'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
        console.log('send verification code');
        //sendVerificationCode('+213550200150');
    },
    'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
    }
});

recaptchaVerifier.render().then((widgetId) => {
    window.recaptchaWidgetId = widgetId;
})

function sendVerificationCode(phoneNumber) {
    return new Promise(resolve => {
        const appVerifier = window.recaptchaVerifier;
        auth.signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
            const sentCodeId = confirmationResult.verificationId;
            resolve(sentCodeId);
        })
    });
}

function signInWithPhone(sentCodeId, code){

    return new Promise(resolve => {
        const credential = firebase.auth.PhoneAuthProvider.credential(sentCodeId, code);
        auth.signInWithCredential(credential).then((userCredential) => {
            resolve(true);
        }).catch(error => {
            resolve(false);
        });
    });
}
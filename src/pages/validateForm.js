export const validateSignup = (formValues) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!formValues.username) {
        errors.username = "Username is required";
    }
    if (!formValues.email) {
        errors.email = "Email is required";
    } else if (!regex.test(formValues.email)) {
        errors.email = "Email is invalid";
    }
    if (!formValues.password) {
        errors.password = "Password is required";
    } else if (formValues.password.length < 5) {
        errors.password = "Password is too short";
    } 
    if (!formValues.cpassword) {
        errors.cpassword = "Confirm Password required";
    }
    if (formValues.password !== formValues.cpassword) {
        errors.cpassword = "Passwords must match";
    }
   

    return errors;
}

export const validateLogin = (formValues) => {
    const errors = {};

    if (!formValues.email) {
        errors.email = "Email is required";
    }
    if (!formValues.password) {
        errors.password = "Password is required";
    }

    return errors;
}
export const Validateapplication = (applicationValues,filename) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const numreg = /^\(?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (!applicationValues.username) {
        errors.username = "Username is required";
    }
    if (!applicationValues.coursetype) {
        errors.coursetype = "Course type is required";
    }
    if (!applicationValues.email) {
        errors.email = "Email is required";
    } else if (!regex.test(applicationValues.email)) {
        errors.email = "Email is invalid";
    }
    if (!filename) { 
        errors.filename = "Photo is required";
    }
    if (!applicationValues.phoneno) {
        errors.phoneno = "Phone Number is required";
    } else if (!numreg.test(applicationValues.phoneno)) {
        errors.phoneno = "Phone Number is invalid";
    }
    if (!applicationValues.batch) {
        errors.batch = "Batch is required";
    }
    if (!applicationValues.startingdate) {
        errors.startingdate = "Starting date is required";
    }
    return errors;
}

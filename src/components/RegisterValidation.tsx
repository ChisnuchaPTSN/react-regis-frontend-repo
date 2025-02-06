interface Errors {
    name?: string;
    email?: string;
    password?: string;
}

function Validation(formData: { name: string; email: string; password: string }, context: string) {
    let errors: Errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (context === 'nameEmail') {
        // name
        if (formData.name === '') {
            errors.name = 'Name is required';
        }

        // email
        if (formData.email === '') {
            errors.email = 'Email is required';
        } else if (!emailPattern.test(formData.email)) {
            errors.email = 'Invalid email format';
        }
    }

    if (context === 'password') {
        // password
        if (formData.password === '') {
            errors.password = 'Password is required';
        } else if (!passwordPattern.test(formData.password)) {
            errors.password = 'Password must be at least 8 characters long and contain both letters and numbers';
        }
    }

    return errors;
}


export default Validation;
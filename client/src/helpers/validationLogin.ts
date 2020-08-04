function validation(user: string, pass: string): string[] {
    const error: string[] = [];

    if (!user) {
        error.push('User is not be empty!');
    }

    if (!pass) {
        error.push('Password is not be empty!');
    }

    return error;
}

export default validation;

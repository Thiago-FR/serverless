export const saveEmail = (email) => {
    localStorage.setItem('email', email);
}

export const getEmail = (email) => {
    const result = localStorage.getItem(email);

    return result;
}
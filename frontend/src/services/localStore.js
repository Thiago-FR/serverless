export const saveLocalStore = (key, value) => {
    localStorage.setItem(key, value);
}

export const getLocalStore = (key) => {
    const result = localStorage.getItem(key);

    return result;
}

export const cleanLocalStore = () => {
    localStorage.clear();
}
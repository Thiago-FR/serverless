export const getData = async (email, ano) => {
    const data = await fetch('http://localhost:3001/role',
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            ano
        })
    }).then(response => response.json()).then((data) => data);

    return data;
}

export const auth = async (email) => {
    const data = await fetch('http://localhost:3001/login',
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
        })
    }).then(response => response.json()).then((data) => data);

    return data;
}
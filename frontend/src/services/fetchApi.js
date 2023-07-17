const HOST_ENV = process.env.REACT_APP_HOST;

export const getData = async (email, ano) => {
    const data = await fetch(`${HOST_ENV}/role`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS"
        },
        body: JSON.stringify({
            email,
            ano
        })
    }).then(response => response.json()).then((data) => data);

    return data;
}

export const auth = async (email) => {
    const data = await fetch(`${HOST_ENV}/login`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify({
            email,
        })
    }).then(response => response.json()).then((data) => data);

    return data;
}
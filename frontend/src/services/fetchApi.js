const HOST_ENV = process.env.REACT_APP_HOST;

const POST = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
    },
}

export const getData = async (email, year) => {
    const data = await fetch(`${HOST_ENV}/role`,
    {
        ...POST,

        body: JSON.stringify({
            email,
            year
        })
    }).then(response => response.json()).then((data) => data);

    return data;
}

export const auth = async (email) => {
    const data = await fetch(`${HOST_ENV}/login`,
    {
        ...POST,
        
        body: JSON.stringify({
            email,
        })
    }).then(response => response.json()).then((data) => data)
    .catch(() => ({ status: 'null' }));

    return data;
}
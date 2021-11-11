export async function put(path, body) {
    const result = await fetch(path, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const { error, ...responseBody } = await result.json();
    if (error) {
        throw error;
    }
    return responseBody;
}

export async function post(path, body) {
    const result = await fetch(path, {
        method: "POST", 
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const { error, ...responseBody } = await result.json();
    if (error) {
        throw error;
    }
    return responseBody;
}
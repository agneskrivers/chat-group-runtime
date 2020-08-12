interface ResponseDataInterface {
    signup?: boolean;
    login?: boolean;
    message?: string;
    token?: string;
    data?: {
        id: string;
        fullName: string;
        user: string;
        avatar: string;
        isAdmin: boolean;
    };
}

interface BodyDataInterface {
    user: string;
    pass: string;
    fullName?: string;
    keep?: boolean;
}

export default async function FetchAPI(
    url: string,
    user: string,
    pass: string,
    fullName?: string,
    keep?: boolean,
): Promise<ResponseDataInterface> {
    let bodyData: BodyDataInterface;

    if (fullName) {
        bodyData = {
            user,
            pass,
            fullName,
        };
    } else {
        bodyData = { user, pass };
    }

    if (keep) {
        bodyData = { ...bodyData, keep };
    }

    const respone = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
    });
    const body = await respone.json();

    return body;
}

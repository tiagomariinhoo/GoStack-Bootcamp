interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    };
}

export function signIn(): Promise<Response> {
    /**
     * Just to simulate an api call
     * Every api call returns a promise
     * 
     * This can be done by axios as well
     */
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: 'aosidjaosijaodiasjeoiasasdase',
                user: {
                    name: 'Tiago',
                    email: 'tiago@marinho.com'
                }
            })
        }, 2000)
    })
}
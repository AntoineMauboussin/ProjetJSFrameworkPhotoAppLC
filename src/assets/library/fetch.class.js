class FetchRequest {

    constructor(url, method, data = null) {
        this.url = url;
        this.method = method;
        this.data = data;

        this.options = undefined;

        this.init();
    }

    init() {
        if (this.method === 'GET' || this.method === 'DELETE') {
            this.options = { method: this.method }
        }
        else if (this.method === 'POST' || this.method === 'PUT') {
            this.options = {
                headers: { 'Content-type': 'application/json' },
                method: this.method,
                body: JSON.stringify(this.data)
            }
        }
    }

    sendRequest() {
        return new Promise((resolve, reject) => {
            fetch(this.url, this.options).then(
                resp => {
                    if (Response.ok === false) {
                        return reject(resp);
                    }
                    else{
                        return resp.json();
                    }
                }
            ).then(
                resp => {return resolve(resp)}
            ).catch(
                fetchError => {return reject(fetchError)}
            )
        })
    }
}

export default FetchRequest;
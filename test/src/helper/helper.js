export const Fetch = (url, callback) => {
    fetch(url)
        .then((response) => {
            // if (!response.ok) {
            //     throw new Error(response.statusText)
            // }
            try {
                return response.json();
            } catch (err) {
                throw new Error(response.statusText);
            }
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            throw error;
        });
};

export const SaveToLocalStorage = (objectName, state) => {
    try {
        localStorage.setItem(objectName, JSON.stringify(state));
    } catch (e) {
        console.error(e);
    }
};

export const ReadFromLocalStorage = (objectName) => {
    try {
        const stateStr = localStorage.getItem(objectName);
        return stateStr ? JSON.parse(stateStr) : undefined;
    } catch (e) {
        console.error(e);
        return undefined
    }
};
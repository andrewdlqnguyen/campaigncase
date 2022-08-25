/**
 * fetching function to hit API endpoint and receive json data.
 * @param {*} url passed in url endpoint/API for calling
 * @param {*} callback function to run after response is given
 */
export const Fetch = (url, callback) => {
    fetch(url)
        .then((response) => {
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

/**
 * Used to save to local store for session cache. Users can go back to where they left off
 * @param {*} objectName localStorage name
 * @param {*} state  localStorage value
 */
export const SaveToLocalStorage = (objectName, state) => {
    try {
        localStorage.setItem(objectName, JSON.stringify(state));
    } catch (e) {
        console.error(e);
    }
};

/**
 * Used to read local store from session cache. Users can go back to where they left off
 * @param {*} objectName  localStorage name saved
 * @returns Json data
 */
export const ReadFromLocalStorage = (objectName) => {
    try {
        const stateStr = localStorage.getItem(objectName);
        return stateStr ? JSON.parse(stateStr) : undefined;
    } catch (e) {
        console.error(e);
        return undefined
    }
};
export const Fetch = (url, callback) => {
    fetch(url)
        .then((response) => {
            // if (!response.ok) {
            //     throw new Error(response.statusText)
            // }

            console.log("fetching....", response)
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
export default function readJsonFromServer(u, cb) {
    window.fetch(u)
        .then(
            //Response Data convert to Json
            resData => resData.json()
        )
        .then(
            myData => cb(myData))
        .catch((error) => console.error(error));
}
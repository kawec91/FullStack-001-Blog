export default function readTextFromServer(u, cb) {
    window.fetch(u)
        .then(
            //Response Data convert to text
            resData => resData.text())
        .then(
            myData => cb(myData))
        .catch((error) => console.error(error));
}
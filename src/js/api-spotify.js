const clientId = 'a855215f8cbf4ceaaf44cf22753885b0';
const clientSecret = '469c7c0587ba45fd932e5499564d8b95';

let myToken = localStorage.getItem("token")
console.log("token:", myToken)
if (!myToken) {
    getToken()
}

function getToken() {

    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': ' Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.access_token)
            let myToken = data.access_token;
            localStorage.setItem("token", myToken);
        })

};



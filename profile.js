//require https module
const https = require('https');
//require http module for status code
const http = require('http');
//const username = "chalker"

//print Error Messages
function printError(error){
    console.error(error.message);
}

// output message
function printMessage(username, badgeCount, points){
    const message = `${username} has ${badgeCount} and ${points} in Javascripts`;
    console.log(message);
}

function get(username) {
    try {
        const request = https.get(`https://teamtreehouse.com/${username}.json`, response =>{
            if (response.statusCode == 200){
                let body = "";
                //read the data
                response.on('data', data => {
                    body += data.toString();
                });

                response.on('end', () => {
                    try {
                        // Parse the data
                        const profile = JSON.parse(body);
                        //print the data
                        printMessage(username, profile.badges.length, profile.points.JavaScript);
                    }catch (error){
                        printError(error);
                    }
                });
            }else{
                const message = `There was an error getting ${username} (${http.STATUS_CODES[response.statusCode]})`;
                const statusCodeError = new Error(message);
                printError(statusCodeError);
            }

            request.on('error', printError);

        });
    } catch(error){
        printError(error);
    }
}

module.exports.get = get;
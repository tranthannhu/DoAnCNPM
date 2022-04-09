/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const axios = require('axios');

const profile = require('./src/database/data/profile.json');
// const profile = JSON.parse(JSON.stringify(ip));


async function laydulieu() {
    for (let i = 0; i < profile.length; i++) {
        response = await axios.get('https://www.googleapis.com/customsearch/v1', {
            params: {
                key: 'AIzaSyDs8lFZs2mfYvSIK9PA5WQNKe3NVrIflqw',
                cx: '203353cf8942c48c9',
                searchType: 'image',
                q: profile[i].name + ' logo'
            }
        });

        // console.log(response.data.items[0]);
        if (response.data.items) {
            // console.log(response.data.items[0].link);
            profile[i].logoImage = response.data.items[1].link;
        }
        else console.log(profile[i].name, 'not found');
    };
    console.log(profile);
    fs.writeFile('profile.json', JSON.stringify(profile), (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
}

laydulieu();



// let i = 1;

// axios.get('https://www.googleapis.com/customsearch/v1', {
//         params: {
//             key: 'AIzaSyDs8lFZs2mfYvSIK9PA5WQNKe3NVrIflqw',
//             cx: '203353cf8942c48c9',
//             searchType: 'image',
//             q: profile[i].name + ' logo'
//         }
//     }).then((response) => {
//         console.log(response.data.items[0]);
//         if (response.data.items) {
//             console.log(response.data.items[0].link);
//             profile[i].logoImage = response.data.items[0].link;
//         }
//         else console.log(profile[i].name, 'not found');
//     });

// profile.forEach((p) => {
//     axios.get('https://www.googleapis.com/customsearch/v1', {
//         params: {
//             key: 'AIzaSyAcplb8FWypJNvSj9QuvRX1mYPG5cq8SPA',
//             cx: '203353cf8942c48c9',
//             searchType: 'image',
//             q: p.name
//         }
//     }).then((response) => {
//         console.log(response.items[0].link);

//     })
// });

// axios.get('https://www.googleapis.com/customsearch/v1', {
//     params: {
//         key: 'AIzaSyAcplb8FWypJNvSj9QuvRX1mYPG5cq8SPA',
//         cx: '203353cf8942c48c9',
//         searchType: 'image',
//         q: 'fpt'
//     }
// }).then((response) => {
//     console.log(response);
// });

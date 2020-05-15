const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

const callMain = async totalPages => {
    const totalSongs = [];
    const promises = [];
    for (let i = 0; i <= totalPages; i++) {
        promises[i] = axios.get(`https://pumpout2.anyhowstep.com:17593/api/search/result?atVersion=154&languageCode=en&display=SONG&page=${i}&rowsPerPage=100&searchId=d43eeb9c5b0a567685c82d954502d5b3`)
    }
    const responses = await Promise.all(promises);
    responses.forEach(response => {
        const filterRows = [];
        const {rows} =response.data;
        rows.map(song => {
           if(song.inVersion) {
               filterRows.push(song);
           }
        });
        totalSongs.push(...filterRows);
    });
    return totalSongs;
};

callMain(8).then(response => {
    fs.writeFile('./songs.json', JSON.stringify(response), function (error) {
        if (error) return console.log('Hubo un error, inténtalo nuevamente');
        console.log('Terminado correctamente');
    });
});


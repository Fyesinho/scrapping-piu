const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

const callMain = async totalPages => {
    const totalSongs = [];
    const promises = [];
    for (let i = 0; i < totalPages; i++) {
        promises[i] = axios.get(`https://pumpout.anyhowstep.com/search/results?display=song&chart_version=1~154&page=${i + 1}`)
    }
    const responses = await Promise.all(promises);
    responses.forEach(response => {
        const $ = cheerio.load(response.data);
        const currentPage = $('.list-group .list-group-item').toArray().map(item => {
            const $item = $(item);
            const title = $item.find('.media-body')[0].children[0].data.replace('\n', '').replace('\t', '').replace('\t', '').replace('\t', '');
            const id = $item.find('.media-body')[0].children[1].children[0].data.split(' ')[1];
            const author = $item.find('.media-body')[0].children[4].children[0].data;
            const coauthor = $item.find('.media-body')[0].children[6].children[0].data;
            const bpm = $item.find('.media-large.pull-right')[0].children[1].children[1].children[0].data.replace(/\n/g, '').replace(/\t/g, '').split('BPM')[0];
            const type = $item.find('.media-large.pull-right')[0].children[1].children[5].children[0].data;
            const channel = $item.find('.media-large.pull-right')[0].children[1].children[9].children[0].data;

            // Levels nodes
            const singlesArray = $item.find('.thumb-small').toArray().filter(item => item.attribs.src.includes('S/') && !item.attribs.class.includes('faded'));
            const doublesArray = $item.find('.thumb-small').toArray().filter(item => item.attribs.src.includes('D/') && !item.attribs.class.includes('faded'));
            const singlePerformanceArray = $item.find('.thumb-small').toArray().filter(item => item.attribs.src.includes('SP/') && !item.attribs.class.includes('faded'));
            const doublesPerformanceArray = $item.find('.thumb-small').toArray().filter(item => item.attribs.src.includes('DP/') && !item.attribs.class.includes('faded'));
            const coArray = $item.find('.thumb-small').toArray().filter(item => item.attribs.src.includes('C/') && !item.attribs.class.includes('faded'));

            // Levels Array
            const singles = singlesArray.map(item => item.attribs.src.split('lv')[1].split('.')[0]);
            const doubles = doublesArray.map(item => {
                if (item.attribs.src.includes('_lv')) {
                    return item.attribs.src.split('lv')[1].split('.')[0]
                } else {
                    return item.attribs.src.split('sp')[1].split('.')[0]
                }
            });
            const singlesPerformance = singlePerformanceArray.map(item => item.attribs.src.split('lv')[1].split('.')[0]);
            const doublesPerformance = doublesPerformanceArray.map(item => item.attribs.src.split('lv')[1].split('.')[0]);
            const co = coArray.map(item => item.attribs.src.split('lv')[1].split('.')[0]);

            return {
                id,
                author,
                coauthor: coauthor !== '\n\t\t\t\t' ? coauthor : 'no-data',
                title: title.substring(0, title.length - 1),
                bpm: parseInt(bpm),
                type,
                channel,
                levels: {
                    singles,
                    doubles,
                    singlesPerformance,
                    doublesPerformance,
                    co
                }
            };
        });
        totalSongs.push(currentPage);
    });
    return totalSongs;
};

callMain(20).then(response => {
    fs.writeFile('./songs.json', JSON.stringify(response), function (error) {
        if (error) return console.log('Hubo un error, inténtalo nuevamente');
        console.log('Terminado correctamente');
    });
});


const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

function exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = 'data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

axios.get('https://pumpout.anyhowstep.com/search/results?display=song&chart_version=1~125')
    .then(response => {
    const $ = cheerio.load(response.data);
        return $('.list-group .list-group-item').toArray().map(item => {
        const $item = $(item);
        const title = $item.find('.media-body')[0].children[0].data.replace('\n', '').replace('\t', '').replace('\t', '').replace('\t', '');
        const id = $item.find('.media-body')[0].children[1].children[0].data.split(' ')[1];
        const author = $item.find('.media-body')[0].children[4].children[0].data;
        const coauthor = $item.find('.media-body')[0].children[6].children[0].data;
        const bpm = $item.find('.media-large.pull-right')[0].children[1].children[1].children[0].data.replace(/\n/g, '').replace(/\t/g, '').split('BPM')[0];
        const type = $item.find('.media-large.pull-right')[0].children[1].children[5].children[0].data;
        const channel = $item.find('.media-large.pull-right')[0].children[1].children[9].children[0].data;
        const singles = $item.find('.thumb-small').filter(level => {
            return level
        })
        return {
            id,
            author,
            coauthor: coauthor !== '\n\t\t\t\t' ? coauthor : 'no-data',
            title: title.substring(0, title.length - 1),
            bpm: parseInt(bpm),
            type,
            channel
        }
    });
}).then(arraySongs => {

    fs.writeFile('./songs.json', JSON.stringify(arraySongs), function (error) {
        if(error) return console.log(error)
        console.log('Funge')
    })
});
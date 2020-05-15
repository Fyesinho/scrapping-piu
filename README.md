# Scrapping-piu-anyhowstep
Este es un mini proyecto para rescatar la información de la página https://pumpout.anyhowstep.com, la cual puede ser revalorizada y mostrada de otra forma, u ocuparse para otros proyectos con una base importante y no desde cero.
Se añaden dos versiones de la página, que serían la página antigua y la página nueva en la cual la primera es directamente un scrapping de la información de su página, mientras que la segunda versión es una llamada tipo GET a una API.
El resultado de la acción (en cualquier de las dos páginas) es un archivo JSON llamado songs.json, el cual se podría pasar a una base de datos no relacional o a una hoja excel.

Espero le sirva a alguien.

## Instalación

``npm install``

## Ejecución
### Página antigual
``node old_site.js``


El resultado es un array de json de la siguiente forma 

```json
{
    "id": "1605",
    "author": "SLAM",
    "coauthor": "no-data",
    "title": "1949",
    "bpm": 220,
    "type": "Arcade",
    "channel": "ORIGINAL",
    "levels": {
      "singles": [
        "16",
        "21",
        "23"
      ],
      "doubles": [
        "21",
        "26",
        "28"
      ],
      "singlesPerformance": [],
      "doublesPerformance": [
        "04"
      ],
      "co": []
    }
},
```
### Página nueva
``node new_site.js``

El resultado es un array de json de la siguiente forma 
```json
{
  "songId": 777,
  "internalTitle": "1949",
  "inVersion": true,
  "cut": {
    "cutId": 2,
    "internalTitle": "Arcade"
  },
  "artists": [
    {
    "artistId": 116,
    "internalTitle": "SLAM",
    "prefix": ""
    }
  ],
  "bpm": {
    "songBpmId": 769,
    "bpmMin": 220,
    "bpmMax": 220
  },
  "card": {
    "songCardId": 767,
    "path": "/img/card/xx-1949.png"
  },
  "category": {
    "songCategoryId": 768,
    "categoryId": 3,
    "internalTitle": "ORIGINAL"
  },
  "gameIdentifiers": [
    {
    "songGameIdentifierId": 642,
    "gameIdentifier": "1605"
    }
  ],
  "labels": [],
  "charts": [
    {
      "chartId": 5697,
      "inVersion": true,
      "rating": {
        "path": "/img/rating/S/single_lv16.png",
        "mode": {
          "internalAbbreviation": "S",
          "internalHexColor": "#ff5400"
        },
        "difficulty": {
          "internalTitle": "16"
        }
      }
    },
    {
      "chartId": 5698,
      "inVersion": true,
      "rating": {
        "path": "/img/rating/S/single_lv21.png",
        "mode": {
          "internalAbbreviation": "S",
          "internalHexColor": "#ff5400"
        },
        "difficulty": {
          "internalTitle": "21"
        }
      }
    },
    {
      "chartId": 5699,
      "inVersion": true,
      "rating": {
        "path": "/img/rating/S/single_lv23.png",
        "mode": {
          "internalAbbreviation": "S",
          "internalHexColor": "#ff5400"
        },
        "difficulty": {
          "internalTitle": "23"
        }
      }
    },
    {
      "chartId": 5700,
      "inVersion": true,
      "rating": {
        "path": "/img/rating/D/double_lv21.png",
        "mode": {
          "internalAbbreviation": "D",
          "internalHexColor": "#00881a"
        },
        "difficulty": {
          "internalTitle": "21"
        }
      }
    },
    {
      "chartId": 5866,
      "inVersion": true,
      "rating": {
        "path": "/img/rating/D/double_lv26.png",
        "mode": {
          "internalAbbreviation": "D",
          "internalHexColor": "#00881a"
        },
        "difficulty": {
          "internalTitle": "26"
        }
      }
    },
    {
      "chartId": 5701,
      "inVersion": true,
      "rating": {
        "path": "/img/rating/D/double_lv28.png",
        "mode": {
          "internalAbbreviation": "D",
          "internalHexColor": "#00881a"
        },
        "difficulty": {
          "internalTitle": "28"
        }
      }
    },
    {
      "chartId": 6103,
      "inVersion": true,
      "rating": {
        "path": "/img/rating/DP/douper_lv04.png",
        "mode": {
          "internalAbbreviation": "DP",
          "internalHexColor": "#0048ff"
        },
        "difficulty": {
          "internalTitle": "04"
        }
      }
    }
  ],
  "earliestIntroducedVersion": {
    "versionId": 147,
    "internalTitle": "v1.02.0",
    "mix": {
      "mixId": 34,
      "internalTitle": "XX"
    }
  }
},
```

Cualquier duda mándenme un mensaje!!
Si quieren agregar cambios, es código libre!!!

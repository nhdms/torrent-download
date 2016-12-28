'use strict';

const download = require('./src/download');
const torrentParser = require('./src/torrent-parser');

const torrent = torrentParser.open('Vikings.S04E14.PROPER.HDTV.x264-KILLERS[eztv].mkv.torrent');
download(torrent, torrent.info.name);

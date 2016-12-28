'use strict';

const fs = require('fs');
const bencode = require('bencode');
const crypto = require('crypto');
// const bignum = require('bignum');
const Uint64BE = require("int64-buffer").Uint64BE;
module.exports.BLOCK_LEN = Math.pow(2, 14);

module.exports.open = (filepath) => {
  return bencode.decode(fs.readFileSync(filepath));
};

module.exports.infoHash = torrent => {
  const info = bencode.encode(torrent.info);
  return crypto.createHash('sha1').update(info).digest();
};

module.exports.size = torrent => {
  const size = torrent.info.files ?
    torrent.info.files.map(file => file.length).reduce((a, b) => a + b) :
    torrent.info.length;

  // return bignum.toBuffer(size, {size: 8});
      let big = new Uint64BE(size);
    return big.toBuffer();
};

module.exports.pieceLen = (torrent, pieceIndex) => {
  let x = new Uint64BE(this.size(torrent));
  const totalLength = x.toNumber();
  const pieceLength = torrent.info['piece length'];

  const lastPieceLength = totalLength % pieceLength;
  const lastPieceIndex = Math.floor(totalLength / pieceLength);

  return lastPieceIndex === pieceIndex ? lastPieceLength : pieceLength;
};

module.exports.blocksPerPiece = (torrent, pieceIndex) => {
  const pieceLength = this.pieceLen(torrent, pieceIndex);
  return Math.ceil(pieceLength / this.BLOCK_LEN);
};

module.exports.blockLen = (torrent, pieceIndex, blockIndex) => {
  const pieceLength = this.pieceLen(torrent, pieceIndex);

  const lastPieceLength = pieceLength % this.BLOCK_LEN;
  const lastPieceIndex = Math.floor(pieceLength / this.BLOCK_LEN);

  return blockIndex === lastPieceIndex ? lastPieceLength : this.BLOCK_LEN;
};

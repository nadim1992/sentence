/* Sentence Engine (.stc) */

import {
  createWriteStream,
  readFile,
  writeFile,
} from 'node:fs';

// Base ===>>
const writableFile = 'index.js';
const baseContent   = '"use strict";\n';

const writer = createWriteStream(writableFile, {flags: 'a'});

writeFile(writableFile, baseContent, err => {
  if (err) throw err;
  console.log('File created successfully!');
});

// Parse ===>>
function parseContent(content) {
  const regExp = /(variable)\s(\w+)\s.+(value)\s(.+)./gm;
  const match  = regExp.exec(content);

  return `var ${match[2]} = "${match[4]}";`
}

// Write ===>>
function nowWrite(text) {
  writer.write('\n');
  writer.write(text);
}

function nowStopWriting() {
  writer.write('\n');
}

// Read ===>>
const readableFile = 'index.stc';

readFile(readableFile, 'utf8', (err, text) => {
  if (err) throw err;

  const content = parseContent(text);

  nowWrite(content);
  nowStopWriting();
});

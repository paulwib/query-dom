import queryDom from '../lib/index';
import {readFileSync} from 'fs';
import {join} from 'path';

const input = readFileSync(
  join(__dirname, 'example.html'),
  'utf8'
);

if (console.profile) {
  console.profile('parse');
}
let start = new Date();
let count = 0;
while (new Date() - start < 5000) {
  count++;
  queryDom(input);
}
let diff = (new Date() - start) / count;
if (console.profileEnd) {
  console.profileEnd('parse');
}

console.log(`parse: ${diff} ms`);

const dom = queryDom(`<div>${input}</div>`);

if (console.profile) {
  console.profile('getElementsByTagName');
}

start = new Date();
count = 0;
while (new Date() - start < 5000) {
  for (let i = 0; i < 1000; ++i) {
    count++;
    dom[0].getElementsByTagName('div');
  }
}
diff = (new Date() - start) / count;
if (console.profileEnd) {
  console.profileEnd('getElementsByTagName');
}

console.log(`getElementsByTagName: ${diff} ms`);

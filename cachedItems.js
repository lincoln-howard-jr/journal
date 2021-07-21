const am = require ('./client/build/asset-manifest.json');
const defs = [
  '/journal/',
  '/journal/?page=skills',
  '/journal/?page=settings',
  '/journal/?page=write',
  '/journal/?page=journal'
]
const depsArr = [...defs, ...Object.values (am.files)];
console.log (JSON.stringify (depsArr, null, '  ').replaceAll ('"','\''));
#!/usr/bin/env node

const reader = require('./reader.js');
const path = require('path');
const yargs = require('yargs')
  .usage('$0 command')
  .command('validate', 'validate Swagger')
  .alias('i', 'file')
  .alias('l', 'lang')
  .nargs('i', 1)
  .demandOption(['i'])
  .command('yaml', 'output YAML')
  .alias('i', 'file')
  .nargs('i', 1)
  .demandOption(['i'])
  .command('addLang', 'append a lang to the YAML')
  .nargs('i', 1)
  .nargs('l', 1)
  .demandOption(['i', 'l'])
  .command('ngsild', 'output NGSILD context')
  .nargs('i', 1)
  .demandOption(['i'])
  .command('jsonld', 'output JSONLD context with @graph')
  .nargs('i', 1)
  .demandOption(['i'])
  .command('markdown', 'output Markdown')
  .nargs('i', 1)
  .nargs('l', 1)
  .demandOption(['i', 'l'])
  .demandCommand(1, 'must provide a valid command');

const argv = yargs.argv;
const command = argv._[0];
let out = path.parse(argv.file).name;

switch (command) {
  case 'validate':
    reader.validate(argv.file);
    break;
  case 'yaml':
    reader.yaml(argv.file);
    break;
  case 'addLang':
    out = out + '.' + argv.lang + path.parse(argv.file).ext;
    reader.addLang(argv.file, out, argv.lang);
    break;
  case 'markdown':
    out = out + '.' + argv.lang + '.md';
    reader.markdown(argv.file, out, argv.lang);
    break;
  case 'ngsi':
    out = out + '-ngsi.jsonld';
    reader.ngsi(argv.file, out);
    break;
  case 'jsonld':
    out = out + '-context.jsonld';
    reader.jsonld(argv.file, out);
    break;
  default:
    yargs.showHelp();
}

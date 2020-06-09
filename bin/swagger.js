#!/usr/bin/env node

const reader = require('./reader.js');
const path = require('path');
const yargs = require('yargs')
  .usage('$0 command')
  .command('validate', 'validate Swagger')
  .command('yaml', 'output YAML')
  .command('schema', 'schema to YAML')
  .command('addLang', 'append a lang to the YAML')
  .command('ngsi', 'output NGSILD context')
  .command('jsonld', 'output JSONLD context with @graph')
  .command('markdown', 'output Markdown')
  .demandCommand(1, 'must provide a valid command')
  .demandOption(['i'])
  .alias('i', 'file')
  .alias('l', 'lang');

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
  case 'schema':
    out = out + '.yaml';
    reader.schemaRead(argv.file, out);
    break;
  case 'addLang':
    out = out + '.' + argv.lang + path.parse(argv.file).ext;
    reader.addLang(argv.file, out, argv.lang);
    break;
  case 'markdown':
    out = out + '.' + (argv.lang  ? (argv.lang + '.'): '') + 'md';
    reader.markdown(argv.file, out, argv.lang || 'en');
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

const SwaggerParser = require('@apidevtools/swagger-parser');
const YAML = SwaggerParser.YAML;
const $RefParser = require('@apidevtools/json-schema-ref-parser');

const fs = require('fs');
const Markdown = require('./markdown.js');
const JSONLD = require('./jsonld.js');
const Schema = require('./schema.js');

let api;

const context = {
  type: '@type',
  id: '@id'
};

async function validate(file) {
  try {
    await SwaggerParser.validate(file);
    console.log('Yay! The API is valid.');
  } catch (err) {
    console.error('Onoes! The API is invalid. ' + err.message);
  }
}

async function parseYaml(file) {
  try {
    api = await SwaggerParser.parse(file);
  } catch (err) {
    console.error('Cannot parse file. The file is invalid. ' + err.message);
  }
}

async function dereferenceYaml(file) {
  try {
    api = await SwaggerParser.dereference(file);
  } catch (err) {
    console.error(
      'Cannot dereference file. The file is invalid. ' + err.message
    );
  }
}

async function yaml(file) {
  await parseYaml(file);
  console.log(YAML.stringify(api));
}

async function addLang(input, output, lang) {
  await parseYaml(input);

  Object.keys(api.components.schemas).forEach(obj => {
    const schema = api.components.schemas[obj];
    setLangDesc(schema, lang);

    if (schema.properties) {
      Object.keys(schema.properties).forEach(key => {
        if (schema.properties[key].description) {
          setLangDesc(schema.properties[key], lang);
        }
      });
    }
  });

  fs.writeFileSync(output, YAML.stringify(api));
}

async function markdown(input, output, lang) {
  const text = [];

  await dereferenceYaml(input);

  Markdown.addText(text, api);
  Markdown.addExamples(text, api);
  fs.writeFileSync(output, text.join('\n'));
}

async function ngsi(input, output, lang) {
  JSONLD.addCommonContextURLs(context);
  await dereferenceYaml(input);

  fs.writeFileSync(
    output,
    JSON.stringify(JSONLD.getContext(api, context, false), null, 4)
  );
}

async function jsonld(input, output, lang) {
  JSONLD.addCommonContextURLs(context);
  JSONLD.addCommonGraphURLs(context);

  await dereferenceYaml(input);

  fs.writeFileSync(
    output,
    JSON.stringify(
      JSONLD.addGraph(api, JSONLD.getContext(api, context, true)),
      null,
      4
    )
  );
}

async function schemaRead(input, output) {
  let obj;
  await fs.readFile(input, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    x(JSON.parse(data), output);
  });
}

async function payload(input, output) {
  await fs.readFile(input, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    let payload = JSON.parse(data);
    fs.writeFileSync(output, Schema.payloadToYaml(payload));
  });
}

async function x(obj, output) {
  try {
    let schema = await $RefParser.dereference(obj);
    fs.writeFileSync(output, Schema.schemaToYaml(schema));
  } catch (err) {
    console.error(err);
  }
}

function setLangDesc(obj, lang) {
  const xDesc = obj['x-description'] || {};
  xDesc[lang] = xDesc[lang] || obj.description || '';
  obj['x-description'] = xDesc;
}

exports.validate = validate;
exports.yaml = yaml;
exports.addLang = addLang;
exports.schemaRead = schemaRead;
exports.markdown = markdown;
exports.jsonld = jsonld;
exports.ngsi = ngsi;
exports.payload = payload;

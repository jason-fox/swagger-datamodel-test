const SwaggerParser = require('@apidevtools/swagger-parser');
const YAML = SwaggerParser.YAML;
const path = require('path');

function getModel(value, ngsi) {
  if (value.format === 'uri' || value.format === 'url') {
    ngsi.model = 'https://schema.org/URL';
  } else if (value.type === 'string') {
    ngsi.model = 'https://schema.org/Text';
  } else if (value.type === 'integer') {
    ngsi.model = 'https://schema.org/Integer';
  } else if (value.type === 'float') {
    ngsi.model = 'https://schema.org/Number';
  }
}

function schemaToYaml(obj) {
  const id = path.parse(path.parse(obj.$id).dir).name;

  const obj2 = {
    required: obj.required,
    type: obj.type,
    description: obj.description,

    properties: {}
  };

  obj.allOf.forEach(element => {
    if (element.properties) {
      Object.keys(element.properties).forEach(key => {
        const value = element.properties[key];
        if (value.type) {
          const inner = {
            'x-ngsi': {
              type: 'Property'
            },
            type: value.type,
            description: value.description || ''
          };

          getModel(value, inner['x-ngsi']);

          if (value.format) {
            inner.format = value.format;
          } else if ((value.type = 'integer')) {
            inner.format = 'int32';
          }

          obj2.properties[key] = inner;
        }
      });
    }
  });

  const obj3 = {};
  obj3[id] = obj2;

  return YAML.stringify(obj3);
}

exports.schemaToYaml = schemaToYaml;

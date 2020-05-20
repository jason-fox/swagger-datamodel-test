function addCommonContextURLs(context) {
  context['ngsi-ld'] = 'https://uri.etsi.org/ngsi-ld/';
  context.fiware = 'https://uri.fiware.org/ns/data-models#';
  context.schema = 'https://schema.org/';
}

function addCommonGraphURLs(context) {
  context.rdfs = 'http://www.w3.org/2000/01/rdf-schema#';
  context.xsd = 'http://www.w3.org/2001/XMLSchema#';
}

function replaceCommonContextURLs(text) {
  return text
    .replace(/https:\/\/uri\.fiware\.org\/ns\/data-models#/g, 'fiware:')
    .replace(/https:\/\/schema\.org\//g, 'schema:')
    .replace(/https:\/\/uri\.etsi\.org\/ngsi\-ld\//g, 'ngsi-ld:');
}

/*

 "observedAt": {
        "@id": "https://uri.etsi.org/ngsi-ld/observedAt",
        "@type": "DateTime"
      },

*/

function addEntry(text, type, key, uri, value, expand) {
  if (expand) {
    if (type === 'Property' || type === 'GeoProperty') {
      if (value.type === 'object') {
        text.push('"' + key + '": "' + uri + '"');
      } else {
        text.push(
          '"' +
            key +
            '": {"@id": "' +
            uri +
            '", "@type": "xsd:' +
            value.type +
            '"}'
        );
      }
    } else if (type === 'Relationship') {
      text.push('"' + key + '": {"@id": "' + uri + '", "@type": "@id"}');
    } else if (type === 'EnumProperty') {
      text.push('"' + key + '": {"@id": "' + uri + '", "@type": "@vocab"}');
    }
  } else if (
    type === 'Property' ||
    type === 'Relationship' ||
    type === 'EnumProperty' ||
    type === 'GeoProperty'
  ) {
    text.push('"' + key + '": "' + uri + '"');
  }
}

function getContext(api, context, expand) {
  const text = [];

  Object.keys(api.components.schemas).forEach(obj => {
    const schema = api.components.schemas[obj];
    const ngsi = schema['x-ngsi'] || {
      'uri-prefix': 'https://uri.fiware.org/ns/data-models#'
    };

    if (!schema.enum) {
      text.push('"' + obj + '": "' + ngsi['uri-prefix'] + obj + '"');
    }
  });

  Object.keys(api.components.schemas).forEach(obj => {
    const schema = api.components.schemas[obj];
    const ngsi = schema['x-ngsi'] || {};
    ngsi['uri-prefix'] =
      ngsi['uri-prefix'] || 'https://uri.fiware.org/ns/data-models#';

    if (schema.properties) {
      Object.keys(schema.properties).forEach(key => {
        const value = schema.properties[key];
        const prop = value['x-ngsi'] || {};

        prop['uri-prefix'] =
          prop['uri-prefix'] ||
          ngsi['uri-prefix'] ||
          'https://uri.fiware.org/ns/data-models#';

        const uri = prop.uri || prop['uri-prefix'] + key;
        const type = prop.type || 'Property';

        addEntry(text, type, key, uri, value, expand);

        if (value.properties && prop['uri-prefix']) {
          Object.keys(value.properties).forEach(key => {
            //text.push('"' + key + '": "' + prop['uri-prefix'] + key + '"');

            const innerValue = value.properties[key];
            const innerProp = innerValue['x-ngsi'] || {};
            innerProp['uri-prefix'] =
              innerProp['uri-prefix'] || prop['uri-prefix'];
            const uri = innerProp['uri-prefix'] + key;
            const type = innerProp.type || 'Property';

            addEntry(text, type, key, uri, innerValue, expand);
          });
        }
      });
    }
  });

  Object.keys(api.components.schemas).forEach(obj => {
    const schema = api.components.schemas[obj];
    const ngsi = schema['x-ngsi'] || {
      'uri-prefix': 'https://uri.fiware.org/ns/data-models#'
    };

    if (schema.enum) {
      schema.enum.forEach(enumKey => {
        text.push('"' + enumKey + '": "' + ngsi['uri-prefix'] + enumKey + '"');
      });
    }
  });

  const unordered = JSON.parse(
    '{' + replaceCommonContextURLs(text.join(',\n  ') + '}')
  );

  Object.keys(unordered)
    .sort()
    .forEach(function(key) {
      context[key] = unordered[key];
    });

  return { '@context': context };
}

function addGraph(api, context) {
  const graph = [];

  Object.keys(api.components.schemas).forEach(obj => {
    const schema = api.components.schemas[obj];
    const ngsi = schema['x-ngsi'] || {
      'uri-prefix': 'https://uri.fiware.org/ns/data-models#'
    };

    const shortUri = replaceCommonContextURLs(ngsi['uri-prefix']);

    if (!schema.enum) {
      graph.push({
        '@id': shortUri + obj,
        '@type': 'rdfs:Class',
        'rdfs:comment': [
          {
            '@language': 'en',
            '@value': (schema.description || '').trim()
          }
        ],
        'rdfs:label': [
          {
            '@language': 'en',
            '@value': obj
          }
        ],
        'rdfs:subClassOf': {
          '@id': 'schema:Thing'
        }
      });
    }
  });

  Object.keys(api.components.schemas).forEach(obj => {
    const schema = api.components.schemas[obj];
    if (schema.properties) {
      Object.keys(schema.properties).forEach(key => {
        const value = schema.properties[key];
        const ngsi = value['x-ngsi'] || {
          'uri-prefix': 'https://uri.fiware.org/ns/data-models#'
        };
        const type = ngsi.type || 'Property';

        if (!value.enum) {
          const shortUri = replaceCommonContextURLs(
            ngsi['uri-prefix'] || 'fiware:'
          );

          graph.push({
            '@id': shortUri + key,
            '@type': 'ngsi-ld:' + type,
            'rdfs:comment': [
              {
                '@language': 'en',
                '@value': (value.description || '').trim()
              }
            ],
            'rdfs:label': [
              {
                '@language': 'en',
                '@value': key
              }
            ]
          });
        }
      });
    }
  });

  context['@graph'] = graph;

  return context;
}

exports.addCommonContextURLs = addCommonContextURLs;
exports.addCommonGraphURLs = addCommonGraphURLs;
exports.getContext = getContext;
exports.addGraph = addGraph;

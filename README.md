# swagger-datamodel-test


# Install

```console
 npm install -g .
```

# Usage

Generate JSONLD `@context` and `@graph` suitable for Key-Values

```console
datamodelgen jsonld -i building.yaml -l en
```

Generate NGSI-LD `@context`

```console
datamodelgen ngsi -i building.yaml -l en
```

Generate Markdown documentation

```console
datamodelgen markdown -i building.yaml -l en
```

Validate Swagger

```console
datamodelgen validate -i building.yaml -l en
```

Display YAML

```console
datamodelgen validate -i building.yaml -l en
```


Add an x-description in a specified language.

```console
datamodelgen addLang -i building.yaml -l en
```


Generate YAML from schema

```console
datamodelgen schema -i schema.json -l en
```


Generate YAML from payload

```console
datamodelgen payload -i payload.json -l en
```

## TO DO

Read and translate `x-description` tags ...


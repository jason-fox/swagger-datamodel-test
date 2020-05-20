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


## TO DO

Read and translate `x-description` tags ...


# Building

## Description
This entity contains a harmonised description of a Building. This entity is associated with the vertical segments of smart homes, smart cities, industry and related IoT applications.
This data model has been partially developed in cooperation with mobile operators and the [GSMA](https://www.gsma.com/iot/iot-big-data/), compared to GSMA data model following changes are introduced:
-   the reference to `BuildingType` is removed, since `BuildingType` compared to
    `category` attribute does not introduce significant information.

-   `category` attribute is required.
-   `openingHours` is introduced following schema.org data model to allow
    fine-grained on building opening times. GSMA supported this as free text in
    the `notes` attribute (removed as well).

-   `refSubscriptionService` is not supported, since `SubscriptionService` model
    is not supported currently.

## Data Model
For a full description of the following attributes refer to GSMA [IoT Big Data Harmonised Data Model](https://github.com/GSMADeveloper/NGSI-LD-Entities)

-  `id`: URN holding the id of the attribute
   -  Attribute type: **Property**. 
   -  Required
-  `type`: The entity type
   -  Attribute type: **Property**. 
   -  Required
-  `dateModified`: Update timestamp of this entity.
   -  Attribute type: **Property**. [DateTime](https://schema.org/DateTime)
   -  Read-Only. Automatically generated.
-  `dateCreated`: Entity's creation timestamp.
   -  Attribute type: **Property**. [DateTime](https://schema.org/DateTime)
   -  Read-Only. Automatically generated.
-  `address`: The mailing address.
   -  Attribute type: **Property**. [address](https://schema.org/address)
   -  Required
   -  Normative References: https://schema.org/address
-  `category`: The categories that this building belongs to. One of : `apartments`, `farm`, `hotel`, `house`, `detached`, `residential`, `dormitory`, `terrace`, `houseboat`, `bungalow`, `static_caravan`, `commercial`, `office`, `industrial`, `retail`, `warehouse`, `kiosk`, `bakehouse`, `cathedral`, `chapel`, `church`, `kindergarten`, `mosque`, `temple`, `synagogue`, `shrine`, `civic`, `hospital`, `school`, `stadium`, `train_station`, `transportation`, `university`, `grandstand`, `public`, `barn`, `bridge`, `bunker`, `cabin`, `carport`, `conservatory`, `construction`, `cowshed`, `digester`, `farm_auxiliary`, `garage`, `garages`, `garbage_shed`, `greenhouse`, `hangar`, `hut`, `pavilion`, `parking`, `riding_hall`, `roof`, `shed`, `stable`, `sty`, `transformer_tower`, `service`, `ruins`, `water_tower`.
   -  Attribute type: **EnumProperty**. 
   -  Required
-  `containedInPlace`: The URL this building resides within
   -  Attribute type: **Relationship**. [URL](https://schema.org/URL)
   -  Optional
-  `dataProvider`: Specifies the URL to information about the provider of this information
   -  Attribute type: **Property**. [URL](https://schema.org/URL)
   -  Optional
-  `description`: A description of the item
   -  Attribute type: **Property**. [Text](https://schema.org/Text)
   -  Optional
   -  Normative References: http://purl.org/dc/elements/1.1/description
-  `floorsAboveGround`: Number of floors above ground within the building
   -  Attribute type: **Property**. [Integer](https://schema.org/Integer)
   -  Optional
-  `floorsBelowGround`: Number of floors below ground within the building
   -  Attribute type: **Property**. [Integer](https://schema.org/Integer)
   -  Optional
-  `location`: The current location of the item
   -  Attribute type: **GeoProperty**. 
   -  Optional
   -  Normative References: http://geojson.org/geojson-spec.html#geometry-objects
-  `occupier`: Link to the occupiers of the building
   -  Attribute type: **Relationship**. [URL](https://schema.org/URL)
   -  Optional
-  `openingHours`: 
   -  Attribute type: **Property**. [openingHours](https://schema.org/openingHours)
   -  Optional
   -  Normative References: https://schema.org/openingHours
-  `owner`: The owner of this building
   -  Attribute type: **Relationship**. [URL](https://schema.org/URL)
   -  Optional
-  `refMap`: The URL holding a map of the building
   -  Attribute type: **Property**. [URL](https://schema.org/URL)
   -  Optional
-  `source`: A sequence of characters giving the source of the entity data.
   -  Attribute type: **Property**. [Text](https://schema.org/Text) or [URL](https://schema.org/URL)
   -  Optional



## Examples

### NGSI-LD Linked-data Format


#### Linked Data example

```json
[
    {
        "id": "urn:ngsi-ld:Building:building-a85e3da145c1",
        "type": "Building",
        "modifiedAt": "2016-08-08T10:18:16Z",
        "createdAt": "2016-08-08T10:18:16Z",
        "category": {
            "type": "Property",
            "value": [
                "office"
            ]
        },
        "floorsBelowGround": {
            "type": "Property",
            "value": 0
        },
        "description": {
            "type": "Property",
            "value": "Office block"
        },
        "floorsAboveGround": {
            "type": "Property",
            "value": 7
        },
        "occupier": {
            "type": "Relationship",
            "object": [
                "urn:ngsi-ld:Person:9830f692-7677-11e6-838b-4f9fb3dc5a4f"
            ]
        },
        "mapUrl": {
            "type": "Property",
            "value": "http://www.example.com"
        },
        "source": {
            "type": "Property",
            "value": "http://www.example.com"
        },
        "location": {
            "type": "GeoProperty",
            "value": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            100,
                            0
                        ],
                        [
                            101,
                            0
                        ],
                        [
                            101,
                            1
                        ],
                        [
                            100,
                            1
                        ],
                        [
                            100,
                            0
                        ]
                    ]
                ]
            }
        },
        "address": {
            "type": "Property",
            "value": {
                "addressLocality": "London",
                "postalCode": "EC4N 8AF",
                "streetAddress": "25 Walbrook",
                "type": "PostalAddress"
            }
        },
        "owner": {
            "type": "Relationship",
            "object": [
                "urn:ngsi-ld::cdfd9cb8-ae2b-47cb-a43a-b9767ffd5c84",
                "urn:ngsi-ld::1be9cd61-ef59-421f-a326-4b6c84411ad4"
            ]
        },
        "openingHours": {
            "type": "Property",
            "value": [
                "Mo-Fr 10:00-19:00",
                "Sa 10:00-22:00",
                "Su 10:00-21:00"
            ]
        },
        "dataProvider": {
            "type": "Property",
            "value": "OperatorA"
        },
        "containedInPlace": {
            "type": "Property",
            "value": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            100,
                            0
                        ],
                        [
                            101,
                            0
                        ],
                        [
                            101,
                            1
                        ],
                        [
                            100,
                            1
                        ],
                        [
                            100,
                            0
                        ]
                    ]
                ]
            }
        },
        "@context": [
            "https://schema.lab.fiware.org/ld/context",
            "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld"
        ]
    }
]
```

### NGSI-v2 Format


#### Normalized example

```json
[
    {
        "id": "building-a85e3da145c1",
        "type": "Building",
        "category": {
            "value": [
                "office"
            ]
        },
        "floorsBelowGround": {
            "value": 0
        },
        "description": {
            "value": "Office block"
        },
        "floorsAboveGround": {
            "value": 7
        },
        "occupier": {
            "type": "Relationship",
            "value": [
                "9830f692-7677-11e6-838b-4f9fb3dc5a4f"
            ]
        },
        "mapUrl": {
            "type": "URL",
            "value": "http://www.example.com"
        },
        "dateCreated": {
            "type": "DateTime",
            "value": "2016-08-08T10:18:16Z"
        },
        "source": {
            "value": "http://www.example.com"
        },
        "location": {
            "type": "geo:json",
            "value": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            100,
                            0
                        ],
                        [
                            101,
                            0
                        ],
                        [
                            101,
                            1
                        ],
                        [
                            100,
                            1
                        ],
                        [
                            100,
                            0
                        ]
                    ]
                ]
            }
        },
        "address": {
            "type": "PostalAddress",
            "value": {
                "addressLocality": "London",
                "postalCode": "EC4N 8AF",
                "streetAddress": "25 Walbrook"
            }
        },
        "owner": {
            "type": "Relationship",
            "value": [
                "cdfd9cb8-ae2b-47cb-a43a-b9767ffd5c84",
                "1be9cd61-ef59-421f-a326-4b6c84411ad4"
            ]
        },
        "openingHours": {
            "value": [
                "Mo-Fr 10:00-19:00",
                "Sa 10:00-22:00",
                "Su 10:00-21:00"
            ]
        },
        "dataProvider": {
            "value": "OperatorA"
        },
        "dateModified": {
            "type": "DateTime",
            "value": "2016-08-08T10:18:16Z"
        },
        "containedInPlace": {
            "value": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            100,
                            0
                        ],
                        [
                            101,
                            0
                        ],
                        [
                            101,
                            1
                        ],
                        [
                            100,
                            1
                        ],
                        [
                            100,
                            0
                        ]
                    ]
                ]
            }
        }
    }
]
```

#### Key-Values Pairs

```json
[
    {
        "id": "building-a85e3da145c1",
        "type": "Building",
        "dateCreated": "2016-08-08T10:18:16Z",
        "dateModified": "2016-08-08T10:18:16Z",
        "source": "http://www.example.com",
        "dataProvider": "OperatorA",
        "category": [
            "office"
        ],
        "containedInPlace": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        100,
                        0
                    ],
                    [
                        101,
                        0
                    ],
                    [
                        101,
                        1
                    ],
                    [
                        100,
                        1
                    ],
                    [
                        100,
                        0
                    ]
                ]
            ]
        },
        "location": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        100,
                        0
                    ],
                    [
                        101,
                        0
                    ],
                    [
                        101,
                        1
                    ],
                    [
                        100,
                        1
                    ],
                    [
                        100,
                        0
                    ]
                ]
            ]
        },
        "address": {
            "addressLocality": "London",
            "postalCode": "EC4N 8AF",
            "streetAddress": "25 Walbrook"
        },
        "owner": [
            "cdfd9cb8-ae2b-47cb-a43a-b9767ffd5c84",
            "1be9cd61-ef59-421f-a326-4b6c84411ad4"
        ],
        "occupier": [
            "9830f692-7677-11e6-838b-4f9fb3dc5a4f"
        ],
        "floorsAboveGround": 7,
        "floorsBelowGround": 0,
        "description": "Office block",
        "mapUrl": "http://www.example.com",
        "openingHours": [
            "Mo-Fr 10:00-19:00",
            "Sa 10:00-22:00",
            "Su 10:00-21:00"
        ]
    }
]
```
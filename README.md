# configuration-component
 
## Description
elastic.io configuration component which allows separating the modification of configurable values from the modification of the flow.

### How works.  API version / SDK version
Configuration component has a credential which is a text field with some valid JSON.  (JSON must be valid in order for credentials to be verified).
It emits a message with an object equivalent to the JSON in the config. So any data which is used in the flow and is repeated in multiple places can be configured (or later changed) in the single step. After that new values are used where it is needed.

## Credentials
Configuration data should be specified as credentials of a JSON format.
JSON must be valid in order for credentials to be verified (except arrays, see *Known limitations* below). Credentials verification will fail otherwise.
Input data example:
![Data sample](https://user-images.githubusercontent.com/8449044/48360400-d3138980-e6a7-11e8-8b79-87932eec66c1.png)
## Actions
### Emit data
The only action. Emits configuration data (must be a valid JSON object) as a message.
#### Output json schema location
Very simple schema. Output JSON could be of **any** complexity.

[lib/schemas/emitConfig.out.json](lib/schemas/emitConfig.out.json)

## Known limitations
1. As realtime flows use credentials which were saved at the moment of starting the flow, this component should be used only in ordinary flows. This is not a bug or limitation, but the platform specific case.
2. Despite naked arrays are valid JSON, there are some platform limitations, which do not allow to access the data in such arrays, that has been emitted from a component, from the next step. This is why naked arrays should not be passed to the component directly.
So instead of 
 ```json
[
  {
    "Product Name": "Bowler Hat",
    "ProductID": 858383,
    "SKU": "0406654608",
    "Description": {
      "Colour": "Purple",
      "Width": 300,
      "Height": 200,
      "Depth": 210,
      "Weight": 0.75
    },
    "Price": 34.45,
    "Quantity": 2
  }
]
```
use something like:
```json
{
  "Product": [
    {
      "Product Name": "Bowler Hat",
      "ProductID": 858383,
      "SKU": "0406654608",
      "Description": {
        "Colour": "Purple",
        "Width": 300,
        "Height": 200,
        "Depth": 210,
        "Weight": 0.75
      },
      "Price": 34.45,
      "Quantity": 2
    }
  ]
}
```

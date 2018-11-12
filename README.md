# <Component name>
configuration-component
 
## Description
elastic.io configuration component which allows to separate the modification of configurable values from the modification of the flow.

### How works.  API version / SDK version
Configuration component has a credential which is a text field with some valid JSON.  (JSON must be valid in order for credentials to be verified).
It emits a message with an object equivalent to the JSON in the config. So any data which is used in the flow and is repeated in multiple places can be configured (or later changed) in the single step. After that new values are used where it is needed.

## Credentials
Configuration data should be specified as credentials of a JSON format.
JSON must be valid in order for credentials to be verified. Credentials verification will fail otherwise.
Input data example:
![Data sample](https://user-images.githubusercontent.com/8449044/48360400-d3138980-e6a7-11e8-8b79-87932eec66c1.png)
## Actions
### Emit data
The only action. Emits configuration data (must be a valid JSON object) as a message.
#### Output json schema location
Very simple schema. Output JSON could be of **any** complexity.
[lib/schemas/emitConfig.out.json](lib/schemas/emitConfig.out.json)

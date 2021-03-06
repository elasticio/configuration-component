# configuration-component
 
## Description
elastic.io configuration component which allows separating the modification of configurable values from the modification of the flow.

### How works.  API version / SDK version
Configuration component has a credential which is a text field with some valid JSON.  (JSON must be valid in order for credentials to be verified).
It emits a message with an object equivalent to the JSON in the config. So any data which is used in the flow and is repeated in multiple places can be configured (or later changed) in the single step. After that new values are used where it is needed.

## Credentials
Configuration data should be specified as credentials of a JSON format.
JSON must be valid in order for credentials to be verified (except arrays, see *Known limitations* below). Credentials verification will fail otherwise.

Input data example. Consider the following example:

* Someone wants to synchronize prices between an ERP and an E-SHOP
* The price logic is so complex that it can not pragmatically exist in a single flow.
* Prices in the ERP exist in only in currency A.  Prices in the E-SHOP are in currency B.  The customer wants to convert prices as data is moved between systems at a fixed rate that they set.
* This fixed rate must be the same between all flows.

If the config component existed, you build flows of the following form:
ERP.GetPriceInfo() -> Config.LoadConfig() -> E-SHOP.SetPrice(price := ERPResults.Price * ConfigResults.ExchangeRate)
If one needed to change the exchange rate, that value could be edited by modifying the config credentials to include the new rate and then resetting the snapshot for all the price import flows. 
Currency rates sample:
```json
{
        "USDEUR": 0.881715,
        "USDFJD": 2.115102,
        "USDPLN": 3.787097,
        "USDQAR": 3.641042,
        "USDUAH": 30.718014,
        "USDZWL": 322.355011
}
```
Then the currency rate can be used in any number of flows, where it is needed and then changed form the single place. That changes will affect all the flows where it is used. 
## Actions
### Emit data
The only action. Emits configuration data (must be a valid JSON object) as a message.
#### Output json schema location
Very simple schema. Output JSON could be of **any** complexity.

[lib/schemas/emitConfig.out.json](lib/schemas/emitConfig.out.json)

## Contribution

See [CONTRIBUTING.md](https://github.com/elasticio/microsoft-onedrive-component/blob/master/CONTRIBUTING.md) for more information on how you could contribute to development of this component.


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

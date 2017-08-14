# *G*raphQL *N*ormalized *T*ypes
The gin-n-tonic of GraphQL types: simple, final, clean. Normalize your common data with GraphQL Scalar types.

## Usage
```bash
$ npm install --save gnt
```

and then add to your schema:

```javascript
const { Phone, UnixDate, CreditCard, State } = require('gnt')

{
  name: 'Query',
  fields: {
    phone: { type: Phone },
    date:  { type: UnixDate },
    card:  { type: CreditCard },
    state: { type: State }
    zipcode: { type: ZipCode }
  }  
}
```

## Examples

#### Scalar Types
```javascript
Phone
  Input:  '(817) 569-8900'
  Output: '+18175698900'

ZipCode
 Input: '55902'
 Output: '55902'
 Input: '00000'
 Output: null

UnixDate
  Input:  '2017-05-07T14:47:59.438' | new Date()
  Output: 1494186489

CreditCard
  Input:  '4111111111111111' | 4111111111111111
  Output: {
    number: '4111111111111111',
    cardType: 'VISA',
    validCVV: false,
    validExpiryMonth: false,
    validExpiryYear: false,
    isExpired: true
  }
  // OR
  Input: {
    cardType: 'VISA',
    number: '4111111111111111',
    expiryMonth: '03',
    expiryYear: '2100',
    cvv: '123'
  }
  Output: {
    cardType: 'VISA',
    number: '4111111111111111',
    expiryMonth: '03',
    expiryYear: '2100',
    cvv: '123',
    validCVV: true,
    validExpiryMonth: true,
    validExpiryYear: true,
    isExpired: false
  }
```
#### Enum Types
- `State`: US State

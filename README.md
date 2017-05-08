# *G*raphQL *N*ormalized *T*ypes
The Gin-N-Tonic of GraphQL types. Normalize your common data with GraphQL Scalar types.

## Usage
```bash
$ npm install --save gnt
```

and then add to your schema:

```javascript
const { Phone, UnixDate, CreditCard } = require('gnt')

{
  name: 'Query',
  fields: {
    phone: { type: Phone },
    date:  { type: UnixDate },
    card:  { type: CreditCard }
  }  
}
```

## Example
```javascript
Phone
  Input:  '(817) 569-8900'
  Output: '+18175698900'

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

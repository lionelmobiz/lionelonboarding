# POST /accounts-create

Request:

```
{
  "data": {
    "type": "accounts"
  }
}
```

Response:

```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should have required property 'attributes'",
        "source": {
          "pointer": "/data"
        }
      }
    ]
  }
}
```

---

Request:

```
{
  "data": {
    "type": "users",
    "attributes": {
      "name": "Client name",
      "tier": "starter300",
      "sourceAccountId": "telkom|0001"
    }
  }
}
```

Response:

```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should be equal to one of the allowed values",
        "source": {
          "pointer": "/data/type"
        }
      }
    ]
  }
}
```
---

Request:

```
{
  "data": {
    "type": "accounts",
    "attributes": {
      "name": "",
      "tier": "",
      "sourceAccountId": ""
    }
  }
}
```

Response:

```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should NOT be shorter than 1 characters",
        "source": {
          "pointer": "/data/attributes/name"
        }
      },
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should be equal to one of the allowed values",
        "source": {
          "pointer": "/data/attributes/tier"
        }
      },
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should NOT be shorter than 1 characters",
        "source": {
          "pointer": "/data/attributes/sourceAccountId"
        }
      }
    ]
  }
}
```

---

Request:

```
{
  "data": {
    "type": "accounts",
    "attributes": {
      "name": "Client name",
      "tier": "basic999",
      "sourceAccountId": "telkom|0001"
    }
  }
}
```

Response:

```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should be equal to one of the allowed values",
        "source": {
          "pointer": "/data/attributes/tier"
        }
      }
    ]
  }
}
```

---
Request:

```
{
  "data": {
    "type": "accounts",
    "attributes": {
      "name": "tooloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooongtooloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong",
      "tier": "starter300",
      "sourceAccountId": "telkom|0001"
    }
  }
}
```

Response:

```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should NOT be longer than 255 characters",
        "source": {
          "pointer": "/data/attributes/name"
        }
      }
    ]
  }
}
```
---

Request:

```
{
  "data": {
    "type": "accounts",
    "attributes": {
      "name": "Client name",
      "tier": "starter300",
      "sourceAccountId": "tooloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooongtooloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong"
    }
  }
}
```

Response:

```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should NOT be longer than 255 characters",
        "source": {
          "pointer": "/data/attributes/sourceAccountId"
        }
      }
    ]
  }
}
```

# GET /accounts-show?id=42c04a81-b9df-45f0-a068-54eeb2c45350

Query:

```
{}
```

Response:

```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid query parameter",
        "detail": "should have required property 'id'",
        "source": {
          "parameter": "id"
        }
      }
    ]
  }
}
```

Query:
```
{
  "id": "invalid-uuid"
}
```

Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid query parameter",
        "detail": "should match format \"uuid\"",
        "source": {
          "parameter": "id"
        }
      }
    ]
  }
}
```

# PATCH /accounts-update?id=42c04a81-b9df-45f0-a068-54eeb2c45350

Request:
```
{
  "data": {
    "type": "accounts",
    "id": "42c04a81-b9df-45f0-a068-54eeb2c45350",
    "attributes": {
      "name": "Client name",
      "tier": "starter300",
      "sourceAccountId": "telkom|0001"
    }
  }
}
```
Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid query parameter",
        "detail": "should have required property 'id'",
        "source": {
          "parameter": "id"
        }
      }
    ]
  }
}
```
---
Request:
```
{
  "data": {
    "type": "accounts",
    "attributes": {
      "name": "Client name",
      "tier": "starter300",
      "sourceAccountId": "telkom|0001"
    }
  }
}
```
Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should have required property 'id'",
        "source": {
          "pointer": "/data"
        }
      }
    ]
  }
}
```
---
Request:
```
{
  "data": {
    "type": "accounts",
    "id": "42c04a81-b9df-45f0-a068-54eeb2c45350"
  }
}
```
Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should have required property 'attributes'",
        "source": {
          "pointer": "/data"
        }
      }
    ]
  }
}
```
---
Request:
```
{
  "data": {
    "type": "users",
    "id": "42c04a81-b9df-45f0-a068-54eeb2c45350",
    "attributes": {
      "name": "Client name",
      "tier": "starter300",
      "sourceAccountId": "telkom|0001"
    }
  }
}
```
Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should be equal to one of the allowed values",
        "source": {
          "pointer": "/data/type"
        }
      }
    ]
  }
}
```
---
Request:
```
{
  "data": {
    "type": "accounts",
    "id": "42c04a81-b9df-45f0-a068-54eeb2c45350",
    "attributes": {
      "name": "",
      "tier": "",
      "sourceAccountId": ""
    }
  }
}
```
Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should NOT be shorter than 1 characters",
        "source": {
          "pointer": "/data/attributes/name"
        }
      },
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should be equal to one of the allowed values",
        "source": {
          "pointer": "/data/attributes/tier"
        }
      },
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should NOT be shorter than 1 characters",
        "source": {
          "pointer": "/data/attributes/sourceAccountId"
        }
      }
    ]
  }
}
```
Request:
```
{
  "data": {
    "type": "accounts",
    "id": "42c04a81-b9df-45f0-a068-54eeb2c45350",
    "attributes": {
      "name": "Client name",
      "tier": "basic999",
      "sourceAccountId": "telkom|0001"
    }
  }
}
```
Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should be equal to one of the allowed values",
        "source": {
          "pointer": "/data/attributes/tier"
        }
      }
    ]
  }
}
```
---
Request:
```
{
  "data": {
    "type": "accounts",
    "id": "42c04a81-b9df-45f0-a068-54eeb2c45350",
    "attributes": {
      "name": "tooloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooongtooloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong",
      "tier": "starter300",
      "sourceAccountId": "telkom|0001"
    }
  }
}
```
Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should NOT be longer than 255 characters",
        "source": {
          "pointer": "/data/attributes/name"
        }
      }
    ]
  }
}
```
---
Request:
```
{
  "data": {
    "type": "accounts",
    "id": "42c04a81-b9df-45f0-a068-54eeb2c45350",
    "attributes": {
      "name": "Client name",
      "tier": "starter300",
      "sourceAccountId": "tooloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooongtooloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong"
    }
  }
}
```
Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should NOT be longer than 255 characters",
        "source": {
          "pointer": "/data/attributes/sourceAccountId"
        }
      }
    ]
  }
}
```
# DELETE /accounts-show?id=42c04a81-b9df-45f0-a068-54eeb2c45350

Query:
```
{}

```

Response:

```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid query parameter",
        "detail": "should have required property 'id'",
        "source": {
          "parameter": "id"
        }
      }
    ]
  }
}

```
---
Query:

```
{
  "id": "invalid-uuid"
}

```

Response:

```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid query parameter",
        "detail": "should match format \"uuid\"",
        "source": {
          "parameter": "id"
        }
      }
    ]
  }
}
```
# POST /account-suspensions-create?accountId=42c04a81-b9df-45f0-a068-54eeb2c45350

Request:
```
{
  "data": {
    "type": "users"
  }
}
```
Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should be equal to one of the allowed values",
        "source": {
          "pointer": "/data/type"
        }
      }
    ]
  }
}
```
---
Request:
```

{
  "data": {
    "type": "suspensions"
  }
}
```
Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid query parameter",
        "detail": "should have required property 'accountId'",
        "source": {
          "parameter": "accountId"
        }
      }
    ]
  }
}

```
---
Request:
```
{
  "data": {
    "type": "suspensions"
  }
}
```
Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid query parameter",
        "detail": "should match format \"uuid\"",
        "source": {
          "parameter": "accountId"
        }
      }
    ]
  }
}
```

# DELETE /account-suspensions-delete?accountId=42c04a81-b9df-45f0-a068-54eeb2c45350

Query:
```
{}
```
    
Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid query parameter",
        "detail": "should have required property 'accountId'",
        "source": {
          "parameter": "accountId"
        }
      }
    ]
  }
}
```
---
Query:
```
{
  accountId: "invalid-uuid"
}
```

Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid query parameter",
        "detail": "should match format \"uuid\"",
        "source": {
          "parameter": "accountId"
        }
      }
    ]
  }
}
```

# POST /account-credits-create?accountId=42c04a81-b9df-45f0-a068-54eeb2c45350

Request:
```
{
  "data": {
    "type": "credits"
  }
}
```
Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should have required property 'attributes'",
        "source": {
          "pointer": "/data"
        }
      }
    ]
  }
}
```
---
Request:
```
{
  "data": {
    "type": "users",
    "attributes": {
      "bundle": "bundle100"
    }
  }
}
```
Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should be equal to one of the allowed values",
        "source": {
          "pointer": "/data/type"
        }
      }
    ]
  }
}
```
---
Request:
```
{
  "data": {
    "type": "credits",
    "attributes": {
      "bundle": ""
    }
  }
}
```
Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should be equal to one of the allowed values",
        "source": {
          "pointer": "/data/attributes/bundle"
        }
      }
    ]
  }
}
```
---
Request:
```
{
  "data": {
    "type": "credits",
    "attributes": {
      "bundle": "bundle100"
    }
  }
}
```
Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid query parameter",
        "detail": "should have required property 'accountId'",
        "source": {
          "parameter": "accountId"
        }
      }
    ]
  }
}
```
---
Request:
```
{
  "data": {
    "type": "credits",
    "attributes": {
      "bundle": "bundle100"
    }
  }
}
```
Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid query parameter",
        "detail": "should match format \"uuid\"",
        "source": {
          "parameter": "accountId"
        }
      }
    ]
  }
}
```
---
Request:
```
{
  "data": {
    "type": "credits",
    "attributes": {
      "bundle": "12345"
    }
  }
}
```
Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid schema",
        "detail": "should be equal to one of the allowed values",
        "source": {
          "pointer": "/data/attributes/bundle"
        }
      }
    ]
  }
}
```

# GET /account-credits-index?accountId=42c04a81-b9df-45f0-a068-54eeb2c45350

Query:
```
{}
```
Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid query parameter",
        "detail": "should have required property 'accountId'",
        "source": {
          "parameter": "accountId"
        }
      }
    ]
  }
}
```
---
Query:
```
{
  "accountId": "invalid-uuid"
}
```
Response:
```
{
  "status": 422,
  "body": {
    "errors": [
      {
        "status": "422",
        "title": "Invalid query parameter",
        "detail": "should match format \"uuid\"",
        "source": {
          "parameter": "accountId"
        }
      }
    ]
  }
}
```
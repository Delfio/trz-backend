export default {
    "openapi": "3.0.0",
    "info": {
      "title": "TRZ BACKEND API DOCUMENTATION",
      "description": "The world, as we know it, has fallen into an apocalyptic scenario. The \\\"Influenzer T-Virus\\\" (a.k.a. Twiter Virus) is transforming human beings into stupid beasts (a.k.a. Zombies), hungry to cancel humans and eat their limbs.",
      "contact": {
        "email": "delfio_eu@hotmailcom"
      },
      "version": "1.0.0"
    },
    "servers": [
      {
        "url": "http://localhost:3333",
        "description": "TRZ-BACKEND"
      }
    ],
    "tags": [
      {
        "name": "survivor",
        "description": "set of routes responsible for handling survivor information"
      },
      {
        "name": "item",
        "description": "set of routes responsible for displaying information about the items"
      },
      {
        "name": "report",
        "description": "set of a single api for extracting final reports from the api"
      }
    ],
    "paths": {
      "/": {
        "get": {
          "tags": [
            "report"
          ],
          "summary": "Get all survivors",
          "description": "responsible for returning the basic percentage information of the system",
          "operationId": "getRport",
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/report"
                  }
                }
              }
            }
          }
        }
      },
      "/survivor": {
        "get": {
          "tags": [
            "survivor"
          ],
          "summary": "Get all survivors",
          "description": "responsible for returning the list of all survivors registered in the api",
          "operationId": "getAllSurvivors",
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/survivor"
                    }
                  }
                }
              }
            }
          }
        },
        "post": {
          "tags": [
            "survivor"
          ],
          "summary": "Register survivors",
          "description": "responsible for validating and adding new survivors to the database",
          "operationId": "registerSurvivors",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RegisterSurvivor"
                }
              }
            },
            "required": true
          },
          "responses": {
            "201": {
              "description": "item created"
            },
            "403": {
              "description": "invalid information"
            },
            "406": {
              "description": "incorrect information"
            }
          }
        }
      },
      "/survivor/{survivor_id}": {
        "get": {
          "tags": [
            "survivor"
          ],
          "summary": "Get Survivor and your inventory",
          "description": "return a survivor according to his id, bringing along his inventory",
          "operationId": "getSurvivor",
          "parameters": [
            {
              "name": "survivor_id",
              "in": "path",
              "description": "unique identifier of the survivor",
              "required": true,
              "style": "simple",
              "explode": false,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/survivor"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/survivor/infected/{survivor_id}": {
        "post": {
          "tags": [
            "survivor"
          ],
          "summary": "Seek an infected survivor",
          "operationId": "seekInfectedSurvivor",
          "parameters": [
            {
              "name": "survivor_id",
              "in": "path",
              "description": "unique identifier of the survivor",
              "required": true,
              "style": "simple",
              "explode": false,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/survivor_inventory"
                  }
                }
              }
            }
          }
        }
      },
      "/survivor/infected": {
        "get": {
          "tags": [
            "survivor"
          ],
          "summary": "Return all infected survivors",
          "operationId": "getAllInfecteds",
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/survivor"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/survivor/infected/{infected_survivor_id}/vote/{reporter_survivor_id}": {
        "post": {
          "tags": [
            "survivor"
          ],
          "summary": "report infected survivor",
          "operationId": "reportInfectedSurvivor",
          "parameters": [
            {
              "name": "infected_survivor_id",
              "in": "path",
              "description": "unique identifier of the survivor infected",
              "required": true,
              "style": "simple",
              "explode": false,
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "reporter_survivor_id",
              "in": "path",
              "description": "unique identifier of the survivor reporter",
              "required": true,
              "style": "simple",
              "explode": false,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "EMPTY BODY"
            }
          }
        }
      },
      "/item": {
        "get": {
          "tags": [
            "item"
          ],
          "summary": "Return all items registered in the system",
          "operationId": "getAllItems",
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/item"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/item/{item_id}": {
        "get": {
          "tags": [
            "item"
          ],
          "summary": "Return information for a specific item",
          "operationId": "getItemByID",
          "parameters": [
            {
              "name": "item_id",
              "in": "path",
              "description": "unique identifier of the item to be searched",
              "required": true,
              "style": "simple",
              "explode": false,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/item"
                  }
                }
              }
            }
          }
        }
      },
      "/trade": {
        "post": {
          "tags": [
            "item"
          ],
          "summary": "api responsible for making a transaction between two survivors",
          "operationId": "tarde",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/body"
                }
              }
            },
            "required": true
          },
          "responses": {
            "204": {
              "description": "OK"
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "RegisterSurvivor": {
          "required": [
            "initialInventory",
            "survivor"
          ],
          "type": "object",
          "properties": {
            "survivor": {
              "$ref": "#/components/schemas/RegisterSurvivor_survivor"
            },
            "initialInventory": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/RegisterSurvivor_initialInventory"
              }
            }
          },
          "description": "default schema for registering a new survivor"
        },
        "survivor": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "example": "e6fd58ba-d034-46ae-b765-f4e5307f0757"
            },
            "infected": {
              "type": "boolean",
              "description": "defines whether a survivor is infected or not",
              "example": false
            },
            "name": {
              "type": "string",
              "example": "Delfio Francisco"
            },
            "age": {
              "type": "number",
              "example": 19
            },
            "lastLocation": {
              "$ref": "#/components/schemas/RegisterSurvivor_survivor_lastLocation"
            }
          },
          "description": "structure of a survivor"
        },
        "survivor_inventory": {
          "properties": {
            "inventory": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/survivor_inventory_inventory"
              }
            }
          },
          "description": "survivor profile and inventory",
          "allOf": [
            {
              "$ref": "#/components/schemas/survivor"
            },
            {
              "type": "object"
            }
          ]
        },
        "item": {
          "properties": {
            "item_id": {
              "type": "string",
              "example": "4s4s4s-54848-aa8r5"
            },
            "item_description": {
              "type": "string",
              "example": "AKA47"
            },
            "item_points": {
              "type": "integer",
              "example": 15
            },
            "item_amount_total": {
              "type": "number",
              "example": 25
            }
          },
          "description": "schema de items"
        },
        "report": {
          "properties": {
            "percentage_of_infected_survivors": {
              "type": "integer",
              "example": 20
            },
            "percentage_of_non_infected_survivors": {
              "type": "integer",
              "example": 80
            },
            "points_lost_because_of_an_infected_survivor": {
              "type": "integer",
              "example": 60
            },
            "average_amount_of_resource_by_survivor": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/report_average_amount_of_resource_by_survivor"
              }
            }
          },
          "description": "schema needed to make an exchange between 2 survivors"
        },
        "trade_item": {
          "properties": {
            "profile": {
              "$ref": "#/components/schemas/trade_item_profile"
            },
            "item": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/object"
              }
            }
          },
          "description": "schema that is validated to perform a transaction"
        },
        "body": {
          "type": "object",
          "properties": {
            "info_survivor_trader_n1": {
              "$ref": "#/components/schemas/trade_item"
            },
            "info_survivor_trader_n2": {
              "$ref": "#/components/schemas/trade_item"
            }
          }
        },
        "RegisterSurvivor_survivor_lastLocation": {
          "required": [
            "latitude",
            "longitude"
          ],
          "type": "object",
          "properties": {
            "latitude": {
              "type": "number",
              "example": -55.555
            },
            "longitude": {
              "type": "number",
              "example": -44.4444
            }
          }
        },
        "RegisterSurvivor_survivor": {
          "required": [
            "age",
            "lastLocation",
            "name"
          ],
          "properties": {
            "name": {
              "type": "string",
              "example": "Delfio Francisco"
            },
            "age": {
              "type": "number",
              "example": 19
            },
            "lastLocation": {
              "$ref": "#/components/schemas/RegisterSurvivor_survivor_lastLocation"
            }
          }
        },
        "RegisterSurvivor_initialInventory": {
          "type": "object",
          "properties": {
            "item_id": {
              "type": "string",
              "description": "item identifier in the system",
              "example": "dkei1kbok-akak03404-msmgm3313z"
            },
            "amount": {
              "type": "number",
              "description": "the quantity of this item",
              "example": 5
            }
          }
        },
        "survivor_inventory_inventory": {
          "type": "object",
          "properties": {
            "item_id": {
              "type": "string",
              "description": "item identifier in the system",
              "example": "dkei1kbok-akak03404-msmgm3313z"
            },
            "amount": {
              "type": "number",
              "description": "the quantity of this item",
              "example": 5
            },
            "point_value": {
              "type": "number",
              "description": "Points for a particular item",
              "example": 5
            }
          }
        },
        "report_average_amount_of_resource_by_survivor": {
          "type": "object",
          "properties": {
            "item_id": {
              "type": "string",
              "description": "item identifier in the system",
              "example": "dkei1kbok-akak03404-msmgm3313z"
            },
            "average_by_survivor": {
              "type": "integer",
              "description": "average per user",
              "example": 5
            },
            "item_description": {
              "type": "string",
              "example": "hunting item"
            }
          }
        },
        "trade_item_profile": {
          "type": "object",
          "properties": {
            "survivor_id": {
              "type": "string",
              "example": "aab58s48-8s4d8q-s5d45e0"
            }
          }
        },
        "object": {
          "properties": {
            "item_id": {
              "type": "string",
              "example": "asdfasd-erqwe484-df8778s"
            },
            "amount": {
              "type": "integer",
              "example": 5
            }
          }
        }
      }
    }
  }

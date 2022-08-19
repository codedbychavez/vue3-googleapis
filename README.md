# vue3-googleapis
A simple and easy to use wrapper plugin for adding the Google API JavaScript Client to your Vue3 Application. This plugin is an upgrade to https://www.npmjs.com/package/vue-googleapis

## About

This plugin is basically a wrapper around Google's API JavaScript Client.

## Initialization

- Import the plugin in `main.js`

```js
import gapiPlugin from './plugins/gapiPlugin'
```

- Then do:

```js
app.use(gapiPlugin, {
  apiKey: '<GOOGLE_PROJECT_API_KEY>',
  clientId: '<CLIENT_ID>.apps.googleusercontent.com',
  discoveryDocs: ['https://mybusinessbusinessinformation.googleapis.com/$discovery/rest?version=v1'],
  scope: 'https://www.googleapis.com/auth/business.manage email'
})
```

### Hints

#### Scope

- To use a single scope you can do:

```js
  scope: 'https://www.googleapis.com/auth/business.manage'
```

#### API Discovery Docs

- Using the docs makes using this JavaScript client simple. Here is an example that uses the **mybusinessbusinessinformation** API discovery document for creating a new business location:

1. Under the resources key: 

```json
{
  "resources": {
    "categories": {
      "methods": {
        "list": {},
        "create": {
          "parameters": {
            "parent": {
              "description": "Required. The name of the account in which to create this location.",
              "type": "string",
              "pattern": "^accounts/[^/]+$",
              "location": "path",
              "required": true
            }
          },
          "request" {
            "$ref": "Location"
          }
        }
      }
    }
  }
}

```

2. Expand the method, to find what parameters are supported as shown above. 
- `parent` is a required parameter.
- The `request` body should contain a [location object](https://developers.google.com/my-business/reference/businessinformation/rest/v1/accounts.locations#Location)

- With this in mind, here is how you can create a Google business location using the client: 

```js
    const location = {
        language_code: "en",
        title: "Joe's Burgers",
        categories: {
            primaryCategory: {
            name: "categories/gcid:fast_food_restaurant",
            displayName: "Fast food restaurant",
          },
        },
        storefront_address: {
          regionCode: "GY",
          languageCode: "en",
          locality: "Georgetown",
          addressLines: ["123 Stanley drive"],
        },
        website_uri: "https://www.joesburger.com",
      },

    async handleCreateLocation(e) {
      e.preventDefault();
      const response =
        await this.$google.api.client.mybusinessbusinessinformation.accounts.locations.create(
          {
            parent: `accounts/${userId}`,
            resource: location,
          }
        );
      console.log(response);
    },
```

3. Feel free to browse the code in this repo for more example usages.

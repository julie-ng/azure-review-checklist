# Azure Review Checklist - Nuxt App

Web UI for [github.com/Azure/review-checklists](https://github.com/Azure/review-checklists)

## Use

```bash
npm install
npm run dev
```

Open in a browser: [localhost:3300/checklists/landing-zone](http://localhost:3300/checklists/landing-zone) 

## Data Model

Each checklist has 3 properties

- `list`
- `categories` for headings
- `subcategories` for headings

### Source Schema

The [source JSON files](https://github.com/Azure/review-checklists/tree/main/checklists) have a root `items` Array of objects containing each checklist item:

```json
{
  "items": [
    {
      "category": "Azure Billing and Microsoft Entra ID Tenants",
      "subcategory": "Enterprise Agreement",
      "text": "Use of Enterprise Dev/Test Subscriptions to reduce costs for non-production workloads.",
      "waf": "Cost",
      "guid": "…",
      "id": "A03.05",
      "severity": "Low",
      "link": "…",
      "training": "…"
    },
    {
      …
    }
  ]
}
```

### App Schema

To help display the items in a UI, the items are grouped into categories and subcategories like so:

```javascript
const list = {
  'category-key': {
    'subcat-key-1': [
      {…}, 
      {…}
    ],
    'subcat-key-2': [
      {…}, 
      {…}
    ]
  }
}

```

And then `categories` and `subcategories` are used to keep track of the human readable headings, which are mapped to their key form (lower case and dashes).


```javascript
const categories = {
  'resource-organization': 'Resource Organization',
  'network-topology-and-connectivity': 'Network Topology and Connectivity',
  // …
}

const subcategories = {
  'naming-and-tagging': 'Naming and Tagging',
  'subscriptions': 'Subscriptions'
  // …
}

```

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
    title: 'Category Title',
    subcategories: {
      'subcat-key-1': {
        title: 'Subcategory 1 Title',
        items: [
          {…}
          {…}
        ]
      }
      'subcat-key-2': {
        title: 'Subcategory 2 Title',
        items: [
          {…}
          {…}
        ]
      }      
    }
  }
}
```

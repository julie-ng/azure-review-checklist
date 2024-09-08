# Azure Review Checklist - Nuxt App

Web UI for [github.com/Azure/review-checklists](https://github.com/Azure/review-checklists)

## Use

```bash
npm install
npm run dev
```

Open in a browser: [localhost:3000/checklists/landing-zone](http://localhost:3000/checklists/landing-zone) 

## Data Model

Example item from checklist repository's [`./checklists/alz_checklist.en.json`](https://github.com/Azure/review-checklists/tree/main/checklists)

```json
{
  "category": "Azure Billing and Microsoft Entra ID Tenants",
  "subcategory": "Enterprise Agreement",
  "text": "Use of Enterprise Dev/Test Subscriptions to reduce costs for non-production workloads.",
  "waf": "Cost",
  "guid": "5cf9f485-2784-49b3-9824-75d9b8bdb57b",
  "id": "A03.05",
  "severity": "Low",
  "link": "https://learn.microsoft.com/azure/cloud-adoption-framework/ready/landing-zone/design-area/azure-billing-enterprise-agreement#design-considerations",
  "training": "https://learn.microsoft.com/azure/devtest/offer/how-to-manage-monitor-devtest"
}
```
# Stores

This app uses [Pinia](https://pinia.vuejs.org/), which is a store used to share application state across pages and components.

> [!IMPORTANT]
> This page is a work in progress.

## `ChecklistStore`

- read-only
- keeps track of raw JSON from source data repo
- holds our app data schema

## `ReviewStore`

Keep track of user state as they are filling out reviews.

### Schema

Brainstorming…

- `reviews[]` - Array containing all reviews
  
#### Review

- ID (generate own)
- Checklist Key, e.g. `alz` and incl. date? (JSON updates)
- Create date
- Last saved date
- Items


#### Item
- GUID
- Checked or Unchecked?
- Reason, e.g. "Fulfilled", "Not Required", etc. (should this be reasonID?)
- Notes


---

# Results Page

Referring to [Excel image](https://raw.githubusercontent.com/Azure/review-checklists/main/pictures/spreadsheet_screenshot_dashboard.png)

- Review status - how many items reviewd
- Bar Chart - Status per "technology", e.g. IAM, Network Topology. (Note: prefer 'category', 'subcategory', etc.)
- Pie Chart - "Overall checks (per severity)"
- Pie Chart - "Overall checks (per design area)"
- Radar Chart - Design Area coverage


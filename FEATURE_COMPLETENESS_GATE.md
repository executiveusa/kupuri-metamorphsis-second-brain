# FEATURE COMPLETENESS GATE

A feature is not complete unless it has all of the following:

- real UI
- real data model
- create behavior
- read behavior
- update behavior
- delete behavior where safe
- empty state
- loading state
- error state
- mobile layout
- seed data
- persistence path
- test path
- export/backup consideration
- agent access consideration when appropriate

## Stub rejection rule

A page that maps over a hard-coded array and has no save path is a placeholder, not a feature.

## Current MVP acceptance level

For this repo-ready MVP, local-first persistence through `localStorage` is acceptable only if:

- the module is clearly marked local-first
- a future Supabase/Firebase persistence path is documented
- the data shape is stable enough to migrate later

## Production acceptance level

For production, the feature must persist to the selected backend, include auth-scoped user ownership, and support export.

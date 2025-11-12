# WEBSITE2.0 — Playwright Automation Guide

## 1. Run Tests on UAT Environment

- Headed (UI visible):  
  `npx playwright test --project=uat --headed`

- Headless (UI hidden):  
  `npx playwright test --project=uat --headless`

- With specific number of workers (e.g., 1):  
  `npx playwright test --project=uat --workers=1`

---

## 2. Recaptcha Test Scenarios

> ⚙️ Before running, go to **Backoffice** and set the correct reCAPTCHA score

### A. reCAPTCHA Score = 1  
_(Valid reCAPTCHA — Run `fail-recaptcha` suite)_

- Headed:  
  `npx playwright test fail-recaptcha --project=uat --headed --workers=1`

- Headless:  
  `npx playwright test fail-recaptcha --project=uat --headless --workers=1`

---

### B. reCAPTCHA Score = 0.1  
_(Invalid reCAPTCHA — Run `others` suite)_

- Headed:  
  `npx playwright test others --project=uat --headed --workers=1`

- Headless:  
  `npx playwright test others --project=uat --headless --workers=1`

---

## Notes

- Ensure reCAPTCHA score is configured **before running tests**
- Use `--workers=1` to avoid flaky tests caused by long page load times and resource delays
- Always use `--project=uat` to run against the correct environment defined in `playwright.config.ts`

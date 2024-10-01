# **FantasyCharacterForgeTests**

This test suite automates the verification of the character creation process on the FantasyCharacterForge platform using Playwright. It covers form filling, race/class selection, validation of mandatory fields, image uploads, and proper distribution of skill points.

## **Features Tested:**

- **Character Creation Form**

Automates the process of filling out the character creation form, including details like:

Name, dynasty, family, age, weight
Realm, faith, motivations
Biography and equipment
Race and Class Selection
Verifies that the race and class descriptions are displayed correctly and that the user can select and confirm their choices.

- **Mandatory Field Validation**

Ensures that mandatory fields like the character name are validated, and appropriate error messages are displayed if any required field is left empty.

- **Image Upload**

Checks that the image upload functionality works correctly and the image is saved as part of the character creation process.

- **Skill Points Allocation**

Tests the functionality for allocating skill points to attributes like strength, dexterity, and intelligence, verifying the distribution and ensuring it reflects accurately in the character's profile.

- **Character Details Validation**

After character creation, the test ensures that all entered details (name, dynasty, biography, etc.) are displayed correctly.

## **Technologies Used:**

**Playwright:** For browser automation and UI testing.

**Node.js:** Test environment for running Playwright scripts.

## Links

- code repository https://github.com/Finarfin32/FantasyCharacterForgeTests

## Commands

- check `NodeJS` version  
  `node -v`
- new project with Playwright  
  `npm init playwright@latest`
- record tests for given site  
  `npx playwright codegen http://localhost:3000/`

  (First, you need to set up the project locally: FantasyCharacterForge)

- run tests without browser GUI  
  `npx playwright test`
- run tests with browser GUI  
  `npx playwright test --headed`
- view report  
  `npx playwright show-report`

## Playwright Config modifications

- config file `playwright.config.ts`
- disable browsers, i.e. Firefox
  ```javascript
  // {
  //   name: 'firefox',
  //   use: {
  //     ...devices['Desktop Firefox'],
  //   },
  // },
  ```

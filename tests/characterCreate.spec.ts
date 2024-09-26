import { test, expect } from '@playwright/test';

test.describe('creating character',()=>{

test('Creating character', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Potwierdź' }).click();
  await page.getByRole('button', { name: 'Potwierdź' }).click();
  await page.getByRole('button', { name: 'Dodaj zdjęcie' }).click();
  await page.setInputFiles('input[type="file"]', './media/Aenwendien.jpg');
  // await page.getByRole('button', { name: 'Dodaj zdjęcie' }).setInputFiles('./media/Aenwendien.jpg');
  await page.getByRole('button', { name: 'Zapisz' }).click();
  await page.getByRole('button', { name: '+' }).first().click({clickCount: 5});
  await page.getByRole('button', { name: '+' }).nth(1).click({clickCount: 5});
  await page.getByRole('button', { name: '+' }).nth(2).click({clickCount: 5});
  await page.getByLabel('Kobieta').check();
  await page.getByPlaceholder('Nazwa postaci').click();
  await page.getByPlaceholder('Nazwa postaci').fill('Aenwendien');
  await page.getByPlaceholder('Dynastia').click();
  await page.getByPlaceholder('Dynastia').fill('Przykładowa Dynastia');
  await page.getByPlaceholder('Rodzina').click();
  await page.getByPlaceholder('Rodzina').fill('Przykładowa Rodzina');
  await page.getByPlaceholder('age').fill('28');
  await page.getByPlaceholder('weight').fill('60');
  await page.locator('select[name="Realm"]').selectOption('Państwo2');
  await page.locator('select[name="faith"]').selectOption('Greeteal');
  await page.locator('select[name="motivations"]').selectOption('Zdobycie legendarnego skarbu');
  await page.getByPlaceholder('Napisz swoją biografię').click();
  await page.getByPlaceholder('Napisz swoją biografię').fill('Przykładowa biografia');
  await page.getByPlaceholder('Wypisz ekwipunek swojej').click();
  await page.getByPlaceholder('Wypisz ekwipunek swojej').fill('Przykładowe wyposażenie');
  await page.getByRole('button', { name: 'Prześlij formularz' }).click();
});

test('Creating a character without entering a name in the required field', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Potwierdź' }).click();
  await page.getByRole('button', { name: 'Potwierdź' }).click();
  await page.getByRole('button', { name: 'Dodaj zdjęcie' }).click();
  await page.setInputFiles('input[type="file"]', './media/Aenwendien.jpg');
  // await page.getByRole('button', { name: 'Dodaj zdjęcie' }).setInputFiles('Aenwendien.jpg');
  await page.getByRole('button', { name: 'Zapisz' }).click();
  await page.getByRole('button', { name: '+' }).first().click();
  await page.getByRole('button', { name: '+' }).nth(1).click();
  await page.getByRole('button', { name: '+' }).nth(2).click();
  await page.getByLabel('Kobieta').check();
  await page.getByPlaceholder('age').fill('45');
  await page.getByPlaceholder('weight').fill('70');
  await page.getByPlaceholder('Dynastia').click();
  await page.getByPlaceholder('Dynastia').fill('Przykładowa Dynastia');
  await page.getByPlaceholder('Rodzina').click();
  await page.getByPlaceholder('Rodzina').fill('Przykładowa rodzina');
  await page.locator('select[name="Realm"]').selectOption('Państwo2');
  await page.locator('select[name="faith"]').selectOption('Greeteal');
  await page.locator('select[name="motivations"]').selectOption('Zdobycie legendarnego skarbu');
  await page.getByPlaceholder('Napisz swoją biografię').click();
  await page.getByPlaceholder('Napisz swoją biografię').fill('Przykładowa biografia');
  await page.getByPlaceholder('Wypisz ekwipunek swojej').click();
  await page.getByPlaceholder('Wypisz ekwipunek swojej').fill('Przykładowe wyposażenie');
  await page.getByRole('button', { name: 'Prześlij formularz' }).click();
  await page.locator('div').filter({ hasText: /^Nazwa postaciTo pole jest wymagane$/ }).getByRole('paragraph').click();
  await expect(page.getByText('Nazwa postaciTo pole jest wymagane')).toBeVisible();
});




})
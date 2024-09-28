import { test, expect } from '@playwright/test';

test.describe('creating character', () => {
  //stałe globalnie widoczne
  const characterName = 'Aenwendien';
  const dynasty = 'Przykładowa Dynastia';
  const family = 'Przykładowa Rodzina';
  const age = '28';
  const weight = '70';
  const sampleEquipment = 'Przykładowe wyposażenie';
  const sampleBiography = 'Przykładowa biografia';

  //hook
  test.beforeEach(async ({ page }) => {
    const url = 'http://localhost:3000/';
    await page.goto(url);
  });

  test('Checking if the description of a given Race is displayed correctly', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Przewiń w prawo' }).click();
    await page.getByRole('button', { name: 'Przewiń w prawo' }).click();
    await page
      .getByRole('heading', { name: 'Krasnolud - niezłomny, uparty' })
      .click();

    await expect(
      page.getByText(
        'Krasnolud - niezłomny, uparty i wytrzymały, krasnoludy są urodzonymi rzemieślnikami, górnikami i wojownikami. Ich zaciętość i siła są niezrównane, a ich umiejętności rzemieślnicze są po prostu doskonałe. Mimo że krasnoludy są doskonałymi wojownikami, nie gardzą one także wiedzą i nauką.',
      ),
    ).toBeVisible();
  });

  test('Checking if the description of a given class is displayed correctly', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Przewiń w prawo' }).click();
    await page.getByRole('button', { name: 'Przewiń w prawo' }).click();
    await page.getByRole('button', { name: 'Przewiń w prawo' }).click();
    await page.getByRole('button', { name: 'Przewiń w lewo' }).click();
    await page.getByRole('button', { name: 'Przewiń w lewo' }).click();
    await page.getByRole('button', { name: 'Przewiń w lewo' }).click();
    await page.getByRole('button', { name: 'Potwierdź' }).click();
    await page.getByRole('button', { name: 'Przewiń w prawo' }).click();
    await page.getByRole('button', { name: 'Przewiń w prawo' }).click();
    await page
      .getByRole('heading', { name: 'Mag - magowie posiadają' })
      .click();
    await expect(
      page.getByText(
        'Mag - magowie posiadają niezwykłą moc i wiedzę na temat magii. Ich umiejętności pozwalają im kontrolować żywioły, czarować przedmioty i zaklęcia, a także wykorzystywać magię leczniczą. Magowie są zwykle introwertycznymi i cierpliwymi postaciami, którzy zdobywają swoją wiedzę poprzez studiowanie i praktykę.',
      ),
    ).toBeVisible();
  });

  test('Checking if the image is saved correctly.', async ({ page }) => {
    await page.getByRole('button', { name: 'Potwierdź' }).click();
    await page.getByRole('button', { name: 'Potwierdź' }).click();
    await page.getByRole('button', { name: 'Dodaj zdjęcie' }).click();
    await page.setInputFiles('input[type="file"]', './media/Aenwendien.jpg');
    await page.getByRole('button', { name: 'Zapisz' }).click();
    await page.getByText('Zapisano').click();

    await expect(page.getByText('Zapisano')).toBeVisible();
  });

  test('Creating a character without entering a name in the required field', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Potwierdź' }).click();
    await page.getByRole('button', { name: 'Potwierdź' }).click();
    await page.getByRole('button', { name: 'Dodaj zdjęcie' }).click();
    await page.setInputFiles('input[type="file"]', './media/Aenwendien.jpg');
    await page.getByRole('button', { name: 'Zapisz' }).click();
    await page.getByRole('button', { name: '+' }).first().click();
    await page.getByRole('button', { name: '+' }).nth(1).click();
    await page.getByRole('button', { name: '+' }).nth(2).click();
    await page.getByLabel('Kobieta').check();
    await page.getByPlaceholder('age').fill(age);
    await page.getByPlaceholder('weight').fill(weight);
    await page.getByPlaceholder('Dynastia').fill(dynasty);
    await page.getByPlaceholder('Rodzina').fill(family);
    await page.locator('select[name="Realm"]').selectOption('Państwo2');
    await page.locator('select[name="faith"]').selectOption('Greeteal');
    await page
      .locator('select[name="motivations"]')
      .selectOption('Zdobycie legendarnego skarbu');
    await page.getByPlaceholder('Napisz swoją biografię').fill(sampleEquipment);
    await page
      .getByPlaceholder('Wypisz ekwipunek swojej')
      .fill(sampleBiography);
    await page.getByRole('button', { name: 'Prześlij formularz' }).click();
    await page
      .locator('div')
      .filter({ hasText: /^Nazwa postaciTo pole jest wymagane$/ })
      .getByRole('paragraph')
      .click();
    await expect(
      page.getByText('Nazwa postaciTo pole jest wymagane'),
    ).toBeVisible();
  });

  test('Creating character', async ({ page }) => {
    await page.getByRole('button', { name: 'Potwierdź' }).click();
    await page.getByRole('button', { name: 'Potwierdź' }).click();
    await page.getByRole('button', { name: 'Dodaj zdjęcie' }).click();
    await page.setInputFiles('input[type="file"]', './media/Aenwendien.jpg');
    await page.getByRole('button', { name: 'Zapisz' }).click();
    await page
      .getByRole('button', { name: '+' })
      .first()
      .click({ clickCount: 5 });
    await page
      .getByRole('button', { name: '+' })
      .nth(1)
      .click({ clickCount: 5 });
    await page
      .getByRole('button', { name: '+' })
      .nth(2)
      .click({ clickCount: 5 });
    await page.getByLabel('Kobieta').check();
    await page.getByPlaceholder('Nazwa postaci').fill(characterName);
    await page.getByPlaceholder('Dynastia').fill(dynasty);
    await page.getByPlaceholder('Rodzina').fill(family);
    await page.getByPlaceholder('age').fill(age);
    await page.getByPlaceholder('weight').fill(weight);
    await page.locator('select[name="Realm"]').selectOption('Państwo2');
    await page.locator('select[name="faith"]').selectOption('Greeteal');
    await page
      .locator('select[name="motivations"]')
      .selectOption('Zdobycie legendarnego skarbu');
    await page.getByPlaceholder('Napisz swoją biografię').fill(sampleEquipment);
    await page
      .getByPlaceholder('Wypisz ekwipunek swojej')
      .fill(sampleBiography);
    await page.getByRole('button', { name: 'Prześlij formularz' }).click();
  });

  test('Validation of the selected card', async ({ page }) => {
    await page.getByRole('button', { name: 'Przewiń w prawo' }).click();
    await page.getByRole('button', { name: 'Potwierdź' }).click();
    await page.getByRole('button', { name: 'Przewiń w prawo' }).click();
    await page.getByRole('button', { name: 'Potwierdź' }).click();
    await page.getByPlaceholder('Nazwa postaci').fill(characterName);
    await page.getByPlaceholder('Dynastia').fill(dynasty);
    await page.getByPlaceholder('Rodzina').fill(family);
    await page.getByPlaceholder('age').fill(age);
    await page.getByPlaceholder('weight').fill(weight);
    await page.getByRole('button', { name: 'Prześlij formularz' }).click();
    await page.getByText('Wybrana Rasa: ELF').click();
    await page.getByText('Wybrana Klasa: ŁOWCA').click();

    await expect(page.getByText('Wybrana Rasa: ELF')).toBeVisible();
    await expect(page.getByText('Wybrana Klasa: ŁOWCA')).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

test.describe('creating character', () => {
  //Stałe globalne
  const characterName = 'Aenwendien';
  const dynasty = 'Przykładowa Dynastia';
  const family = 'Przykładowa Rodzina';
  const age = '28';
  const weight = '70';
  const sampleEquipment = 'Przykładowe wyposażenie';
  const sampleBiography = 'Przykładowa biografia';
  const imagePath = './media/Aenwendien.jpg';

  //Hook do przygotowania przed każdym testem
  test.beforeEach(async ({ page }) => {
    const url = 'http://localhost:3000/';
    await page.goto(url);
  });

  // Funkcja do klikania w przyciski
  const clickButtonByName = async (page, name) => {
    const button = await page.getByRole('button', { name });
    //Asercja
    await expect(button).toBeVisible();
    //Klik
    await button.click();
  };

  // Funkcja do wypełniania formularza postaci
  const fillCharacterForm = async (page) => {
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
    await page.getByPlaceholder('Napisz swoją biografię').fill(sampleBiography);
    await page
      .getByPlaceholder('Wypisz ekwipunek swojej')
      .fill(sampleEquipment);
  };

  // Funkcja do sprawdzania poprawności wszystkich danych postaci
  async function assertCharacterDetailsVisible(
    page,
    characterName,
    dynasty,
    family,
    age,
    weight,
    sampleEquipment,
    sampleBiography,
  ) {
    await expect(page.getByText(characterName)).toBeVisible();
    await expect(page.getByText(dynasty)).toBeVisible();
    await expect(page.getByText(family)).toBeVisible();
    await expect(page.getByText(age)).toBeVisible();
    await expect(page.getByText(weight)).toBeVisible();
    await expect(page.getByText(sampleEquipment)).toBeVisible();
    await expect(page.getByText(sampleBiography)).toBeVisible();
  }

  test('Checking if the description of a given Race is displayed correctly', async ({
    page,
  }) => {
    //Wybranie rasy (3 - Krasnolud)
    await clickButtonByName(page, 'Przewiń w prawo');
    await clickButtonByName(page, 'Przewiń w prawo');
    await page
      .getByRole('heading', { name: 'Krasnolud - niezłomny, uparty' })
      .click();

    //Asercja opisu Krasnoluda
    await expect(
      page.getByText(
        'Krasnolud - niezłomny, uparty i wytrzymały, krasnoludy są urodzonymi rzemieślnikami, górnikami i wojownikami. Ich zaciętość i siła są niezrównane, a ich umiejętności rzemieślnicze są po prostu doskonałe. Mimo że krasnoludy są doskonałymi wojownikami, nie gardzą one także wiedzą i nauką.',
      ),
    ).toBeVisible();
  });

  test('Checking if the description of a given class is displayed correctly', async ({
    page,
  }) => {
    //Wybranie rasy (1) i klasy (3 - Mag)
    await clickButtonByName(page, 'Potwierdź');
    await clickButtonByName(page, 'Przewiń w prawo');
    await clickButtonByName(page, 'Przewiń w prawo');
    await page
      .getByRole('heading', { name: 'Mag - magowie posiadają' })
      .click();

    //Asercja opisu Maga
    await expect(
      page.getByText(
        'Mag - magowie posiadają niezwykłą moc i wiedzę na temat magii. Ich umiejętności pozwalają im kontrolować żywioły, czarować przedmioty i zaklęcia, a także wykorzystywać magię leczniczą. Magowie są zwykle introwertycznymi i cierpliwymi postaciami, którzy zdobywają swoją wiedzę poprzez studiowanie i praktykę.',
      ),
    ).toBeVisible();
  });

  test('Checking if the image is saved correctly.', async ({ page }) => {
    //Wybranie rasy i klasy
    await clickButtonByName(page, 'Potwierdź');
    await clickButtonByName(page, 'Potwierdź');

    //Dodanie zdjęcia
    await page.getByRole('button', { name: 'Dodaj zdjęcie' }).click();
    await page.setInputFiles('input[type="file"]', imagePath);
    await page.getByRole('button', { name: 'Zapisz' }).click();
    await page.getByText('Zapisano').click();

    //Asercja
    await expect(page.getByText('Zapisano')).toBeVisible();
  });

  test('Creating a character without entering a name in the required field', async ({
    page,
  }) => {
    //Wybranie rasy i klasy
    await clickButtonByName(page, 'Potwierdź');
    await clickButtonByName(page, 'Potwierdź');
    await page.getByRole('button', { name: 'Prześlij formularz' }).click();

    //Brak wypełnienia obowiązkowych pól w formularzu
    await page
      .locator('div')
      .filter({ hasText: /^Nazwa postaciTo pole jest wymagane$/ })
      .getByRole('paragraph')
      .click();
    await expect(
      page.getByText('Nazwa postaciTo pole jest wymagane'),
    ).toBeVisible();
  });

  test('Validation of the selected card', async ({ page }) => {
    //Przewinięcie na rasę "Elf"
    await page.getByRole('button', { name: 'Przewiń w prawo' }).click();
    await clickButtonByName(page, 'Potwierdź');

    //Przewinięcie na klase "Łowca"
    await page.getByRole('button', { name: 'Przewiń w prawo' }).click();
    await clickButtonByName(page, 'Potwierdź');

    //Wypełnienie obowiązkowych pól
    await page.getByPlaceholder('Nazwa postaci').fill(characterName);
    await page.getByPlaceholder('Dynastia').fill(dynasty);
    await page.getByPlaceholder('Rodzina').fill(family);
    await page.getByRole('button', { name: 'Prześlij formularz' }).click();

    //Asercja
    await expect(page.getByText('Wybrana Rasa: ELF')).toBeVisible();
    await expect(page.getByText('Wybrana Klasa: ŁOWCA')).toBeVisible();
  });

  test('Creating full character', async ({ page }) => {
    //Wybranie rasy i klasy
    await clickButtonByName(page, 'Potwierdź');
    await clickButtonByName(page, 'Potwierdź');

    //Wgranie zdjęcia
    await page.getByRole('button', { name: 'Dodaj zdjęcie' }).click();
    await page.setInputFiles('input[type="file"]', imagePath);
    await page.getByRole('button', { name: 'Zapisz' }).click();

    //Sprawdzenie punktów za rasę i klasę
    await expect(page.getByText('*10')).toBeVisible();
    await expect(page.getByText('*16')).toBeVisible();
    await expect(page.getByText('*20')).toBeVisible();

    //Użytkownik przydziela po 5 punktów
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

    //Wypełnienie formularza
    await fillCharacterForm(page);
    await page.getByRole('button', { name: 'Prześlij formularz' }).click();

    //Asercja
    await assertCharacterDetailsVisible(
      page,
      characterName,
      dynasty,
      family,
      age,
      weight,
      sampleEquipment,
      sampleBiography,
    );

    //Sprawdzenie punktów rozdanych przez użytkownika
    await expect(page.getByText('Siła: 5')).toBeVisible();
    await expect(page.getByText('Zręczność: 5')).toBeVisible();
    await expect(page.getByText('Inteligencja: 5')).toBeVisible();
  });
});

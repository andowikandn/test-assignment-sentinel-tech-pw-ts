import { test } from '@playwright/test';
// import { test } from '../fixtures/screenshots';
import { InputFormPage, SubmitFormPage } from '../pages/input_form';

test.describe('Practice input form', () => {
  test('User verify required is empty', async ({ page }) => {
    const inputForm = new InputFormPage(page);

    await inputForm.goto();
    await inputForm.clickSubmitBtn();
    await inputForm.verifyRequiredEmpty();
  });

  test('User verify required email and mobile number is invalid', async ({ page }) => {
    const inputForm = new InputFormPage(page);

    await inputForm.goto();
    await inputForm.inputFirstName('Budi');
    await inputForm.inputLastName('Pekerti');
    await inputForm.inputEmail('budi@gmail');
    await inputForm.selectGender('Male');
    await inputForm.inputMobileNumber('13245');
    await inputForm.clickSubmitBtn();
    await inputForm.verifyInvalidRequired();
  });

  test('User input subject then clear subjects', async ({ page }) => {
    const inputForm = new InputFormPage(page);

    await inputForm.goto();
    await inputForm.inputFirstName('Budi');
    await inputForm.inputLastName('Pekerti');
    await inputForm.inputEmail('budi@gmail.com');
    await inputForm.selectGender('Female');
    await inputForm.inputMobileNumber('1234512345');
    await inputForm.setDateOfBirth('20 Oct 1994');
    await inputForm.inputSubject(['Arts', 'Computer Science']);
    await inputForm.clearSubject();
  });

  test('User filling out the form then verify submit form', async ({ page }) => {
    const inputForm = new InputFormPage(page);
    const submitForm = new SubmitFormPage(page);

    await inputForm.goto();
    await inputForm.inputFirstName('Budi');
    await inputForm.inputLastName('Pekerti');
    await inputForm.inputEmail('budi@gmail.com');
    await inputForm.selectGender('Female');
    await inputForm.inputMobileNumber('1234512345');
    await inputForm.setDateOfBirth('20 Oct 1994');
    await inputForm.inputSubject(['Arts', 'Computer Science']);
    await inputForm.selectHobbies(['Reading', 'Music']);
    await inputForm.inputUploadFile('/Users/andowikandono/Desktop/FileImage.png');
    await inputForm.inputAddress('Input current address nih');
    await inputForm.selectState('Rajasthan');
    await inputForm.selectCity('Jaiselmer');
    await inputForm.clickSubmitBtn();
    await submitForm.verifySubmitForm();
    await submitForm.clickCloseModal();
  });
});
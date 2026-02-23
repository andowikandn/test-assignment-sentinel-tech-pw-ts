import { test } from '../fixtures/screenshots';
import { InputFormPage, SubmitFormPage } from '../pages/pageObject/input_form';
import form from '../pages/data/form.json';

test.describe('Practice input form', () => {
  test('User verify required is empty', async ({ page }) => {
    const inputForm = new InputFormPage(page);

    await inputForm.goto();
    await inputForm.clickSubmitBtn();
    await inputForm.verifyRequiredEmpty();
  });

  test('User verify email and mobile number is invalid', async ({ page }) => {
    const inputForm = new InputFormPage(page);

    await inputForm.goto();
    await inputForm.inputFirstName(form.firstName);
    await inputForm.inputLastName(form.lastName);
    await inputForm.inputEmail(form.email.invalid);
    await inputForm.selectGender(form.gender.male);
    await inputForm.inputMobileNumber(form.mobile.invalid);
    await inputForm.clickSubmitBtn();
    await inputForm.verifyInvalidRequired();
  });

  test('User input subject then clear subjects', async ({ page }) => {
    const inputForm = new InputFormPage(page);

    await inputForm.goto();
    await inputForm.inputFirstName(form.firstName);
    await inputForm.inputLastName(form.lastName);
    await inputForm.inputEmail(form.email.valid);
    await inputForm.selectGender(form.gender.female);
    await inputForm.inputMobileNumber(form.mobile.valid);
    await inputForm.setDateOfBirth(form.dateOfBirth);
    await inputForm.inputSubject([
      form.subjects.arts,
      form.subjects.computer,
      form.subjects.economics
    ]);
    await inputForm.clearSubject();
  });

  test('User filling out the form then verify submit form', async ({ page }) => {
    const inputForm = new InputFormPage(page);
    const submitForm = new SubmitFormPage(page);

    await inputForm.goto();
    await inputForm.inputFirstName(form.firstName);
    await inputForm.inputLastName(form.lastName);
    await inputForm.inputEmail(form.email.valid);
    await inputForm.selectGender(form.gender.male);
    await inputForm.inputMobileNumber(form.mobile.valid);
    await inputForm.setDateOfBirth(form.dateOfBirth);
    await inputForm.inputSubject([
      form.subjects.arts,
      form.subjects.computer,
    ]);
    await inputForm.selectHobbies([
      form.hobbies.sport,
      form.hobbies.reading,
      form.hobbies.music
    ]);
    await inputForm.inputUploadFile();
    await inputForm.inputAddress(form.address);
    await inputForm.selectState(form.state.rajasthan);
    await inputForm.selectCity(form.city.jaiselmer);
    await inputForm.clickSubmitBtn();
    await submitForm.verifySubmitForm();
    await submitForm.clickCloseModal();
  });
});
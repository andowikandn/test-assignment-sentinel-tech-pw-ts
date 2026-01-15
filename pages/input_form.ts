import { Locator, Page, test, expect } from "@playwright/test";
import { InputFormLocators } from "../locators/input_form";
import { BASE_URL } from "../utlis/env";
import path from 'path';

export class InputFormPage {
    readonly page: Page;
    readonly headerStudentRegisterForm: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly userMailInput: Locator;
    readonly genderField: Locator;
    readonly mobileNumberInput: Locator;
    readonly dateOfBirthInput: Locator;
    readonly tapSubjectInput: Locator;
    readonly clearSubjectsButton: Locator;
    readonly hobbiesSportsCheckbox: Locator;
    readonly hobbiesReadingCheckbox: Locator;
    readonly hobbiesMusicCheckbox: Locator;
    readonly uploadFilesInput: Locator;
    readonly currentAddressInput: Locator;
    readonly selectStateDropdown: Locator;
    readonly selectCityDropdown: Locator;
    readonly submitButton: Locator;
    readonly requiredFirstName: Locator;
    readonly requiredLastName: Locator;
    readonly requiredGender: Locator;
    readonly requiredMobileNumber: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerStudentRegisterForm = page.locator(InputFormLocators.inputForm.headerStudentRegisterForm);
        this.firstNameInput = page.locator(InputFormLocators.inputForm.firstNameInput);
        this.lastNameInput = page.locator(InputFormLocators.inputForm.lastNameInput);
        this.userMailInput = page.locator(InputFormLocators.inputForm.userMailInput);
        this.genderField = page.locator(InputFormLocators.inputForm.genderField);
        this.mobileNumberInput = page.locator(InputFormLocators.inputForm.mobileNumberInput);
        this.dateOfBirthInput = page.locator(InputFormLocators.inputForm.dateOfBirthInput);
        this.tapSubjectInput = page.locator(InputFormLocators.inputForm.tapSubjectInput);
        this.clearSubjectsButton = page.locator(InputFormLocators.inputForm.clearSubjectsButton);
        this.hobbiesSportsCheckbox = page.locator(InputFormLocators.inputForm.hobbiesSportsCheckbox);
        this.hobbiesReadingCheckbox = page.locator(InputFormLocators.inputForm.hobbiesReadingCheckbox);
        this.hobbiesMusicCheckbox = page.locator(InputFormLocators.inputForm.hobbiesMusicCheckbox);
        this.uploadFilesInput = page.locator(InputFormLocators.inputForm.uploadFilesInput);
        this.currentAddressInput = page.locator(InputFormLocators.inputForm.currentAddressInput);
        this.selectStateDropdown = page.locator(InputFormLocators.inputForm.selectStateDropdown);
        this.selectCityDropdown = page.locator(InputFormLocators.inputForm.selectCityDropdown);
        this.submitButton = page.locator(InputFormLocators.inputForm.submitButton);
        this.requiredFirstName = page.locator(InputFormLocators.inputForm.requiredFirstName);
        this.requiredLastName = page.locator(InputFormLocators.inputForm.requiredLastName);
        this.requiredGender = page.locator(InputFormLocators.inputForm.requiredGender);
        this.requiredMobileNumber = page.locator(InputFormLocators.inputForm.requiredMobileNumber);
    }

    async goto() {
        await test.step('Navigate practice form page', async () => {
            try {
                await this.page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
            } catch (e) {
                console.log('Retrying...');
                await this.page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
                await expect(this.headerStudentRegisterForm).toBeVisible();
            }
        });
    }

    async inputFirstName(firstName: string) {
        await test.step('User input firs name', async () => {
            await this.firstNameInput.fill(firstName)
        });
    }

    async inputLastName(lastName: string) {
        await test.step('User input last name', async () => {
            await this.lastNameInput.fill(lastName);
        });
    }

    async inputEmail(email: string) {
        await test.step('User input user email', async () => {
            await this.userMailInput.fill(email);
        });
    }

    async selectGender(gender: string) {
        await test.step('User select a gender', async () => {
            await this.page
                .locator(`input[type="radio"][value="${gender}"]`)
                .click({ force: true });
        });
    }

    async inputMobileNumber(mobileNumber: string) {
        await test.step('User input mobile number', async () => {
            await this.mobileNumberInput.fill(mobileNumber);
        });
    }

    async setDateOfBirth(date: string) {
        const [dayStr, monthStr, yearStr] = date.split(' ');
        const day = dayStr.padStart(2, '0');

        const monthMap: Record<string, string> = {
            Jan: '0', Feb: '1', Mar: '2', Apr: '3', May: '4', Jun: '5',
            Jul: '6', Aug: '7', Sep: '8', Oct: '9', Nov: '10', Dec: '11'
        };

        await test.step('User input date of birth', async () => {
            await this.dateOfBirthInput.click();
            await this.page.locator('.react-datepicker__month-select')
                .selectOption(monthMap[monthStr]);

            await this.page.locator('.react-datepicker__year-select')
                .selectOption(yearStr);
            await this.page.locator(
                `.react-datepicker__day--0${day}:not(.react-datepicker__day--outside-month)`
            ).click();
        });
    }

    async inputSubject(values: string[]) {
        await test.step(`User input subjects: ${values.join(', ')}`, async () => {
            const subjectInput = this.tapSubjectInput;
            await expect(subjectInput).toBeVisible();

            for (const subject of values) {
                await subjectInput.fill(subject);
                const option = this.page.locator('.subjects-auto-complete__option', { hasText: subject });
                await option.waitFor({ state: 'visible' });
                await option.click();
                await expect(subjectInput).toBeVisible();
            }
        });
    }

    async clearSubject() {
        await test.step('User clear subject', async () => {
            const button = this.clearSubjectsButton.first();
            await expect(button).toBeVisible({ timeout: 1000 });
            await button.click();
            await expect(this.tapSubjectInput).toHaveValue('');
        });
    }

    async selectHobbies(hobbies: string[]) {
        await test.step(`User select hobbies: ${hobbies.join(', ')}`, async () => {
            for (const hobby of hobbies) {
                const checkbox = this.page.locator(`label:has-text("${hobby}")`);
                await checkbox.waitFor({ state: 'visible', timeout: 5000 });
                await checkbox.click({ force: true });
            }
        });
    }

    async inputUploadFile() {
        await test.step('User upload file', async () => {
            const filePath = path.resolve(__dirname, 'asset', 'FileImage.png');
            console.log('Upload file path: ', filePath);
            await this.uploadFilesInput.setInputFiles(filePath);

            const fileName = await this.uploadFilesInput.evaluate(
                (el: HTMLInputElement) => el.files?.[0]?.name ?? ''
            );

            expect(fileName).toBe('FileImage.png');

        });
    }

    async inputAddress(address: string) {
        await test.step('User input current address', async () => {
            await this.currentAddressInput.fill(address);
        });
    }

    async selectState(state: string) {
        await test.step('User select state', async () => {
            await this.selectStateDropdown.click();
            await this.page.locator(`text=${state}`).click();
        });
    }

    async selectCity(city: string) {
        await test.step('User select state', async () => {
            await this.selectCityDropdown.click();
            await this.page.locator(`text=${city}`).click();
        });
    }

    async clickSubmitBtn() {
        await test.step('User click submit button', async () => {
            await this.submitButton.click();
        });
    }

    async verifyRequiredEmpty() {
        await test.step('Verify requirement field', async () => {
            expect(this.page.locator('input#firstName:invalid')).toBeVisible();
            expect(this.page.locator('input#lastName:invalid')).toBeVisible();
            expect(this.page.locator('input#gender-radio-1:invalid')).toBeVisible();
        });
    }

    async verifyInvalidRequired() {
        await test.step('User verify invalid email and mobile number', async () => {
            expect(this.page.locator('input#userEmail:invalid')).toBeVisible();
            expect(this.page.locator('input#userNumber:invalid')).toBeVisible();
        });
    }
}

export class SubmitFormPage {
    readonly page: Page;
    readonly appearsHeaderModal: Locator;
    readonly viewBodyModal: Locator;
    readonly closeModalButton: Locator;
    readonly headerStudentRegisterForm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.appearsHeaderModal = page.locator(InputFormLocators.submitForm.appearsHeaderModal);
        this.viewBodyModal = page.locator(InputFormLocators.submitForm.viewBodyModal);
        this.closeModalButton = page.locator(InputFormLocators.submitForm.closeModalButton);
        this.headerStudentRegisterForm = page.locator(InputFormLocators.inputForm.headerStudentRegisterForm);
    }

    async verifySubmitForm() {
        await test.step('User verify submit form', async () => {
            await this.page.waitForTimeout(200);
            await expect(this.appearsHeaderModal).toBeVisible();
            await expect(this.viewBodyModal).toBeVisible();
        });
    }

    async clickCloseModal() {
        await test.step('User close modal submit form', async () => {
            const closeButton = this.closeModalButton;
            await closeButton.waitFor({ state: 'visible', timeout: 5000 });
            await closeButton.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(2000);
            await closeButton.click({ force: true });
            await expect(this.headerStudentRegisterForm).toBeVisible();
        });
    }
}
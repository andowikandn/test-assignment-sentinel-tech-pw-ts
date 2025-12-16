export const InputFormLocators = {
    inputForm: {
        headerStudentRegisterForm: 'h5:has-text("Student Registration Form")', // Student Registration Form
        firstNameInput: '#firstName',
        lastNameInput: '#lastName',
        userMailInput: '#userEmail',
        genderField: '#genterWrapper',
        mobileNumberInput: '#userNumber',
        dateOfBirthInput: '#dateOfBirthInput', // 12 Dec 2025
        tapSubjectInput: '#subjectsInput', // Computer Science, Arts
        clearSubjectsButton: '.subjects-auto-complete__clear-indicator',
        hobbiesSportsCheckbox: '#hobbies-checkbox-1',
        hobbiesReadingCheckbox: '#hobbies-checkbox-2',
        hobbiesMusicCheckbox: '#hobbies-checkbox-3',
        uploadFilesInput: '#uploadPicture', // FileImage.png
        currentAddressInput: '#currentAddress',
        selectStateDropdown: '#state', // NCR, Haryana, Rajasthan, Uttar Pradesh
        selectCityDropdown: '#city', // Delhi, Jaipur, Lucknow, Agra
        submitButton: '#submit',
        requiredFirstName: 'input#firstName[required]',
        requiredLastName: 'input#lastName[required]',
        requiredGender: 'input[name="gender"][required]', 
        requiredMobileNumber: 'input#userNumber[required]',
    },

    submitForm: {
        appearsHeaderModal: '#example-modal-sizes-title-lg', // Thanks for submitting the form
        viewBodyModal: 'div.modal-body', // Full Body Viewed Modal
        closeModalButton: '#closeLargeModal',
    }
};
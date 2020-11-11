class RegisterUser {
	constructor(name, email, password, receiveEmails, tipsFrequency, phone, birthDate, gender, pregnant, authorizeData, signUpDate, dateCreated, preferedLanguage, ipCreated, app_signup, registration_complete) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.receiveEmails = receiveEmails;
		this.tipsFrequency = tipsFrequency;
		this.phone = phone;
        this.birthDate = birthDate;
        this.gender = gender;
        this.pregnant = pregnant;
        this.authorizeData = authorizeData;
        this.signUpDate = signUpDate;
        this.dateCreated = dateCreated;
        this.preferedLanguage = preferedLanguage;
        this.ipCreated = ipCreated;
        this.app_signup = app_signup;
        this.registration_complete = registration_complete;
	}
}

export default RegisterUser;
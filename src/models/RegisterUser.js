class RegisterUser {
	constructor(name, email, password, receiveEmails, phone, birth, gender, authorizeData, dt_cadastro, preferedLanguage, app_signup) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.receiveEmails = receiveEmails;
		// this.tipsFrequency = tipsFrequency;
		this.phone = phone;
        this.birth = birth;
        this.gender = gender;
        // this.pregnant = pregnant;
        this.authorizeData = authorizeData;
        this.dt_cadastro = dt_cadastro;
        // this.dateCreated = dateCreated;
        this.preferedLanguage = preferedLanguage;
        // this.ipCreated = ipCreated;
        this.app_signup = app_signup;
        // this.registration_complete = registration_complete;
	}
}

export default RegisterUser;

//user

//id					int
//authorize_data		boolean (true, false or null)
//birth					string format "YYYY-MM-DD"
//dateCreated			string format "YYYY-MM-DD"
//email					string
//experimental_groups	int
//gender				char
//name					string
//password				string
//pesquisa_enviada		boolean (true, false or null)
//phone					string (opcional)
//prefered_language		string "pt", "en" ...
//receive_emails		boolean (true, false or null)
//recover_code			int or null
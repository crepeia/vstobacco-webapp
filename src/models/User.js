class User {
	constructor(id, name, email, birthDate, gender, inRanking, nickname) {
		this.id = id;
		this._id = id;
		this.name = name;
		this.email = email;
		this.birthDate = birthDate;
		this.gender = gender;
		this.inRanking = inRanking;
		this.nickname = nickname;
	}
}

export default User;

//user

//id					int
//authorize_data		boolean (true, false or null)
//birth					string format "YYYY-MM-DD"
//dt_cadastro			string format "YYYY-MM-DD"
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
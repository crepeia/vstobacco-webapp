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
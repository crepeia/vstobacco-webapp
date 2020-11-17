class TipUser {
    constructor(id, userId, title, description, read, liked, dateSent) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.read = read;
        this.liked = liked;
        this.dateSent = dateSent;
    }
}

export default TipUser;
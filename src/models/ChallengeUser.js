class ChallengeUser {
    constructor(id, challengeId, userId, score, dateCreated, dateCompleted) {
        this.id = id;
        this.challengeId = challengeId;
        this.userId = userId;
        this.score = score;
        this.dateCreated = dateCreated;
        this.dateCompleted = dateCompleted;
    }
}

export default ChallengeUser;
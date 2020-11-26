class Options {
    constructor(id, userId, allowCigarNotifications, allowTipNotifications, allowAchievementsNotifications, cigarNotificationTime, tipNotificationTime, achievementsNotificationTime, notificationToken) {
        this.id = id;
        this.userId = userId;
        this.allowCigarNotifications = allowCigarNotifications;
        this.allowTipNotifications = allowTipNotifications;
        this.allowAchievementsNotifications = allowAchievementsNotifications;
        this.cigarNotificationTime = cigarNotificationTime;
        this.tipNotificationTime = tipNotificationTime;
        this.achievementsNotificationTime = achievementsNotificationTime;
        this.notificationToken = notificationToken;
    }
}

export default Options;
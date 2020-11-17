class Options {
    constructor(id, userId, allowCigarNotifications, allowTipNotifications, allowAchievementsNotifications, drinkNotificationTime, tipNotificationTime, achievementsNotificationTime, notificationToken) {
        this.id = id;
        this.userId = userId;
        this.allowCigarNotifications = allowCigarNotifications;
        this.allowTipNotifications = allowTipNotifications;
        this.allowAchievementsNotifications = allowAchievementsNotifications;
        this.drinkNotificationTime = drinkNotificationTime;
        this.tipNotificationTime = tipNotificationTime;
        this.achievementsNotificationTime = achievementsNotificationTime;
        this.notificationToken = notificationToken;
    }
}

export default Options;
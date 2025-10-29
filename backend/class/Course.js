class Course {
    constructor(id, requiredPeriods = 45) {
        this.id = id
        this.remaining = requiredPeriods
        this.session = []
        this.weeklyCount = 0
    }
}

module.exports = Course
class DayBlock {
    constructor(blockName) {
        this.blockName = blockName
        this.totalPeriods = 5
        this.sessions = []
    }

    /**
   * Thêm một buổi học vào block
   * @param {number} requiredPeriods - Số tiết của lớp cần sắp (chỉ cho phép 2 hoặc 3 tiết)
   * @returns {boolean} - Trả về true nếu thêm thành công, false nếu không đủ chỗ
   */
    
    addSession(requiredPeriods) {
        const usedPeriods = this.sessions.reduce((sum, session) => sum + session.periods, 0)
        const remaining = this.totalPeriods - usedPeriods

        if(this.sessions.length === 0){
            if(requiredPeriods === 2 || requiredPeriods === 3) {
                this.sessions.push({
                    periods: requiredPeriods,
                    startPeriod: 1,
                    endPeriod: requiredPeriods
                })
                return true
            }
            return false
        } else if(this.sessions.length === 1) {
            if(remaining === requiredPeriods){
                const firstSessionPeriods = this.sessions[0].periods
            }
        }
    }
}
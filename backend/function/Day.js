const Course = require('../class/Course')
function isSunday(date) {
    return date.getDay() === 0
}

function nextDay(date){
    let next = new Date(date)
    next.setDate(date.getDate() + 1)
    return next
}

function scheduleDayBlock(date, blockName, coursesEligible) {
    let scheduled = []
    if(coursesEligible.length === 1){
        let course = coursesEligible[0]
        let periods = (course.remaining >= 3) ? 3 : 2
        scheduled.push({
            courseId: course.id,
            date: date,
            block: blockName,
            periods: periods,
            startPeriod: 1,
            endPeriod: periods
        })
        course.remaining -= periods
        course.sessions.push(scheduled[0])
        course.weeklyCount += 1
        return scheduled
    }

    if(coursesEligible.length === 2){
        coursesEligible.sort((a, b) => b.remaining - a.remaining)
        let courseA = coursesEligible[0]
        let courseB = coursesEligible[1]

        let sessionA = {
            courseId: courseA.id,
            date: date,
            block: blockName,
            periods: (courseA.remaining >= 3) ? 3 : 2,
            startPeriod: 1,
            endPeriod: (courseA.remaining >= 3) ? 3 : 2
        }   

        let sessionB = {
            courseId: courseB.id,
            date: nextDay(date),
            block: blockName,
            periods: 5 - sessionA.periods,
            startPeriod: sessionA.endPeriod + 1,
            endPeriod: 5
        }

        if(courseB.remaining < sessionB.periods) {
            sessionA.periods = (courseA.remaining >= 2) ? 2 : courseA.remaining
            sessionA.endPeriod = 2
            sessionB.periods = 5 - sessionA.periods
            sessionB.startPeriod = sessionA.endPeriod + 1
            sessionB.endPeriod = 5
        }

        courseA.remaining -= sessionA.periods
        courseB.remaining -= sessionB.periods
        courseA.sessions.push(sessionA)
        courseB.sessions.push(sessionB)
        courseA.weeklyCount += 1
        courseB.weeklyCount += 1
        scheduled.push(sessionA, sessionB)
        return scheduled
    }

    return scheduled
}

function scheduleCourses(courses, startDate){
    let currentDate = new Date(startDate)

    while(courses.some(course => course.remaining >= 2)){
        if(!isSunday(currentDate)){
            if(currentDate.getDate() === 1){
                courses.forEach(course => course.weeklyCount = 0)
            }
        }
        let eligibleCourses = courses.filter(course => course.remaining >= 2 && course.weeklyCount < 3)
    
        let morningEligible = eligibleCourses.slice()
        let morningSessions = scheduleDayBlock(currentDate, "morning", morningEligible)
    
        let scheduledCourseIds = morningSessions.map(s => s.courseId)
        let remainingEligible = eligibleCourses.filter(course => !scheduledCourseIds.includes(course.id))

        let afternoonEligible = scheduleDayBlock(currentDate, "afternoon", remainingEligible)
    }
    return courses
}

let courses = [
    new Course("courseA", 45),
    new Course("courseB", 45),
    new Course("courseC", 45)
]

let startDate = new Date("2025-03-03")
let scheduledCourses = scheduleCourses(courses, startDate)

scheduledCourses.forEach(course => {
    console.log('Lich cho', course.id)
    course.sessions.forEach(session => {
        console.log(`Ngày: ${session.date.toLocaleDateString()}, Block: ${session.block}, Tiết: ${session.startPeriod}-${session.endPeriod} (${session.periods} tiết)`)
    })
})
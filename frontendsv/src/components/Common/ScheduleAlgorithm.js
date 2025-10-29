function ScheduleAlgorithm(){

    class Course {
        constructor(id, requiredPeriods = 45, isPractical = false) {
            this.id = id;
            this.remaining = requiredPeriods;
            this.sessions = [];
            this.weeklyCount = 0;
            this.isPractical = isPractical; 
        }
    }

    function isSunday(date) {
        return date.getDay() === 0;
    }

    function nextDay(date) {
        let next = new Date(date);
        next.setDate(date.getDate() + 1);
        
        while (isSunday(next)) {
            next.setDate(next.getDate() + 1);
        }
        return next;
    }

    function scheduleDayBlock(date, blockName, coursesEligible) {
        let scheduled = [];
        
        const practicalCourse = coursesEligible.find(c => 
            c.isPractical && c.remaining >= 5
        );
        
        if (practicalCourse) {
            const session = {
                courseId: practicalCourse.id,
                date: new Date(date),
                block: blockName,
                periods: 5,
                startPeriod: 1,
                endPeriod: 5
            };
            scheduled.push(session);
            practicalCourse.remaining -= 5;
            practicalCourse.sessions.push(session);
            practicalCourse.weeklyCount += 1;
            return scheduled; 
        }

        if (coursesEligible.length === 1) {
            const course = coursesEligible[0];
            const periods = Math.min(3, course.remaining);
            if (periods < 2) return scheduled;
            
            const session = {
                courseId: course.id,
                date: new Date(date),
                block: blockName,
                periods: periods,
                startPeriod: 1,
                endPeriod: periods
            };
            scheduled.push(session);
            course.remaining -= periods;
            course.sessions.push(session);
            course.weeklyCount += 1;
            return scheduled;
        }

        if (coursesEligible.length >= 2) {
            coursesEligible.sort((a, b) => b.remaining - a.remaining);
            const [courseA, courseB] = coursesEligible;

            let periodsA = Math.min(3, courseA.remaining);
            let periodsB = Math.min(5 - periodsA, courseB.remaining);

            if (periodsA < 2 || periodsB < 2) return scheduled;

            const sessionA = {
                courseId: courseA.id,
                date: new Date(date),
                block: blockName,
                periods: periodsA,
                startPeriod: 1,
                endPeriod: periodsA
            };

            const sessionB = {
                courseId: courseB.id,
                date: new Date(date),
                block: blockName,
                periods: periodsB,
                startPeriod: periodsA + 1,
                endPeriod: periodsA + periodsB
            };

            courseA.remaining -= periodsA;
            courseB.remaining -= periodsB;
            courseA.sessions.push(sessionA);
            courseB.sessions.push(sessionB);
            courseA.weeklyCount += 1;
            courseB.weeklyCount += 1;
            
            return [sessionA, sessionB];
        }

        return scheduled;
    }

    function scheduleCourses(courses, startDate) {
        let currentDate = new Date(startDate);
        let weekNumber = 0;

        while (isSunday(currentDate)) currentDate = nextDay(currentDate);

        while (courses.some(course => 
            (!course.isPractical && course.remaining >= 2) ||
            (course.isPractical && course.remaining >= 5)
        )) {
            if (currentDate.getDay() === 1) {
                courses.forEach(c => c.weeklyCount = 0);
            }

            const eligibleCourses = courses.filter(course => 
                (course.isPractical 
                    ? course.remaining >= 5 
                    : course.remaining >= 2
                ) && course.weeklyCount < 3
            );

            if (eligibleCourses.length > 0) {
                const morningSessions = scheduleDayBlock(
                    currentDate, 
                    "morning", 
                    [...eligibleCourses]
                );
                
                const scheduledIds = morningSessions.map(s => s.courseId);
                const remaining = eligibleCourses.filter(
                    c => !scheduledIds.includes(c.id)
                );
                
                scheduleDayBlock(currentDate, "afternoon", remaining);
            }

            currentDate = nextDay(currentDate);
            if (weekNumber++ > 50) {
                console.error("Emergency exit");
                break;
            }
        }
        
        return courses;
    }

    const courses = [
        new Course("Lý thuyết A", 45),
        new Course("Thực hành B", 45, true),
        new Course("Lý thuyết C", 45)
    ];

    const startDate = new Date("2025-03-03");
    const result = scheduleCourses(courses, startDate);

    // result.forEach(course => {
    //     console.log(`Lịch cho ${course.id} (Còn ${course.remaining} tiết):`);
    //     course.sessions.forEach(session => {
    //         console.log(` - Ngày: ${session.date.toISOString().split('T')[0]}, Block: ${session.block}, Tiết: ${session.startPeriod}-${session.endPeriod} (${session.periods} tiết)`);
    //     });
    // });
    // scheduledCourses.forEach(course => {
    //     console.log(`Lịch cho ${course.id} (Còn ${course.remaining} tiết):`);
    //     course.sessions.forEach(session => {
    //         console.log(` - Ngày: ${session.date.toISOString().split('T')[0]}, Block: ${session.block}, Tiết: ${session.startPeriod}-${session.endPeriod} (${session.periods} tiết)`);
    //     });
    // });

    return result
}

export default ScheduleAlgorithm
import { useEffect, useState, useRef } from 'react'
import { getSemesters, getSemesterById } from '../../service/semesterService'
import { addStudentStudySection } from '../../service/studentStudySectionService'
import { addSchedule, getCountScheduleByIdStudentAndIdSemester } from '../../service/scheduleService'
import { getAllSectionClassesByIdSemesterAndNotIdStudent, getAllJoinSectionClassesByIdSemesterAndIdStudent, getSectionClassById } from '../../service/sectionClassService'
import { useInfoStudent } from '../../components/Common/GetInfoStudent'
import CellTeacherMSGV from '../../components/Common/TeacherGetMSGV'
import CellTeacherName from '../../components/Common/TeacherGetName'
import CellSemesterName from '../../components/Common/SemesterGetName'
import CellSubject from '../../components/Common/SubjectGetName'
import CellClass from '../../components/Common/ClassGetName'
import Button from '../../components/Common/Button/Button'
import Toast from '../../components/Common/Toast/Toast'

function RegisterSection(){

    const [semesters, setSemesters] = useState([])
    const [semesterChoose, setSemesterChoose] = useState(0)
    const [semesterChooseInfo, setSemesterChooseInfo] = useState({})
    const [sectionClassesNew, setSectionClassesNew] = useState([])
    const [registeredSectionClasses, setRegisteredSectionClasses] = useState([])
    // const infoStudent = InfoStudent()
    const { data: infoStudent, loading } = useInfoStudent()
    const sectionInfoRef = useRef(null)
    const [sectionInfo, setSectionInfo] = useState({})
    const [result, setResult] = useState(null)
    const [timeoutId, setTimeoutId] = useState(null)

    let count = 0
    let countSTT = 0
    let totalTC = 0
    let totalHP = 0

    useEffect(() => {
        async function getDataSemesters() {
            const data = await getSemesters()
            setSemesters(data)
        }
        getDataSemesters()
    }, [])

    const handleSelect = (e) => {
        if(e.target.value !== '0'){
            setSemesterChoose(e.target.value)
            async function getSemesterInfo(){
                const data = await getSemesterById(e.target.value)
                setSemesterChooseInfo(data)
            }
            getSemesterInfo()

            async function getSectionClasses() {
                const data = await getAllSectionClassesByIdSemesterAndNotIdStudent(e.target.value, infoStudent.id_sinh_vien)
                setSectionClassesNew(data)
            }
            getSectionClasses()

            async function getRegisterSectionClasses() {
                const data = await getAllJoinSectionClassesByIdSemesterAndIdStudent(e.target.value, infoStudent.id_sinh_vien)
                setRegisteredSectionClasses(data)
            }
            getRegisterSectionClasses()
        }
        else {
            setSemesterChoose(0)
            setSemesterChooseInfo({})
            setSectionClassesNew([])
            setRegisteredSectionClasses([])
        }
    }

    const handleRadio = (e) => {
        sectionInfoRef.current.classList.remove('hidden')
        async  function sectionClassById(){
            const data = await getSectionClassById(e.target.value)
            setSectionInfo(data)
        }
        sectionClassById()
    }

    const handleRegister = (e) => {

        const today = new Date().toISOString().split('T')[0]
        const data =  { 
                        id_lop_hoc_phan: sectionInfo.id_lop_hoc_phan, 
                        id_sinh_vien: infoStudent.id_sinh_vien,
                        ngay_dang_ky: today,
                        thu: 0,
                        diem_giua_ky: null,
                        diem_cuoi_ky: null,
                        diem_tong_ket: null
                      }

        async function add(){
            const result = await addStudentStudySection(data)
            if(result){
                setResult('Đăng ký thành công!')
                sectionInfoRef.current.classList.add('hidden')
                async function getSectionClasses() {
                    const data = await getAllSectionClassesByIdSemesterAndNotIdStudent(semesterChoose, infoStudent.id_sinh_vien)
                    setSectionClassesNew(data)
                }
                getSectionClasses()
    
                async function getRegisterSectionClasses() {
                    const data = await getAllJoinSectionClassesByIdSemesterAndIdStudent(semesterChoose, infoStudent.id_sinh_vien)
                    setRegisteredSectionClasses(data)
                }
                getRegisterSectionClasses()
                const Id = setTimeout(() => {
                    setResult(null)
                }, 6000)
                setTimeoutId(Id)
            }
            else {
                setResult(false)
                sectionInfoRef.current.classList.add('hidden')
                const Id = setTimeout(() => {
                    setResult(null)
                }, 6000)
                setTimeoutId(Id)
            }
        }
        add()

    }

    const handleComplete = () => {
        async function checkCount(){
            const check = await getCountScheduleByIdStudentAndIdSemester(infoStudent.id_sinh_vien, semesterChoose)
            if(check[0].COUNT === 0){
                class Course {
                    constructor(id, subjectId, requiredPeriods = 45, isPractical = false) {
                        this.id = id;                  
                        this.subjectId = subjectId;     
                        this.remaining = requiredPeriods; 
                        this.sessions = [];             
                        this.weeklyCount = 0;           
                        this.isPractical = isPractical; 
                        this.theoryStartDate = null;    
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
                
                function canSchedulePractical(practicalCourse, date, courses) {
                    const theoryCourse = courses.find(c => 
                        c.subjectId === practicalCourse.subjectId && !c.isPractical
                    );
                    if (!theoryCourse || !theoryCourse.theoryStartDate) {
                        return false; 
                    }
                    const threeWeeksLater = new Date(theoryCourse.theoryStartDate);
                    threeWeeksLater.setDate(threeWeeksLater.getDate() + 21); 
                    return date >= threeWeeksLater;
                }
                
                function scheduleDayBlock(date, blockName, coursesEligible, courses) {
                    let scheduled = [];
                    
                    const practicalCourse = coursesEligible.find(c => 
                        c.isPractical && c.remaining >= 5 && canSchedulePractical(c, date, courses)
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
                        
                        if (!course.isPractical && course.theoryStartDate === null) {
                            course.theoryStartDate = new Date(date);
                        }
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
                        
                        if (!courseA.isPractical && courseA.theoryStartDate === null) {
                            courseA.theoryStartDate = new Date(date);
                        }
                        if (!courseB.isPractical && courseB.theoryStartDate === null) {
                            courseB.theoryStartDate = new Date(date);
                        }
                        
                        return [sessionA, sessionB];
                    }
                
                    return scheduled;
                }
                
                function scheduleCourses(courses, startDate, endDate) {
                    let currentDate = new Date(startDate);
                    let weekNumber = 0;
                    const end = new Date(endDate);
                
                    while (isSunday(currentDate)) currentDate = nextDay(currentDate);
                
                    while (currentDate <= end && courses.some(course => 
                        (!course.isPractical && course.remaining >= 2) ||
                        (course.isPractical && course.remaining >= 5)
                    )) {
                        if (currentDate.getDay() === 1) {
                            courses.forEach(c => c.weeklyCount = 0);
                        }
                
                        const eligibleTheory = courses.filter(course => 
                            !course.isPractical && course.remaining >= 2 && course.weeklyCount < 3
                        );
                        const eligiblePractical = courses.filter(course => 
                            course.isPractical && course.remaining >= 5 && course.weeklyCount < 3 && canSchedulePractical(course, currentDate, courses)
                        );
                
                        if (eligibleTheory.length > 0) {
                            const morningSessions = scheduleDayBlock(currentDate, "morning", [...eligibleTheory], courses);
                            const scheduledIds = morningSessions.map(s => s.courseId);
                            const remainingTheory = eligibleTheory.filter(c => !scheduledIds.includes(c.id));
                            scheduleDayBlock(currentDate, "afternoon", remainingTheory, courses);
                        } else if (eligiblePractical.length > 0) {
                            scheduleDayBlock(currentDate, "morning", [...eligiblePractical], courses);
                            scheduleDayBlock(currentDate, "afternoon", [...eligiblePractical], courses);
                        }
                
                        currentDate = nextDay(currentDate);
                
                        if (weekNumber++ > 50) {
                            console.error("Thoát khẩn cấp: Có thể có lỗi trong lập lịch.");
                            break;
                        }
                    }
                
                    const unfinishedCourses = courses.filter(course => course.remaining > 0);
                    if (unfinishedCourses.length > 0) {
                        console.log("Không thể xếp lịch đầy đủ trong khoảng thời gian cho phép:");
                        unfinishedCourses.forEach(course => {
                            console.log(`Khóa học ${course.id} còn ${course.remaining} tiết chưa được xếp lịch.`);
                        });
                    } else {
                        console.log(`Tất cả các tiết học đã được xếp lịch xong trước hoặc đúng ngày ${end.toISOString().split('T')[0]}.`);
                    }
                
                    return courses;
                }
        
                const ngay_bat_dau = semesterChooseInfo.ngay_bat_dau
                const ngay_ket_thuc = semesterChooseInfo.ngay_ket_thuc
        
                const courses = registeredSectionClasses.flatMap(item => {
                    if (item.tong_so_tiet !== null && item.tong_so_tiet_th !== undefined) {
                        return [
                            new Course(`LT-${item.id_lop_hoc_phan}` ,item.id_lop_hoc_phan, item.tong_so_tiet, false),
                            new Course(`TH-${item.id_lop_hoc_phan}`, item.id_lop_hoc_phan, item.tong_so_tiet_th, true) 
                        ];
                    } else {
                        return [new Course(`LT-${item.id_lop_hoc_phan}` ,item.id_lop_hoc_phan, item.tong_so_tiet, false)];
                    }
                })
                
                const startDate = new Date(ngay_bat_dau)
                const endDate = new Date(ngay_ket_thuc)
                const result = scheduleCourses(courses, startDate, endDate)
                
                result.forEach(course => {
                    console.log(`Lịch cho ${course.id} (Còn ${course.remaining} tiết):`)
                    const typeAndId = course.id
                    const [typeData, idData] = typeAndId.split('-')
                    course.sessions.forEach(session => {
                        const dateData = session.date.toISOString().split('T')[0]
                        const sessionData = (session.block === 'morning') ? 1 : 2
                        const startPeriodData = session.startPeriod
                        const endPeriodData = session.endPeriod
                        const periodsData = session.periods
        
                        const formData = {
                            id_lop_hoc_phan: idData,
                            so_tiet: periodsData,
                            tu_tiet: startPeriodData,
                            den_tiet: endPeriodData,
                            session: sessionData,
                            ngay: dateData,
                            id_lop: infoStudent.id_lop,
                            loai: (typeData === 'LT' ? 1 : 2)
                        }
                        
                        async function addScheduleDB(){
                            const data = await addSchedule(formData)
                            if(data){
                                console.log('Thêm mới lịch thành công')
                            }
                            else {
                                console.log('L��i: Thêm mới lịch thất bại')
                            }
                        }
                        addScheduleDB()
        
                        console.log(` - Ngày: ${session.date.toISOString().split('T')[0]}, Block: ${session.block}, Tiết: ${session.startPeriod}-${session.endPeriod} (${session.periods} tiết)`);
                    });
                })
                setResult('Các môn đã được sắp lịch')
            }
            else {
                setResult('Các môn đã được sắp lịch')
            }
        }
        checkCount()
    }

    const handleCancel = () => {

    }

    useEffect(() => {
        return () => clearTimeout(timeoutId);
    }, [timeoutId])

    return (
        <main class="container mx-auto px-10 py-3 mt-20 relative overflow-hidden">
            <div class="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 class="text-2xl font-bold mb-4">Đăng ký học phần</h1>
                <div class="flex justify-center gap-8">
                    <div class="mb-4">
                        <select id="semester" onChange={handleSelect} class="border border-gray-300 rounded-md p-2 w-72 outline-none">
                            <option value="0">Chọn học kỳ đăng ký</option>
                            {semesters && semesters.map(semester => (
                                <option value={semester.id_hoc_ky}>{semester.ten_hoc_ky} ({semester.nien_khoa})</option>
                            ))}
                        </select>
                    </div>
                    <div class="flex items-center mb-4">
                        <label class="mr-4 cursor-pointer">
                            <input defaultChecked type="radio" name="type" class="mr-2" /> Học mới
                        </label>
                        <label class="mr-4 cursor-pointer">
                            <input type="radio" name="type" class="mr-2" /> Học lại
                        </label>
                        <label class="cursor-pointer">
                            <input type="radio" name="type" class="mr-2" /> Học cải thiện
                        </label>
                    </div>
                </div>
                {(sectionClassesNew.length !== 0 || registeredSectionClasses.length !== 0)  ?
                ( 
                    <>
                <div class="mb-6">
                    <h2 class="text-xl font-bold text-red-600 mb-2">Môn học/học phần đang chờ đăng ký</h2>
                    <table class="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th></th>
                                <th class="border border-gray-300 px-4 py-2">STT</th>
                                <th class="border border-gray-300 px-4 py-2">Mã học phần</th>
                                <th class="border border-gray-300 px-4 py-2">Tên môn học/học phần</th>
                                <th class="border border-gray-300 px-4 py-2">TC</th>
                                <th class="border border-gray-300 px-4 py-2">Bắt buộc</th>
                                <th class="border border-gray-300 px-4 py-2">học phần: học trước (a), tiên quyết (b), song hành (c)</th>
                            </tr>
                        </thead>
                        <tbody>
                        {sectionClassesNew.map(sectionClass => (
                            <tr>
                                <td class="border border-gray-300 px-4 py-2 text-center">
                                    <input checked={false} onChange={handleRadio} value={sectionClass.id_lop_hoc_phan} type="radio" name="choose" />
                                </td>
                                <td class="border border-gray-300 px-4 py-2 text-center">{++count}</td>
                                <td class="border border-gray-300 px-4 py-2 text-center">{sectionClass.ms_lop_hoc_phan}</td>
                                <td class="border border-gray-300 px-4 py-2"><CellSubject Id={sectionClass.id_mon_hoc} /></td>
                                <td class="border border-gray-300 px-4 py-2 text-center">{sectionClass.tong_so_tiet / 15 + sectionClass.tong_so_tiet_th / 30}</td>
                                <td class="border border-gray-300 px-4 py-2 text-center"><i class="fas fa-check text-green-600"></i></td>
                                <td class="border border-gray-300 px-4 py-2"></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div class="flex justify-between mt-4 mb-4">
                    <div>
                        <button onClick={handleComplete} class="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Hoàn Thành</button>
                        <button onClick={handleCancel} class="bg-blue-500 text-white px-4 py-2 rounded-md">Hủy</button>
                    </div>
                    <button class="bg-blue-500 text-white px-4 py-2 rounded-md"><i class="fas fa-print"></i></button>
                </div>
                {registeredSectionClasses.length !== 0 
                ?      
                <div>
                    <h2 class="text-xl font-bold text-red-600 mb-2">Lớp HP đã đăng ký trong học kỳ này</h2>
                    <table class="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th class="border border-gray-300 px-4 py-2">Thao tác</th>
                                <th class="border border-gray-300 px-4 py-2">STT</th>
                                <th class="border border-gray-300 px-4 py-2">Mã lớp HP</th>
                                <th class="border border-gray-300 px-4 py-2">Tên môn học/HP</th>
                                <th class="border border-gray-300 px-4 py-2">Lớp học dự kiến</th>
                                <th class="border border-gray-300 px-4 py-2">TC</th>
                                <th class="border border-gray-300 px-4 py-2">Nhóm TH</th>
                                <th class="border border-gray-300 px-4 py-2">Học phí</th>
                                <th class="border border-gray-300 px-4 py-2">Hạn nộp</th>
                                <th class="border border-gray-300 px-4 py-2">Thu</th>
                                <th class="border border-gray-300 px-4 py-2">Trạng thái ĐK</th>
                                <th class="border border-gray-300 px-4 py-2">Ngày ĐK</th>
                                <th class="border border-gray-300 px-4 py-2">TT lớp HP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registeredSectionClasses.map(registeredSectionClass => {
                                totalTC += registeredSectionClass.tong_so_tiet / 15 + registeredSectionClass.tong_so_tiet_th / 30
                                totalHP += registeredSectionClass.hoc_phi
                                return (
                                    <tr>
                                        <td class="border border-gray-300 px-4 py-2 text-center"><i class="fas fa-bars"></i></td>
                                        <td class="border border-gray-300 px-4 py-2 text-center">{++countSTT}</td>
                                        <td class="border border-gray-300 px-4 py-2 text-center">{registeredSectionClass.ms_lop_hoc_phan}</td>
                                        <td class="border border-gray-300 px-4 py-2"><CellSubject Id={registeredSectionClass.id_mon_hoc} /></td>
                                        <td class="border border-gray-300 px-4 py-2 text-center"><CellClass Id={infoStudent.id_lop} /></td>
                                        <td class="border border-gray-300 px-4 py-2 text-center">{registeredSectionClass.tong_so_tiet / 15 + registeredSectionClass.tong_so_tiet_th / 30}</td>
                                        <td class="border border-gray-300 px-4 py-2 text-center">{registeredSectionClass.tong_so_tiet_th > 0 ? 2 : ''}</td>
                                        <td class="border border-gray-300 px-4 py-2 text-center">{registeredSectionClass.hoc_phi}</td>
                                        <td class="border border-gray-300 px-4 py-2 text-center">{new Date(registeredSectionClass.ngay_dang_ky).toLocaleDateString('vi-VN')}</td>
                                        <td class="border border-gray-300 px-4 py-2 text-center"><i class="fas fa-check text-green-600"></i></td>
                                        <td class="border border-gray-300 px-4 py-2 text-center">Đăng ký mới</td>
                                        <td class="border border-gray-300 px-4 py-2 text-center">{new Date(registeredSectionClass.ngay_dang_ky).toLocaleDateString('vi-VN')}</td>
                                        <td class="border border-gray-300 px-4 py-2 text-center">{registeredSectionClass.trang_thai === 1 ? 'Mở' : 'Khóa'}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="5" class="border border-gray-300 px-4 py-2 text-right font-bold">Tổng</td>
                                <td class="border border-gray-300 px-4 py-2 text-center font-bold">{totalTC}</td>
                                <td colspan="2" class="border border-gray-300 px-4 py-2 text-center font-bold">{totalHP}</td>
                                <td colspan="6" class="border border-gray-300 px-4 py-2"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div> 
                :
                    <h1></h1>
                }
                </>
                )
                :
                (
                    <h1></h1>
                )
                }
                
            </div>
            <div ref={sectionInfoRef} class="h-screen w-screen fixed bg-black/20 top-0 left-0 z-10 flex justify-center items-center hidden">
                <div class="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md fixed z-20">
                    <h1 class="font-bold text-xl text-center text-red-600">CHI TIẾT LỚP HỌC PHẦN</h1>
                    <div class="container flex justify-between gap-10 mt-5 mb-5">
                        <div>
                            <p class="font-bold mt-2">Mã lớp học phần: <span class="font-normal italic">{sectionInfo.ms_lop_hoc_phan}</span></p>
                            <p class="font-bold mt-2">Tên học phần: <span class="font-normal italic"><CellSubject Id={sectionInfo.id_mon_hoc} /></span></p>
                            <p class="font-bold mt-2">Tổng Số tiết LT: <span class="font-normal italic">{sectionInfo.tong_so_tiet}</span></p>
                            <p class="font-bold mt-2">Tổng Số tiết TH: <span class="font-normal italic">{sectionInfo.tong_so_tiet_th}</span></p>
                        </div>
                        <div>
                            <p class="font-bold mt-2">Mã số giảng viên: <span class="font-normal italic"><CellTeacherMSGV Id={sectionInfo.id_giang_vien} /></span></p>
                            <p class="font-bold mt-2">Tên giảng viên: <span class="font-normal italic"><CellTeacherName Id={sectionInfo.id_giang_vien} /></span></p>
                            <p class="font-bold mt-2">Học kỳ: <span class="font-normal italic"><CellSemesterName Id={sectionInfo.id_hoc_ky} /></span></p>
                            <p class="font-bold mt-2">Học phí: <span class="font-normal italic">{sectionInfo.hoc_phi}</span ></p>
                        </div>
                    </div>
                    <div class="flex justify-end gap-3">
                        <Button
                            onClick={() => sectionInfoRef.current.classList.add('hidden')}
                        >Hủy</Button>
                        <Button
                            onClick={handleRegister}
                        >Đăng Ký</Button>
                    </div>
                </div>
            </div>

            {result && <Toast type="success" message={result} onClose={() => setResult(null)}  />}
            {result === false && <Toast type="error" message="Đăng ký thất bại" onClose={() => setResult(null)}  />}
        </main>
    )
}

export default RegisterSection
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { getSemesters } from '../../services/semesterService';
import { getAllJoinSectionClassesByIdSemesterAndIdTeacher } from '../../services/sectionClassService';
import { getClassByIdSection } from '../../services/classService';
import { getStudentByIdClassAndIdSectionAndIdSchedule } from '../../services/studentService';
import { getScheduleByIdSectionAndIdClassAndDay } from '../../services/scheduleService';
import { addRollCall } from '../../services/rollCallService';
import { useInfoTeacher } from '../../components/Common/GetInfoTeacher';
import CellSubject from '../../components/Common/SubjectGetName';
import CellClass from '../../components/Common/ClassGetName';
import Toast from '../../components/Common/Toast/Toast';
import Checkbok from '../../components/Common/Checkbok/Checkbox';
import QRGenerator from '../../components/Common/QR/QRGenerator';

const Attendance = () => {
    const [formData, setFormData] = useState({
        semesters: [],
        sections: [],
        classes: [],
        schedules: [],
        selected: {
            id_hoc_ky: '',
            id_lop_hoc_phan: '',
            id_lop: '',
            id_lich_hoc: ''
        },
        students: [],
        filteredStudents: [],
        checkedStatus: {},
        selectedSchedule: null,
        result: { type: null, message: '' }
    });
    const [isLoading, setIsLoading] = useState(false);
    const { data: infoTeacher, loading: teacherLoading } = useInfoTeacher();
    const sectionRef = useRef(null);
    const classRef = useRef(null);
    const scheduleRef = useRef(null);
    const navigate = useNavigate();
    const [showQR, setShowQR] = useState(false);

    const onSelect = useCallback(async (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            selected: { ...prev.selected, [name]: value }
        }));

        if (value) {
            setIsLoading(true);
            try {
                if (name === 'id_hoc_ky') {
                    const data = await getAllJoinSectionClassesByIdSemesterAndIdTeacher(value, infoTeacher.id_giang_vien);
                    setFormData((prev) => ({
                        ...prev,
                        sections: data,
                        classes: [],
                        schedules: [],
                        students: [],
                        filteredStudents: [],
                        selected: { ...prev.selected, id_lop_hoc_phan: '', id_lop: '', id_lich_hoc: '' }
                    }));
                    if (sectionRef.current) sectionRef.current.value = '';
                    if (classRef.current) classRef.current.value = '';
                    if (scheduleRef.current) scheduleRef.current.value = '';
                } else if (name === 'id_lop_hoc_phan') {
                    const data = await getClassByIdSection(value);
                    setFormData((prev) => ({
                        ...prev,
                        classes: data,
                        schedules: [],
                        students: [],
                        filteredStudents: [],
                        selected: { ...prev.selected, id_lop: '', id_lich_hoc: '' }
                    }));
                    if (classRef.current) classRef.current.value = '';
                    if (scheduleRef.current) scheduleRef.current.value = '';
                } else if (name === 'id_lop') {
                    const data = await getScheduleByIdSectionAndIdClassAndDay(formData.selected.id_lop_hoc_phan, value);
                    if(data){
                        setFormData((prev) => ({
                            ...prev,
                            schedules: data,
                            students: [],
                            filteredStudents: [],
                            selected: { ...prev.selected, id_lich_hoc: '' }
                        }));
                        if (scheduleRef.current) scheduleRef.current.value = '';
                    }
                    else {
                        if (classRef.current) classRef.current.value = '';
                        if (scheduleRef.current) scheduleRef.current.value = '';
                    }
                } else if (name === 'id_lich_hoc') {
                    const data = await getStudentByIdClassAndIdSectionAndIdSchedule(formData.selected.id_lop, formData.selected.id_lop_hoc_phan, value);
                    console.log(data);
                    setFormData((prev) => ({
                        ...prev,
                        students: data,
                        filteredStudents: data,
                        selectedSchedule: value
                    }));
                }
            } catch (error) {
                setFormData((prev) => ({
                    ...prev,
                    result: { type: false, message: 'Lỗi khi tải dữ liệu' }
                }));
            } finally {
                setIsLoading(false);
            }
        } else {
            if (name === 'id_hoc_ky') {
                setFormData((prev) => ({
                    ...prev,
                    sections: [],
                    classes: [],
                    schedules: [],
                    students: [],
                    filteredStudents: [],
                    selected: { ...prev.selected, id_lop_hoc_phan: '', id_lop: '', id_lich_hoc: '' }
                }));
            } else if (name === 'id_lop_hoc_phan') {
                setFormData((prev) => ({
                    ...prev,
                    classes: [],
                    schedules: [],
                    students: [],
                    filteredStudents: [],
                    selected: { ...prev.selected, id_lop: '', id_lich_hoc: '' }
                }));
            } else if (name === 'id_lop') {
                setFormData((prev) => ({
                    ...prev,
                    schedules: [],
                    students: [],
                    filteredStudents: [],
                    selected: { ...prev.selected, id_lich_hoc: '' }
                }));
            } else if (name === 'id_lich_hoc') {
                setFormData((prev) => ({
                    ...prev,
                    students: [],
                    filteredStudents: [],
                    selectedSchedule: null
                }));
            }
        }
    }, [infoTeacher?.id_giang_vien, formData.selected.id_lop_hoc_phan, formData.selected.id_lop]);

    const handleChangeSearch = useCallback((e) => {
        const searchValue = e.target.value.toLowerCase();
        const filtered = formData.students.filter(student =>
            student.ho_ten.toLowerCase().includes(searchValue)
        );
        setFormData((prev) => ({ ...prev, filteredStudents: filtered }));
    }, [formData.students]);

    const handleCheck = useCallback((studentId, type) => {
        console.log(studentId, type);
        setFormData((prev) => ({
            ...prev,
            checkedStatus: { ...prev.checkedStatus, [studentId]: type }
        }));
    }, []);

    const handleSave = useCallback(async () => {
        const { checkedStatus, selectedSchedule } = formData;
        for (let studentId in checkedStatus) {
            try {
                const res = await addRollCall({
                    id_lich_hoc: selectedSchedule,
                    id_sinh_vien: studentId,
                    status: checkedStatus[studentId]
                });
                if (res) {
                    setFormData((prev) => ({
                        ...prev,
                        result: { type: true, message: 'Thành công!' }
                    }));
                    async function reload(){
                        const data = await getStudentByIdClassAndIdSectionAndIdSchedule(formData.selected.id_lop, formData.selected.id_lop_hoc_phan, formData.selected.id_lich_hoc);
                        setFormData((prev) => ({
                            ...prev,
                            students: data,
                            filteredStudents: data
                        }));
                    }
                    reload()
                } else {
                    setFormData((prev) => ({
                        ...prev,
                        result: { type: false, message: 'Thất bại!' }
                    }));
                }
            } catch (error) {
                setFormData((prev) => ({
                    ...prev,
                    result: { type: false, message: 'Lỗi khi lưu điểm danh' }
                }));
            }
        }
    }, [formData.checkedStatus, formData.selectedSchedule]);

    useEffect(() => {
        const fetchSemesters = async () => {
            setIsLoading(true);
            try {
                const data = await getSemesters();
                setFormData((prev) => ({ ...prev, semesters: data }));
            } catch (error) {
                setFormData((prev) => ({
                    ...prev,
                    result: { type: false, message: 'Lỗi tải học kỳ' }
                }));
            } finally {
                setIsLoading(false);
            }
        };
        fetchSemesters();
    }, []);

    const filteredStudents = useMemo(() => formData.filteredStudents, [formData.filteredStudents]);

    useEffect(() => {
        if (formData.students.length > 0) {
            const initialCheckedStatus = {};
            formData.students.forEach(student => {
                if (student.status) {
                    initialCheckedStatus[student.id_sinh_vien] = student.status;
                }
            });
            setFormData(prev => ({ ...prev, checkedStatus: initialCheckedStatus }));
        }
    }, [formData.students])

    const handleQR = (e) => {
        setShowQR(!showQR)
    }

    const handleKM = (e) => {
        navigate('../FaceID/input')
    }

    return (
        <div className="min-h-screen from-blue-800 to-white text-black flex flex-col mt-24">
            <Header />
            <div className="p-6 bg-gray-100 min-h-screen text-black">
                <h1 className="text-xl md:text-2xl font-bold text-red-500 text-center">Điểm danh sinh viên</h1>
                <div className="mt-4 flex flex-col md:flex-row gap-4">
                    <select
                        className="px-3 py-2 outline-none border rounded-lg shadow-md bg-white focus:ring-2 focus:ring-blue-400"
                        onChange={onSelect}
                        name="id_hoc_ky"
                        value={formData.selected.id_hoc_ky}
                    >
                        <option value="">Chọn học kỳ</option>
                        {formData.semesters.map((semester) => (
                            <option key={semester.id_hoc_ky} value={semester.id_hoc_ky}>{semester.ten_hoc_ky} - ({semester.nien_khoa})</option>
                        ))}
                    </select>
                    <select
                        className="px-3 py-2 border outline-none rounded-lg shadow-md bg-white focus:ring-2 focus:ring-blue-400"
                        onChange={onSelect}
                        name="id_lop_hoc_phan"
                        ref={sectionRef}
                        disabled={!formData.selected.id_hoc_ky}
                    >
                        <option value="">Chọn lớp học phần</option>
                        {formData.sections.map((section) => (
                            <option key={section.id_lop_hoc_phan} value={section.id_lop_hoc_phan}>{section.ms_lop_hoc_phan} - <CellSubject Id={section.id_mon_hoc} /></option>
                        ))}
                    </select>
                    <select
                        className="px-3 py-2 border outline-none rounded-lg shadow-md bg-white focus:ring-2 focus:ring-blue-400"
                        onChange={onSelect}
                        name="id_lop"
                        ref={classRef}
                        disabled={!formData.selected.id_lop_hoc_phan}
                    >
                        <option value="">Chọn lớp học</option>
                        {formData.classes.map((classs) => (
                            <option key={classs.id_lop} value={classs.id_lop}><CellClass Id={classs.id_lop} /></option>
                        ))}
                    </select>
                    <select
                        className="px-3 py-2 border outline-none rounded-lg shadow-md bg-white focus:ring-2 focus:ring-blue-400"
                        onChange={onSelect}
                        name="id_lich_hoc"
                        ref={scheduleRef}
                        disabled={!formData.selected.id_lop}
                    >
                        <option value="">Chọn tiết</option>
                        {formData.schedules.map((schedule) => (
                            <option key={schedule.id_lich_hoc} value={schedule.id_lich_hoc}>
                                {schedule.session === 1 ? "Sáng: " : "Chiều: "} Tiết
                                ({schedule.tu_tiet} - {schedule.den_tiet})
                                {schedule.loai === 1 ? " - Lý thuyết" : " - Thực hành"}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Nhập MSSV..."
                        onChange={handleChangeSearch}
                        className="px-3 py-2 border rounded-lg shadow-md outline-none bg-white focus:ring-2 focus:ring-blue-400"
                    />
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-md" onClick={handleQR}>
                        Tạo QR
                    </button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-md" onClick={handleKM}>
                        Điểm danh KM
                    </button>
                </div>

                <div className="mt-6 bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
                    {isLoading ? (
                        <div className="text-center py-4">Đang tải dữ liệu...</div>
                    ) : (
                        <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="p-3 text-center" rowSpan={2}>STT</th>
                                    <th className="p-3 text-center" rowSpan={2}>MSSV</th>
                                    <th className="p-3 text-center" rowSpan={2}>Tên sinh viên</th>
                                    <th className="p-3 text-center" rowSpan={2}>Ngày Điểm Danh</th>
                                    <th className="p-3 text-center" colSpan={3}>Trạng thái</th>
                                </tr>
                                <tr className="bg-blue-600 text-white">
                                    <th className="font-semibold">Có mặt</th>
                                    <th className="font-semibold">Vắng (P)</th>
                                    <th className="font-semibold">Vắng (K)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student, index) => (
                                        <tr key={index} className="border-b text-center hover:bg-blue-50 transition">
                                            <td className="p-2 text-center">{index + 1}</td>
                                            <td className="p-2 text-center">{student.mssv}</td>
                                            <td className="p-2 text-center">{student.ho_ten}{student.id_lop_hoc_phan === null ? <span className="text-red-600 font-bold block"> (Chưa đăng ký học phần)</span> : ''}</td>
                                            <td className="p-2 text-center">
                                                {student.id_lop_hoc_phan !== null
                                                    ? (
                                                        student.thoi_gian !== null ? (
                                                            new Date(student.thoi_gian).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
                                                        ) : <span className="text-blue-600 font-bold block"> (Chưa điểm danh)</span>
                                                    )
                                                    : <span className="text-red-600 font-bold block"> (Chưa đăng ký học phần)</span>
                                                }
                                            </td>
                                            <td className="p-2 text-center">
                                                <Checkbok
                                                    checked={formData.checkedStatus[student.idsv] === 'comat'}
                                                    onChange={() => handleCheck(student.idsv, "comat")}
                                                    disabled={student.id_lop_hoc_phan === null || student.id_diem_danh !== null}
                                                />
                                            </td>
                                            <td className="p-2 text-center">
                                                <Checkbok
                                                    checked={formData.checkedStatus[student.idsv] === 'vangP'}
                                                    onChange={() => handleCheck(student.idsv, "vangP")}
                                                    disabled={student.id_lop_hoc_phan === null || student.id_diem_danh !== null}
                                                />
                                            </td>
                                            <td className="p-2 text-center">
                                                <Checkbok
                                                    checked={formData.checkedStatus[student.idsv] === 'vangK'}
                                                    onChange={() => handleCheck(student.idsv, "vangK")}
                                                    disabled={student.id_lop_hoc_phan === null || student.id_diem_danh !== null}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="p-3 text-center text-gray-500">Chưa có dữ liệu sinh viên</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                    <button onClick={handleSave} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 w-full md:w-auto">
                        Lưu điểm danh
                    </button>
                </div>
            </div>
            {formData.result.type === true ? <Toast type="success" message={formData.result.message} onClose={() => setFormData(prev => ({ ...prev, result: { type: null, message: '' } }))} /> : ''}
            {formData.result.type === false ? <Toast type="error" message={formData.result.message} onClose={() => setFormData(prev => ({ ...prev, result: { type: null, message: '' } }))} /> : ''}
            {showQR && (
                <QRGenerator classId={formData.selected.id_lop} setHide={() => setShowQR(false)} scheduleId={formData.selected.id_lich_hoc} />
            )}
        </div>
    );
};

export default Attendance;
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { getSemesters } from '../../services/semesterService'
import { getAllJoinSectionClassesByIdSemesterAndIdTeacher } from '../../services/sectionClassService'
import { getClassByIdSection } from '../../services/classService'
import { getStudentByIdClassAndIdSection } from '../../services/studentService'
import { updateScore } from '../../services/studentStudySectionService'
import { useInfoTeacher } from '../../components/Common/GetInfoTeacher'
import CellSubject from '../../components/Common/SubjectGetName'
import CellClass from '../../components/Common/ClassGetName'
import Toast from '../../components/Common/Toast/Toast'

export default function Grades() {
    const [semesters, setSemesters] = useState([])
    const [sections, setSections] = useState([])
    const [classes, setClasses] = useState([])
    const [select, setSelect] = useState({})
    const [data, setData] = useState([])
    const [dataSearch, setDataSearch] = useState([])
    const classRef = useRef(null)
    const sectionRef = useRef(null)
    const {data: infoTeacher, loading} = useInfoTeacher()
    const [scores, setScores] = useState([])
    const [result, setResult] = useState({
        type: null,
        message: ''
    })

    useEffect(() => {
        async function getDataSemesters(){
            const data = await getSemesters()
            setSemesters(data)
        }
        getDataSemesters()
    }, [])

    const onSelect = (e) => {
        setSelect({...select, [e.target.name] : e.target.value})
        if(e.target.value !== ''){
            if(e.target.name === 'id_hoc_ky'){
                async function getDataSections(){
                    const data = await getAllJoinSectionClassesByIdSemesterAndIdTeacher(e.target.value, infoTeacher.id_giang_vien)
                    setSections(data)
                    if(sectionRef.current){
                        sectionRef.current.value = ''
                    }
                    if(classRef.current){
                        classRef.current.value = ''
                    }
                    setData([])
                    setDataSearch([])
                    setScores([])
                }
                getDataSections()
            }
            else if(e.target.name === 'id_lop_hoc_phan'){
                async function getDataClasses(){
                    const data = await getClassByIdSection(e.target.value)
                    setClasses(data)
                }
                getDataClasses()
                setData([])
                setDataSearch([])
                setScores([])
                if(classRef.current){
                    classRef.current.value = ''
                }
            }
            else {
                async function getData(){
                    const data = await getStudentByIdClassAndIdSection(e.target.value, select.id_lop_hoc_phan)
                    setData(data)
                    setDataSearch(data)
                }
                getData()
            }
        }
        else {
            if(e.target.name === 'id_hoc_ky'){
                if(sectionRef.current){
                    sectionRef.current.value = ''
                }
                if(classRef.current){
                    classRef.current.value = ''
                }
                setData([])
                setDataSearch([])
                setScores([])
            }
            else if(e.target.name === 'id_lop_hoc_phan'){
                if(classRef.current){
                    classRef.current.value = ''
                }
                setData([])
                setDataSearch([])
                setScores([])
            }
            else {
                setData([])
                setDataSearch([])
                setScores([])
            }
        }
    }

    const handleChangeSearch = (e) => {
        setDataSearch(data.filter(student => student.ho_ten.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    const handleChangeScore = (e) => {
        setScores((prevScores) => {
            const existingIndex = prevScores.findIndex((score) => score.id_sv_hoc_hp === e.target.dataset.idstudent)
            if (existingIndex !== -1) {
                return prevScores.map((score, index) =>
                    index === existingIndex ? { ...score, [e.target.name]: e.target.value } : score
                );
            } else {
                return [...prevScores, { id_sv_hoc_hp: e.target.dataset.idstudent, [e.target.name]: e.target.value}];
            }
        })
    }

    const handleSaveAll = (e) => {
        console.log(scores);
        scores.map((score, _) => {
            if(score.giua_ky !== '' && (score.cuoi_ky === '' || score.cuoi_ky === undefined)){
                async function update(){
                    const result = await updateScore(score.id_sv_hoc_hp, {
                        diem_giua_ky: score.giua_ky,
                        diem_cuoi_ky: null,
                        diem_tong_ket: null
                    })
                    if(result) {
                        async function getData(){
                            const data = await getStudentByIdClassAndIdSection(select.id_lop, select.id_lop_hoc_phan)
                            setData(data)
                            setDataSearch(data)
                            setScores([])
                        }
                        getData()
                        setResult({type: true, message: 'Thành công!'})
                    }
                    else {
                        setResult({type: false, message: 'Thất bại!'})
                    }
                }
                update()
            }
            else if(score.cuoi_ky !== '' && (score.giua_ky === '' || score.giua_ky === undefined)){
                async function update(){
                    const result = await updateScore(score.id_sv_hoc_hp, {
                        diem_giua_ky: null,
                        diem_cuoi_ky: score.cuoi_ky,
                        diem_tong_ket: null
                    })
                    if(result) {
                        async function getData(){
                            const data = await getStudentByIdClassAndIdSection(select.id_lop, select.id_lop_hoc_phan)
                            setData(data)
                            setDataSearch(data)
                            setScores([])
                        }
                        getData()
                        setResult({type: true, message: 'Thành công!'})
                    }
                    else {
                        setResult({type: false, message: 'Thất bại!'})
                    }
                }
                update()
            }
            else if(score.giua_ky !== '' && score.cuoi_ky !== ''){
                const tong_ket = score.giua_ky * 0.4 + score.cuoi_ky * 0.6
                async function update(){
                    const result = await updateScore(score.id_sv_hoc_hp, {
                        diem_giua_ky: score.giua_ky,
                        diem_cuoi_ky: score.cuoi_ky,
                        diem_tong_ket: tong_ket
                    })
                    if(result) {
                        async function getData(){
                            const data = await getStudentByIdClassAndIdSection(select.id_lop, select.id_lop_hoc_phan)
                            setData(data)
                            setDataSearch(data)
                            setScores([])
                        }
                        getData()
                        setResult({type: true, message: 'Thành công!'})
                    }
                    else {
                        setResult({type: false, message: 'Thất bại!'})
                    }
                }
                update()
            }
            else {}
        })
    }

    return (
        <div className="min-h-screen from-blue-800   text-gray-800 flex flex-col mt-24 overflow-x-hidden">
            <Header />

            {/* Bộ lọc */}
            <div className="p-5 overflow-x-hidden">
           
            <h1 className="text-2xl font-bold mb-2 text-center text-red-500">Nhập Điểm Sinh Viên</h1>
                <div className="p-4 flex flex-col md:flex-row gap-4 overflow-x-hidden">
                    <select
                            className="px-3 py-2 outline-none border rounded-lg shadow-md bg-white focus:ring-2 focus:ring-blue-400"
                            onChange={onSelect}
                            name="id_hoc_ky"
                        >
                        <option value="">Chọn học kỳ</option>
                        {semesters.map((semester) => (
                            <option key={semester.id_hoc_ky} value={semester.id_hoc_ky}>{semester.ten_hoc_ky} - ({semester.nien_khoa})</option>
                        ))}
                    </select>
                    <select
                        className="px-3 py-2 border outline-none rounded-lg shadow-md bg-white focus:ring-2 focus:ring-blue-400"
                        onChange={onSelect}
                        name="id_lop_hoc_phan"
                        ref={sectionRef}
                    >
                        <option value="">Chọn lớp học phần</option>
                        {sections.map((section) => (
                            <option key={section.id_lop_hoc_phan} value={section.id_lop_hoc_phan}>{section.ms_lop_hoc_phan} - <CellSubject Id={section.id_mon_hoc} /></option>
                        ))}
                    </select>

                    <select
                        className="px-3 py-2 border outline-none rounded-lg shadow-md bg-white focus:ring-2 focus:ring-blue-400"
                        onChange={onSelect}
                        name="id_lop"
                        ref={classRef}
                    >
                        <option value="">Chọn lớp học</option>
                        {classes.map((classs) => (
                            <option key={classs.id_lop} value={classs.id_lop}><CellClass Id={classs.id_lop} /></option>
                        ))}
                    </select>
                    <div className="flex-1 flex justify-end items-center">
                        <input
                            type="text"
                            placeholder="Nhập MSSV..."
                            onChange={handleChangeSearch}
                            className="px-3 py-2 border rounded-lg shadow-md outline-none bg-white focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    
                </div>

                {/* Bảng điểm */}
                <div className="p-4  overflow-y-auto overflow-x-hidden">
                    <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="p-3 text-center">STT</th>
                                <th className="p-3 text-center">MSSV</th>
                                <th className="p-3 text-center">Tên sinh viên</th>
                                <th className="p-3 text-center">Giữa kỳ</th>
                                <th className="p-3 text-center">Cuối kỳ</th>
                                <th className="p-3 text-center">Tổng kết</th>
                                <th className="p-3 text-center">Điểm chữ</th>
                                <th className="p-3 text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataSearch.length > 0 ? (
                                dataSearch.map((student, index) => (
                                    <tr key={index} className="border-b text-center hover:bg-blue-50 transition">
                                        <td className="p-2 text-center">{index + 1}</td>
                                        <td className="p-2">{student.mssv}</td>
                                        <td className="p-2 text-center">{student.ho_ten}{student.id_lop_hoc_phan === null ? <span class="text-red-600 font-bold block"> (Chưa đăng ký học phần)</span> : ''}</td>
                                        <td className="p-2">
                                            <input
                                                disabled={student.id_lop_hoc_phan === null || student.diem_giua_ky !== null}
                                                data-idstudent={student.id_sv_hoc_hp} 
                                                type="number"
                                                min="0"
                                                max="10"
                                                step="0.1"
                                                name="giua_ky"
                                                onChange={handleChangeScore}
                                                className="border p-1 rounded w-16 text-center outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                            <input 
                                                type="text"
                                                readOnly 
                                                value={student.diem_giua_ky !== null ? student.diem_giua_ky : ''}
                                                className="border-2 border-green-400 p-1 rounded w-8 ml-2 outline-none text-center"
                                            />
                                        </td>
                                        <td className="p-2">
                                            <input
                                                disabled={student.id_lop_hoc_phan === null || student.diem_cuoi_ky !== null}
                                                data-idstudent={student.id_sv_hoc_hp} 
                                                type="number"
                                                name="cuoi_ky"
                                                min="0"
                                                max="10"
                                                step="0.1"
                                                onChange={handleChangeScore}
                                                className="border p-1 rounded outline-none w-16 text-center focus:ring-2 focus:ring-blue-400"
                                            />
                                            <input 
                                                type="text"
                                                readOnly 
                                                value={student.diem_cuoi_ky !== null ? student.diem_cuoi_ky : ''}
                                                className="border-2 border-green-400 p-1 rounded w-8 ml-2 outline-none text-center"
                                            />
                                        </td>
                                        <td className="p-2">{student.diem_tong_ket !== null ? student.diem_tong_ket : ''}</td>
                                        <td className="p-2">
                                            {student.diem_tong_ket !== null ? 
                                                (student.diem_tong_ket < 9 ? (
                                                    student.diem_tong_ket < 8 ? (
                                                        student.diem_tong_ket < 7 ? 'C+' : 'B'
                                                    ) : 'B+'
                                                ) : 'A')
                                            : ''}
                                        </td>
                                        <td className="px-2">
                                            <button
                                                disabled={student.diem_giua_ky === null && student.diem_cuoi_ky === null}
                                                className={`
                                                    ${(student.diem_giua_ky === null && student.diem_cuoi_ky === null) ? 'cursor-not-allowed hover:non' : ''}
                                                    px-3 py-1 bg-green-500 text-white rounded shadow hover:bg-yellow-600 float-right`}
                                                    >
                                                    Sửa
                                            </button>
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
                    <button onClick={handleSaveAll} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 float-right mt-2">Lưu</button>
                </div>
            </div>
            {result.type === true ? <Toast type="success" message={result.message} onClose={() => setResult({type: null, message: ''})} /> : '' }
            {result.type === false ? <Toast type="error" message={result.message} onClose={() => setResult({type: null, message: ''})} /> : '' }
        </div>
    );
}

import './ContentMain.css'
import HomePage from '../../pages/Home/Home'
import AccountPage from '../../pages/Account/Account'
import AccountAddPage from '../../pages/Account/AccountAdd'
import AccountUpdate from '../../pages/Account/AccountUpdate'
import FacultyPage from '../../pages/Faculty/Faculty'
import FacultyAddPage from '../../pages/Faculty/FacultyAdd'
import FacultyUpdatePage from '../../pages/Faculty/FacultyUpdate'

import ClassPage from '../../pages/Class/Class'
import ClassAddPage from '../../pages/Class/ClassAdd'
import ClassUpdatePage from '../../pages/Class/ClassUpdate'

import TeacherPage from '../../pages/Teacher/Teacher'
import TeacherAddPage from '../../pages/Teacher/TeacherAdd'
import TeacherUpdatePage from '../../pages/Teacher/TeacherUpdate'

import StudentPage from '../../pages/Student/Student'
import StudentAddPage from '../../pages/Student/StudentAdd'
import StudentUpdatePage from '../../pages/Student/StudentUpdate'

import ManagerPage from '../../pages/Manager/Manager'
import ManagerAddPage from '../../pages/Manager/ManagerAdd'
import ManagerUpdatePage from '../../pages/Manager/ManagerUpdate'

import RoomPage from '../../pages/Room/Room'
import RoomAddPage from '../../pages/Room/RoomAdd'
import RoomUpdatePage from '../../pages/Room/RoomUpdate'

import SubjectPage from '../../pages/Subject/Subject'
import SubjectAddPage from '../../pages/Subject/SubjectAdd'
import SubjectUpdatePage from '../../pages/Subject/SubjectUpdate'

import SemesterPage from '../../pages/Semester/Semester'
import SemesterAddPage from '../../pages/Semester/SemesterAdd'
import SemesterUpdatePage from '../../pages/Semester/SemesterUpdate'

import SectionClassPage from '../../pages/SectionClass/SectionClass'
import SectionClassAddPage from '../../pages/SectionClass/SectionClassAdd'
import SectionClassUpdatePage from '../../pages/SectionClass/SectionClassUpdate'

import MajorPage from '../../pages/Major/Major'
import MajorAddPage from '../../pages/Major/MajorAdd'
import MajorUpdatePage from '../../pages/Major/MajorUpdate'

import { Routes, Route } from 'react-router-dom'

function ContentMain(){
    return (
        <div className='main overflow-hidden'>
            <Routes>
                <Route path='/' element={<HomePage />} />

                <Route path='/account' element={<AccountPage />} />
                <Route path='/account/add' element={<AccountAddPage />} />
                <Route path='/account/update/:id' element={<AccountUpdate />} />

                <Route path='/faculty' element={<FacultyPage />} />
                <Route path='/faculty/add' element={<FacultyAddPage />} />
                <Route path='/faculty/update/:id' element={<FacultyUpdatePage />} />

                <Route path='/class' element={<ClassPage />} />
                <Route path='/class/add' element={<ClassAddPage />} />
                <Route path='/class/update/:id' element={<ClassUpdatePage />} /> 

                <Route path='/teacher' element={<TeacherPage />} />
                <Route path='/teacher/add' element={<TeacherAddPage />} />
                <Route path='/teacher/update/:id' element={<TeacherUpdatePage />} /> 

                <Route path='/student' element={<StudentPage />} />
                <Route path='/student/add' element={<StudentAddPage />} />
                <Route path='/student/update/:id' element={<StudentUpdatePage />} /> 

                <Route path='/manager' element={<ManagerPage />} />
                <Route path='/manager/add' element={<ManagerAddPage />} />
                <Route path='/manager/update/:id' element={<ManagerUpdatePage />} /> 

                <Route path='/room' element={<RoomPage />} />
                <Route path='/room/add' element={<RoomAddPage />} />
                <Route path='/room/update/:id' element={<RoomUpdatePage />} /> 

                <Route path='/subject' element={<SubjectPage />} />
                <Route path='/subject/add' element={<SubjectAddPage />} />
                <Route path='/subject/update/:id' element={<SubjectUpdatePage />} /> 

                <Route path='/semester' element={<SemesterPage />} />
                <Route path='/semester/add' element={<SemesterAddPage />} />
                <Route path='/semester/update/:id' element={<SemesterUpdatePage />} /> 

                <Route path='/sectionClass' element={<SectionClassPage />} />
                <Route path='/sectionClass/add' element={<SectionClassAddPage />} />
                <Route path='/sectionClass/update/:id' element={<SectionClassUpdatePage />} /> 

                <Route path='/major' element={<MajorPage />} />
                <Route path='/major/add' element={<MajorAddPage />} />
                <Route path='/major/update/:id' element={<MajorUpdatePage />} /> 
            </Routes>
        </div>
    )
}

export default ContentMain
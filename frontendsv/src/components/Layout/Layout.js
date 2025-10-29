import { useNavigate, Routes, Route } from 'react-router-dom'
import Header from '../Layout/Header/Header'
import Home from '../../pages/Home/Home'
import RegisterSection from '../../pages/RegisterSection/RegisterSection'
import Profile from '../../pages/Profile/Profile'
import Schedule from '../../pages/Schedule/Schedule'
import Result from '../../pages/Result/Result'
import News from '../../pages/News/News'
import NotFound from './404/404'

function Layout(){

    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register-section' element={<RegisterSection />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/schedule' element={<Schedule />} />
                <Route path='/result' element={<Result />} />
                <Route path='/news' element={<News />} />

                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    )
}

export default Layout
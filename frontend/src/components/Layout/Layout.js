import './Layout.css'
import Sidebar from './Sidebar';
import HeaderMain from '../Common/HeaderMain'
import ContentMain from './ContentMain'
function Layout(){

    return (
        <div className="layout">
            <Sidebar />
            <div className="main-content">
                <HeaderMain />
                <ContentMain />
            </div>
        </div>
    )
}

export default Layout
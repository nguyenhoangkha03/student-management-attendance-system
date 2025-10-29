import './Loader.css'

function Loader(){


    return (
        <div class="fixed inset-0 bg-gray-500 flex items-center justify-center z-50">
            <div class="container-loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default Loader
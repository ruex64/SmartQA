import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div className="container py-5 text-center">
            <h2 className="mb-2">SmartQA-Get Started!</h2>
            <p className="mb-2">Click on Create Room if you are the host to get started.</p>
            <p className="mb-4">If you are a participant click on Join Room</p>

            <Link to='/create' className="btn btn-primary me-1">Create Room</Link>
            <Link to='/join' className="btn btn-success me-1">Join Room</Link>

        </div>
    )
}

export default Home;
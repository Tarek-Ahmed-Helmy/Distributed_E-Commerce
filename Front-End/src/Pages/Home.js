import HomeImage from "../Components/images/Home.jpg";
function Home() {
    return (
        <div>
            <div className="relative w-full">
                <div className="w-full h-full absolute bg-black opacity-[40%]"></div>
                <div className="absolute h-full w-full mx-auto text-center text-white flex flex-col items-center justify-center">
                    <h2 className="font-medium text-5xl">Your Trusted</h2>
                    <h2 className="main-font text-6xl">E-Commerce<br></br>Platform</h2>
                </div>
                <img src={HomeImage} alt="home" className="w-full h-[600px] object-cover" />
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default Home;
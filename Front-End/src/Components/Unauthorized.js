import unauthorized from "./images/Unauthorized.png"
function Unauthorized() {
    return (
        <div className="min-h-screen flex flex-col gap-5 justify-center items-center font-medium text-center">
            <img src={unauthorized} alt="" className="h-[500px] w-[500px] object-contain"></img>
        </div>
    )
}

export default Unauthorized;
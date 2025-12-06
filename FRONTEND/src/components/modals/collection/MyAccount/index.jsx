import MyAccountSection from "./MyAccountSection/"
import SecuritySection from "./SecuritySection/"
const MyAccountModal = ({ onCloseModal }) => {

    return (
        <>
            {/* <!-- este es elmodala de registro  --> */}
            <dialog id="myAccountModal" open className="modal">
                <div className="modal-box bg-slate-200 w-11/12 max-w-6xl">
                    <form method="dialog">
                        <button onClick={()=>onCloseModal()} className="btn  text-black hover:bg-red-400 mt-10 md:mt-0 btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <div className="modal-action grid grid-cols-1  md:grid-cols-2">


{/* mi cuenta */}
                        <MyAccountSection />
                        {/* <!-- seguridad --> */}
                        <SecuritySection />
                       
                        <div className="divirder"></div>
                       
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default MyAccountModal
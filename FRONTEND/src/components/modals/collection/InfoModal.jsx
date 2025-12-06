
import Logo from "@assets/Icons/error-icon.gif"
const InfoModal = () => {
    return (
        <>
        <dialog id="infoModal" className="modal">
        <div className="modal-box  bg-white">
          <div className="container  flex sm:flex-col md:inline-flex">
            <img src={Logo} className="object-cover ml-25 md:ml-7 md:mx-o  mx-auto overflow-visible h-30 w-30  md:h-50 md:w-50   mr-10 mt-9"
              alt=""/>
            <p className="align-center flex mt-9 text-gray-600 text-2xl " id="text-infoModal">Press ESC key or
              click the button below to close</p>

          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* <!-- if there is a button in form, it will close the modal --> */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
          </div>
        </div>
      </dialog>
        </>
    )
}
export default InfoModal
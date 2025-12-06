const RequestLoginModal = () => {
    return (
        <>
        <dialog id="errorModal" className="modal">
        <div className="modal-box ">
          <div className="container inline-flex">
            <img src="assets/icons/error-icon.gif" className="object-cover overflow-visible  h-50 w-50 ml-7  mr-10 mt-9"
              alt=""/>
            <p className="align-center mt-9 text-gray-600 text-2xl " id="text-modalErrorForInstance">Press ESC key or
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
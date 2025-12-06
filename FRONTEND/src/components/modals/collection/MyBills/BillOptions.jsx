const   Option = ({ Icon,onClickEvent }) => {
    return (
        <>
            <li className="py-4">
                <input type="hidden" value="" id="my-modal-3" className="modal-toggle" />
                <button className="border-0 hover:bg-gray-200 hover:border-2 border-r-5 hover:border-green-400 focus:border-3 focus:border-blue-600" 
                onClick={()=>onClickEvent()}>
                {/* onClick="user.RequestDownloadBill(${factura.id})"> */}
                    {Icon()}
                </button>
            </li>
        </>
    )
}

export {
    Option
}
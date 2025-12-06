export const MenuOption = ({ icon, description, onClickAction }) => {


    return (

        <li  onClick={onClickAction}  className="hover:bg-slate-200 animate-shake animate-once animate-duration-[1300ms] animate-ease-in animate-normal">
            <div className="flex flex-inline ">
                {icon()}
                <a  className="text-md ml-2 font-bold color-sena-texto">
                    {description}
                </a>
            </div>

        </li>

    )
}


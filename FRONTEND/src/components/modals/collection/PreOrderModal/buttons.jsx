const Button = ({ classOftag, action, mensagge }) => {
    return (
        <>
            <a onClick={() => action()}
                className={classOftag}>
                {mensagge}
            </a>
        </>
    )
}
export default Button
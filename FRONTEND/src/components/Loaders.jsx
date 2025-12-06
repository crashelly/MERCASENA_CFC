export const MinimalLoader = ({w,h}) => {
    return (
        <>
            <div style={{width : `${w}px`,height : `${h}px`}}
                // class={` h-${h} w-${w}  border-4 border-dashed rounded-full animate-spin border-green-500 mx-auto`}
                class={`border-4 border-dashed rounded-full animate-spin border-green-500 mx-auto`}
            ></div>
        </>
    )
}
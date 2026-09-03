function Result({marks}) {
    return (
        <>
            <h2>
                {marks>=40 ? "Pass" : "Fail"}
            </h2>
        </>
    )
}

export default Result
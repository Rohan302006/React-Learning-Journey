
function Card({ title, children, onAction, actionText }) {
    return (
        <>
            <div>
                <h2>{title}</h2>

                <div>
                    {children}
                </div>

                <button onClick={onAction}>
                    {actionText}
                </button>
            </div>
        </>
    )
}

export default Card
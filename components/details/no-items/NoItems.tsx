

function Noitems({ title, icon, minHeight = 520 }: any) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: minHeight,
        }}>
            <div
                className="no-orders"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <div
                    style={{
                        width: "128px",
                        height: "128px",
                        lineHeight: "165px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f3f4f6",
                        borderRadius: "50%",
                        margin: "auto",
                    }}
                >
                    {icon}
                </div>
                <h6 style={{ opacity: 0.85 }}>
                    {title}
                </h6>
            </div>
        </div>
    );
}

export default Noitems;

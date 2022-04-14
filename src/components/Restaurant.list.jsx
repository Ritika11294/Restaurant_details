import "./Restaurant.list.css"
export const RestaurantList = (e) => {
    return (
        <div className="box" >
            <div className="image" style={{ display: "flex", marginBottom: "20px" }}>
                <img src={e.src} alt="" width="200px" height="110px" />
                <div>
                    <h4>{e.name}</h4>
                    <p>Costfor two:{e.costForTwo}</p>
                    <p style={{ display: "flex" }}>{e.cuisine.map((el) => {
                        return <p>{el},</p>
                    })}</p>
                    <p>Min Cost:{e.min}</p>
                    <p>payment method: {(e.payment_methods.cash && e.payment_methods.card) ? "cash card": (e.payment_methods.cash) ? "cash"  : "card"} </p>
                </div>
                <div style={{marginLeft :"20px" }}>
                    <p>rating:{e.rating}</p>
                    <p>votes:{e.votes}</p>
                    <p>reviews:{e.reviews}</p>
                </div>

            </div>


        </div>

    )
}
import { RestaurantList } from "./Restaurant.list";
import axios from "axios"

// console.log(data);
import { useState, useEffect } from "react";


export const RestaurantDetails = () => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1);
    // const [rate, setRate] = useState(null);
    //const [payMethod, setPayMethod] = useState("");
    const [order, setOrder] = useState(false);
    

    useEffect(() => {
        axios.get(`http://localhost:3001/restaurant?_limit=3&_page=${page}`).then((res) => {
            setData(res.data)
            console.log(res.data)
        })
    }, [page])

    // const getData = () => {
       
    // }

    
    const handleRate = (n) => {
        axios.get(`http://localhost:3001/restaurant`).then((res) => {
            const rate = res.data
            const star = rate.filter((e) => {
                return e.rating > n
            })
            setData([...star])
        })
        
        
    }

    const handlePay = (n) => {
        axios.get(`http://localhost:3001/restaurant`).then((res) => {
            const method = res.data
            const payMethod = method.filter((e) => {
             if("card" === n)  {
                 return ((e.payment_methods.card = true) && (e.payment_methods.cash = false));
             }
             else if("cash" === n){
                 return ((e.payment_methods.cash = true) &&  (e.payment_methods.card = false));
             }
             else {
                 return ((e.payment_methods.cash = true) &&  (e.payment_methods.card = true))
             }
            })
            setData([...payMethod])
            console.log(payMethod)
        })
        
        
    }

    const handleSort = (sort, value) => {
        if(sort === "asc" && value === "costForTwo") {
            data.sort((a, b) => a.costForTwo - b.costForTwo)
            setOrder(!order)
        }
        if(sort === "dsc" && value === "costForTwo") {
            data.sort((a, b) => b.costForTwo - a.costForTwo)
            setOrder(!order)
        }
    }
    


   

    return (
        <>
            <div className="rate">
                <button onClick = {() => {handleRate(1)}}>1 star</button>
                <button onClick ={() => {handleRate(2)}}>2 star</button>
                <button onClick ={() => {handleRate(3)}}>3 star</button>
                <button onClick ={() => {handleRate(4)}}>4 star</button>
                
            </div>
            <div className="pay">
                <button onClick={() => {handlePay("cash")}}>cash</button>
                <button onClick={() => {handlePay("card")}}>card</button>
                <button onClick={() => {handlePay("all")}}>all</button>
            </div>
            <div className="order">
                <button onClick={() => {handleSort("asc", "costForTwo")}}>Low to high</button>
                <button onClick={() => {handleSort("dsc", "costForTwo")}}>High to low</button>


            </div>
            


            <div className="App"> {data.map((e) => { return <RestaurantList key={e.id} {...e} /> }
            )}</div>
            <div> 
                <button disabled={page === 1} onClick={() => {
                    setPage(page - 1)
                }}>Previous</button>
                <button disabled={page === 7} onClick={() => {
                    setPage(page + 1)
                }}>Next</button>
            </div>
        </>
    )

}
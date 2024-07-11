import React from 'react'
import transactions from "../assets/transactions.svg"
function NoTransactions() {
  return (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexDirection: "column",
            marginBottom: "2rem",
        }}
    >
        <img src={transactions} style={{width: "400px", margin: "4rem" }} />
        <p style={{ textAlign: "center", fontSize: "1rem"}}>
            You Have No Transaction Currently
        </p>        
    </div>
  )
}

export default NoTransactions
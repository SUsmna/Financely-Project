import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';
import { Modal } from 'antd';
import AddExpenseModal from '../components/Modals/addExpense';
import AddIncomeModal from '../components/Modals/addIncome';
import { addDoc, collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import moment from "moment";
import { type } from '@testing-library/user-event/dist/type';
import TransactionsTable from '../components/TransactionTable';
import ChartComponent from '../components/Charts';
import NoTransactions from '../components/NoTransactions';

function Dashboard() {
//   const transaction = [
//     {
//       type: "income",
//       amount: 1200,
//       tag: "salary",
//       name: "income 1",
//       date: "2023-05-5",
//   },
//   {
//     type: "expense",
//     amount: 100,
//     tag: "food",
//     name: "expense 1",
//     date: "2023-05-20",
//   },
// ];
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const handleExpenceCancel =() => {
    setIsExpenseModalVisible(false);
  };
  const handleIncomeCancel= () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish=(values, type)=>{
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    }
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction, many) {
    try{
      const docRef = await addDoc(
        collection(db,`user/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      if (!many) toast.success("Transaction Added!");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    } catch (e) {
      console.error("Error adding document: ", e);
      if (!many) toast.error("Could't add transaction");
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income"){
        incomeTotal += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal);
  };

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log("TransactionArray", transactionsArray);
      toast.success("Transaction Fetched!")
    } 
    setLoading(false);
  }

  let sortedTransactions = transactions.sort((a,b) => {
    return new Date(a.data) - new Date(b.data);
  })

  return (
    <div>
      <Header />
      {loading ?(
      <p>Loading...</p>
      ) : (
      <>
        <Cards
          income={income}
          expense={expense}
          totalBalance={totalBalance}
          showExpenseModal={showExpenseModal}
          showIncomeModal={showIncomeModal}
        />
        {transactions && transactions.length !=0 ? ( 
          <ChartComponent sortedTransactions={sortedTransactions} />
        ) : (
          < NoTransactions />
        )}
        
        <AddExpenseModal
          isExpenseModalVisible={isExpenseModalVisible}
          handleExpenseCancel={handleExpenceCancel}
          onFinish={onFinish}
        />
        <AddIncomeModal
          isIncomeModalVisible={isIncomeModalVisible}
          handleIncomeCancel={handleIncomeCancel}
          onFinish={onFinish}
        />
        <TransactionsTable 
          transactions={transactions} 
          addTransaction={addTransaction}
          fetchTransactions={fetchTransactions}
        />
        </>
      )}
    </div>
  );
}

export default Dashboard;
import './App.css';
import { ButtonA, ButtonDA, ButtonD, ButtonE } from "./components/buttons/buttons"
import { db, collection, getDocs, orderBy } from "./components/firebase/firebase.js"
import logo from "./logo.svg"
import { useState } from 'react';



function App() {
  const date = new Date()
  const [todo, setTodo] = useState([])
  const [value, setValue] = useState("")
  const [updateValue, setUpdateValue] = useState("")

  const getUserData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "todos"), orderBy("", "desc"));
      const todosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodo(todosData)
    }
    catch (e) {
      console.log(e)
    }
  }
  getUserData()

  return (
    <>
      <div className='main-container d-flex justify-content-center align-items-center'>
        <div className='todoContainer'>
          <div className='headind-head'><img src={logo} /><h1>Todo List</h1></div>
          <div className='type-section' >
            <input type='text' className={'input-search'} value={value} placeholder='Enter the value...' onChange={(e) => { { setValue(e.target.value) } }} />
            <div className='btn-container m-2'>
              <ButtonA value="AddTodo" setValues={setValue} inputValue={value} classs="btn add-btn" />
              <ButtonDA value="Delete All" todo={todo} classs="btn deleteAll-btn spiner" />
            </div>
            <div className={"spiner"}></div>
            <div className='table-container'>

              <table className='table-box'>

                <thead>
                  <tr>
                    <th>Todo Items</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {todo.map((v, i) =>

                    <tr key={v.id}>

                      <td className='td width'>{v.editBolean ? <input className={'input-search text-center'} onChange={(e) => { setUpdateValue(e.target.value) }} defaultValue={v.value} /> : <p className='pvalue'>{v.value}</p>}</td>
                      <td className='td'>
                        <ButtonE id={v.id} todoValue={todo} setTodos={setTodo} updateValue={updateValue} index={i} classs="edit-btn btn btn-outline-success m-2" />
                        <ButtonD  id={v.id} classs="btn btn-outline-danger delete-btn" />
                      </td>
                    </tr>

                  )}
                </tbody>
              </table>



            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;

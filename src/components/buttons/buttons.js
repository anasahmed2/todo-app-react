import { db, collection, addDoc, doc, deleteDoc, updateDoc } from "../firebase/firebase"


function ButtonA({ value, classs, inputValue, setValues}) {
  return <button className={classs} onClick={async () => {
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        value: inputValue,
        editBolean: false,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setValues("")
  }}>{value}</button>
}

function ButtonDA({ value, classs, todo }) {
  return <button className={classs} onClick={() => {
    todo.map(async (v, i) =>
      await deleteDoc(doc(db, "todos", v.id)))
  }}>{value}</button>
}

function ButtonD({ classs, id }) {
  return <button className={classs} onClick={async () => {
    await deleteDoc(doc(db, "todos", id));
  }}>Delete</button>
}

function ButtonE({  classs, setTodos, todoValue, index, id ,updateValue }) {

  return todoValue[index].editBolean ? <button className={classs} onClick={async () => {
    const arr = [...todoValue]
    arr[index].editBolean = false;
    setTodos(arr)
    console.log(arr)
    console.log()
    const washingtonRef = doc(db, "todos", id);
    await updateDoc(washingtonRef, {
      value: updateValue,
      editBolean: false,

    });
  }}>
    Update</button> : <button className={classs} onClick={async () => {
      const arr = [...todoValue]
      arr[index].editBolean = true;
      setTodos(arr)
      const washingtonRef = doc(db, "todos", id);
      await updateDoc(washingtonRef, {
        editBolean: true,

      });

    }}>Edit Todo</button>
}
export { ButtonA, ButtonDA, ButtonD, ButtonE }


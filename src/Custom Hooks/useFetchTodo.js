import { useState, useEffect } from "react";
import { auth, db } from "@/firebase/firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";

const useFetchTodo = () => {
  // a Redux state to refresh the fetch
  const refetchTodos = useSelector((state) => state.RefetchTodos.value);

  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState(null);

  const getUserId = async () => {
    return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        const uid = user?.uid || null;
        setUserId(uid);
        resolve(uid);
      });
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const uid = await getUserId();
      if (!uid) {
        return;
      }

      const q = query(
        collection(db, "todo"),
        where("userId", "==", uid),
        orderBy("pinned", "desc"),
        orderBy("order")
      );
      const querySnapshot = await getDocs(q);
      const todoData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todoData);
    };

    fetchData();
  }, [refetchTodos]);

  const addTodo = async (newTodoData) => {
    const uid = await getUserId();
    if (!uid) {
      return;
    }

    const docRef = collection(db, "todo");
    addDoc(docRef, { ...newTodoData, userId: uid });
  };

  const editTodo = async (editedTodoData, todoItemId) => {
    const uid = await getUserId();
    if (!uid) {
      return;
    }
    const docRef = doc(db, "todo", todoItemId);
    setDoc(docRef, { ...editedTodoData, userId: uid });
  };
  const deleteTodo = async (todoItemId) => {
    const uid = await getUserId();
    if (!uid) {
      return;
    }
    deleteDoc(doc(db, "todo", todoItemId));
  };

  return { todos, addTodo, editTodo, deleteTodo };
};

export default useFetchTodo;

import { useState, useEffect } from 'react';
import { auth, db } from '@/firebase/firebaseConfig';
import { addDoc, collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { useSelector } from 'react-redux';


const useFetchEvents = () => {

  // a Redux state to refresh the fetch
  const refetchEvents = useSelector((state)=> state.RefetchEvents.value)

  const [events, setEvents] = useState([]);
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
        collection(db, 'events'),
        where('userId', '==', uid),
        orderBy('highPriority', 'desc') 
      );
      const querySnapshot = await getDocs(q);
      const eventsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsData);
    };

    fetchData();



  }, [refetchEvents]);

  const addEvent = async (newEventData) => {
    const uid = await getUserId();
    if (!uid) {
      return;
    }

    const docRef = collection(db, 'events');
    addDoc(docRef, { ...newEventData, userId: uid });
  };

  return { events, addEvent };
};

export default useFetchEvents;

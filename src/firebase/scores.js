import { doc, getDoc, setDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from './config';

export async function getUserScore(uid) {
  const snap = await getDoc(doc(db, 'scores', uid));
  return snap.exists() ? snap.data() : null;
}

export async function updateUserScore(uid, data) {
  await setDoc(doc(db, 'scores', uid), { ...data, updatedAt: new Date() }, { merge: true });
}

export async function getLeaderboard() {
  const q = query(collection(db, 'scores'), orderBy('wins', 'desc'), limit(10));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
}

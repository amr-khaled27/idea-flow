import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Idea } from "../gemini";
import { User } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";

const handleSaveIdeaToFirestore = async (idea: Idea, user: User | null) => {
  if (!user) {
    throw new Error("User is not authenticated");
  }
  const docRef = await addDoc(collection(db, "ideas"), {
    id: idea.id,
    text: idea.text,
    description: idea.description,
    createdAt: new Date(),
    userId: user.uid,
  });
};

const fetchIdeas = async (user: User | null | undefined): Promise<Idea[]> => {
  if (!user) return [];
  const ideasCollection = collection(db, "ideas");
  const q = query(ideasCollection, where("userId", "==", user.uid));
  const ideasSnapshot = await getDocs(q);
  const ideasList = ideasSnapshot.docs.map((doc) => doc.data() as Idea);
  return ideasList;
};

const handleDeleteIdea = async (idea: Idea, user: User | null | undefined) => {
  if (!user) {
    throw new Error("User is not authenticated");
  }
  const ideasCollection = collection(db, "ideas");
  const q = query(
    ideasCollection,
    where("userId", "==", user.uid),
    where("id", "==", idea.id)
  );
  const ideasSnapshot = await getDocs(q);
  if (ideasSnapshot.empty) {
    throw new Error("Idea not found");
  }
  const ideaDocRef = ideasSnapshot.docs[0].ref;
  await deleteDoc(ideaDocRef);
};

const handleEditIdea = async (
  idea: Idea,
  user: User | null | undefined,
  ideaText: string,
  ideaDescription: string
) => {
  if (!user) {
    throw new Error("User is not authenticated");
  }
  const ideasCollection = collection(db, "ideas");
  const q = query(
    ideasCollection,
    where("userId", "==", user.uid),
    where("id", "==", idea.id)
  );
  const ideasSnapshot = await getDocs(q);
  if (ideasSnapshot.empty) {
    throw new Error("Idea not found");
  }
  const ideaDocRef = doc(db, "ideas", ideasSnapshot.docs[0].id);
  await updateDoc(ideaDocRef, {
    text: ideaText,
    description: ideaDescription,
  });
};

export {
  handleSaveIdeaToFirestore,
  fetchIdeas,
  handleDeleteIdea,
  handleEditIdea,
};

import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { firestore, storage } from '@/libs/firebase';

export const getAllTopics = async () => {
  const topicsRef = collection(firestore, 'topics');
  const querySnapshot = await getDocs(topicsRef);

  const topics = [];
  querySnapshot.forEach((doc) => {
    const { id } = doc;
    const { name, image, resources, color } = doc.data();

    topics.push({
      id: id,
      name: name,
      image: image,
      color: color,
      resources: resources
    });
  });

  return topics;
};

export const uploadTopicLogo = async (id, logo) => {
  const storageRef = ref(storage, `topics/${id}`);
  await uploadBytes(storageRef, logo);
  const url = await getDownloadURL(storageRef);

  return url;
};

export const createTopic = async (topic) => {
  const topicRef = doc(firestore, 'topics', topic.id);

  await setDoc(topicRef, topic);
};

export const getTopic = async (id) => {
  const topicRef = doc(firestore, 'topics', id);
  const docSnap = await getDoc(topicRef);

  if (docSnap.exists()) {
    const { name, image, resources, color } = docSnap.data();

    return { id, name, image, resources, color };
  } else {
    return null;
  }
};

export const updateTopic = async (id, topic) => {
  const topicRef = doc(firestore, 'topics', id);
  await updateDoc(topicRef, topic);
};

import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

import { firestore } from '@/libs/firebase';

import { getTopic } from './topics';

export const createResource = async (resource) => {
  const resourceDoc = doc(firestore, 'resources', resource.id);
  await setDoc(resourceDoc, resource);
};

export const getAllResources = async () => {
  const resourcesRef = collection(firestore, 'resources');
  const querySnapshot = await getDocs(resourcesRef);

  const resources = [];
  querySnapshot.forEach((doc) => {
    const { name, link, topic } = doc.data();

    resources.push({
      id: doc.id,
      name: name,
      link: link,
      topic: topic
    });
  });

  return resources;
};

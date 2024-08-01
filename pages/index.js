import HomeBackground from '@/components/home/HomeBackground';
import HomeRepository from '@/components/home/HomeRepository';
import { getAllResources } from '@/services/resources';
import { getAllTopics } from '@/services/topics';

function Home({ resources, topics }) {
  return (
    <div className="w-full h-full min-h-screen">
      <div className="max-w-screen-xl mx-auto px-6 pt-10 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Mis recursos para desarrollo de software
          </h1>
        </div>

        <HomeRepository resources={resources} topics={topics} />
      </div>

      <HomeBackground />
    </div>
  );
}

export async function getStaticProps() {
  const [resources, topics] = await Promise.all([getAllResources(), getAllTopics()]);

  return {
    props: {
      resources,
      topics
    },
    revalidate: 60 * 60 * 24
  };
}

export default Home;

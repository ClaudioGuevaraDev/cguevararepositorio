import AdminLayout from '@/components/layout/AdminLayout';
import TopicCreateForm from '@/components/topics/TopicCreateForm';
import TopicsTable from '@/components/topics/TopicsTable';

function Topics() {
  return (
    <AdminLayout>
      <div>
        <div className="grid grid-cols-12 gap-4">
          <TopicCreateForm />

          <TopicsTable />
        </div>
      </div>
    </AdminLayout>
  );
}

export default Topics;

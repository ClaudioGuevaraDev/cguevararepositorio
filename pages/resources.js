import AdminLayout from '@/components/layout/AdminLayout';
import ResourceCreateForm from '@/components/resources/ResourceCreateForm';
import ResourcesTable from '@/components/resources/ResourcesTable';

function Resources() {
  return (
    <AdminLayout>
      <div>
        <div className="grid grid-cols-12 gap-4">
          <ResourceCreateForm />

          <ResourcesTable />
        </div>
      </div>
    </AdminLayout>
  );
}

export default Resources;

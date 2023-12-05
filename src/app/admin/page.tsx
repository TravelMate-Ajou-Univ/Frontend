import PageTitle from "@/components/PageTitle";
import Admin from "@/components/admin/Admin";
import AdminContext from "@/context/AdminContext";

export default function AdminPage() {
  return (
    <AdminContext>
      <PageTitle>관리자 페이지</PageTitle>
      <Admin />
    </AdminContext>
  );
}

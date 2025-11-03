import ProtectedRoute from "@/components/prodcuts/ProtectedRoute";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Thông báo !</h1>
        <p>Bạn chỉ xem được trang này khi đã đăng nhập.</p>
      </div>
    </ProtectedRoute>
  );
}

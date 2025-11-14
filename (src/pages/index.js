import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { MessageSkeleton } from '@/components/ui/Skeleton';
import Login from '@/components/auth/Login';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Layout>
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to FlashConnect
          </h1>
          <p className="text-gray-600">
            Select a chat to start messaging
          </p>
        </div>
      </div>
    </Layout>
  );
}

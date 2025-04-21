import SignupForm from '@/templates/public/SignupForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criar Conta',
  description: 'Crie sua conta para acessar o sistema',
};

export default function CreateAccount() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-zinc-900">
      <div className="w-full max-w-lg space-y-8">
        <SignupForm />
      </div>
    </div>
  );
}

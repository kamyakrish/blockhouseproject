import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard'); // Redirect to the dashboard page

  return null; // No need to render anything since it's redirecting
}

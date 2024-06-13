import { getServerSession } from 'next-auth';
import authConfig from '../../auth';
import Index from '.';
import { Session } from 'next-auth';

export default async function IndexPage() {
  const session = await getServerSession(authConfig) as Session | null;
  console.log('Session data on server:', session);
  return <Index session={session} />;
}

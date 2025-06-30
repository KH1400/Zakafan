import DynosPage from './dynos';

export default async function Page({ params }: any) {
  const { ['dyno']: slug } = await params;
  return <DynosPage slug={slug} />;
}
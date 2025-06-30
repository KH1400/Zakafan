import DynoDetailsPage from './dyno-details';

export default async function Page({ params }: any) {
  const { ['dyno-details']: slug } = await params;
  return <DynoDetailsPage slug={slug} />;
}
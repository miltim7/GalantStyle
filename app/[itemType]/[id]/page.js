import { notFound } from 'next/navigation';
import Header from '@components/Header';
import Footer from '@components/Footer';
import UtilityBar from '@components/UtilityBar';
import Details from '@components/Details';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }) {
  const { itemType, id } = params;
  const clothesRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/data/clothes.json`, { cache: 'no-store' });
  const accessoriesRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/data/accessories.json`, { cache: 'no-store' });
  const clothesData = await clothesRes.json();
  const accessoriesData = await accessoriesRes.json();
  const currentData = itemType === 'accessories' ? accessoriesData : clothesData;
  const product = currentData.find(p => p.id === parseInt(id));

  if (!product) {
    notFound();
  }

  return (
    <>
      <UtilityBar />
      <Header />
      <main style={{ marginTop: '90px' }}>
          <Details product={product} />
      </main>
      <Footer />
    </>
  );
}
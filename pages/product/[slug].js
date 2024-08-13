import Product from '../../components/Product';
import { useRouter } from 'next/router';


function ProductPage() {
  const router = useRouter();

  return <Product id={router.query.slug} />;
}

export default ProductPage;

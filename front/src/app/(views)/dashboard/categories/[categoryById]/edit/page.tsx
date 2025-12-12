import { getCategoryById } from '@/services/categories.services';
import { notFound } from 'next/navigation';
import CategoryForm from '../../components/category-form';

interface EditCategoryProps {
    params: Promise<{categoryById: string}>
}

export default async function PageEditarCategoria ({ params } : EditCategoryProps) {
    const { categoryById} = await params;

    const category = await getCategoryById(categoryById);

    if(!category){
        notFound();
    }
  return (
    <div>
        <CategoryForm categoryDataInitial={category}/>
    </div>
  )
}

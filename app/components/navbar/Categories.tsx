import { usePathname, useSearchParams } from 'next/navigation';

import Container from '../Container';
import CategoryBox from "../CategoryBox";

export const categories = [
  { label: 'NextJS' },
  { label: 'AWS' },
  { label: 'Docker' },
  { label: 'Python' },
  { label: 'ReactJS' },
  { label: 'TypeScript' },
  { label: 'NodeJS' },
  { label: 'Javascript' },
  { label: 'MERN stack' },
  { label: 'MongoDB' },
  { label: 'Postgres' },
  { label: 'TailwindCSS' },
  { label: 'T3 stack' },
  { label: 'Prisma' },
  { label: 'Network' },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}

export default Categories;

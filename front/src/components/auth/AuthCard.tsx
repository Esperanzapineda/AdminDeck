import { Card, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
}

export const AuthCard = ({ children, title }: AuthCardProps) => {
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>
      <Card className='w-full max-w-lg p-10 gap-8 flex flex-col items-center shadow-lg bg-background'>
        <div className="mb-2">
            <Image
            src="https://res.cloudinary.com/duv3ivqcd/image/upload/v1765321772/Gemini_Generated_Image_eifwc4eifwc4eifw_cjabh2.png"
            alt="Logo AdminDeck"
            width={200}
            height={200}
            className="object-contain"
            priority
            />
        </div>

        <CardTitle className='text-foreground text-3xl text-center font-bold'>
            {title}
        </CardTitle>

        <div className="w-full">
            {children}
        </div>
      </Card>
    </div>
  );
};
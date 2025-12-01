'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Scroll } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function QuizSelectionPage() {
  const [language, setLanguage] = useState<'EN' | 'ES'>('EN')

  return (
    <div className="container mt-16 mx-auto py-8 mb-4 max-w-4xl">
      <div className="flex justify-end mb-6 pr-8">
        <div className="flex gap-2 bg-muted p-1 rounded-lg">
          <Button 
            variant={language === 'EN' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setLanguage('EN')}
          >
            English
          </Button>
          <Button 
            variant={language === 'ES' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setLanguage('ES')}
          >
            Español
          </Button>
        </div>
      </div>

      <h1 className="md:text-4xl text-3xl font-bold text-start pl-8 md:mb-12 mb-6 text-primary">
        {language === 'EN' ? 'Bible Quiz' : 'Cuestionario Bíblico'}
      </h1>
      
      <div className="grid grid-cols-1 px-8 md:grid-cols-2 gap-8">
        <Link href={`/quiz/OLD?lang=${language}`} className="group">
          <Card className="h-full pb-0 hover:shadow-xl gap-4 md:gap-6 transition-all duration-300 border-2 hover:border-primary cursor-pointer transform hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 md:p-6 p-4 rounded-full md:w-24 md:h-24 w-16 h-16 flex items-center justify-center md:mb-4 mb-2 group-hover:bg-primary/20 transition-colors">
                <Scroll className="md:w-12 md:h-12 w-8 h-8 text-primary" />
              </div>
              <CardTitle className="md:text-2xl text-xl">
                {language === 'EN' ? 'Old Testament' : 'Antiguo Testamento'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center leading-[1.2] h-[40px] md:h-[60px] mb-2 text-muted-foreground">
              <p>
                {language === 'EN' 
                  ? 'Test your knowledge of the ancient scriptures, prophets, and kings.' 
                  : 'Pon a prueba tus conocimientos sobre las antiguas escrituras, profetas y reyes.'}
              </p>
            </CardContent>
            <CardFooter className="flex-col h-[300px] md:h-[400px] gap-2 p-0">
              <Image
                className="w-full h-full object-cover rounded-b-xl"
                src="/old-testament-image.png"
                alt="Old Testament"
                width={1024}
                height={1024}
              />
            </CardFooter>
          </Card>
        </Link>

        <Link href={`/quiz/NEW?lang=${language}`} className="group">
          <Card className="h-full pb-0 hover:shadow-xl gap-4 md:gap-6 transition-all duration-300 border-2 hover:border-primary cursor-pointer transform hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 md:p-6 p-4 rounded-full md:w-24 md:h-24 w-16 h-16 flex items-center justify-center md:mb-4 mb-2 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="md:w-12 md:h-12 w-8 h-8 text-primary" />
              </div>
              <CardTitle className="md:text-2xl text-xl">
                {language === 'EN' ? 'New Testament' : 'Nuevo Testamento'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center leading-[1.2] h-[40px] md:h-[60px] mb-2 text-muted-foreground">
              <p>
                {language === 'EN'
                  ? 'Explore the life of Jesus, the apostles, and the early church.'
                  : 'Explora la vida de Jesús, los apóstoles y la iglesia primitiva.'}
              </p>
            </CardContent>
            <CardFooter className="flex-col h-[300px] md:h-[400px] gap-2 p-0">
              <Image
               className="w-full h-full object-cover rounded-b-xl"
                src="/new-testament-image.png"
                alt="New Testament"
                width={1024}
                height={1024}
              />
            </CardFooter>
          </Card>
        </Link>
      </div>
    </div>
  )
}

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
    <div className="container mx-auto py-8 mb-4 max-w-4xl">
      <div className="flex justify-end mb-4">
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

      <h1 className="text-4xl font-bold text-center mb-12 text-primary">
        {language === 'EN' ? 'Bible Quiz' : 'Cuestionario Bíblico'}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href={`/quiz/OLD?lang=${language}`} className="group">
          <Card className="h-full pb-0 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary cursor-pointer transform hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-6 rounded-full w-24 h-24 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Scroll className="w-12 h-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">
                {language === 'EN' ? 'Old Testament' : 'Antiguo Testamento'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center h-[60px] text-muted-foreground">
              <p>
                {language === 'EN' 
                  ? 'Test your knowledge of the ancient scriptures, prophets, and kings.' 
                  : 'Pon a prueba tus conocimientos sobre las antiguas escrituras, profetas y reyes.'}
              </p>
            </CardContent>
            <CardFooter className="flex-col h-[400px] gap-2 p-0">
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
          <Card className="h-full pb-0 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary cursor-pointer transform hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-6 rounded-full w-24 h-24 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="w-12 h-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">
                {language === 'EN' ? 'New Testament' : 'Nuevo Testamento'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center h-[60px] text-muted-foreground">
              <p>
                {language === 'EN'
                  ? 'Explore the life of Jesus, the apostles, and the early church.'
                  : 'Explora la vida de Jesús, los apóstoles y la iglesia primitiva.'}
              </p>
            </CardContent>
            <CardFooter className="flex-col h-[400px] gap-2 p-0">
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

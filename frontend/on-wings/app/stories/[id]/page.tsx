
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params
 
  return (
    <div className='h-screen mt-40'>
      <h1 className='text-4xl text-primary font-bold text-center'>{id}</h1>
    </div>
  )
}
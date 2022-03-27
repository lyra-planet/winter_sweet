import React from 'react'
import { useParams, useRoutes, useSearchParams } from 'react-router-dom'

export default function IntroductionPage() {
  // const [searchParams,setSearchParams] = useSearchParams()
  let [searchParams]=useSearchParams()
  console.log(searchParams.get('data'))
  return (
    <div>IntroductionPage</div>
  )
}

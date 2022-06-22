import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

export default function useUser({
  adminRedirectTo = false ,
  userRedirectTo = false,
  redirectTo = false,
  redirectIfFound = false,
}:any = {}) {
  const { data: user, mutate: mutateUser } = useSWR('/api/users')

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if ((!redirectTo && !adminRedirectTo && !userRedirectTo )|| !user) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      ((redirectTo || adminRedirectTo || userRedirectTo ) && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      if(redirectTo){
        Router.push(""+redirectTo)
      }
      else if( user?.type === 'ADMIN'){
        Router.push(""+adminRedirectTo)
      }
      else if(user?.type=== 'USER'){
        Router.push(""+userRedirectTo)
      }
      else{
        return;
      }
      
    }
  }, [user, redirectIfFound, redirectTo, adminRedirectTo, userRedirectTo])

  return { user, mutateUser }
}
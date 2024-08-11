'use client'
import SignInPage from "@/app/signin/page";
import LandingPage from "@/app/LandingPage/page";
import { usePathname } from "next/navigation";
import SignUpPage from "./signup/page";
import CustomerSupport from "./customer-support/page";


const Page = () => {
  const pathname = usePathname()

  if (pathname === '/signIn') {
    return <SignInPage />
  }

  if (pathname === '/signup'){
    return <SignUpPage />
  }

  if (pathname === '/customer-support'){
    return <CustomerSupport />
  }

  return <LandingPage />
}

export default Page
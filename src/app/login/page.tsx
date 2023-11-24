"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function Home() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center  pt-24 p-4">
      <Card>
        <CardHeader className="font-semibold justify-center items-center  text-2xl">
          Login
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent>
            <Input className="mt-4" type="text" placeholder="Username" />
            <Input className="mt-4" type="password" placeholder="Password" />
          </CardContent>
          <CardFooter>
            <Button className="mt-4 w-full" type="submit" variant={"default"}>
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}


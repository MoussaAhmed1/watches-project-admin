'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import { useToast } from '@/components/ui/use-toast'
import axiosInstance from '@/utils/axios-client'
import Link from 'next/link'

export default function PasswordResetForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const tShared = useTranslations('shared');
  const { toast } = useToast();
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
     e.preventDefault();
            try {
                const res = await axiosInstance.post("/auth/request-reset-password", { email });
                toast({
                  variant: "default",
                  title: tShared("successMsg"),
                });
            } catch (error:any) {
              console.log(error);
              toast({
                variant: "destructive",
                title: tShared("somthingwentwrong"),
                description: error?.message,
              });
            }
    setIsLoading(false)
    // Handle password reset logic here
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-pink-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="space-y-2 text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">{tShared('resetPassword')}</h1>
          <p className="text-sm text-muted-foreground">
           {tShared("resetPasswordInstruction")}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder={tShared("Enteryouremail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button
              type="submit"
              className="m-0 p-0 w-full "
              disabled={isLoading}
            >
              {isLoading ? '...' : tShared("submit")}
            </Button>
            <div className="text-center">
            <Link
                className="text-sm text-muted-foreground hover:text-primary"
                href={"/"}
              >
                {tShared("returnToSignIn")}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


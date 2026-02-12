"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"

type UserProfile = {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  phone: string | null
}

type AuthContextType = {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error: Error | null }>
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<UserProfile>) => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single()

      if (error) {
        console.log("Profile not found yet:", error.message)
      } else {
        setProfile(data)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      console.log("Starting signup process...")
      
      // Step 1: Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      })

      if (authError) {
        console.error("Auth signup error:", authError)
        throw authError
      }

      if (!authData.user) {
        throw new Error("No user returned from signup")
      }

      console.log("User created in auth:", authData.user.id)

      // Step 2: Create profile in users table
      // We'll use upsert to handle any race conditions
      const { error: profileError } = await supabase
        .from("users")
        .upsert({
          id: authData.user.id,
          email: email,
          first_name: firstName,
          last_name: lastName,
        }, {
          onConflict: 'id'
        })

      if (profileError) {
        console.error("Profile creation error:", profileError)
        
        // Don't throw error - profile might be created by database trigger
        // or we can retry later
        console.log("Will retry profile creation...")
        
        // Try once more after a delay
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        const { error: retryError } = await supabase
          .from("users")
          .upsert({
            id: authData.user.id,
            email: email,
            first_name: firstName,
            last_name: lastName,
          }, {
            onConflict: 'id'
          })
        
        if (retryError) {
          console.error("Retry failed:", retryError)
          // Still don't throw - user is created, profile can be added later
        }
      }

      console.log("Signup completed successfully")
      
      // Fetch the profile
      await fetchProfile(authData.user.id)

      return { error: null }
    } catch (error) {
      console.error("Signup error:", error)
      return { 
        error: error as Error 
      }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    router.push("/")
  }

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return { error: new Error("Not authenticated") }

    try {
      const { error } = await supabase
        .from("users")
        .update(data)
        .eq("id", user.id)

      if (error) throw error

      // Update local state
      setProfile((prev) => (prev ? { ...prev, ...data } : null))

      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}

import { supabase } from "./lib/supabase"
import { useEffect } from "react"


function App() {
    useEffect(() => {
        const signInGuestUser = async() => {
            const { data } = await supabase.auth.getSession()
            console.log(data);
            if (!data.session) {
                await supabase.auth.signInAnonymously()
            }
        }

        signInGuestUser()
    }, [])
  return (
    <div>Hello</div>
  )
}

export default App

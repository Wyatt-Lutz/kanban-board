import AppLayout from "./components/layout/AppLayout"
import TopBar from "./components/layout/Topbar"
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
    <AppLayout topBar={<TopBar boardTitle="Test" totalTasks={142} doneTasks={2} overdueTasks={4}/>}>
        <div>Hi</div>
    </AppLayout>
  )
}

export default App

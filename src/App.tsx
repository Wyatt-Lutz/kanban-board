import AppLayout from './components/layout/AppLayout';
import TopBar from './components/layout/Topbar';
import { supabase } from './lib/supabase';
import { useEffect, useState } from 'react';

function App() {
    const [authReady, setAuthReady] = useState(false);
    useEffect(() => {
        const signInGuestUser = async () => {
            const { data } = await supabase.auth.getSession();
            if (!data.session) {
                await supabase.auth.signInAnonymously();
            }
            setAuthReady(true);
        };

        signInGuestUser();
    }, []);
    if (!authReady) {
        return null;
    }
    return (
        <AppLayout
            topBar={<TopBar boardTitle="Test" totalTasks={142} doneTasks={2} overdueTasks={4} />}
        >
            <div>Hi</div>
        </AppLayout>
    );
}

export default App;

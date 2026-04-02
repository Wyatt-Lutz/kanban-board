import AppLayout from './components/layout/AppLayout';
import Board from './components/board/Board';
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
        <AppLayout>
            <Board />
        </AppLayout>
    );
}

export default App;

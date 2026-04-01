import type { ReactNode } from 'react';
import Board from '../board/Board';

//making it flexible in case I want like a sidebar or something
type AppLayoutProps = {
    topBar?: ReactNode;
    children: ReactNode; //board content
};

const AppLayout = ({ topBar, children }: AppLayoutProps) => {
    return (
        <div>
            <header>{topBar}</header>
            <div>
                <Board />
            </div>
        </div>
    );
};

export default AppLayout;

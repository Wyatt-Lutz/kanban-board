import type { ReactNode } from "react";

//making it flexible in case I want like a sidebar or something
type AppLayoutProps = {
    topBar?: ReactNode;
    children: ReactNode; //board content
};

const AppLayout = ({topBar, children}: AppLayoutProps) => {
    return (
        <div>
            <header>
                {topBar}
            </header>
            <div>
                <main>{children}</main>
            </div>
        </div>
    )
}

export default AppLayout;

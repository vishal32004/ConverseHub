import React from "react";

const ServerLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <div className="hidden md:flex flex-4 w-[72px] z-30 flex-col fixed inset-y-0">
{/* <Sidebar/> */}
            </div>
            <main className="md:pl-[72px] h-full">
                {children}
            </main>
        </div>
    );
}

export default ServerLayout;
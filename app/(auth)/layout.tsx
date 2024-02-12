import React from "react";

const AuthLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="h-screen" style={
            {
                backgroundImage: "url('/images/discordbg.png')",
                backgroundSize: 'cover',

            }
        }>
            {children}
        </div>
    );
}

export default AuthLayout;
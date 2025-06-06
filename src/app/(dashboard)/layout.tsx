

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <main className="flex min-h-screen flex-col bg-background text-foreground">
                {children}
            </main>
        </div>
    );
}


export default Layout;
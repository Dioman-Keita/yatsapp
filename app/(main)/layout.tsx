import SideBar from "@/app/sidbar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <SideBar>{children}</SideBar>;
}

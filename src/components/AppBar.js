import MiniCart from "@/components/MiniCart";

export function AppBar() {
    return (
        <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center  bg-pink-600 p-4 md:hidden">
            <MiniCart />
        </div>
    )
}
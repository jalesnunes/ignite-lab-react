import { Logo } from "./Logo"

export function Header () {
    return (
        <header className="w-full flex justify-center items-center h-20 bg-gray-700 border-b border-gray-600">
            <Logo />
        </header>
    )
}
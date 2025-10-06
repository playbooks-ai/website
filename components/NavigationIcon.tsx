import { LucideIcon } from 'lucide-react';

interface NavigationIconProps {
    href: string;
    icon: LucideIcon;
    title: string;
    tooltipText: string;
    isActive: boolean;
}

export default function NavigationIcon({ 
    href, 
    icon: Icon, 
    title, 
    tooltipText, 
    isActive 
}: NavigationIconProps) {
    return (
        <a
            href={href}
            className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 group relative ${
                isActive
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
            }`}
            title={title}
        >
            <Icon className="w-6 h-6" />
            <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {tooltipText}
            </span>
        </a>
    );
}

'use client';

import { ReactNode, CSSProperties } from 'react';
import Tilt from 'react-parallax-tilt';

interface ShadowBoxProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    enableTilt?: boolean;
}

export default function ShadowBox({
    children,
    className = '',
    style,
    enableTilt = true,
}: ShadowBoxProps) {
    const content = (
        <div
            className={`shadow-gradient rounded-3xl shadow-xl px-6 py-4 border-8 border-gray-50 ${className}`}
            style={style}
        >
            {children}
        </div>
    );

    if (!enableTilt) {
        return content;
    }

    return (
        <Tilt
            tiltMaxAngleX={4}
            tiltMaxAngleY={4}
            scale={1.05}
            perspective={1000}
            glareEnable={true}
            glareMaxOpacity={0.3}
            glareColor="black"
            glareBorderRadius="1.5rem"
            glarePosition="all"
            tiltReverse={true}
            transitionSpeed={400}
            className="rounded-3xl shadow-box"
        >
            {content}
        </Tilt>
    );
}

'use client';

import { useMDXComponent } from 'next-contentlayer2/hooks';
import ShadowBox from './ShadowBox';
import { useHeadingScrollObserver } from '@/lib/useHeadingScrollObserver';

const components = {
    ShadowBox,
};

export default function MDXContent({ code }: { code: string }) {
    const Component = useMDXComponent(code);
    useHeadingScrollObserver();

    return <Component components={components} />;
}

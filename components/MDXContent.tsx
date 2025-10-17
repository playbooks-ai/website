'use client';

import { useMDXComponent } from 'next-contentlayer2/hooks';
import ShadowBox from './ShadowBox';

const components = {
    ShadowBox,
};

export default function MDXContent({ code }: { code: string }) {
    const Component = useMDXComponent(code);
    return <Component components={components} />;
}

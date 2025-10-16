import { Blog, Authors } from 'contentlayer/generated';

export function sortPosts(posts: Blog[]) {
    return posts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
    });
}

export type CoreContent<T> = Omit<T, 'body' | '_raw' | '_id'>;

export function coreContent<T extends Blog | Authors>(content: T): CoreContent<T> {
    const { body, _raw, _id, ...rest } = content as any;
    return rest as CoreContent<T>;
}

export function allCoreContent<T extends Blog | Authors>(contents: T[]): CoreContent<T>[] {
    return contents.map((c) => coreContent(c));
}

export function formatDate(date: string, locale: string = 'en-US') {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(date).toLocaleDateString(locale, options);
}

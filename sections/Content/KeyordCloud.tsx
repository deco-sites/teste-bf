
export interface Links {
    text: string;
    href: string;
}
export interface Props {
    title: string;
    /** @format html */
    description?: string;
    keywordsLinks?: Links[];
}


export default function Contact({ title, description, keywordsLinks }: Props) {
    return (
        <div class="container max-w-[1216px] flex justify-center items-center flex-col text-center px-4 py-16 gap-10">
            <div class="flex flex-col gap-2 w-full">
                {title && <h2 class="lg:text-3xl w-full lg:w-1/2 text-3xl lg:text-10 text-primary text-center lg:text-left font-extrabold font-['Manrope']">{title}</h2>}
                {description && (
                    <div
                        class="text-lg lg:text-xl"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                )}
            </div>
            <div class="flex flex-wrap justify-center items-center lg:justify-start w-full lg:items-start gap-2 lg:gap-x-8 lg:gap-y-5">
                {keywordsLinks && (
                    keywordsLinks.map(link => {
                        return (
                            <a href={link.href} class="badge badge-primary badge-outline text-base-content px-4 py-1"><h3>{link.text}</h3></a>
                        )
                    })
                )}
            </div>

        </div>
    );
}
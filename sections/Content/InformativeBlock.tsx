import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
    title: string;
    /** @format html */
    description?: string;
    image?: {
        mobile: ImageWidget;
        desktop?: ImageWidget;
        altText: string;
    };
}

export default function InformativeBlock({ title, description, image }: Props) {
    return (
        <div class="container max-w-[1216px] flex justify-center items-center flex-col text-center px-4 py-16 gap-10">

            <div class="flex flex-col gap-2 w-full p-6 lg:p-11 rounded-3xl bg-base-300 relative overflow-hidden">
                <span class="w-full justify-center absolute top-[12%] lg:top-3 lg:left-[70%]">
                    {
                        image && (
                            <figure class="relative">
                                <Picture>
                                    <Source
                                        media="(max-width: 767px)"
                                        src={image?.mobile}
                                        width={333}
                                        height={353}
                                    />
                                    <Source
                                        media="(min-width: 768px)"
                                        src={image?.desktop ? image?.desktop : image?.mobile}
                                        width={333}
                                        height={353}
                                    />
                                    <img
                                        class="w-full object-cover lg:w-[290px] max-w-[333px]"
                                        sizes="(max-width: 640px) 100vw, 30vw"
                                        src={image?.mobile}
                                        alt={image?.altText}
                                        decoding="async"
                                        loading="lazy"
                                    />
                                </Picture>
                            </figure>
                        )
                    }
                </span>
                {title && <h2 class="lg:text-3xl w-full lg:w-1/2 text-3xl lg:text-10 text-primary text-center lg:text-left font-extrabold font-['Manrope']">{title}</h2>}
                {description && (
                    <div
                        class="text-lg lg:text-xl"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                )}
            </div>
        </div>
    );
}
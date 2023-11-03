import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import HeaderEditable from "$store/components/ui/SectionHeaderEditable.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
    /** @format html */
    title?: string;
    /** @format html */
    description?: string;
    benefits?: Array<{
        label: string;
        icon: AvailableIcons;
        description: string;
    }>;
    image: {
        mobile: ImageWidget;
        desktop?: ImageWidget;
        altText: string;
    };
}

export default function BenefitsWithBanner(
    props: Props,
) {
    const {
        title = "",
        description = "",
        benefits = [{
            icon: "fireFlame",
            label: "Entrega em todo Brasil",
            description: "Consulte o prazo no fechamento da compra.",
        }, {
            icon: "fireFlame",
            label: "15% na primeira compra",
            description: "Aplicado direto na sacola de compras.",
        }, {
            icon: "fireFlame",
            label: "Devolução grátis",
            description: "Veja as condições para devolver seu produto.",
        }],
        image = {
            mobile: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/cac2dc1c-48ac-4274-ad42-4016b0bbe947",
            altText: "Fashion",
        }
    } = props;

    const listOfBenefits = benefits.map((benefit, index) => {

        return (
            <div
                class={`flex gap-1 lg:gap-2 px-2 py-5 border-primary border border-solid rounded-xl flex-col w-full max-w-[195px] lg:w-44`}
            >
                <div class={`flex flex-col gap-2 ;justify-start items-center`}>
                    <div class={`flex justify-center items-center w-14 h-10 rounded-[80px] py-[10px] px-2 border border-primary border-solid`}>
                        <Icon
                            id={benefit.icon}
                            width={36}
                            height={20}
                            strokeWidth={0.01}
                            fill="currentColor"
                            class="text-primary"
                        />
                    </div>
                    <div
                        class={`leading-7 font-bold font-['Roboto_Flex'] text-base text-primary text-center
                            `}
                    >
                        {benefit.label}
                    </div>
                </div>
                <div class="flex-auto flex flex-col gap-1 lg:gap-2">
                    <p class={`text-sm lg:text-base leading-5 text-slate-200 text-center`}
                    >
                        {benefit.description}
                    </p>
                </div>
            </div>
        );
    });

    return (
        <>
            <div class="w-full container max-w-[1216px] flex flex-col px-4  gap-10 py-16 lg:px-0">
                <div class="flex flex-col lg:flex-row-reverse lg:items-end gap-10 lg:gap-8">
                    <figure class="relative">
                        <Picture>
                            <Source
                                media="(max-width: 767px)"
                                src={image?.mobile}
                                width={308}
                                height={209}
                            />
                            <Source
                                media="(min-width: 768px)"
                                src={image?.desktop ? image?.desktop : image?.mobile}
                                width={384}
                                height={280}
                            />
                            <img
                                class="w-full object-cover lg:w-[384px] max-w-[384px]"
                                sizes="(max-width: 640px) 100vw, 30vw"
                                src={image?.mobile}
                                alt={image?.altText}
                                decoding="async"
                                loading="lazy"
                            />
                        </Picture>
                    </figure>

                    <HeaderEditable
                        title={title}
                        description={description}
                        alignment="left"
                        titleTextContainerWidth="full"
                    />
                </div>
                <div class="w-full flex justify-center">
                    <div class="grid grid-cols-2 gap-2 w-full lg:gap-8 lg:flex lg:flex-wrap lg:justify-center  ">
                        {listOfBenefits}
                    </div>
                </div>
            </div>
        </>
    );
}
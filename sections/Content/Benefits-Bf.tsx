import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import HeaderEditable from "$store/components/ui/SectionHeaderEditable.tsx";

export interface Props {
    /** @format html */
    tagText?: string;
    /** @format html */
    title?: string;
    titleTextContainerWidth?: "reduced" | "normal" | "full";
    /** @format html */
    description?: string;
    benefits?: Array<{
        label: string;
        icon: AvailableIcons;
        description: string;
    }>;
    layout?: {
        variation?: "Simple" | "With border" | "Color reverse";
        headerAlignment?: "center" | "left";
        cardType?: "normal" | "full"
        /** @default false */
        scrollable?: boolean
    };
}

export default function Benefits(
    props: Props,
) {
    const {
        tagText = "",
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
        layout,
    } = props;

    const listOfBenefits = benefits.map((benefit, index) => {
        const reverse = layout?.variation === "Color reverse";

        

        return (
            <div
                class={`flex gap-4 px-5 py-6 border-primary border border-solid rounded-xl flex-col ${reverse ? "bg-base-300" : ""} ${layout?.cardType === "full" ? "w-full min-w-full max-w-sm" : "min-w-[192px] lg:min-w-[280px]"}
        `}
            >
                <div class={`flex gap-5 lg:gap-10 justify-start items-center  ${layout?.variation === "Simple" ? "flex-row" : "flex-col"}`}>
                    <div class={`flex justify-center items-center w-14 h-10 rounded-[80px] py-[10px] px-4 ${layout?.variation === "Simple" ? "bg-secondary " : layout?.variation === "Color reverse" ? "bg-primary" : "px-2 border border-primary border-solid"}`}>
                        <Icon
                            id={benefit.icon}
                            width={36}
                            height={20}
                            strokeWidth={0.01}
                            fill="currentColor"
                            class={layout?.variation === "With border" ? "text-primary" : "text-[#4F3C70]"}
                        />
                    </div>

                    <div
                        class={`lg:text-xl leading-7 font-bold font-['Roboto_Flex'] text-xl ${reverse ? "text-primary text-center" : "text-base-content"
                            }`}
                    >
                        {benefit.label}
                    </div>
                </div>
                <div class="flex-auto flex flex-col gap-1 lg:gap-2">

                    <p
                        class={`text-sm leading-5 text-slate-200 ${layout?.variation === "Simple" ? "text-left" : "text-center"
                            }`}
                    >
                        {benefit.description}
                    </p>
                </div>
            </div>
        );
    });

    const injectedHtmlIsVoid = tagText?.includes('data-mce-bogus="1"') || tagText === "";
    return (
        <>
            {!layout?.variation || layout?.variation === "Simple" || "Color reverse"
                ? (
                    <div class="w-full container px-4 py-8 flex flex-col gap-8 lg:gap-10 lg:py-10 lg:px-0">
                        {!injectedHtmlIsVoid && (<div class="w-full flex justify-center"><div class="rounded-[40px] border border-primary max-w-max px-3 py-1" dangerouslySetInnerHTML={{ __html: tagText}} /></div>)}
                        <HeaderEditable
                            title={title}
                            description={description}
                            alignment={layout?.headerAlignment || "center"}
                            titleTextContainerWidth={props.titleTextContainerWidth || "normal"}
                        />
                        <div class="w-full flex justify-center">
                            <div class={`flex gap-4 lg:gap-8 w-full lg:grid grid-flow-col auto-cols-fr ${layout?.scrollable ? "overflow-x-auto flex-row": "flex-col "}`}>
                                {listOfBenefits}
                            </div>
                        </div>
                    </div>
                )
                : ""}
            {layout?.variation === "With border" && (
                <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0">
                    <HeaderEditable
                        title={title}
                        description={description}
                        alignment={layout?.headerAlignment || "center"}
                        titleTextContainerWidth={props.titleTextContainerWidth || "normal"}
                    />
                    <div class="w-full flex justify-center">
                        <div class="grid grid-cols-2 gap-4 w-full py-6 px-4 border border-base-300 lg:gap-8 lg:grid-flow-col lg:auto-cols-fr lg:p-10">
                            {listOfBenefits}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
import type { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import { useState } from "preact/hooks";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";



export interface ProgressGiftProps {
    target: number;
    total: number;
    howToMessage?: string;
    targetMessage: string;
}

export interface Form {
    placeholderName?: string;
    placeholderEmail?: string;
    placeholderPhone?: string;
    buttonText?: string;
    /** @format html */
    helpText?: string;
}

export interface Props {
    content: {
        title?: string;
        /** @format textarea */
        description?: string;
        form?: Form;
    };
    layout?: {
        /** @default false */
        hideProgressBar?: boolean
    };
    image?: {
        mobile: ImageWidget;
        desktop?: ImageWidget;
        altText: string;
    };
}


function ProgressGift({ target, total, targetMessage, howToMessage = "Continue preenchendo para ganhar" }: ProgressGiftProps) {

    const remaining = target - total;
    const percent = Math.floor((total / target) * 100);

    return (
        <div class="flex flex-col w-full gap-2">
            <div class="px-8 py-2 h-14 flex flex-col justify-end items-end gap-0.5 border-y-1 border-grey-300">
            <span class="text-xs text-base-content">{targetMessage}</span>
                <div class="w-full h-5 rounded-full bg-base-300 relative top-2">
                    <div
                        class="h-5 rounded-full bg-primary max-w-full"
                        style={{ width: percent + "%" }}
                    >
                        <div
                            class="absolute -top-11 flex flex-col -translate-x-1/2 left-full"
                            style={{ left: percent < 100 ? percent + "%" : "80%", alignItems: percent < 100 ? "center":"flex-end"}}
                        >
                            <span class="text-xs text-base-content mb-1 bg-base-100 text-center max-w-[140px] min-w-[140px]">
                                {remaining > 0 ? howToMessage : "WOW!! agora é só enviar para ganhar!"}
                            </span>
                            <div class="relative w-0 h-0 border-t-8 border-r-8 border-l-8 border-solid border-l-transparent border-r-transparent border-t-primary"></div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );

}

export default function FormBf({ content, layout, image }: Props) {

    const loading = useSignal(false);
    const [stepCount, setStepCount] = useState({
        nameSum: 0,
        emailSum: 0,
        phoneSum: 0,
    });

    const verifyProgress: JSX.GenericEventHandler<HTMLInputElement> = (e) => {



        if (e.currentTarget?.name === "name" && stepCount.nameSum === 0 && e.currentTarget?.value !== "") {
            setStepCount({
                ...stepCount,
                nameSum: 1
            })
        } else {
            if (e.currentTarget?.value === "") {
                setStepCount({
                    ...stepCount,
                    nameSum: 0
                })
            }
        }

        if (e.currentTarget?.name === "email" && stepCount.emailSum === 0 && e.currentTarget?.value !== "") {
            setStepCount({
                ...stepCount,
                emailSum: 1
            })
        } else {
            if (e.currentTarget?.value === "") {
                setStepCount({
                    ...stepCount,
                    emailSum: 0
                })
            }
        }

        if (e.currentTarget?.name === "phoneNumber" && stepCount.phoneSum === 0 && e.currentTarget?.value !== "") {
            setStepCount({
                ...stepCount,
                phoneSum: 1
            })
        } else {
            if (e.currentTarget?.value === "") {
                setStepCount({
                    ...stepCount,
                    phoneSum: 0
                })
            }
        }

    }

    const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        try {
            loading.value = true;

            const email =
                (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;
            const name =
                (e.currentTarget.elements.namedItem("name") as RadioNodeList)?.value;
            const phoneNumber =
                (e.currentTarget.elements.namedItem("phoneNumber") as RadioNodeList)?.value.toString();

            // precisa criar uma action nova pra atender todos os campos incluindo phoneNumber 
            await invoke.vtex.actions.newsletter.subscribe({ email, name });
        } finally {
            loading.value = false;
        }
    };
    return (
        <div id="formLeadBf" class="flex flex-col gap-4 lg:gap-56 justify-center items-center px-4 py-16 max-w-[1216px] container lg:flex-row">

            <div class="flex flex-col gap-4 justify-center items-center text-center lg:text-left max-w-md">
                {
                    image && (
                        <figure class="relative">
                            <Picture>
                                <Source
                                    media="(max-width: 767px)"
                                    src={image?.mobile}
                                    width={240}
                                    height={137}
                                />
                                <Source
                                    media="(min-width: 768px)"
                                    src={image?.desktop ? image?.desktop : image?.mobile}
                                    width={403}
                                    height={230}
                                />
                                <img
                                    class="w-full object-cover lg:w-[403px] max-w-[403px]"
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
                {content?.title && (
                    <h2 class="text-3xl lg:text-4xl font-bold text-primary ">
                        {content?.title}
                    </h2>
                )}
                {content?.description && <div>{content?.description}</div>}
            </div>

            <form
                class="form-control gap-5 lg:gap-6 justify-center items-center max-w-sm"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    name="name"
                    class="input input-primary w-full max-w-xs text-primary-content bg-secondary placeholder:text-[#B086F8]"
                    placeholder={content?.form?.placeholderName || "Digite seu nome*"}
                    onInput={verifyProgress}
                    required />
                <input
                    type="email"
                    name="email"
                    class="input input-primary w-full max-w-xs text-primary-content bg-secondary placeholder:text-[#B086F8]"
                    placeholder={content?.form?.placeholderEmail || "Digite seu email*"}
                    onInput={verifyProgress}
                    required
                />
                <input
                    type="tel"
                    name="phoneNumber"
                    class="input input-primary w-full max-w-xs text-primary-content bg-secondary placeholder:text-[#B086F8]"
                    placeholder={content?.form?.placeholderPhone || "(DDD) | Telefone*"}
                    pattern="[0-9]+"
                    onInput={verifyProgress}
                    required />

                <ProgressGift
                    targetMessage="Receba seu cupom"
                    target={3}
                    total={stepCount.nameSum + stepCount.emailSum + stepCount.phoneSum}
                />
                {content?.form?.helpText && (
                    <div className="form-control px-8">
                        <label className="label cursor-pointer gap-2 justify-center items-start">
                            <input type="checkbox" checked="checked" className="checkbox checkbox-primary text-base font-['Roboto_Flex']" />
                            <div
                                class="text-sm"
                                dangerouslySetInnerHTML={{ __html: content?.form?.helpText }}
                            />
                        </label>
                    </div>
                )}
                <button
                    type="submit"
                    class="btn btn-primary w-64 h-14 rounded-[80px] disabled:loading"
                    disabled={loading}
                >
                    {content?.form?.buttonText || "Inscrever"}
                </button>
            </form>

        </div>
    );
}
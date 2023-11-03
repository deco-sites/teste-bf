import type { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";


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
        tiled?: boolean;
    };
}

export default function FormBf({ content }: Props) {

    const loading = useSignal(false);

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
        <div id="formLeadBf" class="flex flex-col gap-4 justify-center items-center">
            <form
                class="form-control gap-5 lg:gap-6 justify-center items-center max-w-sm"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    name="name"
                    class="input input-primary w-full max-w-xs text-primary-content bg-secondary placeholder:text-[#B086F8]"
                    placeholder={content?.form?.placeholderName || "Digite seu nome*"}
                    required />
                <input
                    type="email"
                    name="email"
                    class="input input-primary w-full max-w-xs text-primary-content bg-secondary placeholder:text-[#B086F8]"
                    placeholder={content?.form?.placeholderEmail || "Digite seu email*"}
                    required
                />
                <input
                    type="tel"
                    name="phoneNumber"
                    class="input input-primary w-full max-w-xs text-primary-content bg-secondary placeholder:text-[#B086F8]"
                    placeholder={content?.form?.placeholderPhone || "(DDD) | Telefone*"}
                    pattern="[0-9]+"
                    required />
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
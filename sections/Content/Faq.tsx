import HeaderEditable from "$store/components/ui/SectionHeaderEditable.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";


export interface Question {
  question: string;
  /** @format html */
  answer: string;
}

export interface Contact {
  title?: string;
  /** @format html */
  description?: string;
  link?: {
    text: string;
    href: string;
  };
}

export interface Props {
  image?: {
    mobile: ImageWidget;
    desktop?: ImageWidget;
    altText: string;
  };
  /** @format html */
  title?: string;
  /** @format html */
  description?: string;
  questions?: Question[];
  contact?: Contact;
}

const DEFAULT_PROPS = {
  title: "",
  description: "",
  questions: [
    {
      question: "Como faço para acompanhar o meu pedido?",
      answer:
        "Acompanhar o seu pedido é fácil! Assim que o seu pedido for enviado, enviaremos um e-mail de confirmação com um número de rastreamento. Basta clicar no número de rastreamento ou visitar o nosso site e inserir o número de rastreamento na seção designada para obter atualizações em tempo real sobre a localização e o status de entrega do seu pedido.",
    },
    {
      question: "Qual é a política de devolução?",
      answer:
        "Oferecemos uma política de devolução sem complicações. Se você não estiver completamente satisfeito(a) com a sua compra, pode devolver o item em até 30 dias após a entrega para obter um reembolso total ou troca. Certifique-se de que o item esteja sem uso, na embalagem original e acompanhado do recibo. Entre em contato com a nossa equipe de atendimento ao cliente e eles o(a) orientarão pelo processo de devolução.",
    },
  ],
  contact: {
    title: "",
    description: "",
    button: {
      text: "",
      link: "",
    },
  },
};

function Question({ question, answer }: Question) {
  return (
    <>
      <div className="relative collapse collapse-plus font-['Roboto_Flex'] lg:px-4 px-3 py-3 border border-primary bg-base-100">
        <input class="min-h-12" type="radio" name="my-accordion-3" checked="checked" />
        <h3 className="flex items-center collapse-title text-base text-base-content font-medium p-0 min-h-12 ">
          {question}
        </h3>
        <div className="collapse-content">
          <div
            class="text-base-content text-sm"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </div>
      </div>
    </>
  )
}

function Contact({ title, description, link }: Contact) {
  return (
    <div class="flex flex-col gap-6 items-center text-center">
      <div class="flex flex-col gap-2">
        {title && <h2 class="text-xl lg:text-3xl">{title}</h2>}
        {description && (
          <div
            class="text-lg lg:text-xl"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>
      {link &&
        <a href={link.href} class="btn">{link.text}</a>}
    </div>
  );
}

export default function FAQ(props: Props) {
  const {
    questions = [],
    title,
    description,
    contact,
    image
  } = { ...DEFAULT_PROPS, ...props };

  return (
    <>
      <div class="w-full bg-base-200 lg:bg-base-100 px-4 lg:px-28 flex flex-col gap-4 lg:gap-8 ">
        <div class="max-w-[1216px] container lg:border-t lg:border-base-300 py-16">
          <div class="flex flex-col justify-center lg:justify-around items-center lg:flex-row gap-10">
            <div class="flex flex-col justify-center items-center lg:items-start lg:flex-col-reverse gap-2 lg:gap-10">
              {
                image && (
                  <figure class="relative">
                    <Picture>
                      <Source
                        media="(max-width: 767px)"
                        src={image?.mobile}
                        width={310}
                        height={95}
                      />
                      <Source
                        media="(min-width: 768px)"
                        src={image?.desktop ? image?.desktop : image?.mobile}
                        width={310}
                        height={95}
                      />
                      <img
                        class="w-full object-cover lg:w-[310px] max-w-[310px]"
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
              <div class="max-w-xs">
                <HeaderEditable
                  title={title || ""}
                  description={description || ""}
                  alignment={"left"}
                  titleTextContainerWidth="full"
                />
              </div>

            </div>

            <div class="join join-vertical w-full max-w-xl gap-3 lg:gap-6">
              {questions.map((question) => <Question {...question} />)}
            </div>
          </div>

          <Contact {...contact} />
        </div>

      </div>
    </>
  );
}
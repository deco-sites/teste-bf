import Image from "apps/website/components/Image.tsx";
import HeaderEditable from "$store/components/ui/SectionHeaderEditable.tsx";
import { useMemo } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Image {
  image: ImageWidget;
  altText: string;
}

export interface Props {
  /** @format html */
  tagText?: string;
  /** @format html */
  title?: string;
  /** @format html */
  description?: string;
  images?: Image[];
  layout?: {
    headerAlignment?: "center" | "left";
  };
}

const IMAGES = [
  {
    altText: "deco",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/fe7cd8ba-c954-45d6-9282-ee7d8ca8e3c7",
  },
  {
    altText: "deco",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/637e8601-6b86-4979-aa97-68013a2a60fd",
  },
];

function Logos(props: Props) {
  const {
    title,
    description,
    images,
    layout,
    tagText = "",
  } = props;
  const list = useMemo(
    () =>
      images && images.length > 0
        ? images
        : Array(20).fill(null).map((_, i) => IMAGES[i % 2]),
    [],
  );

  const injectedHtmlIsVoid = tagText?.includes('data-mce-bogus="1"') || tagText === "";

  return (
    <div class="w-full container px-4 py-16 flex flex-col ">
      {!injectedHtmlIsVoid && (<div class="w-full flex justify-center py-3 lg:py-6"><div class="rounded-[40px] border border-primary max-w-max px-3 py-1" dangerouslySetInnerHTML={{ __html: tagText}} /></div>)}
      <HeaderEditable
        title={title}
        description={description}
        alignment="left"
        titleTextContainerWidth="full"
      />
      <div class="w-full flex lg:flex-wrap justify-start lg:justify-center pt-10 lg:pt-12 gap-5 lg:gap-10 items-start lg:items-center overflow-x-auto lg:overflow-x-hidden ">
        {list.map((element) => (
          <Image
                width={168}
                height={54}
                src={element.image}
                alt={element.altText || ""}
                class="w-2/5 max-w-[168px] max-h-full"
              />
        ))}
      </div>
    </div>
  );
}

export default Logos;

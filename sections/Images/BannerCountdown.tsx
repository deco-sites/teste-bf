import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import CampaignTimer from "../Miscellaneous/CampaignTimer.tsx";
import type { Props } from "../Miscellaneous/CampaignTimer.tsx";


export interface BannerCountdownProps {
  image: {
    mobile: ImageWidget;
    desktop?: ImageWidget;
    altText: string;
  };
  /** @format html */
  text?: string;
  title?: string;
  link?: {
    text: string;
    href: string;
  };

  campaingTimer?: Props;
}

const DEFAULT_PROPS: BannerCountdownProps = {
  link: {
    href: "#",
    text: "Ver agora",
  },
  image: {
    mobile:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/cac2dc1c-48ac-4274-ad42-4016b0bbe947",
    altText: "Fashion",
  },
};


export default function BannerCountdown(props: BannerCountdownProps) {

  const { link, text, title, image, campaingTimer } = { ...DEFAULT_PROPS, ...props };

  return (
    <div class="container lg:max-w-[1216px] px-4 pt-5 lg:pt-20 lg:pb-10 lg:items-start">
      <div class="lg:hidden pb-10 pt-5">
        {campaingTimer?.expiresAt && (<CampaignTimer {...campaingTimer} text={campaingTimer.text ? campaingTimer.text : ""} />)}
      </div>

      <div class="card lg:card-side gap-10 lg:gap-16 lg:items-start">
        <h2>
          <span class="hidden">{image.altText}</span>
          <figure class="relative">
            <Picture preload>
              <Source
                media="(max-width: 767px)"
                src={image?.mobile}
                width={340}
                height={431}
              />
              <Source
                media="(min-width: 768px)"
                src={image?.desktop ? image?.desktop : image?.mobile}
                width={565}
                height={723}
              />
              <img
                class="w-full object-cover lg:w-[565px] max-w-[565px] h-[431px] lg:h-[723px]"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={image?.mobile}
                alt={image?.altText}
                decoding="sync"
                loading="eager"
              />
            </Picture>
          </figure>
        </h2>

        <div class="flex flex-col lg:justify-center lg:items-start gap-10 lg:gap-16">
          <div class="hidden lg:block lg:pt-5">
            {campaingTimer?.expiresAt && (<CampaignTimer {...campaingTimer} text={campaingTimer.text ? campaingTimer.text : ""} />)}
          </div>
          {title && (<h3 class="card-title">{title}</h3>)}
          <div class="text-center lg:text-left" dangerouslySetInnerHTML={{
            __html: `
          ${text}`
          }} />
          <div class="card-actions justify-center">
            <a class="btn btn-primary w-64 h-14 rounded-[80px]" href={link?.href}>{link?.text}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
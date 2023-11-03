interface Props {
    /** @format html */
    title?: string;
    titleTextContainerWidth: "reduced" | "normal" | "full";
    /** @format html */
    description?: string;
    alignment: "center" | "left";
  }
  
  function HeaderEditable(props: Props) {
    return (
      <>
        {props.title || props.description
          ? (
            <div
              class={`flex flex-col gap-2 ${
                props.alignment === "left" ? "text-center lg:text-left" : "text-center"
              }`}
            >
              {props.title &&
                (
                  <div class={`text-3xl lg:text-4xl text-primary font-['Manrope'] font-bold ${props.titleTextContainerWidth === "reduced" ? "max-w-[50%]": props.titleTextContainerWidth === "normal" ? "max-w-[70%]":"max-w-full"} m-[0_auto]`} dangerouslySetInnerHTML={{__html:props.title}}/>
                )}
              {props.description &&
                (
                    <div class="w-full text-lg lg:text-xl text-secundary font-['Roboto_Flex'] m-[0_auto]" dangerouslySetInnerHTML={{__html:props.description}}/>
                  )}
            </div>
          )
          : null}
      </>
    );
  }
  
  export default HeaderEditable;
  
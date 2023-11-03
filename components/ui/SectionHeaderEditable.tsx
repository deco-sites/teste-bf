interface Props {
    /** @format html */
    title?: string;
    titleTextContainerWidth: "reduced" | "normal" | "full";
    /** @format html */
    description?: string;
    alignment: "center" | "left";
  }
  
  function HeaderEditable(props: Props) {
    
    const {
      title,
      titleTextContainerWidth,
      description = "center",
      alignment
    } = props

    return (
      <>
        {title || description
          ? (
            <div
              class={`flex flex-col gap-2 ${
                alignment === "left" ? "text-center lg:text-left" : "text-center"
              }`}
            >
              {title &&
                (
                  <div class={`text-3xl lg:text-4xl text-primary font-['Manrope'] font-bold ${titleTextContainerWidth === "reduced" ? "max-w-[50%]": titleTextContainerWidth === "normal" ? "max-w-[70%]":"max-w-full"} m-[0_auto]`} dangerouslySetInnerHTML={{__html:title}}/>
                )}
              {description &&
                (
                    <div class={`w-full text-lg lg:text-xl text-secundary font-['Roboto_Flex'] m-[0_auto] `} dangerouslySetInnerHTML={{__html:description}}/>
                  )}
            </div>
          )
          : null}
      </>
    );
  }
  
  export default HeaderEditable;
  
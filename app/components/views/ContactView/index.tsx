import React, { useMemo } from "react";
import { SelectableList, SelectableListOption } from "components";
import { useMenuHideView, useScrollHandler } from "hooks";
import { viewConfigMap } from "components/views";
import { profile } from "lib/resumeData";

const ContactView = () => {
  useMenuHideView(viewConfigMap.contact.id);

  const options: SelectableListOption[] = useMemo(
    () => [
      {
        type: "link",
        label: "Resume",
        sublabel: "Yashpreet_Voladoddi_Resume_2026.pdf",
        url: profile.resumeUrl,
      },
      {
        type: "link",
        label: "Email",
        sublabel: profile.email,
        url: `mailto:${profile.email}`,
      },
      {
        type: "link",
        label: "LinkedIn",
        sublabel: "yashpreet-voladoddi",
        url: profile.linkedin,
      },
      {
        type: "link",
        label: "GitHub",
        sublabel: "yashvoladoddi37",
        url: profile.github,
      },
      {
        type: "link",
        label: "Phone",
        sublabel: profile.phone,
        url: `tel:${profile.phone.replace(/\s/g, "")}`,
      },
    ],
    []
  );

  const [scrollIndex] = useScrollHandler(viewConfigMap.contact.id, options);

  return <SelectableList options={options} activeIndex={scrollIndex} />;
};

export default ContactView;

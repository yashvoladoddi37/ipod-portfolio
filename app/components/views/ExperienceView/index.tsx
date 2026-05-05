"use client";
import { useMemo } from "react";
import { SelectableList, SelectableListOption } from "components";
import { viewConfigMap } from "components/views";
import { useMenuHideView, useScrollHandler } from "hooks";
import { experiences } from "lib/resumeData";
import ExperienceDetailView from "../ExperienceDetailView";

const ExperienceView = () => {
  useMenuHideView(viewConfigMap.experience.id);

  const options: SelectableListOption[] = useMemo(
    () =>
      experiences.map((exp, index) => ({
        type: "view",
        label: exp.company,
        sublabel: exp.role,
        viewId: `${viewConfigMap.experienceDetail.id}-${index}`,
        component: () => <ExperienceDetailView experience={exp} />,
      })),
    []
  );

  const [scrollIndex] = useScrollHandler(viewConfigMap.experience.id, options);

  return (
    <SelectableList
      options={options}
      activeIndex={scrollIndex}
      centerAlign={true}
    />
  );
};

export default ExperienceView;

"use client";
import { useMemo } from "react";
import { SelectableList, SelectableListOption } from "components";
import { viewConfigMap } from "components/views";
import { useMenuHideView, useScrollHandler } from "hooks";
import { projects } from "lib/resumeData";
import ProjectDetailView from "../ProjectDetailView";

const ProjectsView = () => {
  useMenuHideView(viewConfigMap.projects.id);

  const options: SelectableListOption[] = useMemo(
    () =>
      projects.map((project, index) => ({
        type: "view",
        label: project.name,
        sublabel: project.description,
        viewId: `${viewConfigMap.projectDetail.id}-${index}`,
        component: () => <ProjectDetailView project={project} />,
      })),
    []
  );

  const [scrollIndex] = useScrollHandler(viewConfigMap.projects.id, options);

  return <SelectableList options={options} activeIndex={scrollIndex} />;
};

export default ProjectsView;

import { contentfulClient } from "@/lib";
import { ServerResponse } from "@/helpers";
import { TypeCaseStudiesSkeleton } from "@/types/contentful";
import { Asset } from "contentful";

export const GET = async () => {
  try {
    const res = await contentfulClient.getEntries<TypeCaseStudiesSkeleton>({
      content_type: "caseStudies",
      include: 2,
      "metadata.tags.sys.id[in]": ["featured", "showcase"],
    });

    const caseStudies = res.items.map((i) => ({
      showcase: i.metadata.tags.map((i) => i.sys.id).includes("showcase"),
      slug: i.fields.slug,
      title: i.fields.title,
      wip: i.fields.wip,
      cover: `https:${(i.fields.cover as Asset)?.fields?.file?.url}`,
      icon: `https:${(i.fields.icon as Asset)?.fields?.file?.url}`,
      year: i.fields.year,
      subtitle: i.fields.subtitle,
      oneLineDescription: i.fields.oneLineDescription,
      shortDescription: i.fields.shortDescription,
      projectDetails: i.fields.projectDetails,
      url: i.fields.url,
      githubUrl: i.fields.githubUrl,
    }));

    const showcase = caseStudies.filter((study) => study.showcase)[0];
    const featuredLeft = caseStudies.filter(
      (study) => study.slug === "bridges",
    )[0];
    const featuredRight = caseStudies.filter(
      (study) => study.slug === "deca-ui",
    )[0];

    return ServerResponse.success({ showcase, featuredLeft, featuredRight });
  } catch (e) {
    return ServerResponse.serverError();
  }
};

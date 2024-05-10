import {contentfulClient} from '@/lib';
import {ServerResponse} from '@/helpers';
import {TypeCaseStudiesSkeleton} from '@/types/contentful';
import {Asset} from 'contentful';

export const GET = async () => {
  try {
    const res = await contentfulClient.getEntries<TypeCaseStudiesSkeleton>({
      content_type: 'caseStudies',
      include: 2,
    });

    const caseStudies = res.items.map(i => ({
      title: i.fields.title,
      slug: i.fields.slug,
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

    const sortedCaseStudies = caseStudies.sort((a, b) => b.year - a.year);
    return ServerResponse.success(sortedCaseStudies);
  } catch (e) {
    return ServerResponse.serverError();
  }
};

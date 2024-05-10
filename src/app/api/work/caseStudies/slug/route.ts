import {contentfulClient} from '@/lib';
import {ServerResponse} from '@/helpers';
import {TypeCaseStudiesSkeleton} from '@/types/contentful';
import {Asset} from 'contentful';
import {z} from 'zod';
import {NextRequest} from 'next/server';

const slugSchema = z.object({
  slug: z.string({required_error: 'Slug required'}),
});

type SlugSchema = z.infer<typeof slugSchema>;

export const POST = async (request: NextRequest) => {
  try {
    const {slug}: SlugSchema = await request.json();

    const validation = slugSchema.safeParse({slug});

    if (validation.success) {
      const res = await contentfulClient.getEntries<TypeCaseStudiesSkeleton>({
        content_type: 'caseStudies',
        'fields.slug': slug,
        limit: 1,
      });

      const caseStudyRaw = res?.items[0];

      if (!caseStudyRaw) {
        return ServerResponse.userError('Slug not found');
      }

      const caseStudy = {
        title: caseStudyRaw.fields.title,
        slug: caseStudyRaw.fields.slug,
        wip: caseStudyRaw.fields.wip,
        cover: `https:${(caseStudyRaw.fields.cover as Asset)?.fields?.file
          ?.url}`,
        icon: `https:${(caseStudyRaw.fields.icon as Asset)?.fields?.file?.url}`,
        year: caseStudyRaw.fields.year,
        subtitle: caseStudyRaw.fields.subtitle,
        oneLineDescription: caseStudyRaw.fields.oneLineDescription,
        shortDescription: caseStudyRaw.fields.shortDescription,
        projectDetails: caseStudyRaw.fields.projectDetails,
        url: caseStudyRaw.fields.url,
        githubUrl: caseStudyRaw.fields.githubUrl,
      };

      return ServerResponse.success(caseStudy);
    } else {
      return ServerResponse.userError('Invalid Slug');
    }
  } catch (e) {
    return ServerResponse.serverError();
  }
};

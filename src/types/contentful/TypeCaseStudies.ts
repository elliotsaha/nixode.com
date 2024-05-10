import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';

export interface TypeCaseStudiesFields {
  title: EntryFieldTypes.Symbol;
  year: EntryFieldTypes.Integer;
  slug: EntryFieldTypes.Symbol;
  subtitle: EntryFieldTypes.Symbol;
  icon: EntryFieldTypes.AssetLink;
  wip: EntryFieldTypes.Boolean;
  cover: EntryFieldTypes.AssetLink;
  oneLineDescription: EntryFieldTypes.Symbol;
  shortDescription: EntryFieldTypes.Text;
  projectDetails: EntryFieldTypes.Text;
  url?: EntryFieldTypes.Symbol;
  githubUrl: EntryFieldTypes.Symbol;
}

export type TypeCaseStudiesSkeleton = EntrySkeletonType<
  TypeCaseStudiesFields,
  'caseStudies'
>;
export type TypeCaseStudies<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypeCaseStudiesSkeleton, Modifiers, Locales>;

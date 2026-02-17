import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'homeTag',
      title: 'Home Hero Tag',
      description: 'Small label above the main homepage heading.',
      type: 'string',
      initialValue: 'INTRODUCING',
    }),
    defineField({
      name: 'homeTitle',
      title: 'Home Hero Title',
      description: 'Main homepage headline.',
      type: 'string',
      initialValue: 'BOSTON COLLEGE FIRST SAE BAJA RACING CLUB',
    }),
    defineField({
      name: 'homeDescription',
      title: 'Home Hero Description',
      description: 'Short paragraph below the homepage title.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'joinCtaLabel',
      title: 'Join Button Label',
      type: 'string',
      initialValue: 'JOIN US',
    }),
    defineField({
      name: 'joinUrl',
      title: 'Join Link',
      description: 'Button target URL for the hero CTA.',
      type: 'url',
    }),
    defineField({
      name: 'sponsorsLabel',
      title: 'Sponsors Section Label',
      type: 'string',
      initialValue: 'Powering MechaEagles',
    }),
    defineField({
      name: 'eventsTitle',
      title: 'Events Section Title',
      description: 'Heading above the event cards on the homepage.',
      type: 'string',
      initialValue: 'Upcoming Events',
    }),
    defineField({
      name: 'eventsEmptyText',
      title: 'Events Empty State Text',
      type: 'string',
      initialValue: 'No events published yet. Add events in the CMS to display them here.',
    }),
    defineField({
      name: 'eventDefaultCtaLabel',
      title: 'Default Event CTA Label',
      description: 'Fallback button text used when an event has a URL but no custom CTA label.',
      type: 'string',
      initialValue: 'Learn more',
    }),
    defineField({
      name: 'scrollIntroText',
      title: 'Scroll Intro Text',
      type: 'string',
      initialValue: 'Introducing',
    }),
    defineField({
      name: 'scrollModelYearText',
      title: 'Scroll Model Year Text',
      type: 'string',
      initialValue: 'Model Year',
    }),
    defineField({
      name: 'scrollYearText',
      title: 'Scroll Year Text',
      type: 'string',
      initialValue: '26',
    }),
    defineField({
      name: 'teamSeasonLabel',
      title: 'Team Season Label',
      type: 'string',
      initialValue: '2025-2026',
    }),
    defineField({
      name: 'aboutSections',
      title: 'About Page Tabs (WHO WE ARE / WHAT WE DO)',
      description: 'Each item becomes one clickable tab in the About page menu.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'key',
              title: 'Tab Key (Unique ID)',
              description: 'Short unique key, e.g. who, what, ethos, legacy.',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Tab Label (Left Menu Text)',
              description: 'Text users click in the left-side menu.',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Tab Content (Right Panel Text)',
              description: 'Main paragraph shown when this tab is selected.',
              type: 'text',
              rows: 6,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'key' },
          },
        },
      ],
    }),
    defineField({
      name: 'aboutStats',
      title: 'About Page Stats Row',
      description: 'Stat cards shown under the dome gallery.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Stat Value',
              description: 'Big number/percent, e.g. 140 or 89%.',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Stat Label',
              description: 'Small caption under the value, e.g. MEMBERS.',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
    }),
    defineField({
      name: 'homeSpecs',
      title: 'Home Page Spec Cards',
      description: 'Cards near the bottom of the homepage (Acceleration, Top Speed, Weight).',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Spec Title',
              description: 'Example: ACCELERATION, TOP SPEED, WEIGHT.',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Spec Value',
              description: 'Example: 0-30 mph in 2s, 50 mph, 197 kg.',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'imagePath',
              title: 'Spec Image Path',
              description: 'Path from /public, e.g. /BajaFront.png.',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'value' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})

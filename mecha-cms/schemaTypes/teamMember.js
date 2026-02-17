import { defineField, defineType } from 'sanity'

const subteamOptions = [
  { title: 'Science - Software Development', value: 'Software Development' },
  { title: 'Science - Science', value: 'Science' },
  { title: 'Programmatics - Outreach', value: 'Outreach' },
  { title: 'Programmatics - Scheduling', value: 'Scheduling' },
  { title: 'Programmatics - Finance', value: 'Finance' },
  { title: 'Programmatics - Marketing', value: 'Marketing' },
  { title: 'Engineering - Suspension', value: 'Suspension' },
  { title: 'Engineering - Steering and Braking', value: 'Steering and Braking' },
  { title: 'Engineering - Roll Cage', value: 'Roll Cage' },
  { title: 'Engineering - Drive Train', value: 'Drive Train' },
  { title: 'Engineering - Fabrication', value: 'Fabrication' },
]

const subteamDivisionMap = {
  'Software Development': 'science',
  Science: 'science',
  Outreach: 'programmatics',
  Scheduling: 'programmatics',
  Finance: 'programmatics',
  Marketing: 'programmatics',
  Suspension: 'engineering',
  'Steering and Braking': 'engineering',
  'Roll Cage': 'engineering',
  'Drive Train': 'engineering',
  Fabrication: 'engineering',
}

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      description: 'Displayed on the team page.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role Title',
      description: 'Example: Project Manager, Full-Stack Developer, Suspension Engineer.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imageUrl',
      title: 'Photo URL or /public Path',
      type: 'string',
      description: 'Example: /team/John Doe.jpg or https://example.com/john.jpg',
    }),
    defineField({
      name: 'profileUrl',
      title: 'Profile Link',
      description: 'Optional: LinkedIn or personal profile URL.',
      type: 'url',
    }),
    defineField({
      name: 'bucket',
      title: 'Team Level',
      type: 'string',
      options: {
        list: [
          { title: 'Project Manager', value: 'pm' },
          { title: 'Division Lead', value: 'lead' },
          { title: 'Subteam Member', value: 'member' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'division',
      title: 'Division',
      description: 'Required for Division Lead and Subteam Member.',
      type: 'string',
      options: {
        list: [
          { title: 'Science', value: 'science' },
          { title: 'Programmatics', value: 'programmatics' },
          { title: 'Engineering', value: 'engineering' },
        ],
      },
      validation: (rule) =>
        rule.custom((value, context) => {
          const bucket = context?.parent?.bucket
          if ((bucket === 'lead' || bucket === 'member') && !value) {
            return 'Division is required for leads and members.'
          }
          return true
        }),
      hidden: ({ parent }) => parent?.bucket === 'pm',
    }),
    defineField({
      name: 'subteam',
      title: 'Subteam',
      description: 'Pick one existing subteam. Example: choose "Science - Software Development" for software team members.',
      type: 'string',
      options: {
        list: subteamOptions,
      },
      validation: (rule) =>
        rule.custom((value, context) => {
          const bucket = context?.parent?.bucket
          const division = context?.parent?.division

          if (bucket !== 'member') return true
          if (!value) return 'Subteam is required for subteam members.'
          if (!division) return 'Select a division first.'

          const expectedDivision = subteamDivisionMap[value]
          if (expectedDivision && expectedDivision !== division) {
            return `This subteam belongs to ${expectedDivision}. Please match Division and Subteam.`
          }
          return true
        }),
      hidden: ({ parent }) => parent?.bucket !== 'member',
    }),
    defineField({
      name: 'isSubteamHead',
      title: 'Subteam Head',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => parent?.bucket !== 'member',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 100,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      description: 'Turn off to hide this member from the team page without deleting the document.',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
    },
  },
})

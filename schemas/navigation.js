export default {
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Used for internal reference only',
      validation: Rule => Rule.required()
    },
    {
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Navigation Item',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Icon name (e.g. book, box, compass)',
              validation: Rule => Rule.required()
            },
            {
              name: 'internal',
              title: 'Is Internal Link',
              type: 'boolean',
              description: 'Check if this is an internal link',
              initialValue: true
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'URL path for this navigation item',
              validation: Rule => Rule.required()
            },
            {
              name: 'children',
              title: 'Child Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'childNavItem',
                  title: 'Child Navigation Item',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: Rule => Rule.required()
                    },
                    {
                      name: 'internal',
                      title: 'Is Internal Link',
                      type: 'boolean',
                      description: 'Check if this is an internal link',
                      initialValue: true
                    },
                    {
                      name: 'link',
                      title: 'Link',
                      type: 'string',
                      description: 'URL path for this navigation item',
                      validation: Rule => Rule.required()
                    }
                  ]
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'link'
            }
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: title || 'Navigation',
        subtitle: 'Site Navigation'
      }
    }
  }
} 
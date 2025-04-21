import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Map frontend types to actual Sanity content types
export const CONTENT_TYPES = {
  component: 'componentPage',
  paper: 'paperPage',
  learning: 'learningPage',
  pattern: 'patternPage',
  navigation: 'navigation'
}

// Create and export the Sanity client
export const createSanityClient = () => {
  // Default values (hardcoded as fallbacks)
  const projectId = '7if5w35b'
  const dataset = 'production'
  const apiVersion = '2023-05-03'
  const useCdn = true

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn
  })
}

// Create a composable to use the Sanity client
export const useSanityClient = () => {
  const client = createSanityClient()
  
  // Initialize the image URL builder
  const builder = imageUrlBuilder(client)

  // Helper function to build image URLs
  const urlFor = (source) => {
    if (!source || !source.asset) {
      return ''
    }
    return builder.image(source)
  }

  // Query helper functions
  const getPageBySlug = async (slug) => {
    return client.fetch(`
      *[_type == "page" && slug.current == $slug][0] {
        title,
        content[] {
          ...,
        }
      }
    `, { slug })
  }

  const getAllPages = async () => {
    return client.fetch(`
      *[_type == "page"] {
        title,
        "slug": slug.current
      }
    `)
  }
  
  // New function to get navigation items
  const getNavigationItems = async () => {
    // First try to get navigation structure from dedicated navigation document
    const navigationDoc = await client.fetch(`
      *[_type == "${CONTENT_TYPES.navigation}"][0] {
        items[] {
          label,
          icon,
          link,
          internal,
          children[] {
            label,
            link,
            internal
          }
        }
      }
    `)
    
    if (navigationDoc && navigationDoc.items && navigationDoc.items.length > 0) {
      return navigationDoc.items
    }
    
    // Fallback to generating navigation from content types
    const contentTypes = await client.fetch(`
      {
        "components": *[_type == "${CONTENT_TYPES.component}"] {
          title,
          "slug": slug.current
        },
        "patterns": *[_type == "${CONTENT_TYPES.pattern}"] {
          title,
          "slug": slug.current
        },
        "papers": *[_type == "${CONTENT_TYPES.paper}"] {
          title,
          "slug": slug.current
        },
        "learning": *[_type == "${CONTENT_TYPES.learning}"] {
          title,
          "slug": slug.current
        }
      }
    `)
    
    // Build a structured navigation from the content
    const navigationItems = []
    
    // Documentation item (always first)
    navigationItems.push({
      label: 'Documentation',
      icon: 'book',
      link: '/',
      internal: true
    })
    
    // Add Components if they exist
    if (contentTypes.components && contentTypes.components.length > 0) {
      const componentItem = {
        label: 'Components',
        icon: 'box',
        link: '/components',
        internal: true,
        children: contentTypes.components.map(comp => ({
          label: comp.title,
          link: `/${comp.slug}`,
          internal: true
        }))
      }
      navigationItems.push(componentItem)
    }
    
    // Add Patterns if they exist
    if (contentTypes.patterns && contentTypes.patterns.length > 0) {
      const patternItem = {
        label: 'Patterns',
        icon: 'box',
        link: '/patterns',
        internal: true,
        children: contentTypes.patterns.map(pattern => ({
          label: pattern.title,
          link: `/${pattern.slug}`,
          internal: true
        }))
      }
      navigationItems.push(patternItem)
    }
    
    // Add Papers if they exist
    if (contentTypes.papers && contentTypes.papers.length > 0) {
      const paperItem = {
        label: 'Papers',
        icon: 'file-text',
        link: '/papers',
        internal: true,
        children: contentTypes.papers.map(paper => ({
          label: paper.title,
          link: `/${paper.slug}`,
          internal: true
        }))
      }
      navigationItems.push(paperItem)
    }
    
    // Add Learning items if they exist
    if (contentTypes.learning && contentTypes.learning.length > 0) {
      const learningItem = {
        label: 'Learning',
        icon: 'book-open',
        link: '/learning',
        internal: true,
        children: contentTypes.learning.map(item => ({
          label: item.title,
          link: `/${item.slug}`,
          internal: true
        }))
      }
      navigationItems.push(learningItem)
    }
    
    return navigationItems
  }

  return {
    client,
    urlFor,
    getPageBySlug,
    getAllPages,
    getNavigationItems
  }
} 
import { createClient } from '@sanity/client'
import { CONTENT_TYPES } from '~/utils/sanityClient'

export default defineEventHandler(async (event) => {
  try {
    // Create client with full access on server side
    const client = createClient({
      projectId: process.env.SANITY_PROJECT_ID || '7if5w35b',
      dataset: process.env.SANITY_DATASET || 'production',
      apiVersion: process.env.SANITY_API_VERSION || '2023-05-03',
      useCdn: process.env.SANITY_USE_CDN !== 'false',
      token: process.env.SANITY_TOKEN
    })
    
    // Get content type counts using the correct Sanity content types
    const counts = await client.fetch(`{
      "component": count(*[_type == $componentType]),
      "paper": count(*[_type == $paperType]),
      "learning": count(*[_type == $learningType]),
      "pattern": count(*[_type == $patternType])
    }`, {
      componentType: CONTENT_TYPES.component,
      paperType: CONTENT_TYPES.paper,
      learningType: CONTENT_TYPES.learning,
      patternType: CONTENT_TYPES.pattern
    })
    
    // Get sample content using the correct content types
    const types = [
      CONTENT_TYPES.component,
      CONTENT_TYPES.paper, 
      CONTENT_TYPES.learning, 
      CONTENT_TYPES.pattern
    ]
    const firstFew = await client.fetch('*[_type in $types][0...2]', { types })
    
    return {
      success: true,
      config: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        apiVersion: process.env.SANITY_API_VERSION,
        hasToken: !!process.env.SANITY_TOKEN
      },
      mappedTypes: CONTENT_TYPES,
      counts,
      sample: firstFew
    }
  } catch (error: any) {
    console.error('Error in sanity-test API route:', error)
    
    return {
      success: false,
      error: error.message
    }
  }
}) 
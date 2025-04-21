import { createClient } from '@sanity/client'
import { CONTENT_TYPES } from '~/utils/sanityClient'

export default defineEventHandler(async (event) => {
  try {
    // Get query parameters
    const query = getQuery(event)
    const slug = query.slug as string
    const type = query.type as string || 'componentPage'

    // Create client with server-side access
    const client = createClient({
      projectId: process.env.SANITY_PROJECT_ID || '7if5w35b',
      dataset: process.env.SANITY_DATASET || 'production',
      apiVersion: process.env.SANITY_API_VERSION || '2023-05-03',
      useCdn: process.env.SANITY_USE_CDN !== 'false',
      token: process.env.SANITY_TOKEN
    })
    
    // Build GROQ query based on slug and type
    const groqQuery = slug 
      ? `*[_type == $type && (slug.current == $slug || slug == $slug)]`
      : `*[_type == $type][0...5]`;
    
    // Execute the query
    const result = await client.fetch(groqQuery, { 
      type, 
      slug: slug ? slug.replace(/^["'](.*)["']$/, '$1') : undefined
    })
    
    // Also fetch all document types in the dataset for debugging
    const allTypes = await client.fetch(`array::unique(*._type)`);
    
    return {
      success: true,
      params: { slug, type },
      contentTypeMapping: CONTENT_TYPES,
      allDocumentTypes: allTypes,
      result
    }
  } catch (error: any) {
    console.error('Error in debug-content API:', error)
    return {
      success: false,
      error: error.message
    }
  }
}) 
import edge from 'edge.js'
import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as heroIcons } from '@iconify-json/heroicons'

/**
 * Add heroIcons collection
 */
addCollection(heroIcons)

/**
 * Register the plugin
 */
edge.use(edgeIconify)

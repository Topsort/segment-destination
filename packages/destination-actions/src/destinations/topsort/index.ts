import type { DestinationDefinition } from '@segment/actions-core'
import type { Settings } from './generated-types'

import impression from './impression'

import click from './click'

import purchase from './purchase'

const destination: DestinationDefinition<Settings> = {
  name: 'Topsort',
  slug: 'actions-topsort',
  mode: 'cloud',
  description: 'Send events server-side to the Topsort Events API.',
  authentication: {
    scheme: 'custom',
    fields: {
      api_key: {
        label: 'API Key',
        description: 'Created under Settings > API Integration in the Topsort Manager Platform.',
        type: 'password',
        required: true
      }
    }
  },
  actions: {
    impression,
    click,
    purchase
  }
}

export default destination

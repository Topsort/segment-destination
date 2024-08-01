import type { ActionDefinition } from '@segment/actions-core'
import type { Settings } from '../generated-types'
import type { Payload } from './generated-types'
import { event_id, timestamp, user_id, session_id, resolved_bid_id } from '../common/fields'
import { EventType } from 'src/destinations/topsort/common/event'
import { TopsortAPIClient } from '../common/request-client'
import { convertEvent } from '../common/convert'

const action: ActionDefinition<Settings, Payload> = {
  title: 'Impression',
  defaultSubscription: 'type = "track" and event = "Product Viewed"',
  description: 'A set of impressions means such promotables have become visible to the consumer.',
  fields: {
    event_id,
    timestamp,
    user_id,
    session_id,
    resolved_bid_id
  },
  perform: (request, { payload, settings }) => {
    const client = new TopsortAPIClient(request, settings)
    const body = convertEvent({ eventType: EventType.Impression, payload })
    return client.sendEvent(body)
  }
}

export default action

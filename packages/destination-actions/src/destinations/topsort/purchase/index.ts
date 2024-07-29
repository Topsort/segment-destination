import type { ActionDefinition } from '@segment/actions-core'
import type { Settings } from '../generated-types'
import type { Payload } from './generated-types'
import { event_id, timestamp, user_id, session_id, resolved_bid_id } from '../common/fields'
import { EventType } from 'src/destinations/topsort/common/event'
import { TopsortAPIClient } from '../common/request-client'
import { convertPurchase } from '../common/convert'
import { items } from 'src/destinations/moloco-rmp/common/fields'

const action: ActionDefinition<Settings, Payload> = {
  title: 'Purchase',
  description: 'A purchase is sent to Topsort once a consumer places an order.',
  fields: {
    event_id,
    timestamp,
    user_id,
    session_id,
    resolved_bid_id,
    items: {
      ...items,
      required: true
    }
  },
  perform: (request, { payload, settings }) => {
    const client = new TopsortAPIClient(request, settings)
    const body = convertPurchase({ eventType: EventType.Purchase, payload })
    return client.sendEvent(body)
  }
}

export default action

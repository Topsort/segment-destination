import type { ActionDefinition } from '@segment/actions-core'
import type { Settings } from '../generated-types'
import type { Payload } from './generated-types'
import { TopsortAPIClient } from '../client'

const action: ActionDefinition<Settings, Payload> = {
  title: 'Purchase',
  defaultSubscription: 'type = "track" and event = "Order Completed"',
  description: 'Send purchase events to Topsort when a consumer places an order.',
  fields: {
    id: {
      label: 'Event ID',
      description:
        'Unique ID generated by the client to suppress duplicate events. The length should not exceed 128 characters.',
      type: 'string',
      required: true,
      default: {
        '@path': '$.messageId'
      }
    },
    occurredAt: {
      label: 'Occurred At',
      description: 'Timestamp that the event happened at.',
      type: 'datetime',
      required: true,
      default: {
        '@path': '$.timestamp'
      }
    },
    opaqueUserId: {
      label: 'Opaque User ID',
      description:
        'Identifier for tracking users regardless of sign-in status. The length should not exceed 128 characters.',
      type: 'string',
      required: true,
      default: {
        '@path': '$.anonymousId'
      }
    },
    items: {
      label: 'Items',
      description: 'Item information list related to the event.',
      type: 'object',
      required: true,
      multiple: true,
      properties: {
        productId: {
          label: 'Product ID',
          description: 'The marketplace ID of the product being purchased.',
          type: 'string',
          required: true
        },
        unitPrice: {
          label: 'Unit Price',
          description: 'The price of a single item in the marketplace currency.',
          type: 'number',
          required: false
        },
        quantity: {
          label: 'Quantity',
          description: 'Count of products purchased.',
          type: 'integer',
          required: false
        },
        vendorId: {
          label: 'Vendor ID',
          description: 'The vendor ID of the product being purchased.',
          type: 'string',
          required: false
        }
      },
      default: {
        '@arrayPath': [
          '$.products',
          {
            productId: { '@path': '$.product_id' },
            unitPrice: { '@path': '$.price' },
            quantity: { '@path': '$.quantity' },
            vendorId: { '@path': '$.brand' }
          }
        ]
      }
    }
  },
  perform: (request, { payload, settings }) => {
    const client = new TopsortAPIClient(request, settings)
    return client.sendEvent({
      purchases: [payload]
    })
  }
}

export default action

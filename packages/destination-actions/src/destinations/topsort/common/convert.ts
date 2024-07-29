import { EventType } from './event'
import { EventPayload as SegmentEventPayload, PurchasePayload as SegmentPurchasePayload } from './payload/segment'
import {
  EventPayload as TopsortEventPayload,
  ImpressionsPayload as TopsortImpressionPayload,
  ClicksPayload as TopsortClickPayload,
  ItemPayload as TopsortItemPayload,
  PurchasePayload as TopsortPurchasePayload,
  PurchasesPayload as TopsortPurchasesPayload
} from './payload/topsort'

// This function coverts the SegmentEventPayload to TopsortEventPayload or TopsortClickPayload
// SegmentEventPayload is the payload that went through the mapping defined in the Segment UI
// TopsortImpressionPayload or TopsortClickPayload is the payload that will be sent to the Topsort Events API
export function convertEvent(args: {
  eventType: EventType
  payload: SegmentEventPayload
}): TopsortClickPayload | TopsortImpressionPayload {
  const { eventType, payload } = args

  if (eventType === EventType.Click) {
    return {
      clicks: [
        {
          id: payload.event_id,
          occurredAt: payload.timestamp,
          resolvedBidId: payload.resolved_bid_id,
          opaqueUserId: payload.user_id ?? payload.session_id
        } as TopsortEventPayload
      ]
    } as TopsortClickPayload
  } else if (eventType === EventType.Impression) {
    return {
      impressions: [
        {
          id: payload.event_id,
          occurredAt: payload.timestamp,
          resolvedBidId: payload.resolved_bid_id,
          opaqueUserId: payload.user_id ?? payload.session_id
        } as TopsortEventPayload
      ]
    } as TopsortImpressionPayload
  } else {
    throw new Error(`Unsupported event type: ${eventType}`)
  }
}

// This function coverts the SegmentPurchasePayload to TopsortPurchasePayload
// SegmentPurchasePayload is the payload that went through the mapping defined in the Segment UI
// TopsortPurchasePayload is the payload that will be sent to the Topsort Events API
export function convertPurchase(args: { payload: SegmentPurchasePayload }): TopsortPurchasesPayload {
  const { payload } = args
  return {
    purchases: [
      {
        id: payload.event_id,
        occurredAt: payload.timestamp,
        opaqueUserId: payload.user_id ?? payload.session_id,
        items: payload.items.map(
          (item) =>
            ({
              productId: item.id,
              unitPrice: item.price,
              quantity: item.quantity,
              vendorId: item.seller_id
            } as TopsortItemPayload)
        )
      } as TopsortPurchasePayload
    ]
  } as TopsortPurchasesPayload
}

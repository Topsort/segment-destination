// This is a generalization of a payload to be delivered to the Topsort API.
// ./segment/payload should be converted into this interface after converting through ../body-builder/buildBody
export interface ImpressionsPayload {
  /**
   * The list of impressions.
   */
  impressions: EventPayload[]
}

export interface ClicksPayload {
  /**
   * The list of clicks.
   */
  clicks: EventPayload[]
}

export interface PurchasesPayload {
  /**
   * The list of clicks.
   */
  purchases: PurchasePayload[]
}

export interface EventPayload {
  /**
   * The marketplace's unique ID for the click. This field ensures the event reporting is idempotent in case there is a network issue and the request is retried. If there is no click model on the marketplace side, generate a unique string that does not change if the event is resent.
   */
  id: string
  /**
   * RFC3339 formatted timestamp including UTC offset.
   */
  occurredAt: string | number
  /**
   * The opaque user ID allows correlating user activity, such as Impressions, Clicks and Purchases, whether or not they are actually logged in. It must be long lived (at least a year) so that Topsort can attribute purchases.
   * If your users are always logged in you may use a hash of your customer ID. If your users may interact with your app or site while logged out we recommend generating a random identifier (UUIDv4) on first load and store it on local storage (cookie, local storage, etc) and let it live for at least a year.
   */
  opaqueUserId: string
  /**
   * If the click is over an ad promotion, this is the resolvedBidId field received from the /auctions request. In most situations, especially when reporting a sponsored interaction, you'll want to fill in this field.
   */
  resolvedBidId: string
}

export interface PurchasePayload {
  /**
   * The marketplace's unique ID for the click. This field ensures the event reporting is idempotent in case there is a network issue and the request is retried. If there is no click model on the marketplace side, generate a unique string that does not change if the event is resent.
   */
  id: string
  /**
   * RFC3339 formatted timestamp including UTC offset.
   */
  occurredAt: string | number
  /**
   * The opaque user ID allows correlating user activity, such as Impressions, Clicks and Purchases, whether or not they are actually logged in. It must be long lived (at least a year) so that Topsort can attribute purchases.
   * If your users are always logged in you may use a hash of your customer ID. If your users may interact with your app or site while logged out we recommend generating a random identifier (UUIDv4) on first load and store it on local storage (cookie, local storage, etc) and let it live for at least a year.
   */
  opaqueUserId: string
  /**
   * Purchase items information list related to the event.
   */
  items: ItemPayload[]
}

// Generalized payload for ../fields/createItemInputField, note that it is not an array type
export interface ItemPayload {
  /**
   * The marketplace ID of the product being purchased.
   */
  productId: string
  /**
   * The price of a single item in the marketplace currency.
   */
  unitPrice: number
  /**
   * Count of products purchased.
   */
  quantity?: number
  /**
   * The vendor ID of the product being purchased. This field is optional and should be filled in if a product is sold by multiple vendors.
   */
  vendorId?: string
}

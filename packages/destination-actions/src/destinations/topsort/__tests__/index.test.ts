import nock from 'nock'
import { createTestIntegration } from '@segment/actions-core'
import Definition from '../index'
import matches from 'lodash/matches'

const testDestination = createTestIntegration(Definition)
const fakeApiKey = 'your-api-key'

describe('Topsort', () => {
  describe('validates authentication and fields formats for events when', () => {
    it('is an impression event', async () => {
      nock('https://api.topsort.com')
        .post(
          '/v2/events',
          matches({
            impressions: [
              {
                id: 'ajs-next-1723038478811-34f48625-af9a-4e50-8ab3-a6f191189691',
                occurredAt: '2024-01-01T00:00:00.000Z',
                opaqueUserId: '061e1f20-710b-474b-a48b-ed3743be67fd',
                resolvedBidId:
                  'ChAGazewW_16ILEEHz_rFhRGEhABjvgEsVN9ALHek8F0f2_lGhAGN9P8uXJ9L7skBFfwxTQeIgwKCEVCVENKOUgxEAEwrQk'
              }
            ]
          })
        )
        .reply(204, {})
        .matchHeader('Authorization', `Bearer ${fakeApiKey}`)

      const authData = {
        api_key: fakeApiKey
      }

      await expect(testDestination.testAuthentication(authData)).resolves.not.toThrowError()
    })

    it('is an click event', async () => {
      nock('https://api.topsort.com')
        .post(
          '/v2/events',
          matches({
            clicks: [
              {
                id: 'ajs-next-1723038478811-34f48625-af9a-4e50-8ab3-a6f191189691',
                occurredAt: '2024-01-01T00:00:00.000Z',
                opaqueUserId: '061e1f20-710b-474b-a48b-ed3743be67fd',
                resolvedBidId:
                  'ChAGazewW_16ILEEHz_rFhRGEhABjvgEsVN9ALHek8F0f2_lGhAGN9P8uXJ9L7skBFfwxTQeIgwKCEVCVENKOUgxEAEwrQk'
              }
            ]
          })
        )
        .reply(204, {})
        .matchHeader('Authorization', `Bearer ${fakeApiKey}`)

      const authData = {
        api_key: fakeApiKey
      }

      await expect(testDestination.testAuthentication(authData)).resolves.not.toThrowError()
    })

    it('is an purchase event', async () => {
      nock('https://api.topsort.com')
        .post(
          '/v2/events',
          matches({
            purchases: [
              {
                id: 'ajs-next-1723038478811-34f48625-af9a-4e50-8ab3-a6f191189691',
                occurredAt: '2024-01-01T00:00:00.000Z',
                opaqueUserId: '061e1f20-710b-474b-a48b-ed3743be67fd',
                items: [
                  {
                    id: '123',
                    price: 100,
                    quantity: 1
                  }
                ]
              }
            ]
          })
        )
        .reply(204, {})
        .matchHeader('Authorization', `Bearer ${fakeApiKey}`)

      const authData = {
        api_key: fakeApiKey
      }

      await expect(testDestination.testAuthentication(authData)).resolves.not.toThrowError()
    })
  })
})

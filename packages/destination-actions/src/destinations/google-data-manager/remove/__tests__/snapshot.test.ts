import { createTestEvent, createTestIntegration } from '@segment/actions-core'
import { generateTestData } from '../../../../lib/test-data'
import destination from '../../index'
import nock from 'nock'

const testDestination = createTestIntegration(destination)
const actionSlug = 'remove'
const destinationSlug = 'GoogleDataManager'
const seedName = `${destinationSlug}#${actionSlug}`

describe(`Testing snapshot for ${destinationSlug}'s ${actionSlug} destination action:`, () => {
  it('required fields', async () => {
    const action = destination.actions[actionSlug]
    const [eventData, settingsData] = generateTestData(seedName, destination, action, true)

    nock(/.*!/).persist().get(/.*!/).reply(200)
    nock(/.*!/).persist().post(/.*!/).reply(200)
    nock(/.*!/).persist().put(/.*!/).reply(200)

    const event = createTestEvent({
      properties: eventData
    })

    const responses = await testDestination.testAction(actionSlug, {
      event: event,
      mapping: event.properties,
      settings: settingsData,
      auth: undefined
    })

    // Defensive: handle case where no request is made
    if (!responses[0] || !responses[0].request) {
      expect(responses).toMatchSnapshot()
      return
    }

    const request = responses[0].request
    let rawBody = ''
    try {
      rawBody = await request.text()
    } catch (e) {
      rawBody = ''
    }

    try {
      const json = JSON.parse(rawBody)
      expect(json).toMatchSnapshot()
      return
    } catch (err) {
      expect(rawBody).toMatchSnapshot()
    }

    expect(request.headers).toMatchSnapshot()
  })

  it('all fields', async () => {
    const action = destination.actions[actionSlug]
    const [eventData, settingsData] = generateTestData(seedName, destination, action, false)

    nock(/.*!/).persist().get(/.*!/).reply(200)
    nock(/.*!/).persist().post(/.*!/).reply(200)
    nock(/.*!/).persist().put(/.*!/).reply(200)

    const event = createTestEvent({
      properties: eventData
    })

    const responses = await testDestination.testAction(actionSlug, {
      event: event,
      mapping: event.properties,
      settings: settingsData,
      auth: undefined
    })

    // Defensive: handle case where no request is made
    if (!responses[0] || !responses[0].request) {
      expect(responses).toMatchSnapshot()
      return
    }

    const request = responses[0].request
    let rawBody = ''
    try {
      rawBody = await request.text()
    } catch (e) {
      rawBody = ''
    }

    try {
      const json = JSON.parse(rawBody)
      expect(json).toMatchSnapshot()
      return
    } catch (err) {
      expect(rawBody).toMatchSnapshot()
    }
  })
})

const request = require('supertest')
const app = require('../../src/services/app')
const Sequelize = require('sequelize')
const INSTAPY_FOLDER = process.env.INSTAPY_FOLDER

describe('Gets', () => {
  it('Should get all account activies', async () => {
    const response = await request(app)
      .get('/get_all_activities')
    expect(response.status).toBe(200)
  })

  // TODO: use factory-girl to create/retrieve random data
  // it('Should get all ativities from one specific user'), async () => {
  //   const response = await request(app)
  //     .get('/get_all_user_statistics')
  // }
})
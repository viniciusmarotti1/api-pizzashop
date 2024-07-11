import Elysia from 'elysia'
import { auth } from '../auth'
import { db } from '../../db/connection'

export const getManagedRestaurant = new Elysia()
  .use(auth)
  .get('/managed-restaurant', async ({ getCurrentUser }) => {
    const { restraurantId } = await getCurrentUser()

    if (!restraurantId) {
      throw new Error(`This user is not a manager`)
    }

    const managedRestaurant = await db.query.restaurants.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, restraurantId)
      },
    })

    return managedRestaurant
  })

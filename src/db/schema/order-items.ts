import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { orders } from './orders'
import { users } from './users'
import { relations } from 'drizzle-orm'
import { products } from './products'

export const ordersItems = pgTable('orders_items', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id, {
      onDelete: 'cascade',
    }),
  productId: text('product_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'set null',
    }),
  priceInCents: integer('price_in_cents').notNull(),
  quantity: integer('created_at').notNull(),
})

export const ordersItemsRelations = relations(ordersItems, ({ one }) => {
  return {
    order: one(orders, {
      fields: [ordersItems.orderId],
      references: [orders.id],
      relationName: 'order_item_order',
    }),
    product: one(products, {
      fields: [ordersItems.productId],
      references: [products.id],
      relationName: 'order_item_product',
    }),
  }
})

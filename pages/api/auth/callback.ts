// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiVersion, AuthQuery, Shopify } from '@shopify/shopify-api'
import { initShopify } from '../../../utils/shopify'
import { shops } from '..'

initShopify()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('attempting auth')
  try {
    const session = await Shopify.Auth.validateAuthCallback(
      req,
      res,
      req.query as unknown as AuthQuery
    )
    shops.set(session.shop, session)
    console.log('auth done!')
    return res.redirect(`https://${session.shop}/admin/apps/untitled-1`)
  } catch (e) {
    console.log('auth dead')
    console.error(e)
    return res.status(401).send(JSON.stringify(e))
  }
}

export default handler

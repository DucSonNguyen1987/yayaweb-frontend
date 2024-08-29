const stripe =require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async function handler(req, res){
    if (req.method ==='POST'){
        try{

            const { items, total, deliveryAddress } = req.body;

            // loop items to create line_items product data
            const line_items = items.map((item, i) => {
                return {
                    price_data: {
                      currency: 'eur',
                      unit_amount: item.price,
                      product_data: {
                        name: item.name,
                        images: [
                            // TODO : ajouter url complète de l'image, après avoir déployé le frontend
                            // item.images[0].url
                        ],
                      },
                      quantity: item.quantity,
                      description: item.description,
                    }
                }
            });

            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                line_items,
                mode: 'payment',
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
            });
            res.json({ result: true, url: session.url });
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
          }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}

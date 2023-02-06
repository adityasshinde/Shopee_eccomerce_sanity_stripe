import SanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client=SanityClient({
    projectId:'81luka7x',
    dataset:'production',
    apiVersion:'2023-02-04',
    useCdn:true,
    token:process.env.NEXT_PUBLIC_SANITY_TOKEN
})

const builder=imageUrlBuilder(client);
export const urlFor=(source)=>builder.image(source);

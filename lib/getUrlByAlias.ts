import getCollection, { URLS_COLLECTION } from "@/db";

export default async function getUrlByAlias(
    alias: string,
): Promise<string | null> {
    const urlsCollection = await getCollection(URLS_COLLECTION);
    const data = await urlsCollection.findOne({ alias: alias });

    if (data === null) {
        return null;
    }
    return data.url;
}
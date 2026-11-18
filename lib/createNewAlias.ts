"use server";
import getCollection, { URLS_COLLECTION } from "@/db";
import { UrlProps } from "@/types";
import { isValidUrl, isValidAlias } from "@/lib/validation";

export default async function createNewAlias(
    url: string,
    alias: string,
): Promise<UrlProps | string> {
    console.log("creating new alias");

    if (!isValidUrl(url)) {
        return "Invalid URL. Make sure it starts with http:// or https://";
    }
    if (!isValidAlias(alias)) {
        return "Alias may only contain letters, numbers, - and _";
    }

    const urlsCollection = await getCollection(URLS_COLLECTION);

    const existing = await urlsCollection.findOne({ alias: alias });
    if (existing) {
        return "Alias already taken";
    }

    const u = {
        alias: alias,
        url: url,
    };

    const res = await urlsCollection.insertOne({ ...u });

    if (!res.acknowledged) {
        return "DB insert failed";
    }

    return { ...u, id: res.insertedId.toHexString() };
}
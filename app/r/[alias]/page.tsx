import { redirect } from "next/navigation";
import getUrlByAlias from "@/lib/getUrlByAlias";

export const dynamic = "force-dynamic";

export default async function AliasPage({
                                            params,
                                        }: {
    params: Promise<{ alias: string }>;
}) {
    const { alias } = await params;
    const url = await getUrlByAlias(alias);

    if (url === null) {
        redirect("/");
    }

    redirect(url);
}
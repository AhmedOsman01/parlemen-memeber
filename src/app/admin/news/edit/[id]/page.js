import { getNewsById } from "@/models/newsModel";
import { notFound } from "next/navigation";
import EditNewsPage from "./EditNewsPage";

export default async function Page({ params }) {
    const { id } = await params;
    const news = await getNewsById(id);

    if (!news) {
        notFound();
    }

    // Ensure plain object for client component
    const serializedNews = JSON.parse(JSON.stringify(news));

    return <EditNewsPage news={serializedNews} />;
}

import { getTimelineItemById } from "@/models/timelineModel";
import { notFound } from "next/navigation";
import EditTimelinePage from "./EditTimelinePage";

export default async function Page({ params }) {
    const { id } = await params;
    const item = await getTimelineItemById(id);

    if (!item) {
        notFound();
    }

    // Ensure plain object for client component
    const serializedItem = JSON.parse(JSON.stringify(item));

    return <EditTimelinePage item={serializedItem} />;
}

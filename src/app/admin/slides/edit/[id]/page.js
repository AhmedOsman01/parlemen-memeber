import { getSlideById } from "@/models/slideModel";
import { notFound } from "next/navigation";
import EditSlidePage from "./EditSlidePage";

export default async function Page({ params }) {
    const { id } = await params;
    const slide = await getSlideById(id);

    if (!slide) {
        notFound();
    }

    // Ensure plain object for client component
    const serializedSlide = JSON.parse(JSON.stringify(slide));

    return <EditSlidePage slide={serializedSlide} />;
}

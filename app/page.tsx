import SplitLayout from "@/components/layout/SplitLayout";
import connectMongo from "@/lib/mongodb";
import Ganesha from "@/models/Ganesha";

interface GaneshaDoc {
    _id: { toString: () => string };
    order: number;
    nameTH: string;
    nameEN: string;
    meaning: string;
    color: string;
    vehicle: string;
    weapons: string;
    imageUrl?: string;
    mantra?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default async function HomePage() {
    await connectMongo();

    const rawGaneshas = await Ganesha.find({ isDeleted: false })
        .sort({ order: 1 })
        .lean();

    const ganeshaData = rawGaneshas.map((item) => {
        const doc = item as unknown as GaneshaDoc;
        return {
            _id: doc._id.toString(),
            order: doc.order,
            nameTH: doc.nameTH,
            nameEN: doc.nameEN,
            meaning: doc.meaning,
            color: doc.color,
            vehicle: doc.vehicle,
            weapons: doc.weapons,
            imageUrl: doc.imageUrl || "",
            mantra: doc.mantra || "",
            createdAt: doc.createdAt?.toISOString(),
            updatedAt: doc.updatedAt?.toISOString(),
        };
    });

    return (
        <main className="min-h-screen bg-neutral-950 flex flex-col font-sans text-neutral-200">
            <SplitLayout initialData={ganeshaData} />
        </main>
    );
}

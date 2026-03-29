const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://ahmedosmanelhady_db_user:Wa0Z5d0EA61LojMK@parlemin-app.remqerw.mongodb.net/";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("parlemen");
        const slides = await db.collection("slides").find({}).toArray();
        console.log("Found " + slides.length + " slides in DB.");
        if (slides.length > 0) {
            console.log("Updating their images...");
            // Slide 1
            if (slides[0]) await db.collection("slides").updateOne({ _id: slides[0]._id }, { $set: { image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Magles_El_Nowaab.jpg" }});
            // Slide 2
            if (slides[1]) await db.collection("slides").updateOne({ _id: slides[1]._id }, { $set: { image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/The_Egyptian_parliament_building_during_9_February_%28Closed%29.jpg" }});
            // Slide 3
            if (slides[2]) await db.collection("slides").updateOne({ _id: slides[2]._id }, { $set: { image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=1920" }});
            console.log("Images updated!");
        }
    } finally {
        await client.close();
    }
}

main().catch(console.error);

// pages/api/look.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("Pedagogy");
    const collection = db.collection("games-dev");

    const { searchTerm } = req.query;

    const searchResult = await collection
      .aggregate([
        {
          $search: {
            index: "game",
            text: {
              query: searchTerm,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ])
      .toArray();

    res.json(searchResult);
  } catch (error) {
    res.status(500).json({ error: "Unable to perform search" });
  }
}

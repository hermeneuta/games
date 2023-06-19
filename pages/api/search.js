import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { purpose, ageLimit, timeLimit, requir } = req.body;
      const client = await clientPromise;
      const db = client.db("Pedagogy");
      let ageQuery;
      let timeQuery;
      let purposeQuery;

      if (ageLimit === "no age limit") {
        ageQuery = { age: { $exists: true } };
      } else ageQuery = { age: ageLimit };

      if (timeLimit === "no time limit") {
        timeQuery = { time: { $exists: true } };
      } else timeQuery = { time: timeLimit };

      if (purpose.length === 0) {
        purposeQuery = { purpose: { $exists: true } };
      } else {
        // Create an array of purpose regex queries
        const purposeQueries = purpose.map((purp) => ({
          purpose: { $regex: purp.trim(), $options: "i" },
        }));
        purposeQuery = { $and: purposeQueries };
      }

      // Define a query
      const query = {
        $and: [purposeQuery, ageQuery, timeQuery],
      };

      // const sampleStage = { $sample: { size: 5 } };
      const games = await db
        .collection("games")
        .find(query)
        .limit(14)
        // .aggregate([query, sampleStage])
        .toArray();
      res.json(games);
    } catch (e) {
      console.error(e);
    }
  }
};

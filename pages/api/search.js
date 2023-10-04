import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { age, amount, stage, field, props, social, technical } = req.body;
      const client = await clientPromise;
      const db = client.db("Pedagogy");

      const ageQuery = age === "dowolny" ? {} : { age: { $in: [age] } };

      const amountQuery = amount === "optymalna" ? {} : { amount };

      const stageQuery = stage === "dowolny" ? {} : { stage };

      const fieldQuery = field === "dowolna" ? {} : { field: { $in: [field] } };
      const propsQuery = props === "dowolne" ? {} : { props: { $in: [props] } };
      const socialQuery =
        social === "dowolne" ? {} : { social: { $in: [social] } };
      const technicalQuery =
        technical === "dowolne" ? {} : { technical: { $in: [technical] } };

      // Define a query
      const query = {
        $and: [
          ageQuery,
          amountQuery,
          stageQuery,
          fieldQuery,
          propsQuery,
          socialQuery,
          technicalQuery,
        ],
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

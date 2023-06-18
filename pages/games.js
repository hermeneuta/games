import clientPromise from "../lib/mongodb";

const Games = (props) => {
  console.log(props);
  return (
    <div>
      <h1 className="text-center text-4xl font-bold text-gray-300 p-4">
        Games
      </h1>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("Pedagogy");

    const games = await db.collection("games").find({}).toArray();

    return {
      props: {
        games: JSON.parse(JSON.stringify(games)),
      },
    };
  } catch (e) {
    console.error(e);
  }
}

export default Games;

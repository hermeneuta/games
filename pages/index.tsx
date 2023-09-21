import Form from "../components/Form";
import Footer from "../components/Footer";

const Games = () => {
  return (
    <>
      <div className=" bg-lime-700 bg-gradient-to-t from-lime-900 pb-40">
        <div className="text-zinc-900 p-6 font-serif text-center">
          <h1 className="text-4xl font-bold">Circosophia</h1>
          <p className="mt-2">Biblioteka cyrkowych gier i zabaw</p>
        </div>
        <Form />
      </div>
      <Footer />
    </>
  );
};

export default Games;
